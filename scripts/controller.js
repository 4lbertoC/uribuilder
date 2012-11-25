'use strict';

goog.provide('uribuilder.Controller');
goog.provide('uribuilder.UriComponents');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.object');
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
uribuilder.Controller.prototype.composeUri_ = function()
{
  var fieldValues = this.ui_.getFieldValues();
  var toggleValues = this.ui_.getToggleValues();
  this.uri_.setScheme(fieldValues[uribuilder.Ui.FieldName.SCHEME]);
  this.uri_.setDomain(fieldValues[uribuilder.Ui.FieldName.DOMAIN]);
  this.uri_.setPort(fieldValues[uribuilder.Ui.FieldName.PORT]);
  this.uri_.setPath(fieldValues[uribuilder.Ui.FieldName.PATH]);
  this.uri_.setQuery(fieldValues[uribuilder.Ui.FieldName.QUERY]);
  this.uri_.setFragment(fieldValues[uribuilder.Ui.FieldName.FRAGMENT]);
  this.uri_.setDoubleSlash(toggleValues[uribuilder.Ui.ToggleName.DOUBLESLASH]);
  var values = {};
  values[uribuilder.Ui.FieldName.URI] = this.uri_.toString();
  this.ui_.setFieldValues(values, false);
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
  this.eventHandler_.addEventListener(
    uribuilder.EventHandler.EventType.TOGGLE, this.onToggleEvent_, false, this);
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
  var allElements = this.ui_.getFieldElements();
  var toggleElements = this.ui_.getToggleElements();
  goog.object.extend(allElements, toggleElements);
  this.eventHandler_.addDomListeners(allElements);
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
{
  this.composeUri_();
};

/**
 * Handle the event of toggle click.
 * @param {goog.events.Event} evt The event.
 * @private
 */
uribuilder.Controller.prototype.onToggleEvent_ = function(evt)
{
  this.composeUri_();
};

/**
 * Set the Uri to the given string and send the components
 * to the view.
 * @param {string} uri The given Uri.
 * @private
 */
uribuilder.Controller.prototype.processUri_ = function(uri)
{
  this.uri_.setUri(uri);
  var values = {};
  var toggle = {};
  values[uribuilder.Ui.FieldName.SCHEME] = this.uri_.getScheme();
  values[uribuilder.Ui.FieldName.DOMAIN] = this.uri_.getDomain();
  values[uribuilder.Ui.FieldName.PORT] = this.uri_.getPort();
  values[uribuilder.Ui.FieldName.PATH] = this.uri_.getPath();
  values[uribuilder.Ui.FieldName.QUERY] = this.uri_.getQuery();
  values[uribuilder.Ui.FieldName.FRAGMENT] = this.uri_.getFragment();
  toggle[uribuilder.Ui.ToggleName.DOUBLESLASH] = this.uri_.hasDoubleSlash();
  this.ui_.setFieldValues(values, true);
  this.ui_.setToggleElements(toggle);
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
 * @private
 */
uribuilder.Controller.prototype.uri_ = null;
