'use strict';

goog.provide('uribuilder.Ui');
goog.provide('uribuilder.Ui.FieldName');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.string');

/**
 * Main class for the URIBuilder User Interface.
 * @constructor
 */
uribuilder.Ui = function()
{
  var textFields =
    goog.dom.getElementsByClass(uribuilder.Ui.TEXTFIELD_CLASSNAME);
  var toggleElements =
    goog.dom.getElementsByClass(uribuilder.Ui.TOGGLE_CLASSNAME);
  this.textFields_ = {};
  this.toggleElements_ = {};
  goog.array.forEach(textFields, function(element)
  {
    var id = element.id;
    if (goog.string.startsWith(id, uribuilder.Ui.PREFIX))
    {
      var elementTag =
        goog.string.remove(id, uribuilder.Ui.PREFIX).toUpperCase();
      this.textFields_[elementTag] = element;
    }
  }, this);
  goog.array.forEach(toggleElements, function(element)
  {
    var id = element.id;
    if (goog.string.startsWith(id, uribuilder.Ui.PREFIX))
    {
      var elementTag =
        goog.string.remove(id, uribuilder.Ui.PREFIX).toUpperCase();
      this.toggleElements_[elementTag] = element;
      goog.events.listen(element, 'click', function()
      {
        goog.dom.classes.toggle(element, uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
      }, this);
    }
  }, this);
};

/**
 * Return the field elements that compose the UI.
 * @return {Array.<HTMLElement>} The field elements.
 */
uribuilder.Ui.prototype.getFieldElements = function()
{
  return this.textFields_;
};

/**
 * Return the value of the text fields.
 * @return {Object.<string, string>} The mapping <fieldName, value>.
 */
uribuilder.Ui.prototype.getFieldValues = function()
{
  var values = goog.object.map(this.textFields_, function(element)
  {
    return element.value;
  }, this);
  return values;
};

/**
 * Return the toggle elements.
 * @return {Array.<HTMLElement>} The toggle elements.
 */
uribuilder.Ui.prototype.getToggleElements = function()
{
  return this.toggleElements_;
};

/**
 * Return the value of the toggle elements.
 * @return {Object.<string, boolean>} The mapping <fieldName, value>.
 */
uribuilder.Ui.prototype.getToggleValues = function()
{
  var values = goog.object.map(this.toggleElements_, function(element)
  {
    return !goog.dom.classes.has(element, uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
  }, this);
  return values;
};

/**
 * Reset the value of the fields.
 * @param {boolean} includeUri Also resets the Uri.
 */
uribuilder.Ui.prototype.resetFieldValues = function(includeUri)
{
  includeUri = includeUri || false;
  goog.object.forEach(this.textFields_, function(element, fieldName)
  {
    if ((fieldName != uribuilder.Ui.FieldName.URI) || includeUri)
    {
      element.value = '';
    }
  });
};

/**
 * Reset the elements that are untoggled by default.
 */
uribuilder.Ui.prototype.resetToggleElements = function()
{
  goog.object.forEach(this.toggleElements_, function(element, fieldName)
  {
    if(element.getAttribute('data-default-state') === 'on')
    {
      goog.dom.classes.remove(element, uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
    }
    else
    {
      goog.dom.classes.add(element, uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
    }
  });
};

/**
 * Set the value in the text fields.
 * @param {Object.<string, string>} values The mapping <fieldName, value>.
 * @param {boolean} resetBefore Resets the value of all the fields before
 *  doing the action.
 */
uribuilder.Ui.prototype.setFieldValues = function(values, resetBefore)
{
  if (resetBefore)
  {
    this.resetFieldValues();
    this.resetToggleElements();
  }
  goog.object.forEach(values, function(value, fieldName)
  {
    if (goog.isDef(value) &&
        goog.object.containsKey(this.textFields_, fieldName))
    {
      this.textFields_[fieldName].value = value;
    }
  }, this);
};

/**
 * Set whether to enable the toggle elements.
 * @param {Object.<string, boolean>} toggles The map of the elements.
 */
uribuilder.Ui.prototype.setToggleElements = function(toggles)
{
  goog.object.forEach(toggles, function(toggle, fieldName)
  {
    if (goog.object.containsKey(this.toggleElements_, fieldName))
    {
      if (toggle)
      {
        goog.dom.classes.remove(this.toggleElements_[fieldName],
          uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
      }
      else
      {
        goog.dom.classes.add(this.toggleElements_[fieldName],
          uribuilder.Ui.TOGGLE_OFF_CLASSNAME);
      }
    }
  }, this);
};

/**
 * Names of the fields that compose the Ui.
 * @enum {string}
 */
uribuilder.Ui.FieldName = {
  URI: 'URI',
  SCHEME: 'SCHEME',
  SUBDOMAIN: 'SUBDOMAIN',
  DOMAIN: 'DOMAIN',
  PORT: 'PORT',
  PATH: 'PATH',
  QUERY: 'QUERY',
  FRAGMENT: 'FRAGMENT'
};

/**
 * Names of the toggle elements.
 * @enum {string}
 */
uribuilder.Ui.ToggleName = {
  DOUBLESLASH: 'DOUBLESLASH'
};

/**
 * Prefix used in the fields id's.
 * @enum {string}
 */
uribuilder.Ui.PREFIX = 't_';

/**
 * Class used by the text fields.
 * @type {string}
 */
uribuilder.Ui.TEXTFIELD_CLASSNAME = goog.getCssName('textfield');

/**
 * Class used by the toggle elements.
 * @type {string}
 */
uribuilder.Ui.TOGGLE_CLASSNAME = goog.getCssName('toggle');

/**
 * Class used when the toggles are active.
 * @type {string}
 */
uribuilder.Ui.TOGGLE_OFF_CLASSNAME = goog.getCssName('off');

/**
 * The text fields.
 * @type {Object.<string, HTMLElement>}
 * @private
 */
uribuilder.Ui.prototype.textFields_ = null;

/**
 * The toggle elements.
 * @type {Object.<string, HTMLElement>}
 * @private
 */
uribuilder.Ui.prototype.toggleElements_ = null;

