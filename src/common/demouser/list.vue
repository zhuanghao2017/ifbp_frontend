<template>
    <div>
    	
    
    <el-button type="primary" style="width: 100px;" @click="add">新增</el-button>
    	
    	
    	    <el-template :pkTemp="pk_temp"
    	                 @change="changeHandle"
    	                 ref="tpl"
    	                 :isEdit="isEdit"
    	                 :show-button="showButton"
    	              	@edit-table-row="editTableRow"
                   		@delete-table-row="deleteTableRow"

    	                 :templateValue="currentValue">
    	    </el-template>

    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      :modal="true"
      size="tiny">
      <span>确认删除？</span>
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
            	delRow:'',
            	delDialogVisible:false,
				pk_temp:'d74d9985-54e9-4408-9265-012c9247cb5b',
				isEdit:true,
				currentValue:'',
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
        	deleteClick(){
        		this.$http({
        			url:'/ifbp-demo-user/user/' + this.delRow.pk_user,
        			method:'delete'
        		}).then((res)=>{
        			if (res.data.success ==true){
        			this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            this.delDialogVisible = false;
		            this.loadData();
        			}
        			
        		})
        	},
        	editTableRow(row,index){
        		window.location.hash = '/demouser/democard/' + row.pk_user;
        	},
        	deleteTableRow(row){
				this.delDialogVisible = true;
				this.delRow = row;
        	},
			changeHandle(){
				
			},
			add(){
				window.location.hash = '/demouser/democard';
			},
			loadData(){
        	        this.$http({
        			url:'/ifbp-demo-user/user/list',
        				method:'post'
        		}).then((res)=>{
        			this.currentValue = res.data.data.content;
        		})
        	}
			
        },
        //页面初始化事件
        created(){
        this.$http({
        		url:'/ifbp-demo-user/user/list',
        		method:'post'
        	}).then((res)=>{
        		this.currentValue = res.data.data.content;
        	})
        },
        
    }    
</script>

<style>
</style>