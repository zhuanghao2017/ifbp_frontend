 <template>
 	<div>

 		
 		<el-button type="primary" @click="add" style="width: 100px;">新增</el-button>
 		
		    <el-template :pkTemp="pk_temp"
		                 @change="changeHandle"
		                 @edit-table-row="editTableRow"
                   		@delete-table-row="deleteTableRow"
                   		:show-button="showButton"
		                 ref="tpl"
		                 :isEdit="isEdit"
		                 :templateValue="currentValue">
		    </el-template>
		    
		    
		    <el-dialog
		      title="提示"
		      v-model="delDialogVisible"
		      :modal="true"
		      size="tiny">
		      <span>确认？</span>
		      <span slot="footer" class="dialog-footer">
		        <el-button @click="delDialogVisible = false">取 消</el-button>
		        <el-button type="primary" @click="deleteClick">确 定</el-button>
		      </span>
		    </el-dialog>
	</div>
</template>

<script>
    export default {
        //数据模型
        data(){
            return{
				pk_temp:'d74d9985-54e9-4408-9265-012c9247cb5b',
				isEdit:true,
				currentValue:{},
				delId:'',
				delDialogVisible:false,
				showButton:{
					          width: 190,
          group: true,
          buttons: [
            {
              name: 'edit',
              text: '',
              icon: 'edit'
            },
            {
              name: 'delete',
              text: '',
              icon: 'delete',
              type: 'danger'
            }
          ]

				}
            }
        },
        //方法
        methods:{
        	add(){
        		window.location.hash="/demo/add"
        	},
        	editTableRow(row, index){
        		window.location.hash='demo/edit/'+ row.pk_user;
        	},
        	deleteTableRow(row){
        		this.delDialogVisible = true
        		this.delId = row.pk_user
        	},
        	deleteClick(){
        		this.$http({
        			url:'/ifbp-demo-user/user/' + this.delId,
        			method:'delete',
        		}).then((res) => {
		          if (res.data.success === true) {
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            this.delDialogVisible = false;
		            this.loadData();
		          } 
		        })
        	},
        	loadData(){
        		this.$http({
        			url:'/ifbp-demo-user/user/list',
        			method:'post'
        		}).then((res)=>{
        			if (res.data.success === true){
        				this.currentValue = res.data.data.content;
        			}
        		})
        	},
			changeHandle(){
				alert('change')
			}
        },
        //页面初始化事件
        created(){
			// this.hello = 'no hello'
			this.loadData();
        }
    }    
</script>

<style>
</style>