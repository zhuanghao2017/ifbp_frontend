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

	module.exports = __webpack_require__(566);


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

/***/ 215:
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _template = __webpack_require__(567);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_template2.default.install = function (Vue) {
	  Vue.component(_template2.default.name, _template2.default);
	};

	exports.default = _template2.default;

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(568)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(570),
	  /* template */
	  __webpack_require__(632),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(569);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("3f78f8df", content, true);

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.yon-title{\n  height: 54px;\n  line-height: 54px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #D4D4D4;\n  font-weight: 700;\n  color: #333;\n  font-size: 14px;\n}\n.yon-uitemplate{\n  background: white;\n}\n.yon-grid div.el-form-item__content{\n  width: 100%;\n}\n.yon-form .yonCount-2 div.el-form-item__content{\n  width: 60%;\n}\n.yon-form .yonCount-1 div.el-form-item__content{\n  width: 80%;\n}\n.yon-form .yonCount-3 div.el-form-item__content{\n  width: 70%;\n}\n.yon-form .el-input__inner{\n  width:218px;\n  height:36px;\n  line-height: 16px;\n  font-size: 14px;\n  border: 1px solid #CECECE;\n}\n.yon-form .el-input{\n  width:218px;\n}\n.yon-form .el-form-item__label {\n  font-size: 14px;\n}\n.yon-form .el-textarea__inner{\n  width:218px;\n  border: 1px solid #CECECE;\n}\n.yon-grid label.el-form-item__label{\n  width: 100px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.yon-form label.el-form-item__label{\n  width: 100px;\n  padding-left: 10px;\n  white-space: nowrap;\n  line-height: 16px;\n  padding: 10px 12px 10px 0;\n}\n.yon-form .yonCount-1 label.el-form-item__label{\n  width: 20%;\n}\n.yon-form .yonCount-2 label.el-form-item__label{\n  width: 40%;\n}\n.yon-form .yonCount-3 label.el-form-item__label{\n  width: 30%;\n}\n.yon-form div.tpl-label{\n  white-space: nowrap;\n  width: 218px;\n  padding-bottom: 10px;\n  padding-top: 10px;\n  line-height: 16px;\n  font-size: 14px;\n  vertical-align: top;\n  display: inline-block;\n}\n.yon-form .ref-container {\n  display: inline-block;\n}\n.yon-form .el-autocomplete {\n  width: 100%;\n}\n.yon-form div.tpl-label,.yon-form .el-checkbox-group {\n  display: inline-block;\n}\n.yon-form .el-checkbox {\n  margin-right: 15px;\n}\n.yon-form .el-checkbox+.el-checkbox {\n  margin-left: 0px;\n}\n.yon-form .yonCount-1 .el-select .el-input,.yon-form .yonCount-2 .el-select .el-input,.yon-form .yonCount-3 .el-select .el-input{\n  width: 100%;\n}\n.yon-form .yonCount-1 .ref-container .el-input,.yon-form .yonCount-2 .ref-container .el-input,.yon-form .yonCount-3 .ref-container .el-input{\n  width: 100%;\n}\n.yon-form .yonCount-1 .el-textarea__inner,.yon-form .yonCount-1 .el-input__inner{\n  width: 100%;\n}\n.yon-form .yonCount-2 .el-textarea__inner,.yon-form .yonCount-2 .el-input__inner{\n  width: 100%;\n}\n.yon-form .yonCount-3 .el-textarea__inner,.yon-form .yonCount-3 .el-input__inner{\n  width: 100%;\n}\n.yon-form .yonCount-1 div.tpl-label,.yon-form .yonCount-1 .el-select,.yon-form .yonCount-1 .el-input,.yon-form .yonCount-1 .el-checkbox-group,.yon-form .yonCount-1 .el-textarea,.yonCount-1 .ref-container{\n  width: 100%;\n}\n.yon-form .yonCount-2 div.tpl-label,.yon-form .yonCount-2 .el-select,.yon-form .yonCount-2 .el-input,.yon-form .yonCount-2 .el-checkbox-group,.yon-form .yonCount-2 .el-textarea,.yonCount-2 .ref-container{\n  width: 100%;\n}\n.yon-form .yonCount-3 div.tpl-label,.yon-form .yonCount-3 .el-select,.yon-form .yonCount-3 .el-input,.yon-form .yonCount-3 .el-checkbox-group,.yon-form .yonCount-3 .el-textarea,.yonCount-3 .ref-container{\n  width: 100%;\n}\n/*.yon-grid .cell>div{\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}*/\n.yon-required .el-input__inner::-webkit-input-placeholder,.yon-required .el-textarea__inner::-webkit-input-placeholder{\n  color:red;\n}\n", ""]);

	// exports


/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Form = __webpack_require__(571);

	var _Form2 = _interopRequireDefault(_Form);

	var _grid = __webpack_require__(626);

	var _grid2 = _interopRequireDefault(_grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import testjson from './testGrid';
	/* eslint-disable no-new */
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

	exports.default = {
	  name: 'ElTemplate',
	  data: function data() {
	    return {
	      forms: '',
	      formLayout: '',
	      isGrid: false,
	      mergedRules: {}
	    };
	  },

	  methods: {
	    request: function request() {
	      var _this = this;

	      if (this.tplCode) {
	        this.$http({
	          url: '/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/queryTemplateByCode',
	          method: 'post',
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	          },
	          data: this.geturlencode(this.tplCode)
	        }).then(function (res) {
	          _this.data = res.data;
	          _this.formLayout = _this.parseColumnPanel(_this.data);
	          _this.forms = _this.data.form ? _this.data.form : _this.data;
	          _this.handleNoValue(_this.formLayout);
	          _this.handleRules(_this.formLayout);
	        }).catch(function (res) {
	          _this.$message({
	            showClose: true,
	            message: 'UI模板获取结构数据失败',
	            type: 'error'
	          });
	          // this.data = testjson;
	          // this.formLayout = this.parseColumnPanel(this.data);
	          // this.forms = this.data.form ? this.data.form : this.data;
	          // this.handleNoValue(this.formLayout);
	        });
	      } else if (this.pkTemp) {
	        this.$http({
	          url: '/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/' + 'queryTemplate?' + this.geturlencode({ pk_temp: this.pkTemp }),
	          method: 'get',
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	          }
	        }).then(function (res) {
	          _this.data = res.data;
	          _this.formLayout = _this.parseColumnPanel(_this.data);
	          _this.forms = _this.data.form ? _this.data.form : _this.data;
	          _this.handleNoValue(_this.formLayout);
	          _this.handleRules(_this.formLayout);
	        }).catch(function (res) {
	          _this.$message({
	            showClose: true,
	            message: 'UI模板获取结构数据失败',
	            type: 'error'
	          });
	          // this.data = testjson;
	          // this.formLayout = this.parseColumnPanel(this.data);
	          // this.forms = this.data.form ? this.data.form : this.data;
	          // this.handleNoValue(this.formLayout);
	        });
	      } else {
	        var structureWatcher = this.$watch(function () {
	          return this.structureData;
	        }, function () {
	          this.formLayout = this.parseColumnPanel(this.structureData);
	          this.forms = this.structureData.form ? this.structureData.form : this.structureData;
	          this.handleNoValue(this.formLayout);
	          this.handleRules(this.formLayout);
	          structureWatcher();
	        });
	        if (this.structureData) {
	          this.formLayout = this.parseColumnPanel(this.structureData);
	          this.forms = this.structureData.form ? this.structureData.form : this.structureData;
	          this.handleNoValue(this.formLayout);
	          this.handleRules(this.formLayout);
	          structureWatcher();
	        }
	      }
	    },
	    geturlencode: function geturlencode(data) {
	      var tmp = Object.keys(data);
	      tmp.forEach(function (v, i) {
	        tmp[i] = v + '=' + data[v];
	      });
	      return tmp.join('&');
	    },
	    handleNoValue: function handleNoValue(nodes) {
	      if (!this.templateValue) {
	        var childs = [];
	        var getAll = function getAll(array) {
	          if (array instanceof Array) {
	            array.forEach(function (node) {
	              childs.push(node);
	              if (node.layoutDetail) {
	                getAll(node.layoutDetail);
	              }
	            });
	          }
	        };
	        getAll(nodes);
	        childs = childs.filter(function (node) {
	          return ['Select', 'CheckBox', 'Email', 'Mobile', 'Text', 'Money', 'NumberComponent', 'TextArea', 'DateComponent', 'Reference', 'Grid'].indexOf(node.componentKey) > -1 && node.itemCode;
	        });
	        var tmpObj = {};
	        childs.forEach(function (node) {
	          var code = node.itemCode.split('.').pop();
	          tmpObj[code] = null;
	          // this.templateValue[code] = null;
	        });
	        this.$emit('setEmptyKeys', tmpObj);
	      }
	    },
	    parseColumnPanel: function parseColumnPanel(data) {
	      var compts = [];
	      var row = [];
	      var layoutDetail;
	      if (data.formLayout) {
	        layoutDetail = data.formLayout.layoutDetail.layoutDetail;
	      } else {
	        layoutDetail = data.layoutDetail;
	      }
	      if (layoutDetail.length === 1 && ['Grid', 'Table', 'DataTable'].indexOf(layoutDetail[0].componentKey) > -1) {
	        this.isGrid = true;
	        return [layoutDetail[0]];
	      }
	      for (var i = 0; i < layoutDetail.length; i++) {
	        if (layoutDetail[i].componentKey !== 'ColumnPanel') {
	          row.push(layoutDetail[i]);
	        } else {
	          for (var j = 0; j < layoutDetail[i].layoutDetail.length; j++) {
	            var tmp = layoutDetail[i].layoutDetail[j];
	            while (tmp && tmp.componentKey === 'ColumnPanel') {
	              tmp = tmp.layoutDetail[0];
	            }
	            if (tmp) {
	              row.push(tmp);
	            }
	          }
	        }
	        compts.push({ layoutDetail: row });
	        row = [];
	      }
	      // force the cols count of last row as same as others
	      if (!this.autoMergeCol) {
	        var cols = compts[0].layoutDetail.length;
	        compts.forEach(function (arr) {
	          arr.layoutDetail.forEach(function (component) {
	            component.colCountForDisplay = cols;
	          });
	        });
	      }
	      return compts;
	    },
	    handleRules: function handleRules(formLayout) {
	      var _this2 = this;

	      if (!this.rules) {
	        this.mergedRules = this.getDefaultRules(formLayout, {
	          hasRequire: false,
	          hasPattern: false
	        });
	      } else {
	        // do merge, check default rules first, then rules in props, someone need to edit template if they don't need default rules.
	        var flag = this.getRulesFlag(this.rules);
	        var rules = this.getDefaultRules(formLayout, flag);
	        Object.keys(this.rules).forEach(function (key) {
	          if (Object.prototype.toString.call(rules[key]) === '[object Array]') {
	            rules[key] = rules[key].concat(_this2.rules[key]); // defaultRules first
	          } else {
	            rules[key] = _this2.rules[key];
	          }
	        });
	        this.mergedRules = rules;
	      }
	    },
	    getDefaultRules: function getDefaultRules(formLayout, flag) {
	      if (flag.hasPattern && flag.hasRequire) {
	        return {};
	      }
	      var typesWithRules = ['Money', 'Phone', 'Email', 'Mobile', 'NumberComponent'];
	      var rules = {};
	      var component;
	      var itemCode;
	      var isTypesWithRules;
	      var insertRule;
	      var typesTriggerBlur = ['Text', 'TextArea', 'Money', 'Phone', 'Email', 'Mobile', 'NumberComponent'];
	      for (var i = 0; i < formLayout.length; i++) {
	        for (var j = 0; j < formLayout[i].layoutDetail.length; j++) {
	          component = formLayout[i].layoutDetail[j];
	          isTypesWithRules = typesWithRules.indexOf(component.componentKey) > -1;
	          if ((isTypesWithRules || component.required) && component.isDisplay) {
	            itemCode = component.itemCode.split('.').pop();
	            if (component.required && (!flag[itemCode] || !flag[itemCode].hasRequire)) {
	              insertRule = {
	                type: component.componentKey === 'DateComponent' ? 'number' : 'string',
	                required: true,
	                message: component.title + '不能为空',
	                trigger: typesTriggerBlur.indexOf(component.componentKey) > -1 ? 'blur' : 'change'
	              };
	              rules[itemCode] ? rules[itemCode].push(insertRule) : rules[itemCode] = [insertRule];
	            }
	            if (isTypesWithRules && (!flag[itemCode] || !flag[itemCode].hasPattern)) {
	              var pattern;
	              switch (component.componentKey) {
	                case 'Money':
	                case 'Phone':
	                case 'Mobile':
	                case 'NumberComponent':
	                  pattern = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
	                  break;
	                case 'Email':
	                  pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
	                  break;
	                default:
	                  break;
	              }
	              insertRule = {
	                pattern: pattern,
	                message: component.title + '格式错误',
	                trigger: 'blur'
	              };
	              rules[itemCode] ? rules[itemCode].push(insertRule) : rules[itemCode] = [insertRule];
	            }
	          }
	        }
	      }
	      return rules;
	    },
	    getRulesFlag: function getRulesFlag(rules) {
	      var hasRequire;
	      var hasPattern;
	      var flag = {};
	      if (Object.prototype.toString.call(rules) === '[object Object]') {
	        Object.keys(rules).forEach(function (key) {
	          hasRequire = false;
	          hasPattern = false;
	          for (var i = 0; i < rules[key].length; i++) {
	            if (rules[key][i].required) {
	              hasRequire = true;
	            }
	            if (rules[key][i].pattern) {
	              hasPattern = true;
	            }
	            if (hasRequire && hasPattern) {
	              break;
	            }
	          }
	          flag[key] = {
	            hasRequire: hasRequire,
	            hasPattern: hasPattern
	          };
	        });
	      }
	      return flag;
	    },

	    //  setValue: function(data) {
	    //    this.templateValue = data;
	    //  },
	    // getValue: function() {
	    //   return JSON.parse(JSON.stringify(this.templateValue));
	    // },
	    eventHandle: function eventHandle(event, data) {
	      this.$emit(event, data);
	      // this.templateValue[index] = value;
	    },
	    validate: function validate(cb) {
	      this.$children[0].$refs.form.validate.call('', cb);
	    },
	    validateField: function validateField() {
	      this.$children[0].$refs.form.validateField.apply('', arguments);
	    },
	    resetFields: function resetFields() {
	      this.$children[0].$refs.form.resetFields.call();
	    }
	  },
	  created: function created() {

	    this.request();
	    // var data = this.data;
	    // var data = testData;
	  },

	  components: {
	    'yon-form': _Form2.default,
	    'yon-grid': _grid2.default
	  },
	  props: ['tplCode', 'isEdit', 'pkTemp', 'rules', 'structureData', 'hideTitle', 'refQueryParams', 'templateValue', 'showButton', 'showType', 'showBorder', 'align', 'sortable', 'indexLabel', 'headerAlign', 'gridStyle', 'tableStyle', 'expand', 'defaultExpandAll', 'expandRowKeys', 'rowKey', 'imgUrl', 'autoMergeCol', 'hoverShowButton', 'elcolumnStyle', 'highlightCurrentRow']
	};

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(572)
	  __webpack_require__(574)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(576),
	  /* template */
	  __webpack_require__(631),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-6b1b01b4",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(573);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("06cfdc16", content, true);

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.yon-form.el-form--inline .el-form-item{\r\n  margin-right: 0px;\r\n  padding-bottom: 0px;\n}\n.yon-form.view .el-form-item.is-required .el-form-item__label:after{\r\n  display: none;\n}\n.yon-form .el-form-item__error{\r\n  width: 100%;\r\n  overflow: hidden;\r\n  white-space: nowrap;\n}\r\n", ""]);

	// exports


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(575);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("62383718", content, true);

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.required-flag[data-v-6b1b01b4] {\r\n  color: red;\r\n  display: inline-block;\r\n  width: 10px;\r\n  visibility: hidden;\r\n  vertical-align: top;\r\n  font-size: 14px;\r\n  line-height: 16px;\r\n  padding-bottom: 10px;\r\n  padding-top: 10px;\n}\n.required-flag.required[data-v-6b1b01b4]{\r\n  visibility: visible;\n}\r\n", ""]);

	// exports


/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Select = __webpack_require__(577);

	var _Select2 = _interopRequireDefault(_Select);

	var _Input = __webpack_require__(587);

	var _Input2 = _interopRequireDefault(_Input);

	var _Datepicker = __webpack_require__(592);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	var _Table = __webpack_require__(597);

	var _Table2 = _interopRequireDefault(_Table);

	var _refDialog = __webpack_require__(603);

	var _refDialog2 = _interopRequireDefault(_refDialog);

	var _grid = __webpack_require__(626);

	var _grid2 = _interopRequireDefault(_grid);

	var _image = __webpack_require__(613);

	var _image2 = _interopRequireDefault(_image);

	var _checkBox = __webpack_require__(620);

	var _checkBox2 = _interopRequireDefault(_checkBox);

	var _toolTip = __webpack_require__(581);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'tplForm',
	  data: function data() {
	    var width = '200px';
	    var isInline = true;
	    return {
	      labelWidth: width,
	      isInline: isInline,
	      map: {
	        Select: 'yon-select',
	        CheckBox: 'yon-checkbox',
	        Text: 'yon-input',
	        Money: 'yon-input',
	        Phone: 'yon-input',
	        Email: 'yon-input',
	        Mobile: 'yon-input',
	        NumberComponent: 'yon-input',
	        TextArea: 'yon-input',
	        DateComponent: 'yon-datepicker',
	        TableLayout: 'yon-table',
	        ImageComponent: 'yon-image',
	        Reference: 'yon-ref',
	        // Grid: 'tplForm',
	        Grid: 'yon-grid',
	        DataTable: 'tplForm',
	        GroupTable: 'ElTemplate'
	      },
	      validateStatus: '',
	      itemCount: 2,
	      extraClass: '',
	      noLabel: ['GroupTable', 'Grid', 'TableLayout']
	    };
	  },

	  methods: {
	    trigger: function trigger(event, data) {
	      this.$emit('trigger', event, data);
	    },
	    isRowDisplay: function isRowDisplay(row) {
	      var tmp = false;
	      row.forEach(function (item) {
	        tmp = tmp || item.isDisplay;
	      });
	      return tmp;
	    },
	    isItemShow: function isItemShow(item) {
	      var visible = Object.prototype.toString.call(item.isDisplay) === '[object Boolean]' ? item.isDisplay : true;
	      return visible ? 'visible' : 'hidden';
	    },
	    getItemCode: function getItemCode(item) {
	      return item.itemCode ? item.itemCode.split('.').pop() : '';
	    },
	    handleTitle: function handleTitle(content) {
	      return content.substr(0, content.length - 2);
	    }
	  },
	  watch: {
	    isEdit: function isEdit() {
	      if (!this.isEdit) {
	        this.validateStatus = '' + new Date().getTime();
	      }
	    }
	  },
	  created: function created() {
	    // this.adjustStyle();
	  },

	  props: ['data', 'templateValue', 'isEdit', 'rules', 'refQueryParams'],
	  components: {
	    'tooltip': _toolTip2.default,
	    'yon-select': _Select2.default,
	    'yon-input': _Input2.default,
	    // 'yon-label':label,
	    'yon-datepicker': _Datepicker2.default,
	    'yon-table': _Table2.default,
	    'yon-ref': _refDialog2.default,
	    'yon-image': _image2.default,
	    'yon-grid': _grid2.default,
	    'yon-checkbox': _checkBox2.default
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

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(578)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(580),
	  /* template */
	  __webpack_require__(586),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-4eccfe44",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(579);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("0165b942", content, true);

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _toolTip = __webpack_require__(581);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      code: ''
	    };
	  },

	  components: {
	    tooltip: _toolTip2.default
	  },
	  computed: {
	    label: function label() {
	      var tmp;
	      var code = this.templateValue[this.code];
	      for (var i = 0; i < this.data.options.length; i++) {
	        if (this.data.options[i].selectionId === code) {
	          tmp = this.data.options[i].name;
	          break;
	        }
	      }
	      return tmp;
	    }
	    //    value() {
	    //      return (this.templateValue[this.code] !== undefined && this.templateValue[this.code] !== null) ? this.templateValue[this.code].toString() : this.templateValue[this.code];
	    //    }

	  },
	  methods: {
	    changeHandle: function changeHandle(v) {
	      this.templateValue[this.code] = v;
	      var data = {
	        key: this.code,
	        value: v
	      };
	      this.$emit('trigger', 'change', data);
	    }
	  },
	  props: ['data', 'templateValue', 'isEdit'],
	  created: function created() {
	    this.code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
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

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(582)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(584),
	  /* template */
	  __webpack_require__(585),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-62242b11",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(583);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("79398790", content, true);

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.tooltip-content[data-v-62242b11] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: inline-block;\n  vertical-align: top;\n  width: 100%;\n}\n", ""]);

	// exports


/***/ }),

/***/ 584:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//
	//
	//
	//

	exports.default = {
	  data: function data() {
	    return {
	      disabled: true
	    };
	  },

	  props: {
	    content: String,
	    handler: Function
	  },
	  computed: {
	    title: function title() {
	      return typeof this.handler === 'function' ? this.handler.call('', this.content) : this.content;
	    }
	  },
	  mounted: function mounted() {
	    var dom = this.$refs.content;
	    if (dom && dom.offsetWidth < dom.scrollWidth) {
	      this.disabled = false;
	    }
	  },
	  updated: function updated() {
	    var dom = this.$refs.content;
	    if (dom && dom.offsetWidth < dom.scrollWidth) {
	      this.disabled = false;
	    }
	  }
	};

/***/ }),

/***/ 585:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-tooltip', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "content": _vm.title,
	      "placement": "top"
	    }
	  }, [_c('span', {
	    ref: "content",
	    staticClass: "tooltip-content"
	  }, [_vm._t("default", [_vm._v(_vm._s(_vm.content))])], 2)])
	},staticRenderFns: []}

/***/ }),

/***/ 586:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.isEdit) ? _c('el-select', {
	    attrs: {
	      "placeholder": ""
	    },
	    on: {
	      "change": _vm.changeHandle
	    },
	    model: {
	      value: (_vm.templateValue[_vm.code]),
	      callback: function($$v) {
	        var $$exp = _vm.templateValue,
	          $$idx = _vm.code;
	        if (!Array.isArray($$exp)) {
	          _vm.templateValue[_vm.code] = $$v
	        } else {
	          $$exp.splice($$idx, 1, $$v)
	        }
	      },
	      expression: "templateValue[code]"
	    }
	  }, _vm._l((_vm.data.options), function(item) {
	    return _c('el-option', {
	      attrs: {
	        "label": item.name,
	        "value": item.selectionId
	      }
	    })
	  })) : _c('div', {
	    staticClass: "tpl-label"
	  }, [_c('tooltip', {
	    attrs: {
	      "content": _vm.label
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(588)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(590),
	  /* template */
	  __webpack_require__(591),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-ff44e650",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(589);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("008812d3", content, true);

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _toolTip = __webpack_require__(581);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    var code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
	    var typeMap = {
	      TextArea: 'textarea',
	      Money: 'money',
	      Phone: 'text',
	      Mobile: 'text',
	      Email: 'text'
	    };
	    var moneyMap = {
	      人民币: 'CNY(¥)',
	      美元: 'U.S.($)',
	      日元: 'JPY(¥)',
	      欧元: 'EUR(€)',
	      港币: 'HKD($)',
	      台币: 'NT($)'
	    };
	    return {
	      type: typeMap[this.data.componentKey] ? typeMap[this.data.componentKey] : 'text',
	      code: code,
	      symbol: moneyMap[this.data.moneyType] ? moneyMap[this.data.moneyType] : 'CNY(¥)',
	      decimals: this.data.decimalPlace,
	      comma: true
	    };
	  },

	  components: {
	    tooltip: _toolTip2.default
	  },
	  props: ['data', 'templateValue', 'isEdit'],
	  methods: {
	    handleInput: function handleInput() {
	      var value = this.templateValue[this.code];
	      var data = {
	        key: this.code,
	        value: value
	      };
	      this.$emit('trigger', 'change', data);
	    }
	  },
	  // watch:{
	  //   code(a,b){
	  //     this.value = this.templateValue[this.code];
	  //   }
	  // },
	  created: function created() {}
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

/***/ }),

/***/ 591:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.isEdit) ? _c('el-input', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.data.isDisplay == true),
	      expression: "data.isDisplay==true"
	    }],
	    style: ({
	      width: _vm.data.width,
	      display: 'inline-block'
	    }),
	    attrs: {
	      "placeholder": "",
	      "type": _vm.type,
	      "size": "small",
	      "id": _vm.data.fieldId,
	      "width": _vm.data.width,
	      "disabled": _vm.data.readOnly,
	      "symbol": _vm.symbol,
	      "decimals": _vm.decimals,
	      "comma": _vm.comma
	    },
	    nativeOn: {
	      "keyup": function($event) {
	        _vm.handleInput($event)
	      }
	    },
	    model: {
	      value: (_vm.templateValue[_vm.code]),
	      callback: function($$v) {
	        var $$exp = _vm.templateValue,
	          $$idx = _vm.code;
	        if (!Array.isArray($$exp)) {
	          _vm.templateValue[_vm.code] = $$v
	        } else {
	          $$exp.splice($$idx, 1, $$v)
	        }
	      },
	      expression: "templateValue[code]"
	    }
	  }) : _c('div', {
	    staticClass: "tpl-label"
	  }, [_c('tooltip', {
	    attrs: {
	      "content": _vm.templateValue[_vm.code]
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(593)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(595),
	  /* template */
	  __webpack_require__(596),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-6d98349e",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(594);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("5b610e6e", content, true);

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _toolTip = __webpack_require__(581);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    var code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
	    var holder = '年-月-日'; // this.data.format=='YYYY-MM-DD'?
	    return {
	      holder: holder,
	      format: '',
	      value: '',
	      pickerOptions0: {},
	      code: code
	    };
	  },

	  components: {
	    tooltip: _toolTip2.default
	  },
	  computed: {
	    label: function label() {
	      var tmp;
	      if (this.value) {
	        tmp = new Date(this.value).toLocaleDateString();
	      } else {
	        tmp = '';
	      }
	      return tmp;
	    }
	  },
	  methods: {
	    changeHandle: function changeHandle(v) {
	      if (v) {
	        this.templateValue[this.code] = Date.parse(new Date(v));
	      } else {
	        this.templateValue[this.code] = null;
	      }
	      var data = {
	        key: this.code,
	        value: v
	      };
	      this.$emit('trigger', 'change', data);
	    }
	  },
	  created: function created() {
	    this.valueWatcher = this.$watch(function () {
	      return this.templateValue;
	    }, function () {
	      if (this.templateValue[this.code] !== null) {
	        this.value = new Date(this.templateValue[this.code]).toISOString();
	        // this.valueWatcher();
	      } else {
	        this.value = '';
	      }
	    }.bind(this), { deep: true });
	    if (this.templateValue && this.templateValue[this.code] !== null) {
	      this.value = new Date(this.templateValue[this.code]).toISOString();
	      // this.valueWatcher();
	    }
	  },

	  props: ['data', 'templateValue', 'isEdit']
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

/***/ }),

/***/ 596:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.isEdit) ? _c('el-date-picker', {
	    attrs: {
	      "type": "date",
	      "placeholder": _vm.holder,
	      "format": _vm.format,
	      "disabled": _vm.data.isReadonly,
	      "picker-options": _vm.pickerOptions0
	    },
	    on: {
	      "change": _vm.changeHandle
	    },
	    model: {
	      value: (_vm.value),
	      callback: function($$v) {
	        _vm.value = $$v
	      },
	      expression: "value"
	    }
	  }) : _c('div', {
	    staticClass: "tpl-label"
	  }, [_c('tooltip', {
	    attrs: {
	      "content": _vm.label
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(598)
	  __webpack_require__(600)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(602),
	  /* template */
	  __webpack_require__(625),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-b7ce6248",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(599);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("28b70213", content, true);

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(601);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("7164c4ba", content, true);

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.required-flag[data-v-b7ce6248] {\r\n  color: red;\r\n  display: inline-block;\r\n  width: 10px;\r\n  visibility: hidden;\n}\n.required-flag.required[data-v-b7ce6248]{\r\n  visibility: visible;\n}\n.table-container[data-v-b7ce6248]{\r\n  overflow: auto;\n}\n.billitem-label-content[data-v-b7ce6248]{\r\n  width:100px;\n}\n.fieldset[data-v-b7ce6248]{\r\n  height:37px;\n}\n.norequired-div-vertical[data-v-b7ce6248] {\r\n    max-width: 170px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\n}\n.norequired-div-hoz[data-v-b7ce6248] {\r\n    max-width: 118px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    float: left;\n}\nlabel[data-v-b7ce6248] {\r\n    color: #48576a;\r\n    padding-left: 10px;\r\n    width:100px;\n}\n.label-hoz[data-v-b7ce6248] {\r\n    width: 135px;\r\n    text-align: right;\r\n    padding-top: 4px;\r\n    vertical-align: middle;\n}\r\n", ""]);

	// exports


/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Select = __webpack_require__(577);

	var _Select2 = _interopRequireDefault(_Select);

	var _Input = __webpack_require__(587);

	var _Input2 = _interopRequireDefault(_Input);

	var _Datepicker = __webpack_require__(592);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	var _refDialog = __webpack_require__(603);

	var _refDialog2 = _interopRequireDefault(_refDialog);

	var _image = __webpack_require__(613);

	var _image2 = _interopRequireDefault(_image);

	var _checkBox = __webpack_require__(620);

	var _checkBox2 = _interopRequireDefault(_checkBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  data: function data() {
	    // var display=this.data.titleLayout==='field-hoz'?'block':'inline-block';
	    return {
	      table: [],
	      tableWidth: '',
	      containerWidth: '',
	      maxcols: 1,
	      map: {
	        Select: 'yon-select',
	        CheckBox: 'yon-checkbox',
	        Text: 'yon-input',
	        Money: 'yon-input',
	        Phone: 'yon-input',
	        Email: 'yon-input',
	        Mobile: 'yon-input',
	        NumberComponent: 'yon-input',
	        Label: 'yon-label',
	        TextArea: 'yon-input',
	        DateComponent: 'yon-datepicker',
	        ImageComponent: 'yon-image',
	        Reference: 'yon-ref'
	      }
	    };
	  },

	  props: ['data', 'templateValue', 'isEdit'],
	  methods: {
	    removeBlank: function removeBlank() {
	      var table = [];
	      var maxcols = 0;
	      var tmp = [];
	      var dump = '';
	      var count = 0;
	      for (var row = 0; row < this.data.rows; row++) {
	        for (var col = 0; col < this.data.cols; col++) {
	          count = row * this.data.cols;
	          dump = this.data.layoutDetail[count + col].layoutDetail ? this.data.layoutDetail[count + col].layoutDetail : [];
	          if (dump.length > 0) {
	            tmp.push(dump[0]);
	          }
	        }
	        if (tmp.length > 0) {
	          table.push(tmp);
	          if (tmp.length > maxcols) {
	            maxcols = tmp.length;
	          }
	          tmp = [];
	        }
	      }
	      this.maxcols = maxcols;
	      return table;
	    },
	    trigger: function trigger(event, value) {
	      this.$emit('trigger', event, value);
	    },
	    getComponents: function getComponents(data) {
	      var tmp = [];
	      data.forEach(function (v) {
	        v.forEach(function (item) {
	          tmp.push(item);
	        });
	      });
	      return tmp;
	    }
	  },
	  components: {
	    'yon-select': _Select2.default,
	    'yon-input': _Input2.default,
	    'yon-datepicker': _Datepicker2.default,
	    'yon-ref': _refDialog2.default,
	    'yon-image': _image2.default,
	    'yon-checkbox': _checkBox2.default
	  },
	  created: function created() {
	    this.table = this.getComponents(this.removeBlank());
	    this.tableWidth = 330 * this.maxcols;
	    this.containerWidth = this.maxcols > 2 ? 960 + this.maxcols * 10 + 'px' : '100%';
	  }
	};

/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(604)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(606),
	  /* template */
	  __webpack_require__(612),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(605);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("98cdc1fc", content, true);

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*.ref-container .el-dialog__body{\n  height:380px;\n}\n.ref-container .el-tree>.el-tree-node>.el-tree-node__children{\n  height: 271px;\n  overflow: auto;\n}\n.ref-container .el-tree,.ref-container .el-tree>.el-tree-node.is-expanded{\n  height: 308px;\n  overflow: hidden;\n}*/\n.ref-container .el-tree > .el-tree-node > .el-tree-node__children {\n}\n.ref-container .el-tree > .el-tree-node.is-expanded {\n    overflow: hidden;\n}\n.ref-container .el-tree {\n    overflow: auto;\n    height: 308px;\n}\n.ref-container .el-dialog__body {\n    height: 380px;\n    box-sizing: content-box;\n}\n.yon-form .ref-dialog .el-input {\n    width: 100%;\n}\n.yon-form .ref-dialog .el-input__inner {\n    width: 100%;\n}\n", ""]);

	// exports


/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _ref = __webpack_require__(607);

	var _ref2 = _interopRequireDefault(_ref);

	var _toolTip = __webpack_require__(581);

	var _toolTip2 = _interopRequireDefault(_toolTip);

	var _clickoutside = __webpack_require__(19);

	var _clickoutside2 = _interopRequireDefault(_clickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      refData: '',
	      value: '',
	      selected: [],
	      refInfo: '',
	      code: '',
	      dialogVisible: false,
	      timeid: false,
	      infoPromise: false
	    };
	  },

	  props: ['data', 'templateValue', 'isEdit', 'refQueryParams'],
	  directives: {
	    Clickoutside: _clickoutside2.default
	  },
	  components: {
	    refDialog: _ref2.default,
	    tooltip: _toolTip2.default
	  },
	  methods: {
	    init: function init() {
	      var _this = this;

	      if (this.templateValue[this.code] !== null) {
	        var tail = '_ref';
	        if (this.templateValue.beanMap) {
	          var data = this.templateValue.beanMap[this.code + tail];
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
	      //   if (this.templateValue[this.code]) {
	      //     var refUrl = this.refInfo.refModelUrl;
	      //     var refParam = refUrl.split('/');
	      //     if (refUrl[refUrl.length - 1] === '/') {
	      //       refParam = refParam[refParam.length - 2];
	      //     } else {
	      //       refParam = refParam[refParam.length - 1];
	      //     }
	      //     var tmp = this.templateValue[this.code].split(',');
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
	      if (!this.data.readOnly) {
	        this.value = '';
	        this.selected = [];
	        this.templateValue[this.code] = '';
	      }
	    },
	    handleChange: function handleChange(value) {
	      if (value === '') {
	        this.reset();
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
	      this.templateValue[this.code] = temp;
	      console.log(this.selected);
	      var payload = {
	        key: this.code,
	        value: this.selected
	      };
	      this.$emit('trigger', 'change', payload);
	    },

	    showDialog: function showDialog() {
	      if (!this.data.readOnly) {
	        this.request();
	      }
	      /* this.dialogVisible=false;
	       this.$nextTick(() => {
	       this.dialogVisible=true;
	       });*/
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
	      var params;
	      if (this.templateValue['base_doc_type'] && this.code === 'pk_base_doc') {
	        params = 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['base_doc_type']);
	      } else if (this.templateValue['pk_org'] && this.code === 'pk_dept') {
	        params = 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['pk_org']);
	      } else {
	        params = 'content=' + encodeURIComponent(searchStr) + '&refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl);
	      }
	      this.$http({
	        url: '/uitemplate_web/iref_ctr/filterRefJSON',
	        method: 'post',
	        data: params + this.urlParams
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
	    },
	    requestInfo: function requestInfo() {
	      var _this3 = this;

	      var url = '/uitemplate_web/iref_ctr/refInfo/?refCode=' + this.data.contMeta.refcode;
	      /* eslint-disable no-undef */
	      this.infoPromise = new Promise(function (res) {
	        /* eslint-enable no-undef */
	        var getRefType = _this3.$http({
	          url: url + _this3.urlParams,
	          method: 'get'
	        });
	        getRefType.then(function (refInfo) {
	          _this3.refInfo = refInfo.data;
	          res();
	        });
	      });
	    },
	    request: function request() {
	      var _this4 = this;

	      var getRef;
	      // code为dept的参照需要额外传值
	      if (this.refInfo.refCode === 'dept') {
	        var tmp = location.hash.split('?')[1];
	        var dept_org = tmp ? tmp.split('=')[1] : '';
	        var params;
	        if (this.code === 'pk_dept') {
	          params = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['pk_org']);
	        } else {
	          params = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&pk_org=' + encodeURIComponent(dept_org);
	        }
	        getRef = this.$http({
	          url: '/uitemplate_web/iref_ctr/commonRefsearch',
	          method: 'post',
	          data: params + this.urlParams,
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	          }
	        });
	      } else {
	        var refGridTreeData;
	        var data;
	        if (this.templateValue['base_doc_type'] && this.code === 'pk_base_doc') {
	          // 参照为关联身份时候的额外传值
	          refGridTreeData = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['base_doc_type']);
	          data = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['base_doc_type']);
	        } else if (this.templateValue['pk_org'] && this.code === 'pk_dept') {
	          refGridTreeData = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['pk_org']);
	          data = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl) + '&condition=' + encodeURIComponent(this.templateValue['pk_org']);
	        } else {
	          refGridTreeData = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl);
	          data = 'refModelUrl=' + encodeURIComponent(this.refInfo.refModelUrl);
	        }
	        if (this.refInfo.refUIType === 'RefGridTree') {
	          getRef = this.$http({
	            url: '/uitemplate_web/iref_ctr/blobRefClassSearch',
	            method: 'post',
	            data: refGridTreeData + this.urlParams,
	            headers: {
	              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	            }
	          });
	        } else {
	          getRef = this.$http({
	            url: '/uitemplate_web/iref_ctr/commonRefsearch',
	            method: 'post',
	            data: data + this.urlParams,
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

	    this.code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
	    this.urlParams = '';
	    if (this.refQueryParams && this.refQueryParams instanceof Array && this.refQueryParams.length > 0) {
	      for (var i = 0; i < this.refQueryParams.length; i++) {
	        var nowQueryParams = this.refQueryParams[i];
	        var itemCode = nowQueryParams.itemCode;
	        if (itemCode === this.data.itemCode) {
	          this.urlParams += '&transmitParam=' + encodeURIComponent(JSON.stringify(this.refQueryParams[0].params));
	          break;
	        }
	      }
	    }
	    this.valueWatcher = this.$watch(function () {
	      return this.templateValue;
	    }, function () {
	      if (this.templateValue && this.templateValue[this.code] !== null) {
	        this.init();
	        this.valueWatcher();
	      }
	    }.bind(this), { deep: true });
	    if (this.templateValue && this.templateValue[this.code] !== null) {
	      this.init();
	    }
	    this.$on('closeDialog', function () {
	      _this5.dialogVisible = false;
	    });
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
	//
	//
	//
	//
	//
	//

	/* eslint-disable */

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(608)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(610),
	  /* template */
	  __webpack_require__(611),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-358f2ec1",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(609);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("3af18585", content, true);

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.el-tree[data-v-358f2ec1] {\n    border-bottom: none;\n}\n.ufold[data-v-358f2ec1] {\n  position: absolute;\n  top:1rem;\n  display: none;\n}\n.ufold i[data-v-358f2ec1] {\n  font-size: 18px;\n  color: #bfcbd9;\n}\n.ufold i[data-v-358f2ec1]:hover {\n  color:#20a0ff;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _clickoutside = __webpack_require__(19);

	var _clickoutside2 = _interopRequireDefault(_clickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: ['data', 'dialogVisible', 'refData', 'children', 'label', 'tableDc', 'refInfo', 'savedSelected'],
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
	        vm.size = 'full';
	        if (vm.refInfo.refUIType === 'RefGridTree') {
	          vm.styleTree = { width: '34%', position: 'absolute', left: '-34%' };
	          vm.styleTable = { width: '100%' };
	          vm.listData = [];
	          vm.tableData = [];
	          vm.treeData = vm.refData.data;
	          if (urefFold) {
	            urefFold.style.display = 'block';
	          }
	        } else if (vm.refInfo.refUIType === 'RefGrid') {
	          vm.styleTree = { width: '0%' };
	          vm.styleTable = { width: '100%' };
	          vm.treeData = [];
	          vm.listData = [];
	          vm.tableData = vm.refData.data;
	        } else if (vm.refInfo.refUIType === 'RefTree') {
	          vm.styleTree = { width: '100%' };
	          vm.styleTable = { width: '0%' };
	          vm.tableData = [];
	          vm.listData = [];
	          vm.treeData = vm.refData.data;
	        }
	      } else if (vm.urefClientWidth >= 767) {

	        if (vm.refInfo.refUIType === 'RefGridTree') {
	          vm.size = 'large';
	          vm.styleTree = { width: '40%' };
	          vm.styleTable = { width: '60%' };
	          vm.listData = [];
	          vm.tableData = [];
	          vm.treeData = vm.refData.data;
	          if (urefFold) {
	            urefFold.style.display = 'none';
	          }
	        } else if (vm.refInfo.refUIType === 'RefGrid') {
	          vm.size = 'small';
	          vm.styleTree = { width: '0%' };
	          vm.styleTable = { width: '100%' };
	          vm.treeData = [];
	          vm.listData = [];
	          vm.tableData = vm.refData.data;
	        } else if (vm.refInfo.refUIType === 'RefTree') {
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
	          document.querySelector('.ufold').style.display = 'block';
	          this.styleTree = { width: '30%', position: 'absolute', left: '-30%' };
	          this.rflag = true;
	        }
	      }
	    },
	    ufoldClick: function ufoldClick(event) {
	      if (this.rflag) {
	        event.currentTarget.style.display = 'none';
	        this.styleTree = { width: '70%', position: 'absolute', left: '0', zIndex: '1000' };
	        this.rflag = false;
	      } else {
	        event.currentTarget.style.display = 'block';
	        this.rflag = true;
	      }
	    },
	    adjustRefData: function adjustRefData() {
	      this.tableHeight = this.refInfo.refUIType === 'RefGridTree' ? 345 : 309;
	      switch (this.refInfo.refUIType) {
	        case 'RefGridTree':
	          this.size = 'large';
	          this.styleTree = { width: '34%' };
	          this.styleTable = { width: '66%' };
	          this.listData = [];
	          this.tableData = [];
	          this.treeData = this.refData.data;
	          break;
	        case 'RefGrid':
	          this.size = 'small';
	          this.styleTree = { width: '0%' };
	          this.styleTable = { width: '100%' };
	          this.treeData = [];
	          this.listData = [];
	          this.tableData = this.refData.data;
	          break;
	        case 'RefTree':
	          this.size = 'small';
	          this.styleTree = { width: '100%' };
	          this.styleTable = { width: '0%' };
	          this.tableData = [];
	          this.listData = [];
	          this.treeData = this.refData.data;
	          break;
	        case 'CommonRef':
	          this.size = 'small';
	          this.styleTree = { width: '0%' };
	          this.styleTable = { width: '100%' };
	          this.tableData = this.refData.data;
	          this.treeData = [];
	          // this.listData = this.refData;
	          break;
	        default:
	          this.size = 'small';
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
	      if (!this.data.isMutiSelect) {
	        this.$emit('onSelectData', data);
	        this.closeDialog();
	      }
	    },
	    handleNodeClick: function handleNodeClick(data) {
	      if (this.refInfo.refUIType === 'RefGridTree') {
	        this.loadList(data);
	      } else if (!this.data.isMutiSelect) {
	        this.$emit('onSelectData', data);
	        this.closeDialog();
	      }
	    },
	    handleCheckChange: function handleCheckChange(data) {
	      if (this.data.isMutiSelect) {
	        this.selected = this.$refs.reftree.getCheckedNodes();
	      }
	    },
	    handleTabSelectChange: function handleTabSelectChange(selection) {
	      if (this.data.isMutiSelect) {
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
	      if (!this.data.isMutiSelect) {
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

/***/ 611:
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
	      "show-checkbox": _vm.data.isMutiSelect && _vm.refInfo.refUIType !== 'RefGridTree',
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
	  }, [(_vm.data.isMutiSelect && _vm.refInfo.refUIType !== 'RefTree') ? _c('el-table-column', {
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
	  })], 2)], 1)])]), (_vm.data.isMutiSelect) ? _c('el-tab-pane', {
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

/***/ 612:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ref-container"
	  }, [(_vm.isEdit) ? _c('el-autocomplete', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (true),
	      expression: "true"
	    }],
	    style: ({
	      width: _vm.data.width,
	      display: 'inline-block'
	    }),
	    attrs: {
	      "placeholder": "",
	      "icon": "pt-fenlei1",
	      "size": "small",
	      "disabled": _vm.data.readOnly,
	      "id": _vm.data.fieldId,
	      "width": _vm.data.width,
	      "on-icon-click": _vm.showDialog,
	      "fetch-suggestions": _vm.getSuggestions
	    },
	    on: {
	      "select": _vm.onSelectData,
	      "input": _vm.handleChange
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
	  }, [_vm._v("清空")])], 1) : _vm._e()], 2) : _c('div', {
	    staticClass: "tpl-label"
	  }, [_c('tooltip', {
	    attrs: {
	      "content": _vm.value
	    }
	  })], 1), _c('refDialog', {
	    attrs: {
	      "data": _vm.data,
	      "dialogVisible": _vm.dialogVisible,
	      "refInfo": _vm.refInfo,
	      "savedSelected": _vm.selected,
	      "refData": _vm.refData,
	      "label": "label",
	      "tableDc": "/table.json"
	    },
	    on: {
	      "onSelectData": _vm.onSelectData
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(614)
	  __webpack_require__(616)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(618),
	  /* template */
	  __webpack_require__(619),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-6ed58e09",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(615);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("80cf7ff6", content, true);

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.avatar-uploader .el-upload {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.el-upload input[type=file] {\n  display: none;\n}\n.avatar-uploader .el-upload:hover {\n  border-color: #20a0ff;\n}\n.avatar-uploader-icon {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(617);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("a15b7e92", content, true);

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.avatar[data-v-6ed58e09] {\n  width: 178px;\n  height: 178px;\n  display: block;\n  border-radius: 0px;\n}\n", ""]);

	// exports


/***/ }),

/***/ 618:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
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

	exports.default = {
	  data: function data() {
	    return {
	      code: '',
	      imgUrl: '',
	      headers: {
	        apikey: 'system'
	      }
	    };
	  },

	  props: ['templateValue', 'data', 'isEdit'],
	  methods: {
	    handleAvatarSuccess: function handleAvatarSuccess(res) {
	      if (res.success === true) {
	        this.templateValue[this.code] = res.data;
	        this.templateValue[this.code] === undefined ? this.imgUrl = '' : this.imgUrl = '/ifbp-app-bd/bd/psn/psndoc/avatarImgDownLoad?avatar=' + this.templateValue[this.code];
	      } else if (res.success === false) {
	        this.$message({
	          message: res.error.errorMessage,
	          type: 'error'
	        });
	      }
	    },
	    handleAvatarError: function handleAvatarError() {
	      this.$message({
	        message: '上传失败!',
	        type: 'error'
	      });
	    },
	    beforeAvatarUpload: function beforeAvatarUpload(file) {
	      // const isJPG = file.type === 'image/jpeg';
	      var isLt2M = file.size / 1024 / 1024 < 2;

	      // if (!isJPG) {
	      //   this.$message.error('上传头像图片只能是 JPG 格式!');
	      // }
	      if (!isLt2M) {
	        this.$message.error('上传头像图片大小不能超过 2MB!');
	      }
	      // return isJPG && isLt2M;
	      return isLt2M;
	    }
	  },
	  created: function created() {
	    this.code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
	    this.valueWatcher = this.$watch(function () {
	      return this.templateValue;
	    }, function () {
	      if (this.templateValue[this.code]) {
	        this.imgUrl = '/ifbp-app-bd/bd/psn/psndoc/avatarImgDownLoad?avatar=' + this.templateValue[this.code];
	        this.valueWatcher();
	      }
	    }.bind(this), { deep: true });
	    if (this.templateValue && Object.keys(this.templateValue).length > 0) {
	      if (this.templateValue[this.code]) {
	        this.imgUrl = '/ifbp-app-bd/bd/psn/psndoc/avatarImgDownLoad?avatar=' + this.templateValue[this.code];
	      } else {
	        this.imgUrl = false;
	      }
	      this.valueWatcher();
	    }
	  }
	};

/***/ }),

/***/ 619:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.isEdit) ? _c('el-upload', {
	    staticClass: "avatar-uploader",
	    attrs: {
	      "action": "/ifbp-app-bd/bd/psn/psndoc/avatarImgUpload",
	      "headers": _vm.headers,
	      "show-file-list": false,
	      "on-success": _vm.handleAvatarSuccess,
	      "on-error": _vm.handleAvatarError,
	      "before-upload": _vm.beforeAvatarUpload
	    }
	  }, [(_vm.imgUrl) ? _c('img', {
	    staticClass: "avatar",
	    attrs: {
	      "src": _vm.imgUrl
	    }
	  }) : _c('i', {
	    staticClass: "el-icon-plus\n                   avatar-uploader-icon"
	  })]) : _c('img', {
	    staticClass: "avatar",
	    attrs: {
	      "src": _vm.imgUrl
	    }
	  })
	},staticRenderFns: []}

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(621)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(623),
	  /* template */
	  __webpack_require__(624),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-57197536",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(622);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("2266051a", content, true);

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ }),

/***/ 623:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
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

	exports.default = {
	  data: function data() {
	    return {
	      code: '',
	      checkedOptions: []
	    };
	  },

	  methods: {
	    init: function init() {
	      var value = this.templateValue[this.code];
	      if (Object.prototype.toString.call(value) === '[object String]' && value !== '') {
	        this.checkedOptions = this.templateValue[this.code].split(',');
	      } else {
	        this.checkedOptions = [];
	      }
	    },
	    changeHandle: function changeHandle(v) {
	      var value = v.join(',');
	      this.templateValue[this.code] = value;
	      var data = {
	        key: this.code,
	        value: value
	      };
	      this.$emit('trigger', 'change', data);
	    }
	  },
	  props: ['data', 'templateValue', 'isEdit'],
	  created: function created() {
	    this.code = this.data.itemCode ? this.data.itemCode.split('.').pop() : '';
	    this.valueWatcher = this.$watch(function () {
	      return this.templateValue;
	    }, function () {
	      if (this.templateValue[this.code] !== null) {
	        this.init();
	        //  this.valueWatcher();
	      }
	    }.bind(this), { deep: true });
	    if (this.templateValue && this.templateValue[this.code] !== null) {
	      this.init();
	      //  this.valueWatcher();
	    }
	  }
	};

/***/ }),

/***/ 624:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-checkbox-group', {
	    on: {
	      "change": _vm.changeHandle
	    },
	    model: {
	      value: (_vm.checkedOptions),
	      callback: function($$v) {
	        _vm.checkedOptions = $$v
	      },
	      expression: "checkedOptions"
	    }
	  }, _vm._l((_vm.data.options), function(option) {
	    return _c('el-checkbox', {
	      attrs: {
	        "disabled": !_vm.isEdit || _vm.data.readOnly,
	        "label": option.name
	      }
	    }, [_vm._v(_vm._s(option.name))])
	  }))
	},staticRenderFns: []}

/***/ }),

/***/ 625:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "table-container",
	    style: ({
	      width: _vm.containerWidth
	    })
	  }, [_c('el-form', {
	    style: ({
	      width: _vm.maxcols > 3 ? 330 * _vm.maxcols + 'px' : '100%'
	    }),
	    attrs: {
	      "model": _vm.data,
	      "inline": true
	    }
	  }, _vm._l((_vm.table), function(layout) {
	    return (Object.prototype.toString.call(layout.isDisplay) === '[object Boolean]' ? layout.isDisplay : true) ? _c('el-form-item', {
	      class: layout.componentKey === 'Grid' ? 'yon-grid' : 'yon-form',
	      style: ({
	        width: _vm.maxcols > 3 ? '330px' : 100 / _vm.maxcols + '%'
	      }),
	      attrs: {
	        "label": layout.title + ':'
	      }
	    }, [_c('span', {
	      class: layout.required ? 'required-flag required' : 'required-flag'
	    }, [_vm._v("*")]), _c(_vm.map[layout.componentKey], {
	      tag: "div",
	      attrs: {
	        "isEdit": _vm.isEdit,
	        "data": layout,
	        "templateValue": _vm.templateValue
	      },
	      on: {
	        "trigger": _vm.trigger
	      }
	    })]) : _vm._e()
	  }))], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(627)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(629),
	  /* template */
	  __webpack_require__(630),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(628);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("7ea961af", content, true);

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.divBox .el-form-item__label {\n  font-size: 15px;\n}\n.searchBox{ padding-top: 3px\n}\n#self-grid .operate-column{\n  color: #97a8be;\n  margin-left: 10px;\n  font-size: 15px;\n}\n#self-grid .el-dialog.el-dialog--small.transfer_self{\n  width: 530px;\n}\n#self-grid .el-table__expanded-cell {\n  padding: 20px 10px;\n}\n.el-dialog.transfer_self {\n  width: 500px;\n}\n#self-grid .yon-form.view .el-form-item.is-required .el-form-item__label:after{\n  display: none;\n}\n", ""]);

	// exports


/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _lodash = __webpack_require__(215);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Select = __webpack_require__(577);

	var _Select2 = _interopRequireDefault(_Select);

	var _Input = __webpack_require__(587);

	var _Input2 = _interopRequireDefault(_Input);

	var _Datepicker = __webpack_require__(592);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	var _refDialog = __webpack_require__(603);

	var _refDialog2 = _interopRequireDefault(_refDialog);

	var _image = __webpack_require__(613);

	var _image2 = _interopRequireDefault(_image);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	exports.default = {
	  data: function data() {
	    var width = '200px';
	    var isInline = true;
	    return {
	      tableData: [],
	      columns: [], // 存储可见的列信息，用于循环生成列
	      layoutDetail: [], // 存储所有可见及不可见列
	      showedlayoutDetail: [], // 存储所有layoutDetail中的可见layout，用于extend时循环生成展开表单
	      loading: false,
	      transfer: {
	        data: [],
	        value: []
	      },
	      transferVisible: false,
	      gridStyle1: {},
	      labelWidth: width,
	      isInline: isInline,
	      map: {
	        Select: 'yon-select',
	        Money: 'yon-input',
	        Phone: 'yon-input',
	        Email: 'yon-input',
	        Mobile: 'yon-input',
	        Text: 'yon-input',
	        TextArea: 'yon-input',
	        NumberComponent: 'yon-input',
	        DateComponent: 'yon-datepicker',
	        ImageComponent: 'yon-image',
	        Reference: 'yon-ref'
	      },
	      itemCount: 2,
	      extraClass: ''
	    };
	  },

	  props: ['data', 'templateValue', 'rules', 'showButton', 'showType', 'showBorder', 'align', 'sortable', 'indexLabel', 'headerAlign', 'gridStyle', 'tableStyle', 'isEdit', 'expand', 'defaultExpandAll', 'expandRowKeys', 'rowKey', 'imgUrl', 'imgStyles', 'hoverShowButton', 'elcolumnStyle', 'highlightCurrentRow'],
	  methods: {
	    require: function require(tmpValue) {
	      this.tableData.length = 0;
	      this.filterLayoutDetail();
	      this.getcolumns();
	      var templateValue = tmpValue || this.templateValue;
	      if (templateValue && templateValue.length) {
	        var _self = this;
	        templateValue.forEach(function (item) {
	          _self.tableData.push(item);
	        });
	      } else {
	        self.tableData = [];
	      }
	    },
	    renderHeader: function renderHeader(createElement, _ref) {
	      var column = _ref.column;

	      return createElement('div', {
	        style: {
	          cursor: 'pointer'
	        },
	        on: {
	          click: this.editColumns
	        }
	      }, ['操作', createElement('i', {
	        'class': {
	          'el-icon-menu': true,
	          'operate-column': true
	        }
	      })]);
	    },

	    // 显示隐藏列
	    editColumns: function editColumns() {
	      this.transferVisible = true;
	    },

	    // 根据位置查找一行数据
	    getDataItem: function getDataItem(index) {
	      return this.tableData[index];
	    },

	    // 点击全选触发
	    selectAll: function selectAll(selection) {
	      this.$parent.$emit('select-all', selection);
	    },
	    select: function select(selection, row) {
	      this.$parent.$emit('select', selection, row);
	    },
	    selectionChange: function selectionChange(selection) {
	      this.$parent.$emit('selection-change', selection);
	    },
	    expandRow: function expandRow(row, expanded) {
	      this.$parent.$emit('expand-row', row, expanded);
	    },

	    // 最后一列按钮点击触发事件
	    handleClick: function handleClick(eventName, scope) {
	      var viewRowIndex = scope.$index;
	      this.$parent.$emit(eventName + '-table-row', scope.row, viewRowIndex);
	    },
	    handleRowClick: function handleRowClick(row, event, column) {
	      var rowIndex = event.currentTarget.rowIndex;
	      this.$parent.$emit('row-click', rowIndex, row, event, column);
	    },
	    cellMouseEnter: function cellMouseEnter(row, column, cell, event) {
	      this.$parent.$emit('cell-mouse-enter', row, column, cell, event);
	      if (this.hoverShowButton === true) {
	        var target = event.currentTarget;
	        var optionButton = target.parentNode.querySelector('#optionButton');
	        if (optionButton && optionButton.style) {
	          optionButton.style.display = 'block';
	        }
	      }
	    },
	    cellMouseLeave: function cellMouseLeave(row, column, cell, event) {
	      this.$parent.$emit('cell-mouse-leave', row, column, cell, event);
	      if (this.hoverShowButton === true) {
	        var target = event.currentTarget;
	        var optionButton = target.parentNode.querySelector('#optionButton');
	        if (optionButton && optionButton.style) {
	          optionButton.style.display = 'none';
	        }
	      }
	    },
	    filterLayoutDetail: function filterLayoutDetail() {
	      var layoutDetail = this.data && this.data.layoutDetail ? this.data.layoutDetail : this.data;
	      var self = this;
	      this.layoutDetail = [];
	      layoutDetail.forEach(function (v, i) {
	        if (v.isDisplay) {
	          self.layoutDetail.push(v);
	        }
	      });
	    },
	    getcolumns: function getcolumns() {
	      var tmp = [];
	      var showedTmp = [];
	      this.transfer.value = [];
	      this.transfer.data = [];
	      var self = this;
	      this.layoutDetail.forEach(function (v, i) {
	        if (v.isDisplay) {
	          var flag = v.itemCode.split('.').pop();
	          var columnItem = {
	            flag: flag,
	            componentKey: v.componentKey,
	            name: v.title,
	            width: v.width ? v.width : 50
	          };
	          if (v.componentKey === 'Select') {
	            columnItem.options = v.options;
	          }
	          tmp.push(columnItem);
	          var obj = _lodash2.default.assign({ flag: flag }, v);
	          showedTmp.push(obj);
	          self.transfer.value.push(i);
	        }
	        self.transfer.data.push({
	          label: v.title,
	          key: i,
	          itemId: v.itemId
	        });
	      });
	      this.columns = tmp;
	      this.showedlayoutDetail = showedTmp;
	    },
	    handleChange: function handleChange(value, direction, movedKeys) {
	      var movedKeys2 = JSON.parse(JSON.stringify(movedKeys));
	      if (value.length === 0 && direction === 'left') {
	        this.$message('至少需显示一列！');
	        var lastKey = movedKeys2.pop();
	        this.transfer.value.push(lastKey);
	      }
	      for (var i = 0; i < movedKeys2.length; i++) {
	        this.layoutDetail[movedKeys[i]].isDisplay = direction !== 'left';
	      }
	      this.getcolumns();
	    },

	    trigger: function trigger(event, data) {
	      this.$emit('trigger', event, data);
	    },
	    adjustStyle: function adjustStyle() {
	      var length = this.data.layoutDetail.length;
	      this.itemCount = length > 2 ? 2 : length;
	      if (this.data.layoutDetail[0].componentKey !== 'TableLayout') {
	        this.extraClass = ' yonCount-' + this.itemCount;
	      }
	    },
	    handleClickFormButton: function handleClickFormButton(name, index, row) {
	      this.$parent.$emit(name + '-expand-form', index, row);
	    }
	  },
	  created: function created() {
	    this.require();
	    this.adjustStyle();
	  },
	  computed: {
	    showButton2: function showButton2() {
	      return this.showButton ? this.showButton : {};
	    },
	    showType2: function showType2() {
	      var type = void 0;
	      if (['select', 'selection'].indexOf(this.showType) > -1) {
	        type = 'selection';
	      } else if (this.showType === 'index') {
	        type = 'index';
	      } else {
	        type = false;
	      }
	      return type;
	    },
	    gridStyle2: function gridStyle2() {
	      return this.gridStyle ? _lodash2.default.assign(this.gridStyle1, this.gridStyle) : this.gridStyle1;
	    },
	    tableStyle2: function tableStyle2() {
	      var tableStyle1 = this.expand ? { 'width': '100%' } : { 'max-height': '400px', 'width': '100%' };
	      return this.tableStyle ? _lodash2.default.assign(tableStyle1, this.tableStyle) : tableStyle1;
	    },
	    maxHeight: function maxHeight() {
	      return this.tableStyle2['max-height'] ? parseInt(this.tableStyle2['max-height'].split('px')[0], 10) : 400;
	    },
	    columnsShowCount: function columnsShowCount() {
	      // 表格显示的列数
	      return this.expand && this.expand.columnsShowCount && this.expand.columnsShowCount < this.columns.length ? this.expand.columnsShowCount : this.columns.length;
	    }
	  },
	  watch: {
	    templateValue: {
	      handler: function handler(val) {
	        this.require(val);
	      },
	      deep: true
	    }
	  },
	  components: {
	    'yon-select': _Select2.default,
	    'yon-input': _Input2.default,
	    'yon-datepicker': _Datepicker2.default,
	    'yon-ref': _refDialog2.default,
	    'yon-image': _image2.default
	  }
	};

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "divBox",
	    style: (_vm.gridStyle2),
	    attrs: {
	      "id": "self-grid"
	    }
	  }, [_c('el-row', {
	    attrs: {
	      "type": "flex",
	      "justify": "center"
	    }
	  }, [_c('el-table', {
	    directives: [{
	      name: "loading",
	      rawName: "v-loading.body",
	      value: (_vm.loading),
	      expression: "loading",
	      modifiers: {
	        "body": true
	      }
	    }],
	    style: (_vm.tableStyle2),
	    attrs: {
	      "data": _vm.tableData,
	      "empty-text": "",
	      "border": _vm.showBorder === true ? _vm.showBorder : false,
	      "fit": "",
	      "max-height": _vm.maxHeight,
	      "default-expand-all": !!_vm.defaultExpandAll,
	      "row-key": _vm.rowKey,
	      "expand-row-keys": _vm.expandRowKeys,
	      "select": "select",
	      "select-all": "selectAll",
	      "selection-change": "selectionChange",
	      "elcolumn-style": _vm.elcolumnStyle,
	      "highlight-current-row": _vm.highlightCurrentRow
	    },
	    on: {
	      "row-click": _vm.handleRowClick,
	      "expand": _vm.expandRow,
	      "cell-mouse-enter": _vm.cellMouseEnter,
	      "cell-mouse-leave": _vm.cellMouseLeave
	    }
	  }, [(_vm.expand) ? _c('el-table-column', {
	    attrs: {
	      "type": "expand"
	    },
	    scopedSlots: _vm._u([
	      ["default", function(props) {
	        return [_c('el-form', {
	          ref: "form",
	          class: _vm.isEdit ? 'yon-form edit' : 'yon-form view',
	          staticStyle: {
	            "width": "100%"
	          },
	          attrs: {
	            "model": props.row,
	            "rules": _vm.rules,
	            "inline": true
	          }
	        }, _vm._l((_vm.showedlayoutDetail), function(layout) {
	          return _c('el-form-item', {
	            class: 'yon-form' + _vm.extraClass,
	            style: ({
	              width: _vm.itemCount > 3 ? '300' : 90 / _vm.itemCount + '%'
	            }),
	            attrs: {
	              "prop": layout.flag,
	              "label": layout.title
	            }
	          }, [_c(_vm.map[layout.componentKey], {
	            tag: "div",
	            attrs: {
	              "isEdit": _vm.isEdit,
	              "itemCode": _vm.itemCount,
	              "data": layout,
	              "templateValue": props.row
	            },
	            on: {
	              "trigger": _vm.trigger
	            }
	          })])
	        })), _c('el-row', {
	          style: ({
	            'text-align': _vm.expand.buttonAlign || 'center'
	          })
	        }, [_c('el-col', _vm._l((_vm.expand.buttons), function(button) {
	          return (_vm.expand.buttons && _vm.expand.buttons.length) ? _c('el-button', {
	            staticStyle: {
	              "width": "80px"
	            },
	            attrs: {
	              "size": "small",
	              "type": "primary",
	              "type": button.type === 'normal' ? '' : button.type || 'primary',
	              "icon": button.icon || ''
	            },
	            on: {
	              "click": function($event) {
	                _vm.handleClickFormButton(button.name, props.$index, props.row)
	              }
	            }
	          }, [_vm._v(_vm._s(button.text || ''))]) : _vm._e()
	        }))], 1)]
	      }]
	    ])
	  }) : _vm._e(), (_vm.showType2 === 'selection') ? _c('el-table-column', {
	    attrs: {
	      "type": _vm.showType2,
	      "width": "45"
	    }
	  }) : (_vm.showType2 === 'index') ? _c('el-table-column', {
	    attrs: {
	      "label": _vm.indexLabel ? _vm.indexLabel : '序号',
	      "align": "center",
	      "header-align": "center",
	      "width": "70"
	    },
	    scopedSlots: _vm._u([
	      ["default", function(scope) {
	        return [_c('span', [_vm._v(_vm._s(scope.$index + 1))])]
	      }]
	    ])
	  }) : _vm._e(), _vm._l((_vm.columnsShowCount), function(index) {
	    return _c('el-table-column', {
	      attrs: {
	        "prop": _vm.columns[index - 1].flag,
	        "label": _vm.columns[index - 1].name,
	        "min-width": _vm.columns[index - 1].width,
	        "sortable": _vm.sortable === true ? _vm.sortable : (_vm.columns[index - 1].sortable === true ? _vm.columns[index - 1].sortable : false),
	        "align": _vm.align !== undefined ? _vm.align : 'left',
	        "header-align": _vm.headerAlign !== undefined ? _vm.headerAlign : 'left'
	      },
	      scopedSlots: _vm._u([
	        ["default", function(scope) {
	          return [(_vm.columns[index - 1].componentKey === 'Select') ? _c('div', _vm._l((_vm.columns[index - 1].options), function(option) {
	            return _c('span', {
	              style: ({
	                display: (option.selectionId !== null && option.selectionId !== undefined) && (scope.row[_vm.columns[index - 1].flag] !== null && scope.row[_vm.columns[index - 1].flag] !== undefined) && option.selectionId.toString() === scope.row[_vm.columns[index - 1].flag].toString() ? 'block' : 'none'
	              })
	            }, [_vm._v("\n                " + _vm._s(option.name) + "\n              ")])
	          })) : (_vm.columns[index - 1].componentKey === 'ImageComponent') ? _c('div', [_c('img', {
	            staticStyle: {
	              "width": "35px",
	              "height": "45px",
	              "display": "block",
	              "margin": "1px"
	            },
	            attrs: {
	              "src": _vm.imgUrl + scope.row[_vm.columns[index - 1].flag]
	            }
	          })]) : (_vm.columns[index - 1].componentKey === 'Reference') ? _c('div', [_c('span', [_vm._v("\n              " + _vm._s(scope.row['beanMap'] &&
	            scope.row['beanMap'][_vm.columns[index - 1].flag + '_ref'] &&
	            scope.row['beanMap'][_vm.columns[index - 1].flag + '_ref'][scope.row[_vm.columns[index - 1].flag]] &&
	            scope.row['beanMap'][_vm.columns[index - 1].flag + '_ref'][scope.row[_vm.columns[index - 1].flag]].name) + "\n              ")])]) : (_vm.columns[index - 1].componentKey === 'DateComponent') ? _c('yon-datepicker', {
	            attrs: {
	              "data": _vm.showedlayoutDetail[index - 1],
	              "isEdit": false,
	              "templateValue": scope.row
	            }
	          }) : _c('div', [_c('span', [_vm._v(_vm._s(scope.row[_vm.columns[index - 1].flag]))])])]
	        }]
	      ])
	    })
	  }), (_vm.showButton2 && _vm.showButton2.buttons && _vm.showButton2.buttons.length > 0) ? _c('el-table-column', {
	    attrs: {
	      "prop": "operate",
	      "label": "操作",
	      "width": _vm.showButton2.width || 100,
	      "header-align": "center",
	      "render-header": _vm.renderHeader
	    },
	    scopedSlots: _vm._u([
	      ["default", function(scope) {
	        return [_c('div', {
	          staticStyle: {
	            "text-align": "center"
	          },
	          style: ({
	            display: _vm.hoverShowButton === true ? 'none' : 'block',
	            'text-align': 'center'
	          }),
	          attrs: {
	            "id": "optionButton"
	          }
	        }, _vm._l((_vm.showButton2.buttons), function(item) {
	          return _c('el-tooltip', {
	            attrs: {
	              "disabled": !item.content,
	              "effect": item.effect || 'dark',
	              "content": item.content || '',
	              "placement": item.placement || 'top'
	            }
	          }, [(item.icon) ? _c('i', {
	            class: 'el-icon-' + item.icon,
	            style: ({
	              color: item.color || '#20a0ff',
	              padding: '0 6px',
	              'font-size': item.fontSize || '16px',
	              cursor: 'pointer'
	            }),
	            on: {
	              "click": function($event) {
	                _vm.handleClick(item.name, scope)
	              }
	            }
	          }) : (item.text) ? _c('el-button', {
	            staticStyle: {
	              "margin": "0 6px"
	            },
	            attrs: {
	              "type": "text"
	            }
	          }, [_vm._v(_vm._s(item.text))]) : _vm._e()], 1)
	        }))]
	      }]
	    ])
	  }) : _vm._e()], 2)], 1)], 1), _c('el-dialog', {
	    attrs: {
	      "custom-class": "transfer_self"
	    },
	    model: {
	      value: (_vm.transferVisible),
	      callback: function($$v) {
	        _vm.transferVisible = $$v
	      },
	      expression: "transferVisible"
	    }
	  }, [_c('el-transfer', {
	    attrs: {
	      "titles": ['隐藏列', '显示列'],
	      "data": _vm.transfer.data
	    },
	    on: {
	      "change": _vm.handleChange
	    },
	    model: {
	      value: (_vm.transfer.value),
	      callback: function($$v) {
	        _vm.transfer.value = $$v
	      },
	      expression: "transfer.value"
	    }
	  })], 1)], 1)
	},staticRenderFns: []}

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-form', {
	    ref: "form",
	    class: _vm.isEdit ? 'yon-form edit' : 'yon-form view',
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "model": _vm.templateValue,
	      "rules": _vm.rules,
	      "inline": true
	    }
	  }, _vm._l((_vm.data), function(row) {
	    return (_vm.isRowDisplay(row.layoutDetail)) ? _c('el-row', _vm._l((row.layoutDetail), function(layout) {
	      return _c('el-form-item', {
	        class: layout.componentKey === 'Grid' ? 'yon-grid' : 'yon-form yonCount-' + row.layoutDetail.length,
	        style: ({
	          width: 90 / row.layoutDetail.length + '%',
	          visibility: _vm.isItemShow(layout)
	        }),
	        attrs: {
	          "prop": _vm.getItemCode(layout),
	          "validateStatus": _vm.validateStatus,
	          "label": "label"
	        }
	      }, [_c('template', {
	        slot: "label"
	      }, [_c('tooltip', {
	        attrs: {
	          "content": _vm.noLabel.indexOf(layout.componentKey) < 0 ? layout.title + ' :' : '',
	          "handler": _vm.handleTitle
	        }
	      })], 1), _c(_vm.map[layout.componentKey], {
	        tag: "div",
	        attrs: {
	          "isEdit": _vm.isEdit,
	          "itemCode": _vm.itemCount,
	          "data": layout,
	          "templateValue": _vm.templateValue,
	          "refQueryParams": _vm.refQueryParams
	        },
	        on: {
	          "trigger": _vm.trigger
	        }
	      })], 2)
	    })) : _vm._e()
	  }))
	},staticRenderFns: []}

/***/ }),

/***/ 632:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "yon-uitemplate"
	  }, [(!_vm.hideTitle) ? _c('div', {
	    staticClass: "yon-title"
	  }, [_vm._v(_vm._s(_vm.forms.name ? _vm.forms.name : _vm.forms.title))]) : _vm._e(), (_vm.isGrid) ? _c('yon-grid', {
	    attrs: {
	      "data": _vm.formLayout[0],
	      "templateValue": _vm.templateValue,
	      "rules": _vm.mergedRules,
	      "showButton": _vm.showButton,
	      "showType": _vm.showType,
	      "showBorder": _vm.showBorder,
	      "sortable": _vm.sortable,
	      "indexLabel": _vm.indexLabel,
	      "gridStyle": _vm.gridStyle,
	      "tableStyle": _vm.tableStyle,
	      "expand": _vm.expand,
	      "defaultExpandAll": _vm.defaultExpandAll,
	      "expandRowKeys": _vm.expandRowKeys,
	      "rowKey": _vm.rowKey,
	      "isEdit": _vm.isEdit,
	      "imgUrl": _vm.imgUrl,
	      "elcolumn-style": _vm.elcolumnStyle,
	      "hoverShowButton": _vm.hoverShowButton,
	      "highlight-current-row": _vm.highlightCurrentRow
	    },
	    on: {
	      "trigger": _vm.eventHandle
	    }
	  }, [_c('div', {
	    slot: "gridForm"
	  }, [_vm._t("tableRowForm")], 2)]) : _vm._e(), (_vm.forms != '' && !_vm.isGrid) ? _c('yon-form', {
	    ref: "form",
	    attrs: {
	      "isEdit": _vm.isEdit,
	      "data": _vm.formLayout,
	      "refQueryParams": _vm.refQueryParams,
	      "templateValue": _vm.templateValue,
	      "rules": _vm.mergedRules
	    },
	    on: {
	      "trigger": _vm.eventHandle
	    }
	  }) : _vm._e()], 1)
	},staticRenderFns: []}

/***/ })

/******/ });