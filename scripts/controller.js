
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
  this.initEventHandler_();
  this.initUi_();
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
	urlbuilder.EventHandler.EventType.URL, this.onUrlEvent_, false, this);
  this.eventHandler_.addEventListener(
	urlbuilder.EventHandler.EventType.FIELD, this.onFieldEvent_, false, this);
};

/**
 * Activates the DOM elements listeners.
 * @private
 */
urlbuilder.Controller.prototype.initEventHandler_ = function()
{
  this.eventHandler_ = new urlbuilder.EventHandler();
};

urlbuilder.Controller.prototype.initUi_ = function()
{
  this.ui_ = new urlbuilder.Ui();
  var fieldElements = this.ui_.getFieldElements();
  this.eventHandler_.addDomListeners(fieldElements);
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
urlbuilder.Controller.prototype.parseUrl_ = function(url)
{
  var regExp = new RegExp(urlbuilder.Controller.BaseRegExp);
  var matches = regExp.exec(url);
  var values = {};
  values[urlbuilder.Ui.FieldName.SCHEME] = matches[2];
  values[urlbuilder.Ui.FieldName.DOMAIN] = matches[4];
  values[urlbuilder.Ui.FieldName.PORT] = matches[6];
  values[urlbuilder.Ui.FieldName.PATH] = matches[7];
  this.ui_.setFieldValues(values, true);
};

/**
 * Handles a Url event.
 * @param {urlbuilder.UrlEvent} evt The Url event.
 * @private
 */
urlbuilder.Controller.prototype.onUrlEvent_ = function(evt)
{
  var url = evt.url;
  this.parseUrl_(url);
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
 * The ui instance.
 * @type {urlbuilder.Ui}
 * @private
 */
urlbuilder.Controller.prototype.ui_ = null;

/**
 * The regular expression used to divide the url into:
 * <ul>
 * <li>[2]: scheme</li>
 * <li>[4]: authority</li>
 * <li>[6]: port</li>
 * <li>[8]: path</li>
 * <li>[10]: query</li>
 * </li>[12]: fragment</li>
 *
 */
urlbuilder.Controller.BaseRegExp = "(([a-z]*):)?(//)?([^\/:\\?#]*)(:([0-9]*))?(/([^?#]*)?)?(\\??([^#]*))?(#?(.*))?";

/**
 * The regular expression used to parse the url.
 * It divides the url into: scheme, subdomain, domain, port,
 * path, query string and fragment string.
 */
urlbuilder.Controller.UrlRegExp = "(([a-z]*)://)?(([a-z]*)?\.?([a-z]*)?\.?([a-z]*)?\.?([a-z]*)?\.?)";

