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

	module.exports = __webpack_require__(658);


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

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _welcome = __webpack_require__(659);

	var _welcome2 = _interopRequireDefault(_welcome);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_welcome2.default.install = function (Vue) {
	  Vue.component(_welcome2.default.name, _welcome2.default);
	};

	exports.default = _welcome2.default;

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(660),
	  /* template */
	  __webpack_require__(664),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

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

	exports.default = {
	  name: 'ElWelcome',
	  props: ['peopleName', 'companyName', 'customersNumber', 'simpleCustomerNumber'],
	  data: function data() {
	    return {
	      userImg: __webpack_require__(661),
	      current_customers: __webpack_require__(662),
	      current_simple_customers: __webpack_require__(663),
	      date: new Date().toLocaleDateString()
	    };
	  }
	};

/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/u4662.3d5bfc1.png";

/***/ }),

/***/ 662:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABD0lEQVR4Ae3SsQ2AMBAEQZsI+qNM+oMMRA1DxjpfSz+6MXokMN96O66bfvlpfO7rXH56+2dnB4iUAQaIApi3wABRAPMWGCAKYN4CA0QBzFtggCiAeQsMEAUwb4EBogDmLTBAFMC8BQaIApi3wABRAPMWGCAKYN4CA0QBzFtggCiAeQsMEAUwb4EBogDmLTBAFMC8BQaIApi3wABRAPMWGCAKYN4CA0QBzFtggCiAeQsMEAUwb4EBogDmLTBAFMC8BQaIApi3wABRAPMWGCAKYN4CA0QBzFtggCiAeQsMEAUwb4EBogDmLTBAFMC8BQaIApi3wABRAPMWGCAKYN4CA0QBzFtggCiAeQtEwHIUeACP9gSc1+aBbgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 663:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABDklEQVR4Ae3SQQ2AQBAEwT1soQKlqEAXBA3Fj75/X7KVmemRwHrr45qbfvlpfO6ztp/e/tnZASJlgAGiAOYtMEAUwLwFBogCmLfAAFEA8xYYIApg3gIDRAHMW2CAKIB5CwwQBTBvgQGiAOYtMEAUwLwFBogCmLfAAFEA8xYYIApg3gIDRAHMW2CAKIB5CwwQBTBvgQGiAOYtMEAUwLwFBogCmLfAAFEA8xYYIApg3gIDRAHMW2CAKIB5CwwQBTBvgQGiAOYtMEAUwLwFBogCmLfAAFEA8xYYIApg3gIDRAHMW2CAKIB5CwwQBTBvgQGiAOYtMEAUwLwFBogCmLfAAFEA8xYYIApg3gIRsBwFHgIwA5xSbBGtAAAAAElFTkSuQmCC"

/***/ }),

/***/ 664:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-welcome"
	  }, [_c('div', {
	    staticClass: "el-col-8"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.userImg,
	      "alt": ""
	    }
	  }), _c('p', [_vm._v("Hi，" + _vm._s(_vm.peopleName) + "，欢迎你回来!")]), _c('p', [_vm._v(_vm._s(_vm.companyName))]), _c('p', {
	    staticClass: "date"
	  }, [_vm._v(_vm._s(_vm.date))])]), _c('div', {
	    staticClass: "el-col-8"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.current_customers,
	      "alt": ""
	    }
	  }), _c('p', {
	    staticClass: "margin40"
	  }, [_vm._v("当前客户")]), _c('p', [_c('span', {
	    staticClass: "number"
	  }, [_vm._v(_vm._s(_vm.customersNumber))]), _vm._v(" 人")])]), _c('div', {
	    staticClass: "el-col-8"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.current_simple_customers,
	      "alt": ""
	    }
	  }), _c('p', {
	    staticClass: "margin40"
	  }, [_vm._v("当前个人客户")]), _c('p', [_c('span', {
	    staticClass: "number"
	  }, [_vm._v(_vm._s(_vm.simpleCustomerNumber))]), _vm._v(" 人")])])])
	},staticRenderFns: []}

/***/ })

/******/ });