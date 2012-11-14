"use strict";

goog.provide('urlbuilder');

goog.require('urlbuilder.Controller');

urlbuilder.init = function()
{
  var controller = new urlbuilder.Controller();
  controller.init();
};
goog.exportSymbol("boot", urlbuilder.init);
