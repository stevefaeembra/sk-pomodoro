const PubSub = require("./helpers/pub_sub.js");

const ClockModel = require("./models/clock_model");
const ClockView = require("./views/clock_view");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const items = [
    new ClockModel(25),
    new ClockView("#clock")
  ];
  items.forEach((item) => {
    item.bindEvents();
  });
  PubSub.publish("clockModel:start",{});
});
