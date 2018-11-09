/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/www/static/weather_main/dist/bundles/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/productStyles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js?!./src/stylesheets/productStyles.sass":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js??ref--1-2!./src/stylesheets/productStyles.sass ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".bc-sunny {\\n  background-color: #c1f2f2; }\\n\\n.gr-sunny {\\n  background: #c1f2f2;\\n  background: -moz-linear-gradient(180deg, #c1f2f2 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #c1f2f2 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #c1f2f2 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$sunny-blue,endColorstr=$light,GradientType=1); }\\n\\n.bc-night {\\n  background-color: #9fa5e0; }\\n\\n.gr-night {\\n  background: #9fa5e0;\\n  background: -moz-linear-gradient(180deg, #9fa5e0 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #9fa5e0 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #9fa5e0 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$night-blue,endColorstr=$light,GradientType=1); }\\n\\n.bc-cloudy {\\n  background-color: #bcc6c6; }\\n\\n.gr-cloudy {\\n  background: #bcc6c6;\\n  background: -moz-linear-gradient(180deg, #bcc6c6 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #bcc6c6 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #bcc6c6 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$cloudy-grey,endColorstr=$light,GradientType=1); }\\n\\n.bc-fog {\\n  background-color: #dee2e2; }\\n\\n.gr-fog {\\n  background: #dee2e2;\\n  background: -moz-linear-gradient(180deg, #dee2e2 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #dee2e2 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #dee2e2 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$fog-grey,endColorstr=$light,GradientType=1); }\\n\\n.bc-partly-cloudy-day {\\n  background-color: #ddffff; }\\n\\n.gr-partly-cloudy-day {\\n  background: #ddffff;\\n  background: -moz-linear-gradient(180deg, #ddffff 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #ddffff 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #ddffff 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$partly-cloudy-day-blue,endColorstr=$light,GradientType=1); }\\n\\n.bc-partly-cloudy-night {\\n  background-color: #babdd8; }\\n\\n.gr-partly-cloudy-night {\\n  background: #babdd8;\\n  background: -moz-linear-gradient(180deg, #babdd8 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #babdd8 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #babdd8 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$partly-cloudy-night-blue,endColorstr=$light,GradientType=1); }\\n\\n.bc-rain {\\n  background-color: #a0a0a0; }\\n\\n.gr-rain {\\n  background: #a0a0a0;\\n  background: -moz-linear-gradient(180deg, #a0a0a0 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #a0a0a0 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #a0a0a0 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$rain-grey,endColorstr=$light,GradientType=1); }\\n\\n.bc-sleet {\\n  background-color: #dae5e5; }\\n\\n.gr-sleet {\\n  background: #dae5e5;\\n  background: -moz-linear-gradient(180deg, #dae5e5 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #dae5e5 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #dae5e5 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$sleet-grey,endColorstr=$light,GradientType=1); }\\n\\n.bc-snow {\\n  background-color: #e8f9f9; }\\n\\n.gr-snow {\\n  background: #e8f9f9;\\n  background: -moz-linear-gradient(180deg, #e8f9f9 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #e8f9f9 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #e8f9f9 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$snow-blue,endColorstr=$light,GradientType=1); }\\n\\n.bc-wind {\\n  background-color: #cedddd; }\\n\\n.gr-wind {\\n  background: #cedddd;\\n  background: -moz-linear-gradient(180deg, #cedddd 0%, #FFFFFF 100%);\\n  background: -webkit-linear-gradient(180deg, #cedddd 0%, #FFFFFF 100%);\\n  background: linear-gradient(180deg, #cedddd 0%, #FFFFFF 100%);\\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$wind-blue,endColorstr=$light,GradientType=1); }\\n\\n.c-secondary {\\n  color: #2f3f3f; }\\n\\n.c-pro-red, .c-pro-red:hover {\\n  color: #E50909; }\\n\\n.bc-light {\\n  background-color: #FFFFFF; }\\n\\n.bc-light-accent {\\n  background-color: rgba(227, 237, 237, 0.8); }\\n\\nbody * {\\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Roboto, 'Segoe UI', Arial, sans-serif;\\n  color: #071013;\\n  font-weight: 400;\\n  font-size: 16px; }\\n\\n.fs-medium {\\n  font-size: 16px; }\\n\\n.fs-small {\\n  font-size: 12px; }\\n\\n.fs-moderate {\\n  font-size: 21px; }\\n\\n.fs-large {\\n  font-size: 28px; }\\n\\n.fs-xl {\\n  font-size: 38px; }\\n\\n.fs-xxl {\\n  font-size: 50px; }\\n\\n.fw-light {\\n  font-weight: 300; }\\n\\n.fw-reg {\\n  font-weight: 400; }\\n\\n.fw-semi, b {\\n  font-weight: 500; }\\n\\n.fw-bold {\\n  font-weight: 700; }\\n\\n.animated {\\n  -webkit-animation-duration: 380ms;\\n  animation-duration: 380ms;\\n  -webkit-animation-fill-mode: both;\\n  animation-fill-mode: both; }\\n\\n@-webkit-keyframes fadeIn {\\n  from {\\n    opacity: 0; }\\n  to {\\n    opacity: 1; } }\\n\\n@keyframes fadeIn {\\n  from {\\n    opacity: 0; }\\n  to {\\n    opacity: 1; } }\\n\\n.fadeIn {\\n  -webkit-animation-name: fadeIn;\\n  animation-name: fadeIn; }\\n\\n@-webkit-keyframes fadeInUp {\\n  from {\\n    opacity: 0;\\n    -webkit-transform: translate3d(0, 100%, 0);\\n    transform: translate3d(0, 100%, 0); }\\n  to {\\n    opacity: 1;\\n    -webkit-transform: translate3d(0, 0, 0);\\n    transform: translate3d(0, 0, 0); } }\\n\\n@keyframes fadeInUp {\\n  from {\\n    opacity: 0;\\n    -webkit-transform: translate3d(0, 100%, 0);\\n    transform: translate3d(0, 100%, 0); }\\n  to {\\n    opacity: 1;\\n    -webkit-transform: translate3d(0, 0, 0);\\n    transform: translate3d(0, 0, 0); } }\\n\\n.fadeInUp {\\n  -webkit-animation-name: fadeInUp;\\n  animation-name: fadeInUp; }\\n\\nhtml, body {\\n  height: 100%; }\\n\\nbody {\\n  background-color: #FFFFFF;\\n  z-index: 0; }\\n\\n.row {\\n  margin: 0; }\\n\\nh1, h2, h3, h4, h5, h6 {\\n  margin: 0; }\\n\\n.btn {\\n  border-radius: 9px; }\\n\\n.btn-close {\\n  border: none;\\n  background-color: rgba(0, 0, 0, 0);\\n  position: absolute; }\\n  .btn-close img {\\n    max-width: 1em; }\\n\\nfooter {\\n  margin-top: 158.02469px; }\\n\\nfooter > .row {\\n  padding: 15.82031px;\\n  position: relative; }\\n  @media (min-width: 992px) {\\n    footer > .row {\\n      padding: 37.5px; } }\\n\\n.footer-right * {\\n  display: flex;\\n  justify-content: flex-end; }\\n\\ndetails {\\n  margin-bottom: 11.86523px; }\\n\\nsummary:focus {\\n  outline: none; }\\n\\n.footer-link {\\n  padding-left: 8.89893px; }\\n\\nnav.navbar {\\n  padding: 0;\\n  padding-bottom: 1px; }\\n  @media (min-width: 992px) {\\n    nav.navbar {\\n      padding-top: 0;\\n      padding-left: 8.89893px;\\n      padding-right: 8.89893px; } }\\n  nav.navbar img {\\n    max-width: 1.2em; }\\n\\n.nav-wrapper {\\n  width: 100%;\\n  margin: 0; }\\n\\n.navbar-brand {\\n  min-width: 75%;\\n  margin: auto 0;\\n  display: flex;\\n  align-items: center; }\\n  @media (min-width: 992px) {\\n    .navbar-brand {\\n      min-width: 0; } }\\n  .navbar-brand h1 {\\n    display: inline-block;\\n    line-height: 21px; }\\n  .navbar-brand .nav-logo {\\n    max-width: 28px;\\n    position: relative;\\n    margin-right: 5px; }\\n    @media (min-width: 768px) {\\n      .navbar-brand .nav-logo {\\n        margin-left: 5px; } }\\n    @media (min-width: 992px) {\\n      .navbar-brand .nav-logo {\\n        margin-left: 0; } }\\n\\n.navbar-brand:hover {\\n  cursor: pointer; }\\n\\n.collapse.active:not(.show) {\\n  display: block; }\\n\\n.navbar-collapse {\\n  float: right;\\n  padding: 0;\\n  max-height: 0;\\n  display: block;\\n  transition: max-height 180ms ease-in, padding 180ms ease-in;\\n  -webkit-transition: max-height 180ms ease-in, padding 180ms ease-in;\\n  -ms-transition: max-height 180ms ease-in, padding 180ms ease-in; }\\n  @media (min-width: 992px) {\\n    .navbar-collapse {\\n      height: auto;\\n      max-height: 5em;\\n      padding: 0; } }\\n\\n.navbar-collapse.active {\\n  padding: 8.89893px 0;\\n  max-height: 30em; }\\n\\n.navbar-nav {\\n  position: relative; }\\n\\n.nav-item {\\n  padding: 8.89893px;\\n  margin-left: 15.82031px;\\n  margin-top: auto;\\n  margin-bottom: auto; }\\n\\n.nav-item:hover {\\n  cursor: pointer; }\\n\\n.toggle-active {\\n  text-decoration: underline; }\\n\\n.navbar-toggler {\\n  padding-right: 28.125px;\\n  display: flex;\\n  align-items: center; }\\n  @media (min-width: 992px) {\\n    .navbar-toggler {\\n      display: none; } }\\n\\n.icon-menu {\\n  max-width: 21.09375px; }\\n\\n.nav-link:hover {\\n  color: inherit; }\\n\\n.nav-link.c-pro-red:hover {\\n  color: #E50909; }\\n\\n.terms {\\n  padding: 88.88889px 50px 0 50px; }\\n  .terms p:not(.intro) {\\n    padding: 0 21.09375px; }\\n  .terms li {\\n    list-style-type: none;\\n    padding-left: 15.82031px; }\\n\\n.footer-badges {\\n  display: flex;\\n  align-items: center;\\n  border-top: 1px solid #bcc6c6; }\\n\\n.badge-img {\\n  max-width: 158.02469px;\\n  padding: 0 21.09375px; }\\n\\n.sign-up-title {\\n  margin-bottom: 50px; }\\n  @media (min-width: 768px) {\\n    .sign-up-title {\\n      margin-bottom: 66.66667px; } }\\n\\n.promo-product-inner {\\n  margin-top: 50px;\\n  margin-bottom: 50px; }\\n\\n.product-intro {\\n  padding-top: 21.09375px; }\\n\\n.product-intro-header {\\n  margin: 21.09375px auto;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n\\n.prouduct-intro-icon {\\n  max-width: 3em;\\n  padding: 0 5px 5px 5px; }\\n\\n.product-intro-para {\\n  margin: 0 21.09375px; }\\n  @media (min-width: 768px) {\\n    .product-intro-para {\\n      margin: 0 88.88889px; } }\\n  @media (min-width: 992px) {\\n    .product-intro-para {\\n      margin: 0 280.93278px; } }\\n\\n.list-group-flush {\\n  padding: 0; }\\n  .list-group-flush li {\\n    background-color: #cedddd; }\\n\\na:hover {\\n  text-decoration: none; }\\n\\n.btn-blue {\\n  color: #18a6bc;\\n  border-color: #18a6bc;\\n  padding-left: 21.09375px;\\n  padding-right: 21.09375px; }\\n\\n.btn-blue:hover {\\n  color: #7EC4CF;\\n  border-color: #7EC4CF; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/stylesheets/productStyles.sass?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js??ref--1-2");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/*!**************************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/addStylesClient.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addStylesClient; });\n/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ \"./node_modules/vue-style-loader/lib/listToStyles.js\");\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n  Modified by Evan You @yyx990803\n*/\n\n\n\nvar hasDocument = typeof document !== 'undefined'\n\nif (typeof DEBUG !== 'undefined' && DEBUG) {\n  if (!hasDocument) {\n    throw new Error(\n    'vue-style-loader cannot be used in a non-browser environment. ' +\n    \"Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.\"\n  ) }\n}\n\n/*\ntype StyleObject = {\n  id: number;\n  parts: Array<StyleObjectPart>\n}\n\ntype StyleObjectPart = {\n  css: string;\n  media: string;\n  sourceMap: ?string\n}\n*/\n\nvar stylesInDom = {/*\n  [id: number]: {\n    id: number,\n    refs: number,\n    parts: Array<(obj?: StyleObjectPart) => void>\n  }\n*/}\n\nvar head = hasDocument && (document.head || document.getElementsByTagName('head')[0])\nvar singletonElement = null\nvar singletonCounter = 0\nvar isProduction = false\nvar noop = function () {}\nvar options = null\nvar ssrIdKey = 'data-vue-ssr-id'\n\n// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n// tags it will allow on a page\nvar isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase())\n\nfunction addStylesClient (parentId, list, _isProduction, _options) {\n  isProduction = _isProduction\n\n  options = _options || {}\n\n  var styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(parentId, list)\n  addStylesToDom(styles)\n\n  return function update (newList) {\n    var mayRemove = []\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i]\n      var domStyle = stylesInDom[item.id]\n      domStyle.refs--\n      mayRemove.push(domStyle)\n    }\n    if (newList) {\n      styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(parentId, newList)\n      addStylesToDom(styles)\n    } else {\n      styles = []\n    }\n    for (var i = 0; i < mayRemove.length; i++) {\n      var domStyle = mayRemove[i]\n      if (domStyle.refs === 0) {\n        for (var j = 0; j < domStyle.parts.length; j++) {\n          domStyle.parts[j]()\n        }\n        delete stylesInDom[domStyle.id]\n      }\n    }\n  }\n}\n\nfunction addStylesToDom (styles /* Array<StyleObject> */) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i]\n    var domStyle = stylesInDom[item.id]\n    if (domStyle) {\n      domStyle.refs++\n      for (var j = 0; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j])\n      }\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j]))\n      }\n      if (domStyle.parts.length > item.parts.length) {\n        domStyle.parts.length = item.parts.length\n      }\n    } else {\n      var parts = []\n      for (var j = 0; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j]))\n      }\n      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }\n    }\n  }\n}\n\nfunction createStyleElement () {\n  var styleElement = document.createElement('style')\n  styleElement.type = 'text/css'\n  head.appendChild(styleElement)\n  return styleElement\n}\n\nfunction addStyle (obj /* StyleObjectPart */) {\n  var update, remove\n  var styleElement = document.querySelector('style[' + ssrIdKey + '~=\"' + obj.id + '\"]')\n\n  if (styleElement) {\n    if (isProduction) {\n      // has SSR styles and in production mode.\n      // simply do nothing.\n      return noop\n    } else {\n      // has SSR styles but in dev mode.\n      // for some reason Chrome can't handle source map in server-rendered\n      // style tags - source maps in <style> only works if the style tag is\n      // created and inserted dynamically. So we remove the server rendered\n      // styles and inject new ones.\n      styleElement.parentNode.removeChild(styleElement)\n    }\n  }\n\n  if (isOldIE) {\n    // use singleton mode for IE9.\n    var styleIndex = singletonCounter++\n    styleElement = singletonElement || (singletonElement = createStyleElement())\n    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)\n    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)\n  } else {\n    // use multi-style-tag mode in all other cases\n    styleElement = createStyleElement()\n    update = applyToTag.bind(null, styleElement)\n    remove = function () {\n      styleElement.parentNode.removeChild(styleElement)\n    }\n  }\n\n  update(obj)\n\n  return function updateStyle (newObj /* StyleObjectPart */) {\n    if (newObj) {\n      if (newObj.css === obj.css &&\n          newObj.media === obj.media &&\n          newObj.sourceMap === obj.sourceMap) {\n        return\n      }\n      update(obj = newObj)\n    } else {\n      remove()\n    }\n  }\n}\n\nvar replaceText = (function () {\n  var textStore = []\n\n  return function (index, replacement) {\n    textStore[index] = replacement\n    return textStore.filter(Boolean).join('\\n')\n  }\n})()\n\nfunction applyToSingletonTag (styleElement, index, remove, obj) {\n  var css = remove ? '' : obj.css\n\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = replaceText(index, css)\n  } else {\n    var cssNode = document.createTextNode(css)\n    var childNodes = styleElement.childNodes\n    if (childNodes[index]) styleElement.removeChild(childNodes[index])\n    if (childNodes.length) {\n      styleElement.insertBefore(cssNode, childNodes[index])\n    } else {\n      styleElement.appendChild(cssNode)\n    }\n  }\n}\n\nfunction applyToTag (styleElement, obj) {\n  var css = obj.css\n  var media = obj.media\n  var sourceMap = obj.sourceMap\n\n  if (media) {\n    styleElement.setAttribute('media', media)\n  }\n  if (options.ssrId) {\n    styleElement.setAttribute(ssrIdKey, obj.id)\n  }\n\n  if (sourceMap) {\n    // https://developer.chrome.com/devtools/docs/javascript-debugging\n    // this makes source maps inside style tags work properly in Chrome\n    css += '\\n/*# sourceURL=' + sourceMap.sources[0] + ' */'\n    // http://stackoverflow.com/a/26603875\n    css += '\\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'\n  }\n\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild)\n    }\n    styleElement.appendChild(document.createTextNode(css))\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vue-style-loader/lib/addStylesClient.js?");

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/listToStyles.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return listToStyles; });\n/**\n * Translates the list format produced by css-loader into something\n * easier to manipulate.\n */\nfunction listToStyles (parentId, list) {\n  var styles = []\n  var newStyles = {}\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i]\n    var id = item[0]\n    var css = item[1]\n    var media = item[2]\n    var sourceMap = item[3]\n    var part = {\n      id: parentId + ':' + i,\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    }\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = { id: id, parts: [part] })\n    } else {\n      newStyles[id].parts.push(part)\n    }\n  }\n  return styles\n}\n\n\n//# sourceURL=webpack:///./node_modules/vue-style-loader/lib/listToStyles.js?");

/***/ }),

/***/ "./src/scripts/productStyles.js":
/*!**************************************!*\
  !*** ./src/scripts/productStyles.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylesheets_productStyles_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylesheets/productStyles.sass */ \"./src/stylesheets/productStyles.sass\");\n/* harmony import */ var _stylesheets_productStyles_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_productStyles_sass__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n//# sourceURL=webpack:///./src/scripts/productStyles.js?");

/***/ }),

/***/ "./src/stylesheets/productStyles.sass":
/*!********************************************!*\
  !*** ./src/stylesheets/productStyles.sass ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js??ref--1-2!./productStyles.sass */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js?!./src/stylesheets/productStyles.sass\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"6d27085a\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/stylesheets/productStyles.sass?");

/***/ })

/******/ });