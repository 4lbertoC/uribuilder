'use strict';

goog.provide('uribuilder.HandlerFactory');

goog.require('goog.object');

/**
 * An event handler factory.
 * @constructor
 */
uribuilder.HandlerFactory = function()
{
  this.templateHandlers_ = {
    'URI': {
      'input': function(evt) {
        this.onUriInput_(evt);
      }
    },
    'DOUBLESLASH': {
      'click': function(evt) {
        this.onToggleClick_(evt);
      }
    }
  };
};

/**
 * Checks if the factory contains a template handler of the
 * given type for the given name.
 * @param {string} templateName The name of the template.
 * @param {string} eventType The type of the event.
 * @return {boolean} Whether the factory contains the template
 *  handler.
 */
uribuilder.HandlerFactory.prototype.contains = function(templateName, eventType)
{
  return (
    goog.object.containsKey(this.templateHandlers_, templateName) &&
    goog.object.containsKey(this.templateHandlers_[templateName], eventType)
  );
};

/**
 * Checks if the factory contains a template handler with the
 * given name.
 * @param {string} templateName The name of the template.
 * @return {boolean} Whether the factory contains the template
 *  handler.
 */
uribuilder.HandlerFactory.prototype.containsName = function(templateName)
{
  return goog.object.containsKey(this.templateHandlers_, templateName);
};

/**
 * Returns the handlers for a given templateName.
 * @param {string} templateName The name of the template for which
 *  to receive the map of template handlers.
 * @return {Object.<function>} The map of handlers.
 */
uribuilder.HandlerFactory.prototype.getHandlerMap = function(templateName)
{
  return this.templateHandlers_[templateName];
};

/**
 * Returns a specific handler with a given context.
 * @param {string} templateName The name of the template.
 * @param {string} eventType The type of the event.
 * @param {*} context The 'this' of the handler.
 * @return {function} The handler with the given context.
 */
uribuilder.HandlerFactory.prototype.getHandlerWithContext =
function(templateName, eventType, context)
{
  if (this.contains(templateName, eventType))
  {
    return goog.bind(
      this.templateHandlers_[templateName][eventType], context);
  }
};

/**
 * Returns the instance of the factory.
 * @return {uribuilder.HandlerFactory} The factory instance.
 */
uribuilder.HandlerFactory.getInstance = function()
{
  if (uribuilder.HandlerFactory.instance_ == null)
  {
    uribuilder.HandlerFactory.instance_ = new uribuilder.HandlerFactory();
  }
  return uribuilder.HandlerFactory.instance_;
};

/**
 * The handler factory instance.
 * @private
 */
uribuilder.HandlerFactory.instance_ = null;

/**
 * Handlers for the URI text field.
 * @export
 */
uribuilder.HandlerFactory.templateHandlers_;

