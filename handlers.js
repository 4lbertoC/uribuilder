
goog.provide('urlbuilder.Handlers');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.string');
goog.require('urlbuilder.UI');

/**
 * Handlers class.
 * @constructor
 */
urlbuilder.Handlers = function()
{};

urlbuilder.Handlers.activateListeners = function(elements)
{
  goog.array.forEach(elements, function(element)
  {
    var id = element['id'];
    if(goog.string.startsWith(id, urlbuilder.UI.PREFIX))
    {
      var elementName = goog.string.remove(id, urlbuilder.UI.PREFIX).toUpperCase();
      goog.object.forEach(urlbuilder.Handlers[elementName], function(handler, eventName)
      {
        goog.events.listen(element, eventName, handler);
      });
    }
  });
};

/**
 * Handlers for the URL text field.
 */
urlbuilder.Handlers.URL = {
  'input': function(evt) {}
};

/**
 * Handlers for the scheme text field.
 */
urlbuilder.Handlers.SCHEME = {
  'input': function(evt) {
    urlbuilder.Handlers.defaultInput(evt);
  }
};

/**
 * Handlers for the domain text field.
 */
urlbuilder.Handlers.DOMAIN = {
  'input': function(evt) {
    urlbuilder.Handlers.defaultInput(evt);
  }
};

/**
 * Handlers for the port text field.
 */
urlbuilder.Handlers.PORT = {
  'input': function(evt) {
    urlbuilder.Handlers.defaultInput(evt);
  }
};

/**
 * Handlers for the path text field.
 */
urlbuilder.Handlers.PATH = {
  'input': function(evt) {
    urlbuilder.Handlers.defaultInput(evt);
  }
};

/**
 * Default input behavior for a text field.
 * @param {Event} evt The event object.
 */
urlbuilder.Handlers.defaultInput = function(evt)
{
  
};

