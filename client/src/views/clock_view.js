const PubSub = require("../helpers/pub_sub.js");

const ClockView = function (attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
}

ClockView.prototype.render = function (detail) {
  const mins = detail.mins;
  const secs = detail.secs;
  const progressMax = detail.max;
  const progressValue = detail.value;
  const percentage = (parseFloat(progressValue) / parseFloat(progressMax))*100.0;

  this.element.innerHTML = "";
  const divTime = document.createElement("div");
  divTime.className = "timer-time";

  const spanMins = document.createElement("span");
  spanMins.className = "digit-mins";
  spanMins.innerHTML = parseInt(mins);

  const spanMinsLabel = document.createElement("span");
  spanMinsLabel.className = "digit-label";
  spanMinsLabel.innerHTML = " mins ";

  const spanSecs = document.createElement("span");
  spanSecs.className="digit-secs";
  spanSecs.innerHTML = parseInt(secs);

  const spanSecsLabel = document.createElement("span");
  spanSecsLabel.className = "digit-label";
  spanSecsLabel.innerHTML = " secs ";

  const spanPercent = document.createElement("span");
  spanPercent.className = "digit-percent";
  spanPercent.innerHTML = `${percentage.toFixed(1)}`;

  const spanPercentLabel = document.createElement("span");
  spanPercentLabel.className = "digit-label";
  spanPercentLabel.innerHTML = "%";

  divTime.appendChild(spanMins);
  divTime.appendChild(spanMinsLabel);
  divTime.appendChild(spanSecs);
  divTime.appendChild(spanSecsLabel);
  divTime.appendChild(spanPercent);
  divTime.appendChild(spanPercentLabel);

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
