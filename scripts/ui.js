
goog.provide('urlbuilder.Ui');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.string');

/**
 * Main class for the UrlBuilder User Interface.
 * @constructor
 * @private
 */
urlbuilder.Ui = function()
{
  var textFields = goog.dom.getElementsByClass(urlbuilder.Ui.TEXTFIELD_CLASSNAME);
  this.textFields_ = {};
  goog.array.forEach(textFields, function(element)
  {
    var id = element.id;
    if(goog.string.startsWith(id, urlbuilder.Ui.PREFIX))
    {
      var elementTag = goog.string.remove(id, urlbuilder.Ui.PREFIX).toUpperCase();
      this.textFields_[elementTag] = element;
    }
  }, this);
};

urlbuilder.Ui.prototype.getTextFields = function()
{
 return this.textFields_;
};

urlbuilder.Ui.TEXTFIELD_CLASSNAME = 'textfield';

urlbuilder.Ui.PREFIX = 't_';

/**
 * The text fields
 * @type {Object.<string, HTMLElement>}
 */
urlbuilder.Ui.prototype.textFields_ = null;

