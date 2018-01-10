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

	module.exports = __webpack_require__(247);


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

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _formula = __webpack_require__(248);

	var _formula2 = _interopRequireDefault(_formula);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_formula2.default.install = function (Vue) {
	  Vue.component(_formula2.default.name, _formula2.default);
	};

	exports.default = _formula2.default;

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(249)
	  __webpack_require__(251)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(253),
	  /* template */
	  __webpack_require__(254),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-77113567",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(250);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("ef8d65c0", content, true);

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n#formula-container[data-v-77113567] {\n  width:100%;\n  height:400px;\n}\n.formula-operators[data-v-77113567],.formula-left-head[data-v-77113567],.formula-right-head[data-v-77113567] {\n  display: inline-block;\n}\n.formula-left-head[data-v-77113567] {\n  width: 35%;\n}\n.formula-right-head[data-v-77113567] {\n  width: 64%;\n  padding-left: 25px;\n}\n.formula-left-textarea[data-v-77113567],.formula-right-textarea[data-v-77113567],.formula-left-selection[data-v-77113567],.formula-right-selection[data-v-77113567] {\n  width: 40%;\n  vertical-align: top;\n}\n.formula-textarea[data-v-77113567],.formula-selection[data-v-77113567] {\n  padding-top: 10px;\n}\n.formula-left-textarea[data-v-77113567],.formula-left-selection[data-v-77113567] {\n  margin-right: 9%;\n}\n.formula-right-textarea[data-v-77113567],.formula-right-selection[data-v-77113567] {\n  margin-left: 9%;\n}\n.formula-selection-list[data-v-77113567]:hover {\n  border-color: #8397a5;\n}\n.formula-selection-list[data-v-77113567] {\n  height: 180px;\n  border: 1px solid #bfd0d9;\n  border-radius: 4px;\n  transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n  padding: 10px;\n  overflow-y: auto;\n}\n.formula-selection-item[data-v-77113567] {\n  line-height: 19px;\n  padding: 6px;\n  border: 1px solid white;\n  overflow: hidden;\n  cursor: pointer;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.formula-selection-item.selected[data-v-77113567] {\n  background-color: rgba(239, 243, 246, 1)\n}\n.formula-selection-item[data-v-77113567]:hover {\n  border-color: #ccc;\n}\n.formula-operators .formula-operator[data-v-77113567] {\n  text-align: center;\n  display: inline-block;\n  height: 28px;\n  line-height: 28px;\n  border-radius: 4px;\n  width: 20px;\n  cursor: pointer;\n  background-color: rgba(250, 251, 252, 1);\n  box-sizing: border-box;\n  border-width: 1px;\n  border-style: solid;\n  border-color: rgba(206, 208, 218, 1);\n  font-size: 12px;\n}\n.formula-circle[data-v-77113567] {\n  display: inline-block;\n  background-color: #333333;\n  width: 14px;\n  height: 16px;\n  color: #FFFFFF;\n  border-radius: 14px;\n  text-align: center;\n  line-height: 16px;\n}\n.formula-left-textarea[data-v-77113567],.formula-right-textarea[data-v-77113567],.formula-left-selection[data-v-77113567],.formula-right-selection[data-v-77113567] {\n  display: inline-block;\n}\n\n", ""]);

	// exports


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(252);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("038c8026", content, true);

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.formula-source-list .el-tabs__item.is-disabled {\n  color: #485d6a;\n  cursor: default;\n  padding-left: 0px;\n  padding-right: 32px;\n}\n.formula-dialog .el-dialog--small {\n  min-width: 720px;\n}\n", ""]);

	// exports


/***/ }),

/***/ 253:
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	  name: 'ElFormula',
	  data: function data() {
	    return {
	      // dialogVisible: false,
	      formula: this.value,
	      description: '',
	      textarea: '',
	      activeName: 'third',
	      parentSelect: [],
	      childSelect: [],
	      pSelectValue: '',
	      cSelectValue: '',
	      parentData: [],
	      childData: [],
	      tableValue: '',
	      columnValue: '',
	      parentOverflow: {},
	      childOverflow: {}
	    };
	  },

	  props: {
	    value: {
	      type: String,
	      default: ''
	    },
	    tableList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    columnList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    tableProp: {
	      type: Object,
	      default: function _default() {
	        return {
	          value: 'value',
	          name: 'name'
	        };
	      }
	    },
	    columnProp: {
	      type: Object,
	      default: function _default() {
	        return {
	          value: 'value',
	          name: 'name'
	        };
	      }
	    },
	    dialogVisible: {
	      type: Boolean,
	      default: false
	    }
	  },
	  methods: {
	    dblclickChild: function dblclickChild(e) {
	      if (e.target.nodeName === 'LI') {
	        this.columnValue = e.target.dataset.value;
	        this.insert(this.columnValue);
	      }
	    },
	    dblclickParent: function dblclickParent(e) {
	      if (e.target.nodeName === 'LI') {
	        this.tableValue = e.target.dataset.value;
	        this.insert(this.tableValue);
	      }
	    },
	    cTmpHandle: function cTmpHandle(data) {
	      var tmp = [];
	      data.forEach(function (name, index) {
	        tmp.push({
	          name: name,
	          value: index.toString()
	        });
	      });
	      return tmp;
	    },
	    beforeClose: function beforeClose(done) {
	      this.close();
	      done();
	    },
	    close: function close() {
	      this.$emit('visibleHandle', false);
	    },
	    cancel: function cancel() {
	      this.close();
	      this.$emit('cancel');
	    },
	    confirm: function confirm() {
	      this.close();
	      this.$emit('confirm');
	    },
	    handleInput: function handleInput(value) {
	      this.$emit('input', value);
	      this.$emit('change', value);
	    },
	    pSelectChange: function pSelectChange(value) {
	      var _this = this;

	      if (value.length > 0) {
	        this.$http({
	          url: '/formula/formula/formulas?typeId=' + encodeURIComponent(value),
	          method: 'get'
	        }).then(function (res) {
	          _this.childSelect = _this.cTmpHandle(res.data);
	          _this.cSelectValue = '';
	        });
	      }
	    },
	    cSelectChange: function cSelectChange(value) {
	      var name = '';
	      if (value.length > 0) {
	        for (var i = 0; i < this.childSelect.length; i++) {
	          if (this.childSelect[i].value === value) {
	            name = this.childSelect[i].name;
	            break;
	          }
	        }
	        this.insert(name);
	      }
	    },
	    clickOperator: function clickOperator(e) {
	      if (e.target.nodeName === 'I') {
	        this.insert(this.decodeOperator(e.target.innerHTML));
	      }
	    },
	    insert: function insert(text) {
	      var dom = this.$refs.formula.$refs.textarea;
	      var value = this.formula;
	      var start = dom.selectionStart;
	      var end = dom.selectionEnd;
	      value = value.slice(0, start) + text + value.slice(end, value.length);
	      this.formula = value;
	      this.$emit('input', value);
	      this.$emit('change', value);
	    },
	    decodeOperator: function decodeOperator(operator) {
	      var result = operator;
	      if (result === '&lt;') {
	        result = '<';
	      } else if (result === '&gt;') {
	        result = '>';
	      }
	      return result;
	    },
	    clickParent: function clickParent(e) {
	      if (e.target.nodeName === 'LI') {
	        this.tableValue = e.target.dataset.value;
	        this.$emit('tableChange', this.tableValue);
	      }
	    },
	    clickChild: function clickChild(e) {
	      if (e.target.nodeName === 'LI') {
	        this.columnValue = e.target.dataset.value;
	      }
	    },
	    initSelect: function initSelect() {
	      var _this2 = this;

	      this.$http({
	        url: '/formula/formula/types',
	        mothod: 'get'
	      }).then(function (res) {
	        _this2.parentSelect = _this2.tmpHandle(res.data);
	      });
	    },
	    tmpHandle: function tmpHandle(data) {
	      var tmp = [];
	      Object.keys(data).forEach(function (key) {
	        tmp.push({
	          value: key,
	          name: data[key]
	        });
	      });
	      return tmp;
	    },

	    /*eslint-disable*/
	    computeVisibility: function computeVisibility(name) {
	      var _this3 = this;

	      var tmp = {};
	      var list;
	      var key;
	      if (name === 'parent') {
	        list = this.tableList;
	        key = this.tableProp.value;
	      } else {
	        list = this.columnList;
	        key = this.columnProp.value;
	      }

	      this.$nextTick(function () {
	        list.forEach(function (data) {
	          if (_this3.$refs[data[key]] && _this3.$refs[data[key]][0].offsetWidth < _this3.$refs[data[key]][0].scrollWidth) {
	            tmp[data[key]] = true;
	          } else {
	            tmp[data[key]] = false;
	          }
	        });
	        name === 'parent' ? _this3.parentOverflow = tmp : _this3.childOverflow = tmp;
	      });
	    }
	    /*eslint-enable*/

	  },
	  created: function created() {
	    this.initSelect();
	  },
	  mounted: function mounted() {
	    this.computeVisibility('parent');
	    this.computeVisibility('child');
	  },

	  watch: {
	    tableList: {
	      handler: function handler() {
	        this.computeVisibility('parent');
	      }
	    },
	    columnList: {
	      handler: function handler() {
	        this.computeVisibility('child');
	      }
	    },
	    value: {
	      handler: function handler(value) {
	        this.formula = value;
	      },
	      immediate: true
	    }
	  }
	};

/***/ }),

/***/ 254:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-dialog', {
	    staticClass: "formula-dialog",
	    attrs: {
	      "title": "公式配置",
	      "visible": _vm.dialogVisible,
	      "before-close": _vm.close,
	      "close-on-click-modal": true,
	      "size": "small"
	    }
	  }, [_c('div', {
	    attrs: {
	      "id": "formula-container"
	    }
	  }, [_c('div', {
	    staticClass: "formula-head"
	  }, [_c('div', {
	    staticClass: "formula-left-head"
	  }, [_c('span', {
	    staticClass: "formula-circle"
	  }, [_vm._v("1")]), _c('span', [_vm._v("选取公式")]), _c('div', {
	    staticClass: "formula-operators",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.clickOperator($event)
	      }
	    }
	  }, [_c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v("x")]), _c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v("÷")]), _c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v("+")]), _c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v("-")]), _c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v("<")]), _c('i', {
	    staticClass: "formula-operator"
	  }, [_vm._v(">")])])]), _c('div', {
	    staticClass: "formula-right-head"
	  }, [_c('el-select', {
	    attrs: {
	      "placeholder": "请选择"
	    },
	    on: {
	      "change": _vm.pSelectChange
	    },
	    model: {
	      value: (_vm.pSelectValue),
	      callback: function($$v) {
	        _vm.pSelectValue = $$v
	      },
	      expression: "pSelectValue"
	    }
	  }, _vm._l((_vm.parentSelect), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.name,
	        "value": item.value
	      }
	    })
	  })), _c('el-select', {
	    attrs: {
	      "placeholder": "请选择"
	    },
	    on: {
	      "change": _vm.cSelectChange
	    },
	    model: {
	      value: (_vm.cSelectValue),
	      callback: function($$v) {
	        _vm.cSelectValue = $$v
	      },
	      expression: "cSelectValue"
	    }
	  }, _vm._l((_vm.childSelect), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.name,
	        "value": item.value
	      }
	    })
	  }))], 1)]), _c('div', {
	    staticClass: "formula-textarea"
	  }, [_c('div', {
	    staticClass: "formula-left-textarea"
	  }, [_c('span', [_vm._v("取数公式")]), _c('el-input', {
	    ref: "formula",
	    attrs: {
	      "type": "textarea",
	      "rows": 4,
	      "placeholder": "请输入内容"
	    },
	    on: {
	      "input": _vm.handleInput
	    },
	    model: {
	      value: (_vm.formula),
	      callback: function($$v) {
	        _vm.formula = $$v
	      },
	      expression: "formula"
	    }
	  })], 1), _c('div', {
	    staticClass: "formula-right-textarea"
	  }, [_c('span', [_vm._v("取数公式释义")]), _c('el-input', {
	    attrs: {
	      "type": "textarea",
	      "rows": 4,
	      "readonly": true,
	      "placeholder": "公式释义"
	    },
	    model: {
	      value: (_vm.description),
	      callback: function($$v) {
	        _vm.description = $$v
	      },
	      expression: "description"
	    }
	  })], 1)]), _c('div', {
	    staticClass: "formula-source-list"
	  }, [_c('el-tabs', {
	    model: {
	      value: (_vm.activeName),
	      callback: function($$v) {
	        _vm.activeName = $$v
	      },
	      expression: "activeName"
	    }
	  }, [_c('el-tab-pane', {
	    attrs: {
	      "disabled": true
	    }
	  }, [_c('template', {
	    slot: "label"
	  }, [_c('span', {
	    staticClass: "formula-circle"
	  }, [_vm._v("2")]), _c('span', [_vm._v("选择元数据")])])], 2), _c('el-tab-pane', {
	    attrs: {
	      "label": "角色管理",
	      "name": "third"
	    }
	  }, [_c('div', {
	    staticClass: "formula-selection"
	  }, [_c('div', {
	    staticClass: "formula-left-selection"
	  }, [_c('span', [_vm._v("1:元数据表")]), _c('ul', {
	    staticClass: "formula-selection-list",
	    on: {
	      "dblclick": function($event) {
	        $event.stopPropagation();
	        _vm.dblclickParent($event)
	      },
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.clickParent($event)
	      }
	    }
	  }, _vm._l((_vm.tableList), function(item) {
	    return _c('el-tooltip', {
	      attrs: {
	        "content": item[_vm.tableProp.value] + '  ' + item[_vm.tableProp.name],
	        "placement": "top",
	        "disabled": !_vm.parentOverflow[item[_vm.tableProp.value]]
	      }
	    }, [_c('li', {
	      ref: item[_vm.tableProp.value],
	      refInFor: true,
	      class: item[_vm.tableProp.value] === _vm.tableValue ? 'formula-selection-item selected' : 'formula-selection-item',
	      attrs: {
	        "data-value": item[_vm.tableProp.value]
	      }
	    }, [_vm._v(_vm._s(item[_vm.tableProp.name] + '  ' + item[_vm.tableProp.value]))])])
	  }))]), _c('div', {
	    staticClass: "formula-right-selection"
	  }, [_c('span', [_vm._v("2:元数据列")]), _c('ul', {
	    staticClass: "formula-selection-list",
	    on: {
	      "dblclick": function($event) {
	        $event.stopPropagation();
	        _vm.dblclickChild($event)
	      },
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.clickChild($event)
	      }
	    }
	  }, _vm._l((_vm.columnList), function(item) {
	    return _c('el-tooltip', {
	      attrs: {
	        "content": item[_vm.columnProp.name] + '  ' + item[_vm.columnProp.value],
	        "placement": "top",
	        "disabled": !_vm.childOverflow[item[_vm.columnProp.value]]
	      }
	    }, [_c('li', {
	      ref: item[_vm.columnProp.value],
	      refInFor: true,
	      class: item[_vm.columnProp.value] === _vm.columnValue ? 'formula-selection-item selected' : 'formula-selection-item',
	      attrs: {
	        "data-value": item[_vm.columnProp.value]
	      }
	    }, [_vm._v(_vm._s(item[_vm.columnProp.name] + '  ' + item[_vm.columnProp.value]))])])
	  }))])])])], 1)], 1)]), _c('span', {
	    staticClass: "dialog-footer",
	    slot: "footer"
	  }, [_c('el-button', {
	    on: {
	      "click": _vm.cancel
	    }
	  }, [_vm._v("取 消")]), _c('el-button', {
	    attrs: {
	      "type": "primary"
	    },
	    on: {
	      "click": _vm.confirm
	    }
	  }, [_vm._v("确 定")])], 1)])
	},staticRenderFns: []}

/***/ })

/******/ });