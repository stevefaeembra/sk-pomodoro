const PubSub = require("../helpers/pub_sub.js");

const ControlsView = function (attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
  this.element.innerHTML = "";
  const divControlBar = document.createElement("div");
  divControlBar.id = "controlBar";
  const divStartButton = document.createElement("div");
  divStartButton.id ="controlBar-start";
  divStartButton.innerHTML = "Start!";
  const divPauseButton = document.createElement("div");
  divPauseButton.id ="controlBar-pause";
  divPauseButton.innerHTML = "Pause!";
  this.startButton = divStartButton;
  this.divPauseButton = divPauseButton;
  divControlBar.appendChild(divStartButton);
  divControlBar.appendChild(divPauseButton);
  this.element.appendChild(divControlBar);
}

ControlsView.prototype.bindEvents = function () {
  this.startButton.addEventListener("click", (event) => {
    PubSub.publish("clockModel:finished",{});
    PubSub.publish("clockModel:start",{});
  })
};

module.exports = ControlsView;
