const PubSub = require("../helpers/pub_sub.js");

const AlarmView = function(attachmentPoint) {
  this.element = document.querySelector(attachmentPoint);
}

AlarmView.prototype.bindEvents = function () {
  PubSub.subscribe("clockModel:alarm", (event) => {
    PubSub.signForDelivery(this,event);
    this.element.play();
  })
};

module.exports = AlarmView;
