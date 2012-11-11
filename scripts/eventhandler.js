
goog.provide('urlbuilder.EventHandler');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.string');
goog.require('urlbuilder.UI');

/**
 * Handlers class.
 * @constructor
 */
urlbuilder.EventHandler = function()
{};

/**
 * Activate the listeners on the DOM elements.
 * @param {Array.<HTMLElement>} elements The input elements.
 */
urlbuilder.EventHandler.activateListeners = function(elements)
{
  goog.array.forEach(elements, function(element)
  {
    var id = element['id'];
    if(goog.string.startsWith(id, urlbuilder.UI.PREFIX))
    {
      var elementName = goog.string.remove(id, urlbuilder.UI.PREFIX).toUpperCase();
      goog.object.forEach(urlbuilder.EventHandler[elementName], function(handler, eventName)
      {
        goog.events.listen(element, eventName, handler);
      });
    }
  });
};

/**
 * Handlers for the URL text field.
 */
urlbuilder.EventHandler.URL = {
  'input': function(evt) {
    
  }
};

/**
 * Handlers for the scheme text field.
 */
urlbuilder.EventHandler.SCHEME = {
  'input': function(evt) {
    urlbuilder.EventHandler.defaultInput(evt);
  }
};

/**
 * Handlers for the domain text field.
 */
urlbuilder.EventHandler.DOMAIN = {
  'input': function(evt) {
    urlbuilder.EventHandler.defaultInput(evt);
  }
};

/**
 * Handlers for the port text field.
 */
urlbuilder.EventHandler.PORT = {
  'input': function(evt) {
    urlbuilder.EventHandler.defaultInput(evt);
  }
};

/**
 * Handlers for the path text field.
 */
urlbuilder.EventHandler.PATH = {
  'input': function(evt) {
    urlbuilder.EventHandler.defaultInput(evt);
  }
};

/**
 * Default input behavior for a text field.
 * @param {Event} evt The event object.
 */
urlbuilder.EventHandler.defaultInput = function(evt)
{
  
};

