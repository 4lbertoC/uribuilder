'use strict';

goog.provide('uribuilder.Controller');
goog.provide('uribuilder.UriComponents');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('uribuilder.EventHandler');
goog.require('uribuilder.Ui');
goog.require('uribuilder.UriEvent');

/** @typedef {{SCHEME: string, DOMAIN: string, PORT: string,
      PATH: string}} */
uribuilder.UriComponents;

/**
 * The controller class.
 * @constructor
 */
uribuilder.Controller = function()
{};

/**
 * Initialize the UI.
 */
uribuilder.Controller.prototype.init = function()
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
uribuilder.Controller.prototype.initActions_ = function()
{
  this.eventHandler_.addEventListener(
    uribuilder.EventHandler.EventType.URI, this.onUriEvent_, false, this);
  this.eventHandler_.addEventListener(
    uribuilder.EventHandler.EventType.FIELD, this.onFieldEvent_, false, this);
};

/**
 * Activates the DOM elements listeners.
 * @private
 */
uribuilder.Controller.prototype.initEventHandler_ = function()
{
  this.eventHandler_ = new uribuilder.EventHandler();
};

/**
 * Initializes the Ui.
 * @private
 */
uribuilder.Controller.prototype.initUi_ = function()
{
  this.ui_ = new uribuilder.Ui();
  var fieldElements = this.ui_.getFieldElements();
  this.eventHandler_.addDomListeners(fieldElements);
};

/**
 * Composes the uri into the uri text field from the
 * data contained in the other fields.
 * @private
 */
uribuilder.Controller.composeUri_ = function()
{
  // TODO
};

/**
 * Parses a uri and splits it into its components.
 * @param {string} uri The input uri.
 * @return {uribuilder.UriComponents} The elements that compose the uri.
 * @private
 */
uribuilder.Controller.prototype.parseUri_ = function(uri)
{
  var regExp = new RegExp(uribuilder.Controller.BaseRegExp);
  var matches = regExp.exec(uri);
  var values = {};
  values[uribuilder.Ui.FieldName.SCHEME] = matches[2];
  values[uribuilder.Ui.FieldName.DOMAIN] = matches[4];
  values[uribuilder.Ui.FieldName.PORT] = matches[6];
  if(matches[8] !== undefined)
  {
    values[uribuilder.Ui.FieldName.PATH] = matches[7];
  }
  values[uribuilder.Ui.FieldName.QUERY] = matches[10];
  values[uribuilder.Ui.FieldName.FRAGMENT] = matches[12];
  return values;
};

/**
 * Handles a Uri event.
 * @param {uribuilder.UriEvent} evt The Uri event.
 * @private
 */
uribuilder.Controller.prototype.onUriEvent_ = function(evt)
{
  var uri = evt.uri;
  var values = this.parseUri_(uri);
  this.ui_.setFieldValues(values, true);
};

/**
 * Handles the event of field modification.
 * @param {goog.events.Event} evt The event.
 * @private
 */
uribuilder.Controller.prototype.onFieldEvent_ = function(evt)
{};

/**
 * The event handler instance.
 * @type {uribuilder.EventHandler}
 * @private
 */
uribuilder.Controller.prototype.eventHandler_ = null;

/**
 * The ui instance.
 * @type {uribuilder.Ui}
 * @private
 */
uribuilder.Controller.prototype.ui_ = null;

/**
 * The regular expression used to divide the uri into:
 * <ul>
 * <li>[2]: scheme</li>
 * <li>[4]: authority</li>
 * <li>[6]: port</li>
 * <li>[8]: path</li>
 * <li>[10]: query</li>
 * </li>[12]: fragment</li>
 *
 */
uribuilder.Controller.BaseRegExp =
  '(([a-z]*):)?(//)?([^\/:\\?#]*)(:([0-9]*))?(/([^?#]+)?)?(\\??([^#]*))?(#?(.*))?';

