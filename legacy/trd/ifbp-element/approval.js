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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _approval = __webpack_require__(7);

	var _approval2 = _interopRequireDefault(_approval);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_approval2.default.install = function (Vue) {
	  Vue.component(_approval2.default.name, _approval2.default);
	};

	exports.default = _approval2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(8)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(13),
	  /* template */
	  __webpack_require__(14),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-65f33922",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("1c693e8c", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.action[data-v-65f33922] {\n  width: 60px;\n  margin-left: 10px;\n}\n", ""]);

	// exports


/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	  name: 'ElApproval',
	  data: function data() {
	    return {
	      opinion: '',
	      active: 0,
	      activeTab: 'panel',
	      extraTabs: [],
	      // extraTabs: [{
	      //   label: '123',
	      //   name: '123',
	      //   closable: true
	      // }],,
	      dialogVisible: false,
	      formLive: false,
	      currentAction: 'approval',
	      normalForm: {
	        people: ''
	      },
	      normalFormRules: {
	        people: [{
	          required: true,
	          message: '请选择人员',
	          trigger: 'change'
	        }] },
	      rejectForm: {
	        rejectTo: '直接驳回',
	        person: '',
	        node: '',
	        toCC: false,
	        ccList: []
	      },
	      rejectFormRules: {
	        person: [{
	          required: true,
	          message: '请选择人员',
	          trigger: 'change'
	        }],
	        node: [{
	          required: true,
	          message: '请选择节点',
	          trigger: 'change'
	        }]
	      },
	      defaultDialogConf: {
	        approval: {
	          title: '批准',
	          message: '',
	          style: {}
	        },
	        reject: {
	          title: '驳回',
	          message: '',
	          style: {}
	        },
	        'extra-endorse': {
	          title: '加签',
	          message: '',
	          style: {}
	        },
	        'counter-sign': {
	          title: '会签',
	          message: '',
	          style: {}
	        },
	        assign: {
	          title: '改派',
	          message: '',
	          style: {}
	        }
	      },
	      defaultButton: {
	        approval: {
	          name: 'approval',
	          type: 'success',
	          label: '批准',
	          showChooser: false
	        },
	        reject: {
	          name: 'reject',
	          type: 'danger',
	          label: '驳回'
	        },
	        'extra-endorse': {
	          name: 'extra-endorse',
	          type: 'info',
	          label: '加签',
	          showChooser: true
	        },
	        'counter-sign': {
	          name: 'counter-sign',
	          type: 'info',
	          label: '会签',
	          showChooser: true
	        },
	        assign: {
	          name: 'assign',
	          type: 'info',
	          label: '改派',
	          showChooser: true
	        }
	      }
	    };
	  },

	  props: {
	    approvalText: {
	      type: String,
	      default: '批准',
	      required: false
	    },
	    rejectText: {
	      type: String,
	      default: '驳回',
	      required: false
	    },
	    personList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      },
	      required: false
	    },
	    nodeList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      },
	      required: false
	    },
	    toCcList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      },
	      required: false
	    },
	    steps: {
	      type: Array,
	      default: function _default() {
	        return [];
	      },
	      required: false
	    },
	    currentStep: {
	      type: Object,
	      default: function _default() {
	        return {};
	      },
	      required: false
	    },
	    dialogConf: {
	      type: Object,
	      default: function _default() {
	        return {};
	      },
	      required: false
	    },
	    opinionHolder: {
	      type: String,
	      default: '请输入审批意见',
	      required: false
	    },
	    columns: {
	      type: Array,
	      default: function _default() {
	        return [{
	          label: '发送人',
	          prop: 'creator',
	          sortable: false,
	          width: 90
	        }, {
	          label: '发送时间',
	          prop: 'createTime',
	          sortable: false,
	          width: 90
	        }, {
	          label: '审批人',
	          prop: 'name',
	          sortable: false,
	          width: 90
	        }, {
	          label: '审批时间',
	          prop: 'updateTime',
	          sortable: false,
	          width: 90
	        }, {
	          label: '是否审批',
	          prop: 'isApproved',
	          sortable: false,
	          width: 90
	        }, {
	          label: '批语',
	          prop: 'word',
	          sortable: false,
	          width: 90
	        }, {
	          label: '消息内容',
	          prop: 'content',
	          sortable: false,
	          width: 200
	        }];
	      },
	      required: false
	    },
	    history: {
	      type: Array,
	      default: function _default() {
	        return [];
	      },
	      required: false
	    },
	    approvalStyle: {
	      type: Object,
	      default: function _default() {
	        return {
	          width: '80px',
	          'margin-left': '10px',
	          color: '#fff',
	          'background-color': '#20a0ff',
	          'border-color': '#20a0ff'
	        };
	      },
	      required: false
	    },
	    rejectStyle: {
	      type: Object,
	      default: function _default() {
	        return {
	          width: '80px',
	          'margin-left': '10px'
	        };
	      },
	      required: false
	    },
	    opinionStyle: {
	      type: Object,
	      default: function _default() {
	        return {
	          width: '200px',
	          'vertical-align': 'middle',
	          'margin-left': 'calc(50% - 200px - 90px)'
	        };
	      },
	      required: false
	    },
	    headerStyle: {
	      type: Object,
	      default: function _default() {
	        return {
	          width: '100%',
	          'min-width': '600px',
	          height: '100px',
	          'line-height': '100px',
	          'box-sizing': 'border-box',
	          'border': '1px solid rgb(191, 203, 217)',
	          'border-radius': '4px',
	          'margin-bottom': '10px'
	        };
	      },
	      required: false
	    },
	    stepbarStyle: {
	      type: Object,
	      default: function _default() {
	        return {
	          width: '100%',
	          'min-width': '600px',
	          'border': '1px solid rgb(191, 203, 217)',
	          'border-radius': '4px',
	          'padding': '20px',
	          'box-sizing': 'border-box',
	          'margin-bottom': '10px',
	          'overflow-x': 'auto'
	        };
	      },
	      required: false
	    }
	  },
	  computed: {
	    space: function space() {
	      return this.steps.length > 10 ? 70 : '';
	    },
	    showChooser: function showChooser() {
	      var _this = this;

	      var showChooser = {};
	      var name;
	      if (this.currentStep.buttons && this.currentStep.buttons.length > 0) {
	        this.currentStep.buttons.forEach(function (button) {
	          name = button.name;
	          if (name && _this.defaultButton[name]) {
	            if (typeof button.showChooser === 'boolean') {
	              showChooser[name] = button.showChooser;
	            } else {
	              showChooser[name] = _this.defaultButton[name].showChooser;
	            }
	          }
	        });
	      } else {
	        Object.keys(this.defaultButton).forEach(function (key) {
	          showChooser[key] = _this.defaultButton[key].showChooser;
	        });
	      }
	      return showChooser;
	    },
	    mergedDialog: function mergedDialog() {
	      var _this2 = this;

	      var dialogs = {};
	      Object.keys(this.defaultDialogConf).forEach(function (key) {
	        if (_this2.dialogConf[key]) {
	          dialogs[key] = _this2.mergeObj(_this2.defaultDialogConf[key], _this2.dialogConf[key]);
	        } else {
	          dialogs[key] = _this2.defaultDialogConf[key];
	        }
	      });
	      return dialogs;
	    },
	    buttons: function buttons() {
	      var _this3 = this;

	      var buttons = {};
	      var name;
	      if (this.currentStep.buttons && this.currentStep.buttons.length > 0) {
	        this.currentStep.buttons.forEach(function (button) {
	          name = button.name;
	          if (name && _this3.defaultButton[name]) {
	            buttons[name] = _this3.mergeObj(_this3.defaultButton[name], button);
	          }
	        });
	      } else {
	        buttons = this.defaultButton;
	      }
	      return buttons;
	    }
	  },
	  watch: {
	    dialogVisible: function dialogVisible() {
	      var _this4 = this;

	      this.$nextTick(function () {
	        _this4.formLive = _this4.dialogVisible;
	      });
	    }
	  },
	  methods: {
	    mergeObj: function mergeObj(def, custom) {
	      var merged = {};
	      Object.keys(def).forEach(function (key) {
	        merged[key] = custom[key] ? custom[key] : def[key];
	      });
	      return merged;
	    },
	    setCurStep: function setCurStep(step) {
	      if (typeof step === 'number' && step > -1 && step < this.steps.length + 1) {
	        this.active = parseInt(step, 10);
	      } else {
	        console.warn('call method "setCurStep" with wrong step: ' + step);
	      }
	    },
	    clickTab: function clickTab(e) {
	      console.log(e);
	    },
	    actionChange: function actionChange(value) {
	      if (value === '人员') {
	        this.rejectFormRules = {
	          person: [{
	            required: true,
	            message: '请选择人员',
	            trigger: 'change'
	          }]
	        };
	      } else if (value === '节点') {
	        this.rejectFormRules = {
	          node: [{
	            required: true,
	            message: '请选择节点',
	            trigger: 'change'
	          }]
	        };
	      } else {
	        this.rejectFormRules = {};
	      }
	    },
	    removeTab: function removeTab(tabName) {
	      this.extraTabs = this.extraTabs.filter(function (tab) {
	        return tab.name !== tabName;
	      });
	    },
	    confirm: function confirm() {
	      var _this5 = this;

	      var form;
	      var data;
	      if (this.currentAction !== 'reject') {
	        if (this.showChooser[this.currentAction]) {
	          form = this.$refs.normal;
	          data = {
	            person: this.normalForm.people
	          };
	        } else {
	          data = {};
	        }
	      } else {
	        form = this.$refs.reject;
	        data = {
	          rejectTo: this.rejectForm.rejectTo,
	          person: this.rejectForm.person,
	          node: this.rejectForm.node,
	          toCC: this.rejectForm.toCC,
	          ccList: this.rejectForm.ccList.slice()
	        };
	      }
	      if (this.currentAction === 'reject' || this.showChooser[this.currentAction]) {
	        form.validate(function (valid) {
	          if (valid) {
	            _this5.confirmAction(data);
	          }
	        });
	      } else {
	        this.confirmAction(data);
	      }
	    },
	    confirmAction: function confirmAction(data) {
	      var eventName;
	      switch (this.currentAction) {
	        case 'approval':
	          eventName = 'approval';
	          break;
	        case 'reject':
	          eventName = 'reject';
	          break;
	        case 'assign':
	          eventName = 'assign';
	          break;
	        case 'extra-endorse':
	          eventName = 'extra-endorse';
	          break;
	        case 'counter-sign':
	          eventName = 'counter-sign';
	          break;
	        default:
	          break;
	      }
	      this.$emit(eventName, this.opinion, this.active, data);
	      this.dialogVisible = false;
	    },
	    cancel: function cancel() {
	      if (this.currentAction !== 'reject') {
	        if (this.showChooser[this.currentAction]) {
	          this.$refs.normal.resetFields();
	          this.normalForm = {
	            people: ''
	          };
	        }
	      } else {
	        this.$refs.reject.resetFields();
	        this.rejectForm = {
	          rejectTo: '直接驳回',
	          person: '',
	          node: '',
	          toCC: false,
	          ccList: []
	        };
	      }

	      this.dialogVisible = false;
	    },
	    clickButton: function clickButton(action, title) {
	      this.currentAction = action;
	      this.dialogTitle = title;
	      this.dialogVisible = true;
	    },
	    handleClose: function handleClose(done) {
	      if (this.currentAction !== 'reject') {
	        if (this.showChooser[this.currentAction]) {
	          this.$refs.normal.resetFields();
	        }
	      } else {
	        this.$refs.reject.resetFields();
	      }
	      done();
	    }
	  },
	  created: function created() {}
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-tabs', {
	    on: {
	      "click": _vm.clickTab,
	      "tab-remove": _vm.removeTab
	    },
	    model: {
	      value: (_vm.activeTab),
	      callback: function($$v) {
	        _vm.activeTab = $$v
	      },
	      expression: "activeTab"
	    }
	  }, [_c('el-tab-pane', {
	    attrs: {
	      "label": "审批面板",
	      "name": "panel"
	    }
	  }, [(_vm.steps.length > 0) ? _c('el-steps', {
	    style: (_vm.stepbarStyle),
	    attrs: {
	      "active": _vm.active,
	      "space": _vm.space
	    }
	  }, _vm._l((_vm.steps), function(step) {
	    return _c('el-step', {
	      attrs: {
	        "title": step.title,
	        "description": step.description,
	        "icon": step.icon
	      }
	    })
	  })) : _vm._e(), _c('el-dialog', {
	    attrs: {
	      "title": _vm.mergedDialog[_vm.currentAction].title,
	      "visible": _vm.dialogVisible,
	      "size": "tiny",
	      "before-close": _vm.handleClose
	    }
	  }, [(_vm.mergedDialog[_vm.currentAction].message.length > 0) ? _c('label', {
	    style: (_vm.mergedDialog[_vm.currentAction].style)
	  }, [_vm._v(_vm._s(_vm.mergedDialog[_vm.currentAction].message))]) : _vm._e(), (_vm.showChooser[_vm.currentAction] && _vm.formLive && _vm.currentAction !== 'reject') ? _c('el-form', {
	    ref: "normal",
	    attrs: {
	      "model": _vm.normalForm,
	      "rules": _vm.normalFormRules
	    }
	  }, [_c('el-form-item', {
	    attrs: {
	      "label": "人员",
	      "prop": "people"
	    }
	  }, [_c('el-select', {
	    attrs: {
	      "filterable": "",
	      "placeholder": "请选择"
	    },
	    model: {
	      value: (_vm.normalForm.people),
	      callback: function($$v) {
	        _vm.normalForm.people = $$v
	      },
	      expression: "normalForm.people"
	    }
	  }, _vm._l((_vm.personList), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.label,
	        "value": item.value
	      }
	    })
	  }))], 1)], 1) : _vm._e(), (_vm.formLive && _vm.currentAction === 'reject') ? _c('el-form', {
	    ref: "reject",
	    attrs: {
	      "model": _vm.rejectForm,
	      "rules": _vm.rejectFormRules
	    }
	  }, [_c('el-form-item', {
	    attrs: {
	      "prop": "rejectTo"
	    }
	  }, [_c('el-radio-group', {
	    on: {
	      "chang111e": _vm.actionChange
	    },
	    model: {
	      value: (_vm.rejectForm.rejectTo),
	      callback: function($$v) {
	        _vm.rejectForm.rejectTo = $$v
	      },
	      expression: "rejectForm.rejectTo"
	    }
	  }, [_c('el-radio', {
	    attrs: {
	      "label": "直接驳回"
	    }
	  }, [_vm._v("直接驳回")]), _c('el-radio', {
	    attrs: {
	      "label": "节点"
	    }
	  }, [_vm._v("节点")]), _c('el-radio', {
	    attrs: {
	      "label": "人员"
	    }
	  }, [_vm._v("人员")])], 1)], 1), ('人员' === _vm.rejectForm.rejectTo) ? _c('el-form-item', {
	    attrs: {
	      "prop": "person"
	    }
	  }, [_c('el-select', {
	    attrs: {
	      "filterable": "",
	      "placeholder": "请选择"
	    },
	    model: {
	      value: (_vm.rejectForm.person),
	      callback: function($$v) {
	        _vm.rejectForm.person = $$v
	      },
	      expression: "rejectForm.person"
	    }
	  }, _vm._l((_vm.personList), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.label,
	        "value": item.value
	      }
	    })
	  }))], 1) : _vm._e(), ('节点' === _vm.rejectForm.rejectTo) ? _c('el-form-item', {
	    attrs: {
	      "prop": "node"
	    }
	  }, [_c('el-select', {
	    attrs: {
	      "filterable": "",
	      "placeholder": "请选择"
	    },
	    model: {
	      value: (_vm.rejectForm.node),
	      callback: function($$v) {
	        _vm.rejectForm.node = $$v
	      },
	      expression: "rejectForm.node"
	    }
	  }, _vm._l((_vm.nodeList), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.label,
	        "value": item.value
	      }
	    })
	  }))], 1) : _vm._e(), _c('el-form-item', {
	    attrs: {
	      "prop": "toCC"
	    }
	  }, [_c('el-checkbox', {
	    model: {
	      value: (_vm.rejectForm.toCC),
	      callback: function($$v) {
	        _vm.rejectForm.toCC = $$v
	      },
	      expression: "rejectForm.toCC"
	    }
	  }, [_vm._v("抄送")])], 1), (_vm.rejectForm.toCC) ? _c('el-form-item', {
	    attrs: {
	      "prop": "toCC"
	    }
	  }, [_c('el-select', {
	    attrs: {
	      "filterable": "",
	      "multiple": "",
	      "placeholder": "请选择"
	    },
	    model: {
	      value: (_vm.rejectForm.ccList),
	      callback: function($$v) {
	        _vm.rejectForm.ccList = $$v
	      },
	      expression: "rejectForm.ccList"
	    }
	  }, _vm._l((_vm.toCcList), function(item) {
	    return _c('el-option', {
	      key: item.value,
	      attrs: {
	        "label": item.label,
	        "value": item.value
	      }
	    })
	  }))], 1) : _vm._e()], 1) : _vm._e(), _c('span', {
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
	  }, [_vm._v("确 定")])], 1)], 1), _c('div', {
	    staticClass: "header",
	    style: (_vm.headerStyle)
	  }, [_c('el-input', {
	    style: (_vm.opinionStyle),
	    attrs: {
	      "type": "textarea",
	      "resize": 'none',
	      "placeholder": _vm.opinionHolder
	    },
	    model: {
	      value: (_vm.opinion),
	      callback: function($$v) {
	        _vm.opinion = $$v
	      },
	      expression: "opinion"
	    }
	  }), _vm._l((_vm.buttons), function(button) {
	    return _c('el-button', {
	      staticClass: "action",
	      attrs: {
	        "type": button.type
	      },
	      on: {
	        "click": function($event) {
	          _vm.clickButton(button.name)
	        }
	      }
	    }, [_vm._v(_vm._s(button.label))])
	  })], 2), _c('div', {
	    staticClass: "content"
	  }, [_vm._t("content")], 2)], 1), _c('el-tab-pane', {
	    attrs: {
	      "label": "审批历史",
	      "name": "history"
	    }
	  }, [_c('el-table', {
	    attrs: {
	      "data": _vm.history
	    }
	  }, _vm._l((_vm.columns), function(col) {
	    return _c('el-table-column', {
	      attrs: {
	        "label": col.label,
	        "prop": col.prop,
	        "sortable": col.sortable,
	        "min-width": col.width
	      }
	    })
	  }))], 1), _vm._l((_vm.extraTabs), function(tab) {
	    return (_vm.extraTabs.length > 0) ? _c('el-tab-pane', {
	      attrs: {
	        "label": tab.label,
	        "name": tab.name,
	        "closable": tab.closable,
	        "disabled": tab.disabled
	      }
	    }) : _vm._e()
	  })], 2)
	},staticRenderFns: []}

/***/ })
/******/ ]);