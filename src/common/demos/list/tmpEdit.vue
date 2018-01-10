<template>
	<div class="edit-page">
		<div>
			<h3></h3>
			<div class="ifbp-panel">
			<el-button-group>
				<el-button @click="saveData" v-show="isEdit" type="primary">保存</el-button>
				<el-button @click="saveData" v-show="isEdit">保存并新增</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-button-group>
			</div>	
			<div class="ifbp-panel">
				<el-template :tplCode="tplCode" @change="changeHandle" ref="tpl" v-if="tplCode" :isEdit="isEdit" :templateValue="currentValue"></el-template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['pk_user','isEdit'],
		data() {
			return {
				tplCode: {
					funcnode: 'dingrf',
					nexuskey: 'oauser'
				},
				list: '',
				originalValue: '',
				currentValue: '',
				searchKey: '关键字',
				// isEdit: true
			}
		},
		methods: {
			request(user_pk) {
				this.$http({
					url: '/ifbp-demo-user/user/getUser',
					method: 'post',
					data: {
						pk_user: user_pk //'98ca62e8-a82f-48b2-9b35-f2b268d11143'
					}
				}).then((res) => {
					console.log(res);
					if (res.data.success === 'success') {
						console.log(this);
						this.originalValue = res.data.detailMsg.data;
						this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
						//this.$refs.tpl.setValue(this.currentValue);
					} else {
						this.$message('error');
					}
	
				});
			},
			changeHandle(index, value) {
				console.log(index, value);
				this.currentValue[index] = value;
			},
			set() {
				this.isEdit = true;
			},
			del() {
	
			},
			saveData() {
				this.isEdit = false;
				console.log(this.currentValue);
				this.$http({
					url: '/ifbp-demo-user/user/save',
					method: 'post',
					data: [this.currentValue]
				}).then(() => {
					this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
					this.$emit("hide")
				});
			},
			// cancel(){
			// 	this.isEdit = false;
			// 	this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
			// 	//this.$refs.tpl.setValue(this.originalValue);
			// },
			cancel() {
				this.$emit("hide")
			},
			// saveData() {
			// 	this.$emit("hide")
			// }
		},
		created() {
			// this.request();
		},
		watch:{
			pk_user(val){
				if (val == '-1'){
					this.currentValue = {};
				}else{
					this.request(val);
				}
			}
		}
	}
</script>

<style>
	
</style>