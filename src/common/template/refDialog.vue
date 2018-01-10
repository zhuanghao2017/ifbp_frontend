<template>
	<el-ref
  :dialogVisible="dialogVisible"
	treeDc="/tree.json"
	children="children"
          label="label"
          tableDc="/table.json">
  </el-ref>
</template>
<script>

export default {
  data(){
    return {
       dialogVisible:true
    };
  }
};
</script>
