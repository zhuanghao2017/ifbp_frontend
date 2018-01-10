<template>
	<div  class="detail-page">
		<div style="max-width: 1024px;">
		<h3></h3>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统编码</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemCode}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统名称</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemName}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统图标</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemIconCls}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统链接</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemUrl}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统编码</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemCode}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">系统是否在菜单显示</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.systemVisible==1?"是":"否"}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<div class="info-wrap">
					<el-col :span="3"><span class="detail-title">portal图标URL</span></el-col>
					<el-col :span="1"><span>:</span></el-col>
					<el-col :span="17"><span class="detail-info">{{detailInfo.systemPortalIconStyle}}</span></el-col>
				</div>
			</el-row>
			<el-row>
				<div class="info-wrap">
					<el-col :span="3"><span class="detail-title">备注</span></el-col>
					<el-col :span="1"><span>:</span></el-col>
					<el-col :span="17"><span class="detail-info">{{detailInfo.remark}}</span></el-col>
				</div>

			</el-row>
			<div class="button-bottom">
				<el-button @click="cancel" size="large">取消</el-button>
			</div>
			</div>
	</div>
</template>

<script>
	export default{
			props:['detailInfo'],
			data(){
				return {
					form:this.formData,
					addnew:false,
					hdie:true,
					edit:true,
				}
			},
			methods:{
				cancel(){
					this.$emit("hide")
				},
				saveAdd(){
					
				},
				saveEdit(){
					
				}
			}
			
		}
	
</script>

<style>
</style>