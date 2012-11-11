
goog.provide('urlbuilder');

goog.require('urlbuilder.Controller');

urlbuilder.init = function()
{
  var controller = new urlbuilder.Controller();
  controller.init();
};
