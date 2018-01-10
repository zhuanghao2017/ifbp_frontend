<template>
    <iframe ref="iframe" style="width:100%;height:100%;" v-bind:src="iframe_src"></iframe>
</template>

<script>
    export default {
       data: function(){
           return {
               
           };
       },
       computed:{
           iframe_src: function(){
               return this.$route.params.appcode.split('$').join('/');
           }
       },
       mounted(){
        var frame = this.$refs.iframe;
        frame.onload = function(){
          var frameDom = window.parent.frames[0].document;
          frameDom.styleSheets[0].insertRule('.btn.btn-default.btn-sm.backbutton,button[data-role="returnbtn"],button[data-role="treereturnbtn"],button.backBtn.btn-back{display: none;}',frameDom.styleSheets[0].rules.length);
        };
       }
    };    
</script>
