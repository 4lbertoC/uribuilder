
goog.provide('urlbuilder.Controller');
goog.provide('urlbuilder.UrlComponents');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('urlbuilder.EventHandler');
goog.require('urlbuilder.Ui');
goog.require('urlbuilder.UrlEvent');

/** @typedef {{scheme: string, domain: string, port: string,
      path: string}} */
urlbuilder.UrlComponents;

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
  this.initUi_();
  this.initEventHandler_();
  this.initActions_();
};

/**
 * Links the events dispatched by the EventHandler
 * to the Controller functions.
 * @private
 */
urlbuilder.Controller.prototype.initActions_ = function()
{
  this.eventHandler_.addEventListener(
	urlbuilder.EventHandler.EventType.URL, this.onUrlEvent_);
  this.eventHandler_.addEventListener(
	urlbuilder.EventHandler.EventType.FIELD, this.onFieldEvent_);
};

/**
 * Activates the DOM elements listeners.
 * @private
 */
urlbuilder.Controller.prototype.initEventHandler_ = function()
{
  var elements = this.ui_.getTextFields();
  this.eventHandler_ = new urlbuilder.EventHandler(elements);
};

urlbuilder.Controller.prototype.initUi_ = function()
{
  this.ui_ = new urlbuilder.Ui();
};

/**
 * Composes the url into the url text field from the
 * data contained in the other fields.
 * @param {string} url The input url.
 * @private
 */
urlbuilder.Controller.composeUrl_ = function()
{
  // TODO
};

/**
 * Parses a url and splits it into its components.
 * @param {string} url The input url.
 * @return {urlbuilder.UrlComponents} The elements that compose the url.
 * @private
 */
urlbuilder.Controller.parseUrl_ = function(url)
{
  var regExp = new RegExp(urlbuilder.Controller.UrlRegExp);
  var matches = regExp.exec(url);
  console.log(matches);
};

/**
 * Handles a Url event.
 * @param {urlbuilder.UrlEvent} evt The Url event.
 * @private
 */
urlbuilder.Controller.prototype.onUrlEvent_ = function(evt)
{
  var url = evt.url;
  urlbuilder.Controller.parseUrl_(url);
};

/**
 * Handles the event of field modification.
 * @param {goog.events.Event} evt The event.
 * @private
 */
urlbuilder.Controller.prototype.onFieldEvent_ = function(evt)
{};

/**
 * The event handler instance.
 * @type {urlbuilder.EventHandler}
 * @private
 */
urlbuilder.Controller.prototype.eventHandler_ = null;

/**
 * The regular expression used to parse the url.
 * It divides the url into: scheme, subdomain, domain, port,
 * path, query string and fragment string.
 */
urlbuilder.Controller.UrlRegExp = "(([a-z]*)://)?(([a-z]*)?\.?([a-z]*)?\.?([a-z]*)?\.?([a-z]*)?\.?)";

