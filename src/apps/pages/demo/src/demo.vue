<template>
	<div>
		<div>src:<srcButton></srcButton></div>
		<div>pages:<pagesButton></pagesButton></div>
		<div>common<commonButton></commonButton></div>
		<quill-editor :content="surveyInfo"
                :options="editorOption"
                @change="onEditorChange($event)">
  	</quill-editor> 
	</div>
</template>

<script>
	/*
	 * 引入组件以及js模块
	 * 分别测试引入不同位置的vue及js文件保证产出后的资源可正常使用
	 */
	import srcButton from "./button.vue"
	import pagesButton from '../components/button.vue'
	import commonButton from '../../../common/components/button.vue'
	import urlRoot from '../../../common/js/urlRoot.js'
	import bus from '../../../common/js/bus.js'
	import { quillEditor } from 'vue-quill-editor'
	//import test from "../mockdata.js"

	export default {
		name: "demo",
		data(){
			return {
				surveyInfo:'123',
				editorOption:{

				}
			}
		},
		components: {
			srcButton,
			pagesButton,
			commonButton,
			quillEditor
		},
		created(){
			var url = urlRoot.urlWepper('/test/test1')
			console.log(url);
			var v = bus.bus;
			console.log(v);
		},
		methods:{
			//编辑器内容改变事件
				onEditorChange({ editor, html, text }) {
					//console.log('editor change!', editor, html, text)
					this.surveyInfo=html;
				}
		}
	}
</script>
