<template>
	<div class="detail-page-show">
		<div class="list-view">
		<h3>基本信息</h3>
						<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">主键</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.id}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">经纪费计提主键</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.brokerageAccrueId}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">保单号</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.policyNo}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">批单号</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.ratifyPolicyNo}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">性质</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.nature}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">所属批次</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.belongsBatch}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">所属机构</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.belongsOrgId}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">所属部门</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.belongsDeptId}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">所属团队</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.belongsTeamId}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">业务员/代理人</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.salesman}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">出单保险公司</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.insCompanyId}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">保险险类</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.insKindId}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">保险产品</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.insProductId}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">期数</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.periods}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">保费（税前）（元）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.premiumPreTax}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">保费（税后）（元）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.premiumAfterTax}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">起保日期</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.policyBegindate}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">终保日期</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.policyEnddate}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">签单日期</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.signDate}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">生成时间</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.createtime}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">经纪费计提比例（%）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.brokerageAccureRatio}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">应收经纪费（税后）（元）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.receivBrokeragePretax}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">应收经纪费增值税（元）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.receivBrokerageVtax}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">应收经纪费（税前）（元）</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.receivBrokerageAftertax}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">创建者所属机构</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.pkOrg}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">创建者所属部门</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.pkDept}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">修改者</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.modifier}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">修改时间</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.modified}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">创建者</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.creator}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">创建时间</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.created}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">租户id</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.tenantId}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">自定义1</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.def1}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">自定义2</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.def2}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">自定义3</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.def3}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">自定义4</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.def4}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">自定义5</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.def5}}</span></el-col>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">时间戳</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.ts}}</span></el-col>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="info-wrap">
						<el-col :span="6"><span class="detail-title">删除标识</span></el-col>
						<el-col :span="2"><span>:</span></el-col>
						<el-col :span="16"><span class="detail-info">{{detailInfo.dr}}</span></el-col>
					</div>
				</el-col>
			</el-row>
				
			<div class="button-bottom">
				<el-button @click="cancel" size="large">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	/*
	 @props {detailInfo} 动态地保定父组件地detailInfo值，当父组件改变该数据时，详情页可以动态地更新数据
	 * */
	export default{
			props:['detailInfo'],
			/*
			 	详情页所需要的数据
			 * */
			data(){
				return {
				}
			},
			/*
			  返回列表页
			 * */
			methods:{
				cancel(){
					this.$emit("hide")
				}
			}
			
		}
	
</script>