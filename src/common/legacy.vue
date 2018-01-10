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
          iframe_src: function () {
  var path = this.$route.path;
  var hash = window.location.hash;
  var url;
  if (path.indexOf('lgc/') > -1) {
    url = './legacy.html?page=' + this.$route.params.appcode;
  } else if (this.$route.params.appcode.indexOf('http') !== -1) {
    url = hash.replace('#/ifr/', '');
    url = url.split('$').join('/').split('+').join('#');
  } else {
    url = '/' + this.$route.params.appcode.split('$').join('/').split('+').join('#');
  }
  return url;
}
       },
       mounted(){
        //
        if(document.getElementById("organization_page")){
          document.getElementById("organization_page").style.display = "none";
        }
        var frame = this.$refs.iframe;
        frame.onload = function(){
          var frameDom = window.parent.frames[0].document;
          if(frameDom.styleSheets.length) {
            frameDom.styleSheets[0].insertRule('.btn.btn-default.btn-sm.backbutton,button[data-role="returnbtn"],button.u-button.btn-back.font-size-14.margin-left-10.backBtn, span.btn.btn-default.btn-sm.backbutton,button[data-role="treereturnbtn"],button[data-role="mapreturnbtn"].u-button.u-button-accent.whitebutton.u-left,button.backBtn.btn-back{display: none!important;}',frameDom.styleSheets[0].rules.length);
          }
        };
       }
    };
</script>
<style>
  iframe{
    height:100%;
  }
</style>
