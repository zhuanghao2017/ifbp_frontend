require.config({
	// baseUrl: window.baseUrl==undefined?'/workbench/':window.baseUrl,
	paths: {
		'jquery':'trd/jquery/jquery-1.11.2',
		'bootstrap': 'trd/bootstrap/js/bootstrap.min',
		'placeholder': 'trd/jquery-placeholder/jquery.placeholder.min',
		'ptindex': 'ptindex',
		'jqueryui': 'trd/jquery-ui/jquery-ui.min',
		'art': 'trd/artTemplate/template',
		'messenger':'components/messenger',
		'Layout':'js/ext/layout',
		'Layouts': 'js/ext/Layouts',
		'Toolbar': 'js/ext/Toolbar',
		'bdtpl': 'apworkbench/trd/baiduTemplate/baiduTemplate',
		'appconfig': 'apworkbench/config/app.config',
		'css': 'trd/requirejs/css',
		'text': 'trd/requirejs/text',
		'style': 'apworkbench/css',
		'myComponent': 'apworkbench/js/myComponent',
		'jquery.chosen': 'trd/chosen/chosen.jquery',
		'customEvent': 'apworkbench/components/customEvent/customEvent',
		'userInfo' : 'apworkbench/components/userInfo/userInfo',
		'viewutil':"apworkbench/components/viewutil/viewutil",
		'contextRoot':'apworkbench/components/contextRoot/contextRoot',
		'layoutDesign':'apworkbench/components/layoutDesign/layoutDesign',
		'cookieOperation':'apworkbench/components/cookieOperation/cookieOperation',
		'dialog':'apworkbench/trd/dialog/dialog',
		'dialogmin':'apworkbench/js/dialogmin',
        'dealTopic'	:'apworkbench/components/dealTopic/dealTopic',
        'bootstrapValidator' : 'apworkbench/components/bootstrapvalidator/dist/js/bootstrapValidator',
        'knockout': "apworkbench/trd/ko/knockout-min",
        'dialogminBack': "apworkbench/js/dialogminBack"
    },
    waitSeconds: 0,
	shim: {

		'jquery.chosen': {
			deps: [ ]
		},
		'bootstrap' : {
			deps: ['jquery']
		},
		'placeholder' : {
			deps: ['jquery']
		},
		'customEvent': {
			deps: [ ]
		},
		'bdtpl': {
			exports: 'baidu'
		},
		'viewutil' :{
			deps : [],
			exports : ''
		},
		'messenger': {
			exports: 'Topic'
		},
		'Toolbar' : {
			exports: 'Toolbar'
		},
		'director' : {
			exports: 'Router'
		},
		'interactor' : {
			exports: ''
		},
		'Layout' : {
			exports: 'Layout'
		},
		'dialog' : {
			deps: [ 'css!apworkbench/trd/dialog/ui-dialog.css'],
			exports: 'dialog'
		}
	}
});
