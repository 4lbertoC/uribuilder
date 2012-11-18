'use strict';

goog.provide('urlbuilder');

goog.require('urlbuilder.Controller');
goog.require('urlbuilder.HtmlElements');

/**
 * Initializes the UrlBuilder app.
 */
urlbuilder.init = function()
{
	document.write(urlbuilder.HtmlElements.indexPage());
  var controller = new urlbuilder.Controller();
  controller.init();
};
goog.exportSymbol('boot', urlbuilder.init);
