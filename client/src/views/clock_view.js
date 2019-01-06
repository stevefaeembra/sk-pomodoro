const PubSub = require("../helpers/pub_sub.js");

const ClockView = function (attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
}

ClockView.prototype.render = function (detail) {
  const mins = detail.mins;
  const secs = detail.secs;
  const progressMax = detail.max;
  const progressValue = detail.value;
  this.element.innerHTML = "";
  const divTime = document.createElement("div");
  divTime.className = "timer-time";
  divTime.innerHTML = `${mins}m ${secs}s`;
  const divProgress = document.createElement("progress");
  divProgress.id = "timer-progress";
  divProgress.setAttribute("max", progressMax);
  divProgress.setAttribute("value",progressValue);
  this.element.appendChild(divTime);
  this.element.appendChild(divProgress);
};

ClockView.prototype.bindEvents = function () {
  PubSub.subscribe("clockModel:tick", (event) => {
    this.render(event.detail);
  })
};

module.exports = ClockView;
