'use strict';

goog.provide('uribuilder.Ui');
goog.provide('uribuilder.Ui.FieldName');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.string');

/**
 * Main class for the URIBuilder User Interface.
 * @constructor
 */
uribuilder.Ui = function()
{
  var textFields =
    goog.dom.getElementsByClass(uribuilder.Ui.TEXTFIELD_CLASSNAME);
  var toggles =
    goog.dom.getElementsByClass(uribuilder.Ui.TOGGLE_CLASSNAME);
  this.textFields_ = {};
  this.toggles_ = {};
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
  goog.array.forEach(toggles, function(element)
  {
    var id = element.id;
    if (goog.string.startsWith(id, uribuilder.Ui.PREFIX))
    {
      var elementTag =
        goog.string.remove(id, uribuilder.Ui.PREFIX).toUpperCase();
      this.toggles_[elementTag] = element;
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
uribuilder.Ui.prototype.resetToggles = function()
{
  goog.object.forEach(this.toggles_, function(element, fieldName)
  {
    goog.dom.classes.add(element, 'toggle');
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
    this.resetToggles();
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
 * @param {Object.<string, boolean>} The map of the elements.
 */
uribuilder.Ui.prototype.setToggles = function(toggle)
{
  goog.object.forEach(toggle, function(value, fieldName)
  {
    if (goog.object.containsKey(this.toggles_, fieldName))
    {
      if(value)
      {
        goog.dom.classes.remove(this.toggles_[fieldName],
          uribuilder.Ui.TOGGLE_CLASSNAME);
      }
      else
      {
        goog.dom.classes.add(this.toggles_[fieldName],
          uribuilder.Ui.TOGGLE_CLASSNAME);
      }
    }
  }, this);
};

/**
 * Names of the toggle elements.
 * @enum {string}
 */
uribuilder.Ui.ToggleName = {
  DOUBLESLASH: 'DOUBLESLASH'
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
 * Prefix used in the fields id's.
 * @enum {string}
 */
uribuilder.Ui.PREFIX = 't_';

/**
 * The text fields
 * @type {Object.<string, HTMLElement>}
 * @private
 */
uribuilder.Ui.prototype.textFields_ = null;

