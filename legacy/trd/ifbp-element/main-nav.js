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

	module.exports = __webpack_require__(305);


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

/***/ 22:
/***/ (function(module, exports) {

	module.exports = require("ifbp-element/lib/utils/vue-popper");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

	module.exports = require("ifbp-element/lib/mixins/emitter");

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

	module.exports = require("vue");

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

	module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _mainNav = __webpack_require__(306);

	var _mainNav2 = _interopRequireDefault(_mainNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_mainNav2.default.install = function (Vue) {
	  Vue.component(_mainNav2.default.name, _mainNav2.default);
	};

	exports.default = _mainNav2.default;

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(307),
	  /* template */
	  __webpack_require__(315),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _cascader = __webpack_require__(308);

	var _cascader2 = _interopRequireDefault(_cascader);

	var _lodash = __webpack_require__(215);

	var _lodash2 = _interopRequireDefault(_lodash);

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

	exports.default = {
	  name: 'ElMainNav',
	  props: ['menuList', 'theme', 'type', 'collapse', 'style-list'],
	  data: function data() {
	    return {
	      path: this.$route.path,
	      types: 'click',
	      isActive: false,
	      list: '', // 取当前路径,
	      glist: '',
	      cssList: '',
	      style: {
	        text: {
	          color: 'black',
	          'font-size': '12px',
	          'background-color': 'white'
	        },
	        icon: {
	          isImage: false,
	          'font-size': '22px',
	          url: '',
	          name: 'el-icon-menu',
	          color: 'black'
	        }
	      }
	    };
	  },

	  components: {
	    'cascader': _cascader2.default
	  },
	  methods: {
	    adjustStyle: function adjustStyle() {
	      var _this = this;

	      var tmp = [];
	      this.list.forEach(function (v, i) {
	        _this.style.icon.name = v.icon;
	        tmp[i] = _lodash2.default.defaultsDeep(_this.styleList && _this.styleList[i] ? _this.styleList[i] : {}, _this.style);
	      });
	      this.cssList = tmp;
	    },
	    clickItem: function clickItem(hash) {
	      this.$parent.$emit('groupList', hash);
	    },
	    hover: function hover(index) {
	      var _this2 = this;

	      console.log('hover');
	      Object.keys(this.$refs).forEach(function (v) {
	        _this2.$refs[v][0].handleClick(false);
	      });
	      this.$refs['cascader' + index][0].handleClick(true);
	    },
	    close: function close(index) {
	      this.$refs['cascader' + index][0].handleClick(false);
	    },
	    scroll: function scroll(index) {
	      var _this3 = this;

	      Object.keys(this.$refs).forEach(function (v, i) {
	        _this3.$refs[v][0].$emit('scroll', index.srcElement.scrollTop);
	      });
	    },
	    clickRoute: function clickRoute(item) {
	      if (!item.children) {
	        this.$root.$router.push(item.path);
	      }
	    },
	    getRouteMap: function getRouteMap(list) {
	      var tmp = [];
	      var getChild = function getChild(array) {
	        array.forEach(function (v) {
	          if (v.children) {
	            getChild(v.children);
	          } else {
	            tmp.push(v);
	          }
	        });
	      };
	      getChild(list);
	      return tmp;
	    },
	    changeHandler: function changeHandler(value, index) {
	      var data = JSON.parse(JSON.stringify(value));
	      var router = this.$root.$router;
	      var currentValue = data[data.length - 1];
	      if (currentValue.href) {
	        window.open(currentValue.href);
	      } else if (currentValue.path) {
	        router.push(currentValue.path);
	      }
	      this.path = index;
	    },
	    handlePathFocus: function handlePathFocus(path) {
	      var tmp = void 0;
	      for (var i = 0; i < this.list.length; i++) {
	        if (!this.list[i].children) {
	          if (this.list[i].path === path) {
	            this.path = path;
	            return;
	          }
	        } else {
	          tmp = this.getRouteMap(this.list[i].children);
	          for (var j = 0; j < tmp.length; j++) {
	            if (tmp[j].path === path) {
	              this.path = this.list[i].path;
	              return;
	            }
	          }
	        }
	      }
	    }
	  },
	  created: function created() {
	    var localColor = localStorage.getItem('themeColor'); // 创建mainNav组件时读取localStorage
	    this.themeClass = localColor;
	    this.style = _lodash2.default.defaultsDeep(this.styleList ? this.styleList : {}, this.style);
	    this.handlePathFocus(this.path); // 组件颜色
	    this.list = this.menuList;
	    this.adjustStyle();
	    if (this.type) {
	      this.types = this.type;
	    }
	    if (this.collapse) {
	      this.isActive = this.collapse;
	    }
	  },

	  watch: {
	    /*eslint no-unused-vars: "warn"*/
	    $route: function $route(to) {
	      this.handlePathFocus(to.fullPath);
	    },
	    theme: function theme() {
	      this.themeClass = this.theme;
	    },
	    menuList: function menuList() {
	      var _this4 = this;

	      this.list = this.menuList;
	      this.adjustStyle();
	      this.$nextTick(function () {
	        console.log('this.list=' + _this4.list);
	      });
	    },
	    collapse: function collapse() {
	      this.isActive = this.collapse;
	    }
	  }
	};

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(309),
	  /* template */
	  __webpack_require__(314),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vue = __webpack_require__(65);

	var _vue2 = _interopRequireDefault(_vue);

	var _ccMenu = __webpack_require__(310);

	var _ccMenu2 = _interopRequireDefault(_ccMenu);

	var _vuePopper = __webpack_require__(22);

	var _vuePopper2 = _interopRequireDefault(_vuePopper);

	var _clickoutside = __webpack_require__(19);

	var _clickoutside2 = _interopRequireDefault(_clickoutside);

	var _emitter = __webpack_require__(23);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _lodash = __webpack_require__(215);

	var _lodash2 = _interopRequireDefault(_lodash);

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

	var popperMixin = {
	  props: {
	    placement: {
	      type: String,
	      default: 'bottom-start'
	    },
	    appendToBody: _vuePopper2.default.props.appendToBody,
	    offset: _vuePopper2.default.props.offset,
	    boundariesPadding: _vuePopper2.default.props.boundariesPadding,
	    popperOptions: _vuePopper2.default.props.popperOptions
	  },
	  methods: _vuePopper2.default.methods,
	  data: _vuePopper2.default.data,
	  beforeDestroy: _vuePopper2.default.beforeDestroy
	};
	exports.default = {
	  name: 'cascader',
	  directives: { Clickoutside: _clickoutside2.default },
	  mixins: [popperMixin, _emitter2.default],
	  props: {
	    options: {
	      required: true
	    },
	    index: {
	      required: true
	    },
	    props: {
	      type: Object,
	      default: function _default() {
	        return {
	          children: 'children',
	          label: 'label',
	          value: 'value',
	          disabled: 'disabled'
	        };
	      }
	    },
	    value: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    disabled: Boolean,
	    clearable: {
	      type: Boolean,
	      default: false
	    },
	    changeOnSelect: Boolean,
	    // popperClass: String,
	    expandTrigger: {
	      type: String,
	      default: 'hover'
	    },
	    filterable: Boolean,
	    size: String,
	    showAllLevels: {
	      type: Boolean,
	      default: true
	    },
	    debounce: {
	      type: Number,
	      default: 300
	    }
	  },
	  data: function data() {
	    return {
	      currentValue: this.value,
	      menu: null,
	      debouncedInputChange: function debouncedInputChange() {},

	      menuVisible: false,
	      inputHover: false,
	      inputValue: '',
	      flatOptions: null
	    };
	  },

	  computed: {
	    labelKey: function labelKey() {
	      return this.props.label || 'label';
	    },
	    valueKey: function valueKey() {
	      return this.props.value || 'value';
	    },
	    childrenKey: function childrenKey() {
	      return this.props.children || 'children';
	    },
	    currentLabels: function currentLabels() {
	      var _this = this;

	      var options = this.options;
	      var labels = [];
	      this.currentValue.forEach(function (value) {
	        var targetOption = options && options.filter(function (option) {
	          return option[_this.valueKey] === value;
	        })[0];
	        if (targetOption) {
	          labels.push(targetOption[_this.labelKey]);
	          options = targetOption[_this.childrenKey];
	        }
	      });
	      return labels;
	    }
	  },
	  watch: {
	    menuVisible: function menuVisible(value) {
	      value && this.options.length > 0 ? this.showMenu() : this.hideMenu();
	    },
	    value: function value(_value) {
	      this.currentValue = _value;
	    },
	    currentValue: function currentValue(value) {
	      this.dispatch('ElFormItem', 'el.form.change', [value]);
	    },

	    options: {
	      deep: true,
	      handler: function handler(value) {
	        if (!this.menu) {
	          this.initMenu();
	        }
	        if (this.menu) {
	          this.flatOptions = this.flattenOptions(this.options);
	          this.menu.options = value;
	        }
	      }
	    }
	  },
	  methods: {
	    initMenu: function initMenu() {
	      if (this.options.length < 1) return;
	      this.menu = new _vue2.default(_ccMenu2.default).$mount();
	      this.menu.options = this.options;
	      this.menu.props = this.props;
	      this.menu.expandTrigger = this.expandTrigger;
	      this.menu.changeOnSelect = this.changeOnSelect;
	      // this.menu.popperClass = this.popperClass;
	      this.flyoutElm = this.menu.$el;
	      this.setPosition(this.flyoutElm);
	      document.body.appendChild(this.flyoutElm);
	      this.menu.$on('pick', this.handlePick);
	      this.menu.$on('activeItemChange', this.handleActiveItemChange);
	      this.menu.$on('menuLeave', this.doDestroy);
	      this.$on('scroll', function () {
	        this.setPosition(this.flyoutElm);
	      }.bind(this));
	    },
	    setPosition: function setPosition(ele) {
	      var ref = this.$parent.$el; // li
	      var top = ref.offsetTop;
	      var left = ref.offsetLeft;
	      var parent = ref.offsetParent;
	      var scrollRef = ref.offsetParent.offsetParent;
	      while (parent) {
	        top += parent.offsetTop;
	        left += parent.offsetLeft;
	        parent = parent.offsetParent;
	      }
	      if (document.body.clientHeight - (top - scrollRef.scrollTop) < 204) {
	        ele.style.top = top - scrollRef.scrollTop - (204 - ref.offsetHeight) - 5 + 'px';
	      } else {
	        ele.style.top = top - scrollRef.scrollTop - 5 + 'px';
	      }
	      ele.style.left = left + ref.offsetWidth + 'px';
	    },
	    showMenu: function showMenu() {
	      if (!this.menu) {
	        this.initMenu();
	      }
	      if (this.menu) {
	        this.menu.value = this.currentValue.slice(0);
	        this.menu.visible = true;
	        this.menu.options = this.options;
	        this.$nextTick(function (_) {
	          // this.updatePopper();
	          // this.menu.inputWidth = this.$refs.input.$el.offsetWidth - 2;
	        });
	      }
	    },
	    hideMenu: function hideMenu() {
	      if (this.menu) {
	        this.inputValue = '';
	        this.menu.visible = false;
	      }
	    },
	    handleActiveItemChange: function handleActiveItemChange(value) {
	      this.$nextTick(function (_) {
	        // this.updatePopper();
	      });
	      this.$emit('active-item-change', value);
	    },
	    handlePick: function handlePick(value) {
	      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      this.currentValue = value;
	      // this.$emit('input', value);
	      this.$emit('change', value, this.index);
	      if (close) {
	        this.menuVisible = false;
	      }
	    },
	    handleInputChange: function handleInputChange(value) {
	      var _this2 = this;

	      if (!this.menuVisible) return;
	      var flatOptions = this.flatOptions;
	      if (!value) {
	        this.menu.options = this.options;
	        return;
	      }
	      var filteredFlatOptions = flatOptions.filter(function (optionsStack) {
	        return optionsStack.some(function (option) {
	          return new RegExp(value, 'i').test(option[_this2.labelKey]);
	        });
	      });
	      if (filteredFlatOptions.length > 0) {
	        filteredFlatOptions = filteredFlatOptions.map(function (optionStack) {
	          return {
	            __IS__FLAT__OPTIONS: true,
	            value: optionStack.map(function (item) {
	              return item[_this2.valueKey];
	            }),
	            label: _this2.renderFilteredOptionLabel(value, optionStack)
	          };
	        });
	      } else {
	        filteredFlatOptions = [{
	          __IS__FLAT__OPTIONS: true,
	          label: this.t('el.cascader.noMatch'),
	          value: '',
	          disabled: true
	        }];
	      }
	      this.menu.options = filteredFlatOptions;
	    },
	    renderFilteredOptionLabel: function renderFilteredOptionLabel(inputValue, optionsStack) {
	      var _this3 = this;

	      return optionsStack.map(function (option, index) {
	        var label = option[_this3.labelKey];
	        var keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
	        var labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
	        var node = keywordIndex > -1 ? _this3.highlightKeyword(label, labelPart) : label;
	        return index === 0 ? node : [' / ', node];
	      });
	    },
	    highlightKeyword: function highlightKeyword(label, keyword) {
	      var _this4 = this;

	      var h = this._c;
	      return label.split(keyword).map(function (node, index) {
	        return index === 0 ? node : [h('span', { class: { 'el-cascader-menu__item__keyword': true } }, [_this4._v(keyword)]), node];
	      });
	    },
	    flattenOptions: function flattenOptions(options) {
	      var _this5 = this;

	      var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      var flatOptions = [];
	      options.forEach(function (option) {
	        var optionsStack = ancestor.concat(option);
	        if (!option[_this5.childrenKey]) {
	          flatOptions.push(optionsStack);
	        } else {
	          if (_this5.changeOnSelect) {
	            flatOptions.push(optionsStack);
	          }
	          flatOptions = flatOptions.concat(_this5.flattenOptions(option[_this5.childrenKey], optionsStack));
	        }
	      });
	      return flatOptions;
	    },
	    clearValue: function clearValue(ev) {
	      ev.stopPropagation();
	      this.handlePick([], true);
	    },
	    handleClickoutside: function handleClickoutside() {
	      this.menuVisible = false;
	    },
	    handleClick: function handleClick(flag) {
	      if (this.disabled) return;
	      if (this.filterable) {
	        this.menuVisible = true;
	        // this.$refs.input.$refs.input.focus();
	        return;
	      }
	      if (flag === undefined) {
	        this.menuVisible = !this.menuVisible;
	      } else {
	        this.menuVisible = !!flag;
	      }
	    }
	  },
	  created: function created() {
	    var _this6 = this;

	    this.debouncedInputChange = _lodash2.default.debounce(function (value) {
	      _this6.handleInputChange(value);
	    }, this.debounce.default);
	  },
	  mounted: function mounted() {
	    this.flatOptions = this.flattenOptions(this.options);
	  }
	};

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(311)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(313),
	  /* template */
	  null,
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  "data-v-2b6ae508",
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(312);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("d90a8e2c", content, true);

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.el-cascader-menus[data-v-2b6ae508]{\r\n  z-index:1000;\n}\r\n", ""]);

	// exports


/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _babelHelperVueJsxMergeProps = __webpack_require__(68);

	var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElCascaderMenu',
	  data: function data() {
	    return {
	      inputWidth: 0,
	      options: [],
	      props: {},
	      visible: false,
	      activeValue: [],
	      value: [],
	      expandTrigger: 'click',
	      changeOnSelect: false,
	      popperClass: ''
	    };
	  },

	  watch: {
	    visible: function visible(value) {
	      if (value) {
	        this.activeValue = this.value;
	      }
	    },

	    value: {
	      immediate: true,
	      handler: function handler(value) {
	        this.activeValue = value;
	      }
	    }
	  },
	  computed: {
	    activeOptions: {
	      cache: false,
	      get: function get() {
	        var _this = this;

	        var activeValue = this.activeValue;
	        var configurableProps = ['label', 'value', 'children', 'disabled'];
	        var formatOptions = function formatOptions(options) {
	          options.forEach(function (option) {
	            var tmpOpt = option;
	            if (tmpOpt.__IS__FLAT__OPTIONS) return;
	            configurableProps.forEach(function (prop) {
	              var value = tmpOpt[_this.props[prop] || prop];
	              if (value) tmpOpt[prop] = value;
	            });
	            if (Array.isArray(tmpOpt.children)) {
	              formatOptions(tmpOpt.children);
	            }
	          });
	        };
	        var loadActiveOptions = function loadActiveOptions(options) {
	          var activeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	          var tmpActiveOpt = activeOptions;
	          var level = tmpActiveOpt.length;
	          tmpActiveOpt[level] = options;
	          var active = activeValue[level] ? activeValue[level].value : false;
	          if (active) {
	            var tmpOpt = options;
	            tmpOpt = tmpOpt.filter(function (option) {
	              return option.value === active;
	            })[0];
	            if (tmpOpt && tmpOpt.children) {
	              loadActiveOptions(tmpOpt.children, tmpActiveOpt);
	            }
	          }
	          return tmpActiveOpt;
	        };
	        formatOptions(this.options);
	        return loadActiveOptions(this.options);
	      }
	    }
	  },
	  methods: {
	    select: function select(item, menuIndex) {
	      if (item.__IS__FLAT__OPTIONS) {
	        this.activeValue = item;
	      } else if (menuIndex) {
	        this.activeValue.splice(menuIndex, this.activeValue.length - 1, item);
	      } else {
	        this.activeValue = [item];
	      }
	      this.$emit('pick', this.activeValue);
	    },
	    handleMenuLeave: function handleMenuLeave() {
	      this.$emit('menuLeave');
	    },
	    activeItem: function activeItem(item, menuIndex) {
	      var len = this.activeOptions.length;
	      this.activeValue.splice(menuIndex, len, item);
	      this.activeOptions.splice(menuIndex + 1, len, item.children);
	      if (this.changeOnSelect) {
	        this.$emit('pick', this.activeValue, false);
	      } else {
	        this.$emit('activeItemChange', this.activeValue);
	      }
	    }
	  },
	  render: function render(h) {
	    var _this2 = this;

	    var activeValue = this.activeValue,
	        activeOptions = this.activeOptions,
	        visible = this.visible,
	        expandTrigger = this.expandTrigger,
	        popperClass = this.popperClass;

	    var menus = this._l(activeOptions, function (menu, menuIndex) {
	      var isFlat = false;
	      var items = _this2._l(menu, function (item) {
	        var events = {
	          on: {}
	        };
	        if (item.__IS__FLAT__OPTIONS) isFlat = true;
	        if (!item.disabled) {
	          if (item.children) {
	            var triggerEvent = {
	              click: 'click',
	              hover: 'mouseenter'
	            }[expandTrigger];
	            events.on[triggerEvent] = function () {
	              _this2.activeItem(item, menuIndex);
	            };
	          } else {
	            events.on.click = function () {
	              _this2.select(item, menuIndex);
	            };
	          }
	        }
	        if (!item || !item.href) {
	          return h(
	            'li',
	            (0, _babelHelperVueJsxMergeProps2.default)([{
	              'class': {
	                'el-cascader-menu__item': true,
	                'el-cascader-menu__item--extensible': item.children,
	                'is-active': item.value === (activeValue[menuIndex] ? activeValue[menuIndex].value : ''),
	                'is-disabled': item.disabled
	              }
	            }, events]),
	            [item.label]
	          );
	        } else {
	          return h(
	            'li',
	            (0, _babelHelperVueJsxMergeProps2.default)([{
	              'class': {
	                'el-cascader-menu__item': true,
	                'el-cascader-menu__item--extensible': item.children,
	                'is-active': item.value === (activeValue[menuIndex] ? activeValue[menuIndex].value : ''),
	                'is-disabled': item.disabled
	              }
	            }, events]),
	            [h(
	              'a',
	              {
	                attrs: {
	                  target: '_blank',

	                  href: item.href
	                },
	                style: 'color: #48576a; text-decoration: none;' },
	              [item.label]
	            )]
	          );
	        }
	      });
	      var menuStyle = {};
	      if (isFlat) {
	        menuStyle.minWidth = _this2.inputWidth + 'px';
	      }
	      return h(
	        'ul',
	        {
	          'class': {
	            'el-cascader-menu': true,
	            'el-cascader-menu--flexible': isFlat
	          },
	          style: menuStyle },
	        [items]
	      );
	    });
	    return h(
	      'transition',
	      {
	        attrs: { name: 'el-zoom-in-top' },
	        on: {
	          'after-leave': this.handleMenuLeave
	        }
	      },
	      [h(
	        'div',
	        {
	          directives: [{
	            name: 'show',
	            value: visible
	          }],

	          'class': ['el-cascader-menus', popperClass]
	        },
	        [menus]
	      )]
	    );
	  }
	};

/***/ }),

/***/ 314:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    directives: [{
	      name: "clickoutside",
	      rawName: "v-clickoutside",
	      value: (_vm.handleClickoutside),
	      expression: "handleClickoutside"
	    }],
	    ref: "reference",
	    staticClass: "el-cascader",
	    class: [{
	        'is-opened': _vm.menuVisible,
	        'is-disabled': _vm.disabled
	      },
	      _vm.size ? 'el-cascader--' + _vm.size : ''
	    ],
	    on: {
	      "click": _vm.handleClick,
	      "mouseenter": function($event) {
	        _vm.inputHover = true
	      },
	      "mouseleave": function($event) {
	        _vm.inputHover = false
	      }
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ }),

/***/ 315:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    class: {
	      active: _vm.isActive, themeClass: true
	    },
	    on: {
	      "scroll": function($event) {
	        $event.stopPropagation();
	        _vm.scroll($event)
	      }
	    }
	  }, [(_vm.types === 'hover') ? _c('el-menu', {
	    staticClass: "el-menu-vertical-demo",
	    attrs: {
	      "default-active": _vm.path
	    }
	  }, _vm._l((_vm.list), function(item, index) {
	    return _c('el-menu-item', {
	      attrs: {
	        "index": item.path
	      },
	      nativeOn: {
	        "mouseover": function($event) {
	          $event.stopPropagation();
	          _vm.hover(index)
	        }
	      }
	    }, [_c('cascader', {
	      ref: 'cascader' + index,
	      refInFor: true,
	      attrs: {
	        "options": item.children ? item.children : [],
	        "index": item.path
	      },
	      on: {
	        "change": _vm.changeHandler
	      },
	      nativeOn: {
	        "click": function($event) {
	          _vm.clickRoute(item)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "el-icon-menu"
	    }), _vm._v("\n        " + _vm._s(item.label) + "\n      ")])], 1)
	  })) : _vm._e(), (_vm.types === 'click') ? _c('el-menu', {
	    staticClass: "el-menu-vertical-demo",
	    attrs: {
	      "default-active": _vm.path,
	      "router": true
	    }
	  }, _vm._l((_vm.list), function(item, index) {
	    return _c('el-menu-item', {
	      style: (item.id === _vm.$route.path ? {
	        color: 'black',
	        'font-size': _vm.cssList[index].text['font-size'],
	        'background-color': 'white'
	      } : _vm.cssList[index].text),
	      attrs: {
	        "index": item.id
	      },
	      nativeOn: {
	        "click": function($event) {
	          _vm.clickItem(item.id)
	        }
	      }
	    }, [(!_vm.cssList[index].icon.isImage) ? _c('i', {
	      staticClass: "ii",
	      class: _vm.cssList[index].icon.name,
	      style: ({
	        color: item.id === _vm.$route.path ? 'black' : _vm.cssList[index].icon.color,
	        'font-size': _vm.cssList[index].icon['font-size']
	      })
	    }) : _c('div', {
	      staticClass: "img-container"
	    }, [_c('img', {
	      attrs: {
	        "src": _vm.cssList[index].icon.url
	      }
	    })]), _vm._v("\n      " + _vm._s(item.name) + "\n    ")])
	  })) : _vm._e()], 1)
	},staticRenderFns: []}

/***/ })

/******/ });