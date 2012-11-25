'use strict';

goog.provide('uribuilder');

goog.require('uribuilder.Controller');
goog.require('uribuilder.HtmlElements');

/**
 * Initializes the URIBilder app.
 */
uribuilder.init = function()
{
  document.write(uribuilder.HtmlElements.indexPage());
  var controller = new uribuilder.Controller();
  controller.init();
};
goog.exportSymbol('boot', uribuilder.init);
