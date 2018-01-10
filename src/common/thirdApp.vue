<template>
    <iframe :src="src" width="100%" height="100%"></iframe>
</template>
<script>
  export default {
    name: 'ElTab',
    data() {
      return {
        src: ''
      };
    },
    created() {
      this.src = encodeURI(this.$route.query.url);
    }
  };
</script>
<style>
    iframe { position: static; border: none;}
</style>
