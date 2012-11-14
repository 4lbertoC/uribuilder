'use strict';

goog.provide('urlbuilder.HandlerFactory');

goog.require('goog.object');

/**
 * An event handler factory.
 * @constructor
 * @private
 */
urlbuilder.HandlerFactory = function()
{
  this.templateHandlers_ = {
    URL: {
      'input': function(evt) {
        this.onUrlInput_(evt);
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
urlbuilder.HandlerFactory.prototype.contains = function(templateName, eventType)
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
urlbuilder.HandlerFactory.prototype.containsName = function(templateName)
{
  return goog.object.containsKey(this.templateHandlers_, templateName);
};

/**
 * Returns the handlers for a given templateName.
 * @param {string} templateName The name of the template for which
 *  to receive the map of template handlers.
 * @return {Object.<function>} The map of handlers.
 */
urlbuilder.HandlerFactory.prototype.getHandlerMap = function(templateName)
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
urlbuilder.HandlerFactory.prototype.getHandlerWithContext =
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
 * @return {urlbuilder.HandlerFactory} The factory instance.
 */
urlbuilder.HandlerFactory.getInstance = function()
{
  if (urlbuilder.HandlerFactory.instance_ == null)
  {
    urlbuilder.HandlerFactory.instance_ = new urlbuilder.HandlerFactory();
  }
  return urlbuilder.HandlerFactory.instance_;
};

/**
 * The handler factory instance.
 * @private
 */
urlbuilder.HandlerFactory.instance_ = null;

/**
 * Handlers for the URL text field.
 * @export
 */
urlbuilder.HandlerFactory.templateHandlers_;

