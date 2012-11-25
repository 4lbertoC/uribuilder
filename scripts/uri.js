'use strict';

goog.provide('uribuilder.Uri');

/**
 * The class that represents a Uri.
 * @param {string} opt_uri The string to parse into a Uri.
 * @constructor
 */
uribuilder.Uri = function(uri)
{
  this.setUri(uri);
};

/**
 * Parse a the raw Uri and split it into its components.
 * @param {string} uri The input uri.
 * @private
 */
uribuilder.Uri.prototype.createComponents_ = function(uri)
{
  var regExp = new RegExp(uribuilder.Uri.BaseRegExp_);
  var matches = regExp.exec(uri);
  this.scheme_ = matches[2];
  if(matches[3] !== undefined)
  {
    this.doubleSlash_ = true;
  }
  this.domain_ = matches[4];
  this.port_ = matches[6];
  if(matches[8] !== undefined)
  {
    this.path_ = matches[7];
  }
  this.query_ = matches[10];
  this.fragment_ = matches[12];
};

/**
 * Give the domain of the Uri.
 * @return {string} The domain of the Uri.
 */
uribuilder.Uri.prototype.getDomain = function()
{
  return this.domain_;
};

/**
 * Give the fragment of the Uri.
 * @return {string} The fragment of the Uri.
 */
uribuilder.Uri.prototype.getFragment = function()
{
  return this.fragment_;
};

/**
 * Give the path of the Uri.
 * @return {string} The path of the Uri.
 */
uribuilder.Uri.prototype.getPath = function()
{
  return this.path_;
};

/**
 * Give the port of the Uri.
 * @return {string} The port of the Uri.
 */
uribuilder.Uri.prototype.getPort = function()
{
  return this.port_;
};

/**
 * Give the query of the Uri.
 * @return {string} The query of the Uri.
 */
uribuilder.Uri.prototype.getQuery = function()
{
  return this.query_;
};

/**
 * Give the scheme of the Uri.
 * @return {string} The scheme of the Uri.
 */
uribuilder.Uri.prototype.getScheme = function()
{
  return this.scheme_;
};

/**
 * Tell whether the Uri has a double slash after the scheme.
 * @return {boolean} If there is a double slash.
 */
uribuilder.Uri.prototype.hasDoubleSlash = function()
{
  return this.doubleSlash_;
};

/**
 * Reset the inner fields of the Uri object.
 * @private
 */
uribuilder.Uri.prototype.reset_ = function()
{
  this.rawUri_ = undefined;
  this.scheme_ = undefined;
  this.doubleSlash_ = undefined;
  this.domain_ = undefined;
  this.port_ = undefined;
  this.path_ = undefined;
  this.query_ = undefined;
  this.fragment_ = undefined;
};

/**
 * Set the uri from the given string.
 * @param {string} uri The uri from which to create the Uri object.
 */
uribuilder.Uri.prototype.setUri = function(uri)
{
  if(goog.isString(uri))
  {
    this.reset_();
    this.rawUri_ = uri;
    this.createComponents_(uri);
  }
};

/**
 * Give the Uri object in string format.
 * @return {string} The string version of the Uri.
 */
uribuilder.Uri.prototype.toString = function()
{
  return this.rawUri_;
};

/**
 * The domain of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.domain_ = undefined;

/**
 * The fragment of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.fragment_ = undefined;

/**
 * Whether the Uri has a double slash after the scheme.
 * @type {boolean}
 * @private
 */
uribuilder.Uri.prototype.doubleSlash_ = undefined;

/**
 * The path of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.path_ = undefined;

/**
 * The port of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.port_ = undefined;

/**
 * The query of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.query_ = undefined;

/**
 * The string from which the Uri is composed.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.rawUri_ = undefined;

/**
 * The scheme of the Uri.
 * @type {string}
 * @private
 */
uribuilder.Uri.prototype.scheme_ = undefined;

/**
 * The regular expression used to divide the uri into:
 * <ul>
 * <li>[2]: scheme</li>
 * <li>[4]: authority</li>
 * <li>[6]: port</li>
 * <li>[8]: path</li>
 * <li>[10]: query</li>
 * </li>[12]: fragment</li>
 * @type {string}
 * @private
 */
uribuilder.Uri.BaseRegExp_ =
  '(([^#\/\?@]*):)?(//)?([^\/:\\?#]*)(:([0-9]*))?(/([^\?#:]+)?)?(\\??([^#\?@]*))?(#?([^#]*))?';
