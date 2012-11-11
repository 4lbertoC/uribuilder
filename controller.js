
goog.provide('urlbuilder.Controller');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('urlbuilder.Handlers');
goog.require('urlbuilder.UI');

urlbuilder.Controller.activateListeners_ = function()
{
  var elements = goog.dom.getElementsByClass(urlbuilder.UI.TEXTFIELD_CLASSNAME);
  urlbuilder.Handlers.activateListeners(elements);
};

/**
 * Initialize the UI.
 * @private
 */
urlbuilder.Controller.init = function()
{
  urlbuilder.Controller.activateListeners_();
};
