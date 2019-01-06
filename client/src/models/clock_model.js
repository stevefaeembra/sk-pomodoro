const PubSub = require("../helpers/pub_sub.js");

const ClockModel = function (minutesDuration) {
  this.minutesDuration = minutesDuration;
  this.max = this.minutesDuration * 60;
  this.value = this.max;
  this.mins = 0;
  this.secs = 0;
}

ClockModel.prototype.tick = function (clockmodel) {
  let mins = clockmodel.mins;
  let secs = clockmodel.secs;
  secs = secs-1;
  if (secs==-1) {
    secs = 59;
    mins = mins - 1;
  }
  clockmodel.mins = mins;
  clockmodel.secs = secs;
  clockmodel.value -= 1;
  if (mins==0 && secs==0) {
    PubSub.publish("clockModel:finished", {});
  }
  console.log(`${mins}m ${secs}s`);
  PubSub.publish("clockModel:tick", {
    mins:mins,
    secs:secs,
    max: clockmodel.max,
    value: clockmodel.value
  });
};

ClockModel.prototype.bindEvents = function () {
  PubSub.subscribe("clockModel:start", (event) => {
    PubSub.signForDelivery(this,event);
    this.mins = this.minutesDuration;
    this.secs = 0;
    this.timerId = window.setInterval(this.tick, 1000, this); // once per second
    console.log("Started!")
  });
  PubSub.subscribe("clockModel:finished", (event) => {
    PubSub.signForDelivery(this,event);
    window.clearInterval(this.timerId); // cancel timer!
    console.log("Started!")
  });
};

module.exports = ClockModel;
