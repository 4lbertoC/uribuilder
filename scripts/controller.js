
goog.provide('urlbuilder.Controller');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('urlbuilder.EventHandler');
goog.require('urlbuilder.UI');

/**
 * The controller class.
 * @constructor
 */
urlbuilder.Controller = function()
{};

/**
 * Initialize the UI.
 * @private
 */
urlbuilder.Controller.prototype.init = function()
{
  this.initEventHandler_();
};

urlbuilder.Controller.prototype.initEventHandler_ = function()
{
  var elements = goog.dom.getElementsByClass(urlbuilder.UI.TEXTFIELD_CLASSNAME);
  var actions = {};
  actions[urlbuilder.EventHandler.EventType.URL] = urlbuilder.Controller.parseUrl_;
  actions[urlbuilder.EventHandler.EventType.FIELD] = urlbuilder.Controller.composeUrl_;
  this.eventHandler_ = new urlbuilder.EventHandler();
  this.eventHandler_.init(elements, actions);
};

/**
 * Parses a url and splits it into its components.
 * @param {string} url The input url.
 */
urlbuilder.Controller.parseUrl_ = function(url)
{
  alert('ciao');
};

/**
 * Composes the url into the url text field from the
 * data contained in the other fields.
 * @param {string} url The input url.
 */
urlbuilder.Controller.composeUrl_ = function()
{

};

/**
 * The event handler instance.
 * @type {urlbuilder.EventHandler}
 */
urlbuilder.Controller.prototype.eventHandler_ = null;
