'use strict';

goog.provide('urlbuilder');

goog.require('urlbuilder.Controller');

/**
 * Initializes the UrlBuilder app.
 */
urlbuilder.init = function()
{
  var controller = new urlbuilder.Controller();
  controller.init();
};
goog.exportSymbol('boot', urlbuilder.init);
