module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(259);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  var hook
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context =
	        context || // cached call
	        (this.$vnode && this.$vnode.ssrContext) || // stateful
	        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context)
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier)
	      }
	    }
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook
	  } else if (injectStyles) {
	    hook = injectStyles
	  }

	  if (hook) {
	    var functional = options.functional
	    var existing = functional
	      ? options.render
	      : options.beforeCreate
	    if (!functional) {
	      // inject component registration as beforeCreate hook
	      options.beforeCreate = existing
	        ? [].concat(existing, hook)
	        : [hook]
	    } else {
	      // register for functioal component in vue file
	      options.render = function renderWithStyleInjection (h, context) {
	        hook.call(context)
	        return existing(h, context)
	      }
	    }
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),

/***/ 10:
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(12)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  update(obj)

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	module.exports = require("ifbp-element/lib/utils/clickoutside");

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _ref = __webpack_require__(260);

	var _ref2 = _interopRequireDefault(_ref);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_ref2.default.install = function (Vue) {
	  Vue.component(_ref2.default.name, _ref2.default);
	};

	exports.default = _ref2.default;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(261)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(263),
	  /* template */
	  __webpack_require__(269),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(262);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("0d708b86", content, true);

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*.ref-container .el-dialog__body{\n  height:380px;\n}\n.ref-container .el-tree>.el-tree-node>.el-tree-node__children{\n  height: 271px;\n  overflow: auto;\n}\n.ref-container .el-tree,.ref-container .el-tree>.el-tree-node.is-expanded{\n  height: 308px;\n  overflow: hidden;\n}*/\n.ref-container .el-tree > .el-tree-node > .el-tree-node__children {\n}\n.ref-container .el-tree > .el-tree-node.is-expanded {\n    overflow: hidden;\n}\n.ref-container .el-tree {\n    overflow: auto;\n    height: 308px;\n}\n.ref-container .el-dialog__body {\n    height: 380px;\n    box-sizing: content-box;\n}\n.yon-form .ref-dialog .el-input {\n    width: 100%;\n}\n.yon-form .ref-dialog .el-input__inner {\n    width: 100%;\n}\n", ""]);

	// exports


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _refDialog = __webpack_require__(264);

	var _refDialog2 = _interopRequireDefault(_refDialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElRef',
	  data: function data() {
	    return {
	      refData: '',
	      value: '',
	      selected: [],
	      refInfo: '',
	      field: '',
	      dialogVisible: false,
	      timeid: false,
	      infoPromise: false,
	      triggerOnFocus: true
	    };
	  },

	  // props: ['data', 'templateValue', 'editable'],
	  props: {
	    width: {},
	    field: {},
	    isMutiSelect: {},
	    refCode: {},
	    templateValue: {},
	    editable: {
	      default: true
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },
	    queryParams: {}
	  },
	  components: {
	    refDialog: _refDialog2.default
	  },
	  methods: {
	    init: function init() {
	      var _this = this;

	      if (this.templateValue[this.field] !== null) {
	        var tail = '_ref';
	        if (this.templateValue.beanMap) {
	          var data = this.templateValue.beanMap[this.field + tail];
	          if (Object.prototype.toString.call(data) === '[object Object]') {
	            Object.keys(data).forEach(function (key) {
	              _this.selected.push(data[key]);
	              _this.value = _this.value + ',' + data[key].name;
	            });
	            this.value = this.value.substr(1);
	          }
	        }
	      }
	      // this.infoPromise.then(() => {
	      //   if (this.valueWatcher) {
	      //     this.valueWatcher();
	      //   }
	      //   if (this.templateValue[this.field]) {
	      //     var refUrl = this.refInfo.refModelUrl;
	      //     var refParam = refUrl.split('/');
	      //     if (refUrl[refUrl.length - 1] === '/') {
	      //       refParam = refParam[refParam.length - 2];
	      //     } else {
	      //       refParam = refParam[refParam.length - 1];
	      //     }
	      //     var tmp = this.templateValue[this.field].split(',');
	      //     this.$http({
	      //       url: '/wbalone/' + refParam + '/matchPKRefJSON',
	      //       method: 'post',
	      //       data: {pk_val: tmp}
	      //     }).then((res) => {
	      //       var tmp = '';
	      //       this.selected = res.data;
	      //       this.selected.forEach((v) => {
	      //         tmp = tmp + ',' + v.refname;
	      //       });
	      //       this.value = tmp.substr(1);
	      //     });
	      //   }
	      // });
	    },
	    reset: function reset() {
	      if (!this.disabled) {
	        this.value = '';
	        this.selected = [];
	        this.templateValue[this.field] = '';
	      }
	    },
	    onSelectData: function onSelectData(data) {
	      var _this2 = this;

	      console.log(data);
	      this.value = '';
	      var name;
	      if (Object.prototype.toString.call(data) === '[object Array]') {
	        this.selected = data;
	        data.forEach(function (v) {
	          name = v.refname ? v.refname : v.name;
	          _this2.value = _this2.value + ',' + name;
	        });
	        this.value = this.value.substr(1);
	      } else {
	        this.selected = [data];
	        this.value = data.refname ? data.refname : data.name;
	      }
	      var temp = '';
	      this.selected.forEach(function (v) {
	        temp = temp + ',' + v.id;
	      });
	      temp = temp.substr(1);
	      this.templateValue[this.field] = temp;
	      console.log(this.selected);
	      var payload = {
	        key: this.field,
	        value: this.selected
	      };
	      this.$emit('trigger', 'change', payload);
	    },

	    showDialog: function showDialog() {
	      /* this.dialogVisible=false;
	       this.$nextTick(() => {
	       this.dialogVisible=true;
	       });*/
	      if (!this.disabled) {
	        this.request();
	      }
	    },
	    getSuggestions: function getSuggestions(searchStr, callback) {
	      var tmp = function () {
	        this.querySearch(searchStr, callback);
	        this.timeid = false;
	      }.bind(this);
	      if (!this.timeid) {
	        this.timeid = setTimeout(tmp, 300);
	      } else {
	        clearTimeout(this.timeid);
	        this.timeid = setTimeout(tmp, 300);
	      }
	    },
	    querySearch: function querySearch(searchStr, callback) {
	      var queryParamsStr = '';
	      if (this.queryParams) var queryParamsStr = '&transmitParam=' + encodeURIComponent(JSON.stringify(this.queryParams));
	      if (this.templateValue && this.templateValue['base_doc_type']) {
	        this.$http({
	          url: '/uitemplate_web/iref_ctr/filterRefJSON',
	          method: 'post',
	          data: 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + this.templateValue['base_doc_type'] + queryParamsStr
	        }).then(function (res) {
	          var segs;
	          if (res.data && {}.toString.call(res.data.data) === '[object Array]') {
	            segs = res.data.data;
	            for (var i = 0; i < segs.length; i++) {
	              segs[i].value = segs[i].refname;
	            }
	          } else {
	            segs = [{ value: '无可用数据！' }];
	          }
	          callback(segs);
	        });
	      } else {
	        this.$http({
	          url: '/uitemplate_web/iref_ctr/filterRefJSON',
	          method: 'post',
	          data: 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + queryParamsStr
	        }).then(function (res) {
	          var segs;
	          if (res.data && {}.toString.call(res.data.data) === '[object Array]') {
	            segs = res.data.data;
	            for (var i = 0; i < segs.length; i++) {
	              segs[i].value = segs[i].refname;
	            }
	          } else {
	            segs = [{ value: '无可用数据！' }];
	          }
	          callback(segs);
	        });
	      }
	    },
	    requestInfo: function requestInfo() {
	      var _this3 = this;

	      if (this.refCode) {
	        var url = '/uitemplate_web/iref_ctr/refInfo/?refCode=' + this.refCode;
	        /* eslint-disable no-undef */
	        this.infoPromise = new Promise(function (res) {
	          /* eslint-enable no-undef */
	          var getRefType = _this3.$http({
	            url: url,
	            method: 'get'
	          });
	          getRefType.then(function (refInfo) {
	            _this3.refInfo = refInfo.data;
	            res();
	          });
	        });
	      }
	    },
	    request: function request() {
	      var _this4 = this;

	      if (!this.templateValue || !this.refCode || !this.field) return;
	      var getRef;
	      var queryParamsStr = '';
	      if (this.queryParams) var queryParamsStr = '&transmitParam=' + encodeURIComponent(JSON.stringify(this.queryParams));
	      // code为dept的参照需要额外传值
	      if (this.refInfo.refCode === 'dept') {
	        var tmp = location.hash.split('?')[1];
	        var dept_org = tmp ? tmp.split('=')[1] : '';
	        getRef = this.$http({
	          url: '/uitemplate_web/iref_ctr/commonRefsearch',
	          method: 'post',
	          data: 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&pk_org=' + encodeURIComponent(dept_org) + queryParamsStr,
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	          }
	        });
	      } else {
	        var refGridTreeData;
	        var data;
	        if (this.templateValue['base_doc_type']) {
	          // 参照为关联身份时候的额外传值
	          refGridTreeData = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&pk_org=' + encodeURIComponent(dept_org) + '&condition=' + this.templateValue['base_doc_type'];
	          data = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + this.templateValue['base_doc_type'];
	        } else {
	          refGridTreeData = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&pk_org=' + encodeURIComponent(dept_org);
	          data = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl);
	        }
	        if (this.refInfo.refUIType === 'RefGridTree') {
	          getRef = this.$http({
	            url: '/uitemplate_web/iref_ctr/blobRefClassSearch',
	            method: 'post',
	            data: refGridTreeData + queryParamsStr,
	            headers: {
	              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	            }
	          });
	        } else {
	          getRef = this.$http({
	            url: '/uitemplate_web/iref_ctr/commonRefsearch',
	            method: 'post',
	            data: data + queryParamsStr,
	            headers: {
	              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	            }
	          });
	        }
	      }
	      getRef.then(function (ref) {
	        ref.data.data = _this4.getRefData(ref.data.data);
	        _this4.refData = ref.data;
	        _this4.dialogVisible = true;
	      });
	    },
	    getRefData: function getRefData(data) {
	      var refData;
	      if (['RefTree', 'RefGridTree'].indexOf(this.refInfo.refUIType) > -1) {
	        var map = {};
	        var ids = [];
	        var root = [];
	        data.forEach(function (v) {
	          ids.push(v.id);
	        });
	        data.forEach(function (v) {
	          if (ids.indexOf(v.pid) > -1) {
	            if (map[v.pid]) {
	              map[v.pid].push(v);
	            } else {
	              map[v.pid] = [v];
	            }
	          } else {
	            root.push(v);
	          }
	        });
	        var setChild = function setChild(node) {
	          var tmp = node;
	          if (map[tmp.id]) {
	            tmp.children = map[tmp.id];
	            tmp.children.forEach(function (v) {
	              setChild(v);
	            });
	          }
	        };
	        root.forEach(function (v) {
	          setChild(v);
	        });
	        refData = root;
	      } else {
	        refData = data;
	      }
	      return refData;
	    }
	  },
	  created: function created() {
	    var _this5 = this;

	    this.valueWatcher = this.$watch(function () {
	      return this.templateValue;
	    }, function () {
	      if (this.templateValue && this.templateValue[this.field] !== null) {
	        this.init();
	        this.valueWatcher();
	      }
	    }.bind(this), { deep: true });
	    if (this.templateValue && this.templateValue[this.field] !== null) {
	      this.init();
	      this.valueWatcher();
	    }
	    this.$on('closeDialog', function () {
	      _this5.dialogVisible = false;
	    });
	    if (!this.templateValue || !this.refCode || !this.field) {
	      this.triggerOnFocus = false;
	    }
	    this.requestInfo();
	  }
	  // props:['data']
	};
	/* eslint-enable */
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	/* eslint-disable */

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(265)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(267),
	  /* template */
	  __webpack_require__(268),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-62c2136d",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(266);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("464876da", content, true);

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.el-tree[data-v-62c2136d] {\n    border-bottom: none;\n}\n.ufold[data-v-62c2136d] {\n  position: absolute;\n  top:1rem;\n  display: none;\n}\n.ufold i[data-v-62c2136d] {\n  font-size: 18px;\n  color: #bfcbd9;\n}\n.ufold i[data-v-62c2136d]:hover {\n  color:#20a0ff;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _clickoutside = __webpack_require__(19);

	var _clickoutside2 = _interopRequireDefault(_clickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  // props: ['data', 'dialogVisible', 'refData', 'children', 'label', 'tableDc', 'refInfo', 'savedSelected'],
	  props: ['isMutiSelect', 'dialogVisible', 'refData', 'children', 'label', 'tableDc', 'refInfo', 'savedSelected'],
	  directives: {
	    Clickoutside: _clickoutside2.default
	  },
	  data: function data() {
	    return {
	      urefClientWidth: '',
	      rflag: 'true',
	      size: 'large',
	      activeName: 'first',
	      selected: [],
	      treeData: '',
	      // 外部引用可以添加的属性
	      treeprops: {
	        children: 'children',
	        label: 'refname',
	        id: 'id'
	      },
	      styleTree: {
	        width: '100%'
	      },
	      tableData: [{
	        date: '2016-05-02',
	        name: '王小虎',
	        address: '上海市普陀区金沙江路 1518 弄'
	      }, {
	        date: '2016-05-04',
	        name: '王小虎',
	        address: '上海市普陀区金沙江路 1517 弄'
	      }, {
	        date: '2016-05-01',
	        name: '王小虎',
	        address: '上海市普陀区金沙江路 1519 弄'
	      }, {
	        date: '2016-05-03',
	        name: '王小虎',
	        address: '上海市普陀区金沙江路 1516 弄'
	      }],
	      currentRow: null,
	      styleTable: {
	        width: '100%'
	      },
	      strFieldCode: [],
	      strFieldName: [],
	      // dialogVisible: true,
	      filterText: '',
	      tableHeight: 345,
	      visible: false,
	      timeid: ''
	    };
	  },

	  watch: {
	    refInfo: function refInfo(val) {
	      this.treeprops.label = ['RefGridTree'].indexOf(val.refUIType) > -1 ? 'name' : 'refname';
	    },

	    // filterText(val) {
	    //   this.$refs.reftree.filter(val);
	    // },
	    refData: function refData() {
	      this.adjustRefData();
	      if (this.refInfo.strFieldName) {
	        this.strFieldName = this.refInfo.strFieldName;
	        this.strFieldCode = this.refInfo.strFieldCode;
	      } else if (this.refData.refViewModel && this.refData.refViewModel.strFieldName) {
	        this.strFieldName = this.refData.refViewModel.strFieldName;
	        this.strFieldCode = this.refData.refViewModel.strFieldCode;
	      }
	    },
	    dialogVisible: function dialogVisible(val) {
	      this.visible = val;
	      if (val === true) {
	        this.selected = JSON.parse(JSON.stringify(this.savedSelected));
	        this.setSelected();
	      }
	    }
	  },
	  mounted: function mounted() {
	    var vm = this;
	    var uresizeSc = function uresizeSc() {
	      vm.urefClientWidth = document.body.clientWidth;
	      var urefFold = document.querySelector('.ufold');
	      if (vm.urefClientWidth >= 320 && vm.urefClientWidth < 767) {
	        vm.size = "full";
	        if (vm.refInfo.refUIType === "RefGridTree") {
	          vm.styleTree = { width: '34%', position: 'absolute', left: '-34%' };
	          vm.styleTable = { width: '100%' };
	          vm.listData = [];
	          vm.tableData = [];
	          vm.treeData = vm.refData.data;
	          if (urefFold) {
	            urefFold.style.display = "block";
	          }
	        } else if (vm.refInfo.refUIType === "RefGrid") {
	          vm.styleTree = { width: '0%' };
	          vm.styleTable = { width: '100%' };
	          vm.treeData = [];
	          vm.listData = [];
	          vm.tableData = vm.refData.data;
	        } else if (vm.refInfo.refUIType === "RefTree") {
	          vm.styleTree = { width: '100%' };
	          vm.styleTable = { width: '0%' };
	          vm.tableData = [];
	          vm.listData = [];
	          vm.treeData = vm.refData.data;
	        }
	      } else if (vm.urefClientWidth >= 767) {

	        if (vm.refInfo.refUIType === "RefGridTree") {
	          vm.size = 'large';
	          vm.styleTree = { width: '40%' };
	          vm.styleTable = { width: '60%' };
	          vm.listData = [];
	          vm.tableData = [];
	          vm.treeData = vm.refData.data;
	          if (urefFold) {
	            urefFold.style.display = "none";
	          }
	        } else if (vm.refInfo.refUIType === "RefGrid") {
	          vm.size = 'small';
	          vm.styleTree = { width: '0%' };
	          vm.styleTable = { width: '100%' };
	          vm.treeData = [];
	          vm.listData = [];
	          vm.tableData = vm.refData.data;
	        } else if (vm.refInfo.refUIType === "RefTree") {
	          vm.size = 'small';
	          vm.styleTree = { width: '100%' };
	          vm.styleTable = { width: '0%' };
	          vm.tableData = [];
	          vm.listData = [];
	          vm.treeData = vm.refData.data;
	        }
	      }
	    };

	    this.$refs.uelDialog.$nextTick(function () {
	      uresizeSc();
	    });
	    window.addEventListener('resize', function () {
	      uresizeSc();
	    });
	  },

	  // computed: {
	  //   visible: function() {
	  //     return this.dialogVisible;
	  //   }
	  // },
	  created: function created() {
	    // this.dialogVisible = this.props.dialogVisible;
	    // this.treeprops = {
	    //   children: this.children,
	    //   label: this.label
	    // };
	    this.adjustRefData();
	    this.fetchData();
	  },
	  beforeMount: function beforeMount() {},

	  methods: {
	    handleClickoutside: function handleClickoutside() {
	      if (this.urefClientWidth >= 320 && this.urefClientWidth < 767) {
	        if (this.refInfo.refUIType === 'RefGridTree') {
	          document.querySelector('.ufold').style.display = "block";
	          this.styleTree = { width: '30%', position: 'absolute', left: '-30%' };
	          this.rflag = true;
	        }
	      }
	    },
	    ufoldClick: function ufoldClick(event) {
	      if (this.rflag) {
	        event.currentTarget.style.display = "none";
	        this.styleTree = { width: '70%', position: 'absolute', left: '0', zIndex: '1000' };
	        this.rflag = false;
	      } else {
	        event.currentTarget.style.display = "block";
	        this.rflag = true;
	      }
	    },
	    adjustRefData: function adjustRefData() {
	      this.tableHeight = this.refInfo.refUIType === 'RefGridTree' ? 345 : 309;
	      switch (this.refInfo.refUIType) {
	        case 'RefGridTree':
	          this.size = "large";
	          this.styleTree = { width: '34%' };
	          this.styleTable = { width: '66%' };
	          this.listData = [];
	          this.tableData = [];
	          this.treeData = this.refData.data;
	          break;
	        case 'RefGrid':
	          this.size = "small";
	          this.styleTree = { width: '0%' };
	          this.styleTable = { width: '100%' };
	          this.treeData = [];
	          this.listData = [];
	          this.tableData = this.refData.data;
	          break;
	        case 'RefTree':
	          this.size = "small";
	          this.styleTree = { width: '100%' };
	          this.styleTable = { width: '0%' };
	          this.tableData = [];
	          this.listData = [];
	          this.treeData = this.refData.data;
	          break;
	        case 'CommonRef':
	          this.size = "small";
	          this.styleTree = { width: '0%' };
	          this.styleTable = { width: '100%' };
	          this.tableData = this.refData.data;
	          this.treeData = [];
	          // this.listData = this.refData;
	          break;
	        default:
	          this.size = "small";
	          this.styleTree = { width: '0%' };
	          this.styleTable = { width: '100%' };
	          this.tableData = [];
	          this.treeData = [];
	          this.listData = [];
	      }
	    },
	    fetchData: function fetchData(url) {
	      if (url) {
	        this.$http.get('./static/data.js').then(function (response) {
	          // success callback
	        }, function (response) {
	          // error callback
	        });
	      }
	    },
	    filterNode: function filterNode(value, data) {
	      if (!value) return true;
	      return data.name.indexOf(value) !== -1;
	    },
	    getSuggestions: function getSuggestions(searchStr, callback) {
	      var tmp = function () {
	        this.querySearch(searchStr, callback);
	        this.timeid = false;
	      }.bind(this);
	      if (!this.timeid) {
	        this.timeid = setTimeout(tmp, 300);
	      } else {
	        clearTimeout(this.timeid);
	        this.timeid = setTimeout(tmp, 300);
	      }
	    },
	    querySearch: function querySearch(searchStr, callback) {
	      if (this.templateValue['base_doc_type']) {
	        this.$http({
	          url: '/uitemplate_web/iref_ctr/filterRefJSON',
	          method: 'post',
	          data: 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + this.templateValue['base_doc_type']
	        }).then(function (res) {
	          var segs;
	          if (res.data && {}.toString.call(res.data.data) === '[object Array]') {
	            segs = res.data.data;
	            for (var i = 0; i < segs.length; i++) {
	              segs[i].value = segs[i].refname;
	            }
	          } else {
	            segs = [{ value: '无可用数据！' }];
	          }
	          callback(segs);
	        });
	      } else {
	        this.$http({
	          url: '/uitemplate_web/iref_ctr/filterRefJSON',
	          method: 'post',
	          data: 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl)
	        }).then(function (res) {
	          var segs;
	          if (res.data && {}.toString.call(res.data.data) === '[object Array]') {
	            segs = res.data.data;
	            for (var i = 0; i < segs.length; i++) {
	              segs[i].value = segs[i].refname;
	            }
	          } else {
	            segs = [{ value: '无可用数据！' }];
	          }
	          callback(segs);
	        });
	      }
	    },

	    /*eslint no-unused-vars: "warn"*/
	    handleClick: function handleClick(tab, event) {
	      this.$emit('onTabClick', tab);
	    },
	    onSelectData: function onSelectData(data) {
	      if (!this.isMutiSelect) {
	        this.$emit('onSelectData', data);
	        this.closeDialog();
	      }
	    },
	    handleNodeClick: function handleNodeClick(data) {
	      if (this.refInfo.refUIType === 'RefGridTree') {
	        this.loadList(data);
	      } else if (!this.isMutiSelect) {
	        this.$emit('onSelectData', data);
	        this.closeDialog();
	      }
	    },
	    handleCheckChange: function handleCheckChange(data) {
	      if (this.isMutiSelect) {
	        this.selected = this.$refs.reftree.getCheckedNodes();
	      }
	    },
	    handleTabSelectChange: function handleTabSelectChange(selection) {
	      if (this.isMutiSelect) {
	        var table = [];
	        var cur = [];
	        this.tableData.forEach(function (v) {
	          table.push(v.refpk);
	        });
	        this.selected.forEach(function (v) {
	          if (table.indexOf(v.refpk) < 0) {
	            cur.push(v);
	          }
	        });
	        this.selected = cur.concat(selection);
	      }
	    },
	    handleCurrentChange: function handleCurrentChange(val) {
	      if (!this.isMutiSelect) {
	        this.$emit('onSelectData', val);
	        this.closeDialog();
	      }
	    },
	    loadList: function loadList(data) {
	      var _this = this;

	      this.$http({
	        url: '/uitemplate_web/iref_ctr/blobRefSearch',
	        method: 'post',
	        data: 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(data.refpk)
	      }).then(function (res) {
	        _this.tableData = res.data.data;
	        _this.setSelected();
	      });
	    },
	    setSelected: function setSelected() {
	      var _this2 = this;

	      var sel = [];
	      this.selected.forEach(function (v) {
	        sel.push(v.refpk);
	      });
	      this.$nextTick(function () {
	        if (_this2.refInfo.refUIType === 'RefTree') {
	          _this2.$refs.reftree.setCheckedKeys(sel);
	        } else {
	          _this2.tableData.forEach(function (v) {
	            if (sel.indexOf(v.refpk) > -1) {
	              _this2.$refs.refTable.toggleRowSelection(v, true);
	            } else {
	              _this2.$refs.refTable.toggleRowSelection(v, false);
	            }
	          });
	        }
	      });
	    },
	    handleDelete: function handleDelete(index, row) {
	      this.selected.splice(index, 1);
	      if (this.refInfo.refUIType === 'RefTree') {
	        this.$refs.reftree.setChecked(row.refpk, false);
	      } else {
	        var tmp;
	        this.tableData.forEach(function (v) {
	          if (v.refpk === row.refpk) {
	            tmp = v;
	          }
	        });
	        this.$refs.refTable.toggleRowSelection(tmp);
	      }
	    },
	    loadNode: function loadNode(node, resolve) {
	      var _this3 = this;

	      var data;
	      if (node.level === 0) {
	        return resolve([{ name: 'region1' }, { name: 'region2' }]);
	      }
	      if (node.level > 3) {
	        return resolve([]);
	      }
	      var hasChild = void 0;
	      if (node.data.name === 'region1') {
	        hasChild = true;
	      } else if (node.data.name === 'region2') {
	        hasChild = false;
	      } else {
	        hasChild = Math.random() > 0.5;
	      }
	      setTimeout(function () {
	        if (hasChild) {
	          var count = _this3.count + 1;
	          data = [{
	            name: 'zone' + count
	          }, {
	            name: 'zone' + count
	          }];
	        } else {
	          data = [];
	        }

	        return resolve(data);
	      }, 500);
	      return resolve(data);
	    },

	    closeDialog: function closeDialog() {
	      this.$parent.$emit('closeDialog');
	    },
	    handleCloseSelf: function handleCloseSelf(code) {
	      if (code === 'confirm') {
	        this.$emit('onSelectData', this.selected);
	      }
	      this.closeDialog();
	      // this.visible=false;
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),

/***/ 268:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('el-dialog', {
	    ref: "uelDialog",
	    staticClass: "ref-dialog",
	    attrs: {
	      "modal": false,
	      "title": "",
	      "size": _vm.size
	    },
	    on: {
	      "close": _vm.closeDialog
	    },
	    model: {
	      value: (_vm.visible),
	      callback: function($$v) {
	        _vm.visible = $$v
	      },
	      expression: "visible"
	    }
	  }, [_c('div', {
	    staticClass: "ufold",
	    on: {
	      "click": function($event) {
	        _vm.ufoldClick($event)
	      }
	    }
	  }, [_c('i', {
	    staticClass: "el-icon-pt-fenlei1"
	  })]), _c('el-tabs', {
	    on: {
	      "tab-click": _vm.handleClick
	    },
	    model: {
	      value: (_vm.activeName),
	      callback: function($$v) {
	        _vm.activeName = $$v
	      },
	      expression: "activeName"
	    }
	  }, [_c('el-tab-pane', {
	    attrs: {
	      "label": "全部",
	      "name": "first"
	    }
	  }, [_c('div', {
	    staticStyle: {
	      "display": "flex",
	      "background-color": "#FFF",
	      "border": "1px #EEE solid"
	    }
	  }, [(_vm.treeData.length > 0) ? _c('div', {
	    directives: [{
	      name: "clickoutside",
	      rawName: "v-clickoutside",
	      value: (_vm.handleClickoutside),
	      expression: "handleClickoutside"
	    }],
	    style: (_vm.styleTree)
	  }, [_c('el-autocomplete', {
	    attrs: {
	      "placeholder": "输入关键字进行过滤",
	      "icon": "search",
	      "width": "100%",
	      "fetch-suggestions": _vm.getSuggestions
	    },
	    on: {
	      "select": _vm.onSelectData
	    },
	    model: {
	      value: (_vm.filterText),
	      callback: function($$v) {
	        _vm.filterText = $$v
	      },
	      expression: "filterText"
	    }
	  }), _c('el-tree', {
	    ref: "reftree",
	    attrs: {
	      "data": _vm.treeData,
	      "props": _vm.treeprops,
	      "node-key": "refpk",
	      "check-strictly": true,
	      "show-checkbox": _vm.isMutiSelect && _vm.refInfo.refUIType !== 'RefGridTree',
	      "default-expand-all": "",
	      "filter-node-method": _vm.filterNode
	    },
	    on: {
	      "check-change": _vm.handleCheckChange,
	      "node-click": _vm.handleNodeClick
	    }
	  })], 1) : _vm._e(), _c('div', {
	    style: (_vm.styleTable)
	  }, [(_vm.treeData.length <= 0) ? _c('div', [_c('el-autocomplete', {
	    attrs: {
	      "placeholder": "输入关键字进行过滤",
	      "icon": "search",
	      "width": "100%",
	      "fetch-suggestions": _vm.getSuggestions
	    },
	    on: {
	      "select": _vm.onSelectData
	    },
	    model: {
	      value: (_vm.filterText),
	      callback: function($$v) {
	        _vm.filterText = $$v
	      },
	      expression: "filterText"
	    }
	  })], 1) : _vm._e(), _c('el-table', {
	    ref: "refTable",
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.tableData,
	      "highlight-current-row": "",
	      "empty-text": "暂无数据……",
	      "height": _vm.tableHeight
	    },
	    on: {
	      "current-change": _vm.handleCurrentChange,
	      "select": _vm.handleTabSelectChange,
	      "select-all": _vm.handleTabSelectChange
	    }
	  }, [(_vm.isMutiSelect && _vm.refInfo.refUIType !== 'RefTree') ? _c('el-table-column', {
	    attrs: {
	      "type": "selection",
	      "width": "55"
	    }
	  }) : _vm._e(), _vm._l((_vm.strFieldName), function(colName, index) {
	    return _c('el-table-column', {
	      attrs: {
	        "label": colName,
	        "property": _vm.strFieldCode[index],
	        "show-overflow-tooltip": true
	      }
	    })
	  })], 2)], 1)])]), (_vm.isMutiSelect) ? _c('el-tab-pane', {
	    attrs: {
	      "label": '已选(' + _vm.selected.length + ')',
	      "name": "second"
	    }
	  }, [(_vm.treeData.length <= 0) ? _c('div', [_c('el-input', {
	    attrs: {
	      "placeholder": "输入关键字进行过滤",
	      "icon": "search",
	      "width": "100%"
	    }
	  })], 1) : _vm._e(), (_vm.selected.length > 0) ? _c('el-table', {
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "data": _vm.selected,
	      "highlight-current-row": "",
	      "empty-text": "暂无数据……",
	      "height": "309"
	    }
	  }, [_vm._l((_vm.strFieldName), function(colName, index) {
	    return _c('el-table-column', {
	      attrs: {
	        "label": colName,
	        "property": _vm.strFieldCode[index],
	        "show-overflow-tooltip": true
	      }
	    })
	  }), _c('el-table-column', {
	    attrs: {
	      "label": "操作"
	    },
	    scopedSlots: _vm._u([
	      ["default", function(scope) {
	        return [_c('el-button', {
	          attrs: {
	            "size": "small",
	            "type": "danger"
	          },
	          on: {
	            "click": function($event) {
	              _vm.handleDelete(scope.$index, scope.row)
	            }
	          }
	        }, [_vm._v("\n                                删除\n                            ")])]
	      }]
	    ])
	  })], 2) : _vm._e()], 1) : _vm._e()], 1), _c('div', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_c('el-button', {
	    on: {
	      "click": function($event) {
	        _vm.handleCloseSelf('cancel')
	      }
	    }
	  }, [_vm._v("取 消")]), _c('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": function($event) {
	        _vm.handleCloseSelf('confirm')
	      }
	    }
	  }, [_vm._v("确 定")])], 1)], 1)], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ref-container"
	  }, [(_vm.editable) ? _c('el-autocomplete', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (true),
	      expression: "true"
	    }],
	    style: ({
	      width: '100%',
	      display: 'inline-block'
	    }),
	    attrs: {
	      "placeholder": "",
	      "icon": "pt-fenlei1",
	      "width": _vm.width,
	      "disabled": _vm.disabled,
	      "on-icon-click": _vm.showDialog,
	      "triggerOnFocus": _vm.triggerOnFocus,
	      "fetch-suggestions": _vm.getSuggestions
	    },
	    on: {
	      "select": _vm.onSelectData
	    },
	    model: {
	      value: (_vm.value),
	      callback: function($$v) {
	        _vm.value = $$v
	      },
	      expression: "value"
	    }
	  }, [(_vm.selected.length > 0) ? _c('template', {
	    slot: "prepend"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.reset
	    }
	  }, [_vm._v("清空")])], 1) : _vm._e()], 2) : _c('ifbp-tooltip', {
	    attrs: {
	      "content": _vm.value
	    }
	  }), _c('refDialog', {
	    attrs: {
	      "dialogVisible": _vm.dialogVisible,
	      "refInfo": _vm.refInfo,
	      "savedSelected": _vm.selected,
	      "refData": _vm.refData,
	      "label": "label",
	      "isMutiSelect": _vm.isMutiSelect,
	      "tableDc": "/table.json"
	    },
	    on: {
	      "onSelectData": _vm.onSelectData
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ })

/******/ });