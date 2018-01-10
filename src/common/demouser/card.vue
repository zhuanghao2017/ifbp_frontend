<template>
    <div>
    <div class="u-container-fluid">
        <div class="u-row">
            <div class="u-col-md-4">
    	<el-button type="primary" style="width: 100px" @click="save">保存</el-button>
                
            </div>
            <div class="u-col-md-4">
    
            </div>
            <div class="u-col-md-4">
    <el-button type="primary" style="width: 100px" @click="back">返回</el-button>
    	
    	
            </div>
        </div>
    </div>  	
    	
    	
    	
    	
		     <el-template :pkTemp="pk_temp"
		                 ref="tpl"
		                 :isEdit="isEdit"
		                 @setEmptyKeys="setEmptyUser"
		                 :templateValue="currentValue">
		    </el-template>
    </div>
</template>

<script>
    export default {
        //数据模型
        data(){
            return{
					pk_temp:'8fc8d83e-adcc-4bd9-8058-902d974a7895',
					isEdit:true,
					currentValue:'',
            }
        },
        //方法
        methods:{
        	setEmptyUser(value){
        			value.sex = 0;	
        			this.currentValue = JSON.parse(JSON.stringify(value));
        	},
        	save(){
        		this.$http({
        			url:'/ifbp-demo-user/user/save',
        			method:'post',
        			data:[this.currentValue]
        		}).then((res)=>{
        		if (res.data.success === 'success'){
					this.$message({
              			message: '恭喜你，添加成功！',
              			type: 'success'
            			});
            			
            			window.location.hash='/demouser';

					}
        			
        		})
        	},
        	back(){
        		window.history.go(-1);
        	}

        },
        //页面初始化事件
        created(){
			if (this.$root.$router.currentRoute.params.id){
				this.$http({
					url:'/ifbp-demo-user/user/' + this.$root.$router.currentRoute.params.id,
					method:'get'
				}).then((res)=>{
					this.currentValue = res.data.data;
				})
					
				
			}
        }
    }    
</script>

<style>
</style>