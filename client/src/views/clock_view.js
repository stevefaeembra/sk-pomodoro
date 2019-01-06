const PubSub = require("../helpers/pub_sub.js");

const ClockView = function (attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
}

ClockView.prototype.render = function (mins, secs) {
  this.element.innerHTML = `${mins}m ${secs}s`;
};

ClockView.prototype.bindEvents = function () {
  PubSub.subscribe("clockModel:tick", (event) => {
    const mins = event.detail.mins;
    const secs = event.detail.secs;
    this.render(mins,secs);
  })
};

module.exports = ClockView;
