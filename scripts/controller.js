'use strict';

goog.provide('uribuilder.Controller');
goog.provide('uribuilder.UriComponents');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('uribuilder.EventHandler');
goog.require('uribuilder.Ui');
goog.require('uribuilder.Uri');
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
 * Composes the uri into the uri text field from the
 * data contained in the other fields.
 * @private
 */
uribuilder.Controller.composeUri_ = function()
{
  // TODO
};

/**
 * Initialize the UI.
 */
uribuilder.Controller.prototype.init = function()
{
  this.initEventHandler_();
  this.initUi_();
  this.initActions_();
  this.uri_ = new uribuilder.Uri();
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
 * Handle a Uri event.
 * @param {uribuilder.UriEvent} evt The Uri event.
 * @private
 */
uribuilder.Controller.prototype.onUriEvent_ = function(evt)
{
  this.processUri_(evt.uri);
};

/**
 * Handle the event of field modification.
 * @param {goog.events.Event} evt The event.
 * @private
 */
uribuilder.Controller.prototype.onFieldEvent_ = function(evt)
{};

/**
 * Set the Uri to the given string and send the components
 * to the view.
 * @param {string} uri The given Uri.
 */
uribuilder.Controller.prototype.processUri_ = function(uri)
{
  this.uri_.setUri(uri);
  var values = {};
  var hidden = {};
  values[uribuilder.Ui.FieldName.SCHEME] = this.uri_.getScheme();
  values[uribuilder.Ui.FieldName.DOMAIN] = this.uri_.getDomain();
  values[uribuilder.Ui.FieldName.PORT] = this.uri_.getPort();
  values[uribuilder.Ui.FieldName.PATH] = this.uri_.getPath();
  values[uribuilder.Ui.FieldName.QUERY] = this.uri_.getQuery();
  values[uribuilder.Ui.FieldName.FRAGMENT] = this.uri_.getFragment();
  hidden[uribuilder.Ui.HiddenElementName.DOUBLESLASH] = this.uri_.hasDoubleSlash();
  this.ui_.setFieldValues(values, true);
  this.ui_.setHiddenElements(hidden);
};

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
 * The current Uri.
 * @type {uribuilder.Uri}
 */
uribuilder.Controller.prototype.uri_ = null;