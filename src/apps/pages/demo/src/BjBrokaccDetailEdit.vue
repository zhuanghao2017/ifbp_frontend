<template>
	<div class="edit-page-show">
		<div class="list-view">
			<h3>基本信息</h3>
			<el-form label-position="right" label-width="160px" :model="formData" ref="form" :inline="true" :rules="rules">
									<el-row>
					<el-form-item label="主键"  prop="id">
						<el-input v-model="formData.id"></el-input>
					</el-form-item>
					<el-form-item label="经纪费计提主键"  prop="brokerageAccrueId">
						<el-input v-model="formData.brokerageAccrueId"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="保单号"  prop="policyNo">
						<el-input v-model="formData.policyNo"></el-input>
					</el-form-item>
					<el-form-item label="批单号"  prop="ratifyPolicyNo">
						<el-input v-model="formData.ratifyPolicyNo"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="性质"  prop="nature">
						<el-input v-model="formData.nature"></el-input>
					</el-form-item>
					<el-form-item label="所属批次"  prop="belongsBatch">
						<el-input v-model="formData.belongsBatch"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="所属机构"  prop="belongsOrgId">
						<el-input v-model="formData.belongsOrgId"></el-input>
					</el-form-item>
					<el-form-item label="所属部门"  prop="belongsDeptId">
						<el-input v-model="formData.belongsDeptId"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="所属团队"  prop="belongsTeamId">
						<el-input v-model="formData.belongsTeamId"></el-input>
					</el-form-item>
					<el-form-item label="业务员/代理人"  prop="salesman">
						<el-input v-model="formData.salesman"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="出单保险公司"  prop="insCompanyId">
						<el-input v-model="formData.insCompanyId"></el-input>
					</el-form-item>
					<el-form-item label="保险险类"  prop="insKindId">
						<el-input v-model="formData.insKindId"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="保险产品"  prop="insProductId">
						<el-input v-model="formData.insProductId"></el-input>
					</el-form-item>
					<el-form-item label="期数"  prop="periods">
						<el-input v-model="formData.periods"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="保费（税前）（元）"  prop="premiumPreTax">
						<el-input v-model="formData.premiumPreTax"></el-input>
					</el-form-item>
					<el-form-item label="保费（税后）（元）"  prop="premiumAfterTax">
						<el-input v-model="formData.premiumAfterTax"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="起保日期"  prop="policyBegindate">
						<el-input v-model="formData.policyBegindate"></el-input>
					</el-form-item>
					<el-form-item label="终保日期"  prop="policyEnddate">
						<el-input v-model="formData.policyEnddate"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="签单日期"  prop="signDate">
						<el-input v-model="formData.signDate"></el-input>
					</el-form-item>
					<el-form-item label="生成时间"  prop="createtime">
						<el-input v-model="formData.createtime"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="经纪费计提比例（%）"  prop="brokerageAccureRatio">
						<el-input v-model="formData.brokerageAccureRatio"></el-input>
					</el-form-item>
					<el-form-item label="应收经纪费（税后）（元）"  prop="receivBrokeragePretax">
						<el-input v-model="formData.receivBrokeragePretax"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="应收经纪费增值税（元）"  prop="receivBrokerageVtax">
						<el-input v-model="formData.receivBrokerageVtax"></el-input>
					</el-form-item>
					<el-form-item label="应收经纪费（税前）（元）"  prop="receivBrokerageAftertax">
						<el-input v-model="formData.receivBrokerageAftertax"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="创建者所属机构"  prop="pkOrg">
						<el-input v-model="formData.pkOrg"></el-input>
					</el-form-item>
					<el-form-item label="创建者所属部门"  prop="pkDept">
						<el-input v-model="formData.pkDept"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="修改者"  prop="modifier">
						<el-input v-model="formData.modifier"></el-input>
					</el-form-item>
					<el-form-item label="修改时间"  prop="modified">
						<el-input v-model="formData.modified"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="创建者"  prop="creator">
						<el-input v-model="formData.creator"></el-input>
					</el-form-item>
					<el-form-item label="创建时间"  prop="created">
						<el-input v-model="formData.created"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="租户id"  prop="tenantId">
						<el-input v-model="formData.tenantId"></el-input>
					</el-form-item>
					<el-form-item label="自定义1"  prop="def1">
						<el-input v-model="formData.def1"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="自定义2"  prop="def2">
						<el-input v-model="formData.def2"></el-input>
					</el-form-item>
					<el-form-item label="自定义3"  prop="def3">
						<el-input v-model="formData.def3"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="自定义4"  prop="def4">
						<el-input v-model="formData.def4"></el-input>
					</el-form-item>
					<el-form-item label="自定义5"  prop="def5">
						<el-input v-model="formData.def5"></el-input>
					</el-form-item>
						</el-row>
					<el-row>
					<el-form-item label="时间戳"  prop="ts">
						<el-input v-model="formData.ts"></el-input>
					</el-form-item>
					<el-form-item label="删除标识"  prop="dr">
						<el-input v-model="formData.dr"></el-input>
					</el-form-item>
				</el-row>

			</el-form>
			<div class="button-bottom">
				<el-button @click="saveData"  size="large" type="success">保存</el-button>
				<el-button @click="cancel" size="large">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	//获取公用提交，删除接口
	import api from "../../../common/js/api.js"
	/*
	 @props {formData} 动态地保定父组件地formData值，当父组件改变该数据时，编辑页可以动态地更新数据
	 * */
		export default{
			props:['formData','options'],
			data(){
				return {
					disabled:false,
					rules:{
								id:[
									{ required: true, message: '请输入主键', trigger: 'blur,change' }
								],
								brokerageAccrueId:[
									{ required: true, message: '请输入经纪费计提主键', trigger: 'blur,change' }
								],
								policyNo:[
									{ required: true, message: '请输入保单号', trigger: 'blur,change' }
								],
								ratifyPolicyNo:[
									{ required: true, message: '请输入批单号', trigger: 'blur,change' }
								],
								nature:[
									{ required: true, message: '请输入性质', trigger: 'blur,change' }
								],
								belongsBatch:[
									{ required: true, message: '请输入所属批次', trigger: 'blur,change' }
								],
								belongsOrgId:[
									{ required: true, message: '请输入所属机构', trigger: 'blur,change' }
								],
								belongsDeptId:[
									{ required: true, message: '请输入所属部门', trigger: 'blur,change' }
								],
								belongsTeamId:[
									{ required: true, message: '请输入所属团队', trigger: 'blur,change' }
								],
								salesman:[
									{ required: true, message: '请输入业务员/代理人', trigger: 'blur,change' }
								],
								insCompanyId:[
									{ required: true, message: '请输入出单保险公司', trigger: 'blur,change' }
								],
								insKindId:[
									{ required: true, message: '请输入保险险类', trigger: 'blur,change' }
								],
								insProductId:[
									{ required: true, message: '请输入保险产品', trigger: 'blur,change' }
								],
								periods:[
									{ required: true, message: '请输入期数', trigger: 'blur,change' }
								],
								premiumPreTax:[
									{ required: true, message: '请输入保费（税前）（元）', trigger: 'blur,change' }
								],
								premiumAfterTax:[
									{ required: true, message: '请输入保费（税后）（元）', trigger: 'blur,change' }
								],
								policyBegindate:[
									{ required: true, message: '请输入起保日期', trigger: 'blur,change' }
								],
								policyEnddate:[
									{ required: true, message: '请输入终保日期', trigger: 'blur,change' }
								],
								signDate:[
									{ required: true, message: '请输入签单日期', trigger: 'blur,change' }
								],
								createtime:[
									{ required: true, message: '请输入生成时间', trigger: 'blur,change' }
								],
								brokerageAccureRatio:[
									{ required: true, message: '请输入经纪费计提比例（%）', trigger: 'blur,change' }
								],
								receivBrokeragePretax:[
									{ required: true, message: '请输入应收经纪费（税后）（元）', trigger: 'blur,change' }
								],
								receivBrokerageVtax:[
									{ required: true, message: '请输入应收经纪费增值税（元）', trigger: 'blur,change' }
								],
								receivBrokerageAftertax:[
									{ required: true, message: '请输入应收经纪费（税前）（元）', trigger: 'blur,change' }
								],
								pkOrg:[
									{ required: true, message: '请输入创建者所属机构', trigger: 'blur,change' }
								],
								pkDept:[
									{ required: true, message: '请输入创建者所属部门', trigger: 'blur,change' }
								],
								modifier:[
									{ required: true, message: '请输入修改者', trigger: 'blur,change' }
								],
								modified:[
									{ required: true, message: '请输入修改时间', trigger: 'blur,change' }
								],
								creator:[
									{ required: true, message: '请输入创建者', trigger: 'blur,change' }
								],
								created:[
									{ required: true, message: '请输入创建时间', trigger: 'blur,change' }
								],
								tenantId:[
									{ required: true, message: '请输入租户id', trigger: 'blur,change' }
								],
								def1:[
									{ required: true, message: '请输入自定义1', trigger: 'blur,change' }
								],
								def2:[
									{ required: true, message: '请输入自定义2', trigger: 'blur,change' }
								],
								def3:[
									{ required: true, message: '请输入自定义3', trigger: 'blur,change' }
								],
								def4:[
									{ required: true, message: '请输入自定义4', trigger: 'blur,change' }
								],
								def5:[
									{ required: true, message: '请输入自定义5', trigger: 'blur,change' }
								],
								ts:[
									{ required: true, message: '请输入时间戳', trigger: 'blur,change' }
								],
								dr:[
									{ required: true, message: '请输入删除标识', trigger: 'blur,change' }
								],
					}
				}
			},
			methods:{
				resetForm(){
					this.$refs.form.resetFields();
				},
				/*
				 	提交hide事件，由父组件监听（返回列表页）
				 * */
				cancel(){
					this.$emit("hide")
				},
				/*
				 	保存数据
				 	调用保存数据的通用API，API说明参考api.js
				 * */
				saveData(){
					var _this = this
					this.$refs.form.validate((valid) => {
					if(!valid)
						return false;
					api.saveData({
						data(){
							return {
								baseUrl:this.BASEURL + "/bjBrokaccDetail/insertOrUpdate",
								formData:_this.formData,
								callbackMethods:true,
								//当前操作的表格
								currentTable: _this.$refs.childTable,
								//当前组件
								currentComponent:_this,
							}
						},
						methods:{
							onSaveSuccess:function(success){
								_this.$message({
									showClose: true,
									message: '保存成功',
									type: 'success',
									duration: 1000
								});
								_this.$emit("hide")
							},
							onSaveError:function(error){
								_this.$message({
									showClose: true,
									message: '保存失败',
									type: 'error',
									duration: 1000
								});
								_this.$emit("hide")
							}
						}
					})
					})
				}
			}
		}
</script>
