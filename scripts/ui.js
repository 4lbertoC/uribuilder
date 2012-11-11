
goog.provide('urlbuilder.UI');

goog.require('goog.dom');
goog.require('goog.string');

/**
 * Main class for the UrlBuilder UI.
 * @constructor
 * @private
 */
urlbuilder.UI = function()
{};

/**
 * Returns the text field with the given name.
 * @param {!string} fieldName The field name.
 * @return {HTMLElement} The field element.
 */
urlbuilder.UI.getField = function(fieldName)
{
  return goog.dom.getElement(
    goog.string.buildString(urlbuilder.UI.PREFIX, fieldName)
  );
};

urlbuilder.UI.TEXTFIELD_CLASSNAME = 'textfield';

urlbuilder.UI.PREFIX = 't_';
