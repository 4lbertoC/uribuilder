
goog.provide('urlbuilder.Controller');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('urlbuilder.EventHandler');
goog.require('urlbuilder.UI');

urlbuilder.Controller.activateListeners_ = function()
{
  var elements = goog.dom.getElementsByClass(urlbuilder.UI.TEXTFIELD_CLASSNAME);
  urlbuilder.EventHandler.activateListeners(elements);
};

/**
 * Initialize the UI.
 * @private
 */
urlbuilder.Controller.init = function()
{
  urlbuilder.Controller.activateListeners_();
};

/**
 * Parses a url and splits it into its components.
 * @param {string} url The input url.
 */
urlbuilder.Controller.parseUrl_ = function(url)
{

};
