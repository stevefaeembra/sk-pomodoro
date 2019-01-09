const PubSub = require("./helpers/pub_sub.js");

const ClockModel = require("./models/clock_model");
const ClockView = require("./views/clock_view");
const ControlsView = require("./views/controls_view");
const AlarmView = require("./views/alarm_view");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const items = [
    new ClockModel(25),
    new ClockView("#clock"),
    new ControlsView("#controls"),
    new AlarmView("#alarm")
  ];
  items.forEach((item) => {
    item.bindEvents();
  });
});
