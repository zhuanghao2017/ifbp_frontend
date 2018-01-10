<template>
	<div class="trans">
		<div class="transPage" v-show="pageState.active=='list'" >
			<div><demo></demo></div>
			<div><img src="../../../assets/img/lczx.png?__inline" alt="汽车图片"></div>
			<div class="tools-panel">
				<!-- element 动画 -->
				<transition name="el-zoom-in-top">
				<!-- 更多查询 start -->
				<div class="tools-more" v-show="!hideMore">
					<div>
						<el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="120px">
															<el-form-item label="主键"  prop="id">
										<el-input v-model="queryParams.id"></el-input>
								</el-form-item>
								<el-form-item label="经纪费计提主键"  prop="brokerageAccrueId">
										<el-input v-model="queryParams.brokerageAccrueId"></el-input>
								</el-form-item>
								<el-form-item label="保单号"  prop="policyNo">
										<el-input v-model="queryParams.policyNo"></el-input>
								</el-form-item>
								<el-form-item label="批单号"  prop="ratifyPolicyNo">
										<el-input v-model="queryParams.ratifyPolicyNo"></el-input>
								</el-form-item>
								<el-form-item label="性质"  prop="nature">
										<el-input v-model="queryParams.nature"></el-input>
								</el-form-item>
								<el-form-item label="所属批次"  prop="belongsBatch">
										<el-input v-model="queryParams.belongsBatch"></el-input>
								</el-form-item>
								<el-form-item label="所属机构"  prop="belongsOrgId">
										<el-input v-model="queryParams.belongsOrgId"></el-input>
								</el-form-item>
								<el-form-item label="所属部门"  prop="belongsDeptId">
										<el-input v-model="queryParams.belongsDeptId"></el-input>
								</el-form-item>
								<el-form-item label="所属团队"  prop="belongsTeamId">
										<el-input v-model="queryParams.belongsTeamId"></el-input>
								</el-form-item>
								<el-form-item label="业务员/代理人"  prop="salesman">
										<el-input v-model="queryParams.salesman"></el-input>
								</el-form-item>
								<el-form-item label="出单保险公司"  prop="insCompanyId">
										<el-input v-model="queryParams.insCompanyId"></el-input>
								</el-form-item>
								<el-form-item label="保险险类"  prop="insKindId">
										<el-input v-model="queryParams.insKindId"></el-input>
								</el-form-item>
								<el-form-item label="保险产品"  prop="insProductId">
										<el-input v-model="queryParams.insProductId"></el-input>
								</el-form-item>
								<el-form-item label="期数"  prop="periods">
										<el-input v-model="queryParams.periods"></el-input>
								</el-form-item>
								<el-form-item label="保费（税前）（元）"  prop="premiumPreTax">
										<el-input v-model="queryParams.premiumPreTax"></el-input>
								</el-form-item>
								<el-form-item label="保费（税后）（元）"  prop="premiumAfterTax">
										<el-input v-model="queryParams.premiumAfterTax"></el-input>
								</el-form-item>
								<el-form-item label="起保日期"  prop="policyBegindate">
										<el-input v-model="queryParams.policyBegindate"></el-input>
								</el-form-item>
								<el-form-item label="终保日期"  prop="policyEnddate">
										<el-input v-model="queryParams.policyEnddate"></el-input>
								</el-form-item>
								<el-form-item label="签单日期"  prop="signDate">
										<el-input v-model="queryParams.signDate"></el-input>
								</el-form-item>
								<el-form-item label="生成时间"  prop="createtime">
										<el-input v-model="queryParams.createtime"></el-input>
								</el-form-item>
								<el-form-item label="经纪费计提比例（%）"  prop="brokerageAccureRatio">
										<el-input v-model="queryParams.brokerageAccureRatio"></el-input>
								</el-form-item>
								<el-form-item label="应收经纪费（税后）（元）"  prop="receivBrokeragePretax">
										<el-input v-model="queryParams.receivBrokeragePretax"></el-input>
								</el-form-item>
								<el-form-item label="应收经纪费增值税（元）"  prop="receivBrokerageVtax">
										<el-input v-model="queryParams.receivBrokerageVtax"></el-input>
								</el-form-item>
								<el-form-item label="应收经纪费（税前）（元）"  prop="receivBrokerageAftertax">
										<el-input v-model="queryParams.receivBrokerageAftertax"></el-input>
								</el-form-item>
								<el-form-item label="创建者所属机构"  prop="pkOrg">
										<el-input v-model="queryParams.pkOrg"></el-input>
								</el-form-item>
								<el-form-item label="创建者所属部门"  prop="pkDept">
										<el-input v-model="queryParams.pkDept"></el-input>
								</el-form-item>
								<el-form-item label="修改者"  prop="modifier">
										<el-input v-model="queryParams.modifier"></el-input>
								</el-form-item>
								<el-form-item label="修改时间"  prop="modified">
										<el-input v-model="queryParams.modified"></el-input>
								</el-form-item>
								<el-form-item label="创建者"  prop="creator">
										<el-input v-model="queryParams.creator"></el-input>
								</el-form-item>
								<el-form-item label="创建时间"  prop="created">
										<el-input v-model="queryParams.created"></el-input>
								</el-form-item>
								<el-form-item label="租户id"  prop="tenantId">
										<el-input v-model="queryParams.tenantId"></el-input>
								</el-form-item>
								<el-form-item label="自定义1"  prop="def1">
										<el-input v-model="queryParams.def1"></el-input>
								</el-form-item>
								<el-form-item label="自定义2"  prop="def2">
										<el-input v-model="queryParams.def2"></el-input>
								</el-form-item>
								<el-form-item label="自定义3"  prop="def3">
										<el-input v-model="queryParams.def3"></el-input>
								</el-form-item>
								<el-form-item label="自定义4"  prop="def4">
										<el-input v-model="queryParams.def4"></el-input>
								</el-form-item>
								<el-form-item label="自定义5"  prop="def5">
										<el-input v-model="queryParams.def5"></el-input>
								</el-form-item>
								<el-form-item label="时间戳"  prop="ts">
										<el-input v-model="queryParams.ts"></el-input>
								</el-form-item>
								<el-form-item label="删除标识"  prop="dr">
										<el-input v-model="queryParams.dr"></el-input>
								</el-form-item>
						</el-form>
						<div class="more-search-btn" >
							<el-button type="primary" @click="searchData">查询</el-button>
							<el-button  @click="resetSearch">重置</el-button>
							<span @click="hideMore=true" class="hide-span">收起<i class="iconfont icon-jiantoushang"></i></span>
						</div>
					</div>
				</div>
				<!-- 更多查询 start -->
				</transition>

				<!-- toolbar start -->
				<div class="tools-bar">

					<!-- 查询 start -->
					<div class="tools-search">
						<el-form :inline="true" :model="queryParams" class="demo-form-inline">
							<el-form-item>
								<div class="el-input">
									<i class="el-input__icon el-icon-search is-clickable" @click="searchData"></i>
									<input v-model="queryParams.systemName" @keyup.prevent.enter="searchDataFast"  placeholder="请输入内容 回车模糊查询" icon="search" type="text" rows="2"  class="el-input__inner">
								</div>
							</el-form-item>
							<el-form-item v-show="false">
								<el-input ></el-input>
							</el-form-item>
							<span class="tools-more-show" @click="hideMore=false">
								更多<i class="iconfont icon-jiantouxia"></i>
							</span>
						</el-form>
					</div>
					<!-- 查询 end -->


					<!--按钮条组件 用来替换上面的btn按钮-->
					<tool-btn :btn-url="btnUrl" :btn-state="btnState"></tool-btn>
					<!-- btn end -->

				</div>
				<!-- toolbar end -->

			</div>

			<!-- 表格 start -->
			<edit-table ref="childTable" :query-url="queryUrl" :query-params="queryParams" :load-state="true" @row-dblclick="showDetail">
				<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" width="150" label="主键" ></el-table-column>
					<el-table-column prop="brokerageAccrueId" width="150" label="经纪费计提主键" ></el-table-column>
					<el-table-column prop="policyNo" width="150" label="保单号" ></el-table-column>
					<el-table-column prop="ratifyPolicyNo" width="150" label="批单号" ></el-table-column>
					<el-table-column prop="nature" width="150" label="性质" ></el-table-column>
					<el-table-column prop="belongsBatch" width="150" label="所属批次" ></el-table-column>
					<el-table-column prop="belongsOrgId" width="150" label="所属机构" ></el-table-column>
					<el-table-column prop="belongsDeptId" width="150" label="所属部门" ></el-table-column>
					<el-table-column prop="belongsTeamId" width="150" label="所属团队" ></el-table-column>
					<el-table-column prop="salesman" width="150" label="业务员/代理人" ></el-table-column>
					<el-table-column prop="insCompanyId" width="150" label="出单保险公司" ></el-table-column>
					<el-table-column prop="insKindId" width="150" label="保险险类" ></el-table-column>
					<el-table-column prop="insProductId" width="150" label="保险产品" ></el-table-column>
					<el-table-column prop="periods" width="150" label="期数" ></el-table-column>
					<el-table-column prop="premiumPreTax" width="150" label="保费（税前）（元）" ></el-table-column>
					<el-table-column prop="premiumAfterTax" width="150" label="保费（税后）（元）" ></el-table-column>
					<el-table-column prop="policyBegindate" width="150" label="起保日期" ></el-table-column>
					<el-table-column prop="policyEnddate" width="150" label="终保日期" ></el-table-column>
					<el-table-column prop="signDate" width="150" label="签单日期" ></el-table-column>
					<el-table-column prop="createtime" width="150" label="生成时间" ></el-table-column>
					<el-table-column prop="brokerageAccureRatio" width="150" label="经纪费计提比例（%）" ></el-table-column>
					<el-table-column prop="receivBrokeragePretax" width="150" label="应收经纪费（税后）（元）" ></el-table-column>
					<el-table-column prop="receivBrokerageVtax" width="150" label="应收经纪费增值税（元）" ></el-table-column>
					<el-table-column prop="receivBrokerageAftertax" width="150" label="应收经纪费（税前）（元）" ></el-table-column>
					<el-table-column prop="pkOrg" width="150" label="创建者所属机构" ></el-table-column>
					<el-table-column prop="pkDept" width="150" label="创建者所属部门" ></el-table-column>
					<el-table-column prop="modifier" width="150" label="修改者" ></el-table-column>
					<el-table-column prop="modified" width="150" label="修改时间" ></el-table-column>
					<el-table-column prop="creator" width="150" label="创建者" ></el-table-column>
					<el-table-column prop="created" width="150" label="创建时间" ></el-table-column>
					<el-table-column prop="tenantId" width="150" label="租户id" ></el-table-column>
					<el-table-column prop="def1" width="150" label="自定义1" ></el-table-column>
					<el-table-column prop="def2" width="150" label="自定义2" ></el-table-column>
					<el-table-column prop="def3" width="150" label="自定义3" ></el-table-column>
					<el-table-column prop="def4" width="150" label="自定义4" ></el-table-column>
					<el-table-column prop="def5" width="150" label="自定义5" ></el-table-column>
					<el-table-column prop="ts" width="150" label="时间戳" ></el-table-column>
					<el-table-column prop="dr" width="150" label="删除标识" ></el-table-column>
			</edit-table>
			<!-- 表格 end -->
		</div>

		<!-- 编辑页 -->
		<bjBrokaccDetail-edit v-show="pageState.active=='edit'" ref="edit" class="transPage" :form-data="form" @hide="hidePage"></bjBrokaccDetail-edit>
		<!-- 详情页 -->
		<bjBrokaccDetail-detail v-show="pageState.active=='detail'" ref="detail" class="transPage" :detail-info="form" @hide="hidePage"></bjBrokaccDetail-detail>
	</div>
</template>

<script>
	/*
	 * 引入组件以及js模块
	 * 组件使用说明参考具体组件
	 */
	import bjBrokaccDetailEdit from "./BjBrokaccDetailEdit.vue"
	import bjBrokaccDetailDetail from "./BjBrokaccDetailDetail.vue"
	import toolBtn from '../../../common/components/toolBtn.vue'
	import editTable from '../../../common/components/table.vue'
	import api from "../../../common/js/api.js"
	import demo from './demo.vue'
	import bjBrokaccDetailModel from "../../../common/bj/bjBrokaccDetail/bjBrokaccDetailModel.js"
	//import test from "../mockdata.js"

	export default {
		name: "bjBrokaccDetail",
		/**
		 * 注册组件 components
		 * bjBrokaccDetailEdit：编辑页组件
		 * bjBrokaccDetailDetail：详情页组件
		 * editTable：表格组件
		 */
		components: {
			bjBrokaccDetailEdit,
			bjBrokaccDetailDetail,
			toolBtn,
			editTable,
			demo
		},
		/**
		 * 列表页所需要的数据
		 * queryUrl：表格组件去获取数据的地址
		 * queryParams：动态传给表格组件的查询参数，绑定在当前的查询表单中
		 * pageState：当前页面的状态
		 * list：列表页是否隐藏
		 * edit：编辑页是否显示
		 * detail：详情页是否显示
		 * hideMore：更多查询条件的列表是否隐藏
		 * form：编辑页面表单所需要的动态绑定的数据源
		 * emptyForm：空数据源，用作新增页面使用(方便赋值
		 */
		data() {
			return {
				//表格分页数据的地址
				queryUrl: "/bjBrokaccDetail/getBjBrokaccDetailByPage",
				//按钮组件（根据提供的json数据动态的渲染成一组按钮的组件,目前使用json文件替代,将来换成组件服务)
				btnUrl:"/ifbp-fe/assets/data/BjBrokaccDetailBtn.json",
				//表格查询绑定的参数
				queryParams: {
					id:"",
					brokerageAccrueId:"",
					policyNo:"",
					ratifyPolicyNo:"",
					nature:"",
					belongsBatch:"",
					belongsOrgId:"",
					belongsDeptId:"",
					belongsTeamId:"",
					salesman:"",
					insCompanyId:"",
					insKindId:"",
					insProductId:"",
					periods:"",
					premiumPreTax:"",
					premiumAfterTax:"",
					policyBegindate:"",
					policyEnddate:"",
					signDate:"",
					createtime:"",
					brokerageAccureRatio:"",
					receivBrokeragePretax:"",
					receivBrokerageVtax:"",
					receivBrokerageAftertax:"",
					pkOrg:"",
					pkDept:"",
					modifier:"",
					modified:"",
					creator:"",
					created:"",
					tenantId:"",
					def1:"",
					def2:"",
					def3:"",
					def4:"",
					def5:"",
					ts:"",
					dr:""
				},
				btnState:{
					addFun:true,
					editFun:true,
					deleteFun:true,
					refreshFun:true
				},
				options: {},
				//用来做页面切换的
				pageState: new api.pageState("list"),
				//隐藏更多查询项，true为隐藏，false为显示
				hideMore: true,
				//用来绑定form表单的数据
				form: new bjBrokaccDetailModel(),
				//用来清楚表单数据
				emptyForm: new bjBrokaccDetailModel()
			}
		},
		created() {
			axios.get("/user/list").then(function(response){
				console.log(response.data)
			})
		},
		methods: {
			/**
			 * 重置查询表单
			 */
			resetSearch() {
				for (var attr in this.queryParams) {
					this.queryParams[attr] = ""
				}
			},
			/**
			 * 查询表格数据
			 */
			searchData() {
				//将更多查询隐藏
				this.hideMore = true;
				//调用子组件的方法，重新加载表格数据
				this.refreshFun();
			},
			searchDataFast(){
				this.refreshFun();
			},
			/**
			 * 切回列表页面(编辑页以及详情页调用同一个方法)
			 */
			hidePage() {
				//切换页面
				this.pageState.goBack()
					//将也没中的更多查询隐藏
				this.hideMore = true;
				//重置高级查询表单
				this.resetSearch();
				//调用子组件的方法，重新加载表格数据
				this.refreshFun();
				Object.assign(this.form, this.emptyForm);
				this.$refs.edit.resetForm();
			},
			/**
			 * 刷新当前表格
			 */
			refreshFun() {
				this.$refs.childTable.loadTableData()
			},
			rowClick(row) {

					 this.btnState.addFun = true,
					 this.btnState.editFun = true,
					 this.btnState.deleteFun = true,
					 this.btnState.refreshFun = true

			},
			/**
			 * 显示单行数据详情
			 * 双击行的事件回调函数
			 * @param {row} 所点击行的数据
			 */
			showDetail(row) {
				Object.assign(this.form, row);
				this.pageState.goNext("detail");
			},
			/**
			 * 新增数据
			 * 点击新增按钮的回调函数
			 */
			addFun(btnName) {
				Object.assign(this.form, this.emptyForm);
				this.pageState.goNext("edit", btnName);
			},
			/**
			 * 修改一条数据
			 * 点击修改按钮时触发的回调函数
			 */
			editFun(btnName) {
				if(!this.$refs.childTable.multipleSelection.length) {
					this.$message("请至少选择一条数据！")
					return;
				}
				Object.assign(this.form, this.$refs.childTable.multipleSelection[0])

				this.pageState.goNext("edit",btnName)
			},
			/**
			 * 删除数据
			 * 点击删除按钮时触发的回调函数
			 */
			deleteFun() {
				if(!this.$refs.childTable.multipleSelection.length) {
					this.$message("请至少选择一条数据！")
					return;
				}
				this.$confirm('是否删除选中数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var str = ""
					//获取所有选中的数据，动态地拼接所选中的id,调用删除数据的统一接口 api.removeData
					this.$refs.childTable.multipleSelection.forEach(function(value) {
						str += value.id + ","
					})
					var _this = this
					api.removeData({
						data() {
							return {
								//删除数据的地址
								baseUrl: this.BASEURL + "/bjBrokaccDetail/deleteBjBrokaccDetailByBatchId",
								formData: {
									batchId: str
								},
								//当前操作的表格
								currentTable: _this.$refs.childTable,
								//当前组件
								currentComponent:_this,
								//执行自己定义的数据（true 发布出删除成功和删除失败的回掉函数，封装的方法不做任何处理）
								callbackMethods: false
							}
						},
						methods: {
							//当删除成功
							onSaveSuccess: function(success) {
								//调用子组件的方法，重新加载表格数据
								_this.refreshFun();
							},
							//当删除失败
							onSaveError: function(error) {
								//调用子组件的方法，重新加载表格数据
								_this.refreshFun();
							}
						}
					})
				}).catch(() => {});
			}
		}
	}
</script>
