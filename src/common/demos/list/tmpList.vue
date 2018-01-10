<template>
	<div class="trans">
		<div class="listWrap" :class="{'transActive':pageState.list}">
				<div class="ifbp-panel">
					<el-button-group>
						<el-button @click="addData" type="primary">新增</el-button>
						<!--
								<el-button @click="handleEdit">修改</el-button>
								<el-button @click="handleDelete">删除</el-button>
								<el-button @click="">刷新</el-button>
								-->
					</el-button-group>
				</div>
				<div class="ifbp-panel">
			<el-table :data="userList" stripe style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				<el-table-column prop="sex" label="性别" width="120"></el-table-column>
				<el-table-column prop="age" label="年龄" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机" width="180"></el-table-column>
				<el-table-column prop="telephone" label="电话"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template scope="scope">
		        		<el-button @click="handleEdit(scope.$index, false)" type="text" size="small">查看</el-button>
		        		<el-button @click="handleEdit(scope.$index, true)" type="text" size="small">编辑</el-button>
					</template>
    			</el-table-column>
			</el-table>

			
			</div>
<!--
			<edit-table ref="childTable" :query-url="queryUrl" :query-params="queryParams" @row-dblclick="showDetail">
			</edit-table>
-->	
	
	
	
			<tmp-edit :class="{'active-page':pageState.edit}" :pk_user="pk_user" :isEdit="isEdit" @hide="hidePage"></tmp-edit>
			<!--
			<tmp-detail :class="{'active-page':pageState.detail}" :detail-info="form" @hide="hidePage"></tmp-detail>
			-->
		</div>
	</div>
</template>

<script>
	import tmpEdit from "./tmpEdit"
	// import tmpDetail from "./tmpDetail"
	// import editTable from "./table.vue"
	export default {
		name: "index",
	
		components: {
			tmpEdit,
			// tmpDetail,
			// editTable
		},
		computed: {
			totalLength() {
				return this.pageInfo.total
			}
		},
		data() {
			return {
				// queryUrl: "./static/table.json",
				// queryParams: {
				// 	systemName: "",
				// 	systemCode: ""
				// },
				pageState: {
					list: false,
					edit: false,
					detail: false
				},
				hideMore: true,
				userList: [],
				pk_user: "",
				isEdit:false,
			}
		},
		methods: {
			loadList() {
				this.$http({
					url: '/ifbp-demo-user/user/list',
					method: 'post',
				}).then((res) => {
					console.log(res);
					if (res.data.success === 'success') {
						this.userList = res.data.detailMsg.data.content;
						// this.currentValue = JSON.parse(JSON.stringify(this.originalValue));
						//this.$refs.tpl.setValue(this.currentValue);
					} else {
						this.$message('error');
					}
	
				});
			},
			showcheck(row, index) {
				//console.log(row)
				if (row.checked)
					return "current-row"
			},
			searchData() {
				this.$refs.childTable.loadTableData()
			},
			dblClick() {
	
			},
			selectRow(rowdata) {
				rowdata.checked = !rowdata.checked
			},
			hidePage() {
				this.pageState.list = false;
			},
			switchState(edit) {
				this.pageState.list = !this.pageState.list
				if (edit) {
					this.pageState.edit = true
					this.pageState.detail = false
				} else {
					this.pageState.edit = false
					this.pageState.detail = true
				}
			},
			showDetail(row) {
				this.form = row
	
				this.switchState(false)
			},
			addData() {
				this.pk_user = '-1';
				this.isEdit = true;
				this.switchState(true)
			},
			handleEdit(index, isEdit) {
				this.pk_user = this.userList[index].pk_user;	
				this.isEdit = isEdit;
				this.switchState(true)
			},
			handleDelete(index, row) {
	
			},
			saveData() {
				this.pageState.list = true;
			},
		},
		created() {
			this.loadList();
		}
	}
</script>

