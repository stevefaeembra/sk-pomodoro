const PubSub = require("../helpers/pub_sub.js");

const ClockView = function (attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
}

ClockView.prototype.leftPad = function (value) {
  // left pad with leading zero if less than 10
  const amt = parseInt(value);
  if (value<10) {
    return `0${amt}`;
  } else {
    return `${amt}`;
  }
};

ClockView.prototype.render = function (detail) {
  const mins = detail.mins;
  const secs = detail.secs;
  const progressMax = detail.max;
  const progressValue = detail.value;
  const percentage = (parseFloat(progressValue) / parseFloat(progressMax))*100.0;

  this.element.innerHTML = "";

  const divRow1 = document.createElement("div");
  divRow1.className = "timer-row";

  const divRow2 = document.createElement("div");
  divRow2.className = "timer-row";

  const divTime = document.createElement("div");
  divTime.className = "timer-time";

  const spanMins = document.createElement("span");
  spanMins.className = "digit-mins";
  spanMins.innerHTML = this.leftPad(mins);

  const spanMinsLabel = document.createElement("span");
  spanMinsLabel.className = "digit-mins";
  spanMinsLabel.innerHTML = ":";

  const spanSecs = document.createElement("span");
  spanSecs.className="digit-secs";
  spanSecs.innerHTML = this.leftPad(secs);

  const spanSecsLabel = document.createElement("span");
  spanSecsLabel.className = "digit-label";
  spanSecsLabel.innerHTML = "";

  const spanPercent = document.createElement("span");
  spanPercent.className = "digit-percent";
  spanPercent.innerHTML = `${parseInt(percentage)}`;

  const spanPercentLabel = document.createElement("span");
  spanPercentLabel.className = "digit-label";
  spanPercentLabel.innerHTML = "";

  divRow1.appendChild(spanMins);
  divRow1.appendChild(spanMinsLabel);
  divRow1.appendChild(spanSecs);
  divRow1.appendChild(spanSecsLabel);
  divRow2.appendChild(spanPercent);
  divRow2.appendChild(spanPercentLabel);

  divTime.appendChild(divRow1);
  divTime.appendChild(divRow2);

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
