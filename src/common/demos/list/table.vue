 <template>
 	<div class="table-info">
  		<el-table :data="tableData.rows" ref="tableS" 
  			@selection-change="handleSelectionChange" height="350" 
  			:row-class-name="showcheck" border 
  		 @row-dblclick="showDetail" 
  			@row-click="selectRow">			
				<slot></slot>
			</el-table>
			<el-pagination @size-change="handleSizeChange"
				 @current-change="handleCurrentChange" :page-sizes="[10, 9,8,7,6,5]" 
				 :page-size="pageInfo.pageSize" 
				 layout="total, sizes, prev, pager, next" :total="totalLength" :current-page="pageInfo.currentPage">
			</el-pagination>
			</div>
  </template>

  <script>
    export default {
    	props:["queryUrl","queryParams"],

      data() {
        return {
        	loadUrl:this.queryUrl,
        	multipleSelection:[],
        	tableData:{},
        	pageInfo: {
					currentPage: 1,
					pageSize: 10,
				},
        }
      },
      methods:{
      	loadTableData(){
      		if(this.pageInfo.currentPage==1){
      			this.getData();
      		}else{
      			this.pageInfo.currentPage=1
      		}
    			
      	},
      	getData(){
      		// axios.post(this.loadUrl,{
      		// 		queryParam:this.queryParams,
      		// 		paging:this.pageInfo   								   			
      		// }).then((response)=>{
      		// 	this.tableData=response.data
      		// })
      	},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      		
			showcheck(row, index) {
				if(this.multipleSelection.indexOf(row) !=-1)
					return "current-row"
			},
			selectRow(rowdata) {
				this.$refs.tableS.toggleRowSelection(rowdata)
			},
			showDetail(row){
				this.$emit("row-dblclick",row)
			},
			handleSizeChange(pagesize) {
				this.pageInfo.pageSize = pagesize
				this.loadTableData();

			},
			handleCurrentChange(page) {
				this.pageInfo.currentPage = page
				this.getData();
			}
      },  	
      computed: {
			totalLength() {
				return this.tableData.total
			}
		},
		mounted(){
			this.getData();
		}
    }
  </script>