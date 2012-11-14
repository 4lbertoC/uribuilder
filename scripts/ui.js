'use strict';

goog.provide('urlbuilder.Ui');
goog.provide('urlbuilder.Ui.FieldName');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.string');

/**
 * Main class for the UrlBuilder User Interface.
 * @constructor
 */
urlbuilder.Ui = function()
{
  var textFields =
    goog.dom.getElementsByClass(urlbuilder.Ui.TEXTFIELD_CLASSNAME);
  this.textFields_ = {};
  goog.array.forEach(textFields, function(element)
  {
    var id = element.id;
    if (goog.string.startsWith(id, urlbuilder.Ui.PREFIX))
    {
      var elementTag =
        goog.string.remove(id, urlbuilder.Ui.PREFIX).toUpperCase();
      this.textFields_[elementTag] = element;
    }
  }, this);
};

/**
 * Return the field elements that compose the UI.
 * @return {Array.<HTMLElement>} The field elements.
 */
urlbuilder.Ui.prototype.getFieldElements = function()
{
  return this.textFields_;
};

/**
 * Return the value of the text fields.
 * @return {Object.<string, string>} The mapping <fieldName, value>.
 */
urlbuilder.Ui.prototype.getFieldValues = function()
{
  var values = goog.object.map(this.textFields_, function(element)
  {
    return element.value;
  }, this);
  return values;
};

/**
 * Reset the value of the fields.
 * @param {boolean} includeUrl Also resets the Url.
 */
urlbuilder.Ui.prototype.resetFieldValues = function(includeUrl)
{
  includeUrl = includeUrl || false;
  goog.object.forEach(this.textFields_, function(element, fieldName)
  {
    if ((fieldName != urlbuilder.Ui.FieldName.URL) || includeUrl)
    {
      element.value = '';
    }
  });
};

/**
 * Set the value in the text fields.
 * @param {Object.<string, string>} values The mapping <fieldName, value>.
 * @param {boolean} resetBefore Resets the value of all the fields before
 *  doing the action.
 */
urlbuilder.Ui.prototype.setFieldValues = function(values, resetBefore)
{
  if (resetBefore)
  {
    this.resetFieldValues();
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
 * Names of the fields that compose the Ui.
 * @enum {string}
 */
urlbuilder.Ui.FieldName = {
  URL: 'URL',
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
urlbuilder.Ui.TEXTFIELD_CLASSNAME = 'textfield';

/**
 * Prefix used in the fields id's.
 * @enum {string}
 */
urlbuilder.Ui.PREFIX = 't_';

/**
 * The text fields
 * @type {Object.<string, HTMLElement>}
 * @private
 */
urlbuilder.Ui.prototype.textFields_ = null;

