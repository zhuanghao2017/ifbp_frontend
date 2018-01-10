<template>
	<div id="data-authority">
		<div class="back">
			<el-button type="primary" class="fr back-button" @click="goBack">返回</el-button>
		</div>
		<div class="main-content">
			<el-tabs type="border-card" v-model="activeItem" class="border-card" @tab-click="handleClick">
				<!-- 角色的列表开始 -->
        <el-tab-pane label="按角色授权" name="role">
          <el-row class="search">
            <el-col :span="3">
              <el-button type="text" :disabled="true"  style="color:#000">角色名称</el-button>
            </el-col>
            <el-col :span="5">
              <el-input v-model="roleSearch.roleName" placeholder="角色名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="text" :disabled="true" style="color:#000">角色类型</el-button>
            </el-col>
            <el-col :span="5">
              <el-select v-model="roleTypeSelect">
                <el-option
                  v-for="item in roleTypeItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="3" :push="1">
              <el-button class="row-last" type="primary" @click="searchRole">搜索</el-button>
            </el-col>
          </el-row>
          <el-table :data="roleTableData" @row-click="roleDetail" style="width:100%">
            <el-table-column prop="roleCode" label="角色编码" ></el-table-column>
            <el-table-column prop="roleName" label="角色名称" ></el-table-column>
            <el-table-column prop="labelName" label="角色类型" ></el-table-column>
          </el-table>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleCountTotal"
            :size="roleCountSize"
            class="fr"
            style="margin-top:20px;">
          </el-pagination>
				</el-tab-pane>
        <!-- 角色列表结束 -->
        <!-- 用户列表开始 -->
				<el-tab-pane label="按用户授权" name="user">
          <el-row  class="search">
            <el-col :span="3">
              <el-button type="text" :disabled="true" style="color:#000">用户名称</el-button>
            </el-col>
            <el-col :span="5">
              <el-input v-model="userSearch.userName" placeholder="用户名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="text" :disabled="true" style="color:#000">启用状态</el-button>
            </el-col>
            <el-col :span="5">
              <el-select v-model="userStateSelect">
                <el-option
                  v-for="item in userStateItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                 </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="3" :push="1">
              <el-button class="row-last" type="primary" @click="searchUser">搜索</el-button>
            </el-col>
          </el-row>
          <el-table :data="userTableData" @row-click="userDetail" style="width:100%;min-width:360px;">
            <el-table-column  prop="user_code" label="登陆账号"></el-table-column>
            <el-table-column  prop="user_name" label="用户名称"></el-table-column>
            <el-table-column  prop="enablestate" label="启用状态"></el-table-column>
          </el-table>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="userCountTotal"
            :page-size="userCountSize"
            class="fr"
            style="margin-top:20px;">
          </el-pagination>
        </el-tab-pane>
        <!-- 用户列表结束 -->
			</el-tabs>
			<div class="detail">
        <p class="detail-title">数据权限</p>
        <!-- 角色详细开始 -->
				<div class="role-detail" v-if="showRoleDetail">
          <el-row class="setRow">
            <el-col :span="3">
              <label>角色名称：</label>
            </el-col>
            <el-col :span="9">
              <label>{{role.name}}</label>
            </el-col>
            <el-col :span="3" :offset="9">
              <el-button class="set-button" type="primary" @click="setShowDataRange('role')">设置</el-button>
            </el-col>
          </el-row>

          <el-tree
            :data="roleDataRange"
            :default-expand-all="true">
          </el-tree>
          <el-tree :data="roleDataDetail"
           :props="defaultRoleProps"
           :render-content="renderRoleContent"
           :default-expand-all="true"
           @node-click="handleRoleNode"></el-tree>
        </div>
        <!-- 角色详细结束 -->
        <!-- 用户详细开始 -->
        <div class="user-detail" v-else>
          <el-row class="setRow">
            <el-col :span="3">
              <label>用户名称：</label>
            </el-col>
            <el-col :span="9">
              <label>{{user.name}}</label>
            </el-col>
            <el-col :span="3" :offset="9">
              <el-button class="set-button" type="primary" @click="setShowDataRange('user')">设置</el-button>
            </el-col>
          </el-row>
          <el-tree
            :data="userDataRange"
            :default-expand-all="true">
          </el-tree>
          <el-tree :data="userDataDetail"
           :props="defaultUserProps"
           :default-expand-all="true"
           :render-content="renderUserContent"
           @node-click="handleUserNode"
           >
          </el-tree>

        </div>
        <!-- 用户详细结束 -->
         <!-- 角色可查看的数据范围开始 -->
          <el-dialog
            :visible="showRoleDataRange"
            size="tiny"
            title=""
            :before-close="handleClose">
            <div class="dailog">
              <h4 class="dialog-title">数据权限设置</h4>
              <p class="dialog-type">
                <span>角色类型：</span>
                <span>{{role.type}}</span>
              </p>
              <p class="dialog-type">
                <span>角色名称：</span>
                <span>{{role.name}}</span>
              </p>
              <p class="dialog-type">角色可查看的数据范围：</p>
              <div class="data-range">
                <p class="data-range-list"><el-checkbox v-model="roleRangeSelf" disabled>本人创建的</el-checkbox></p>
                <p class="data-range-list"><el-checkbox v-model="roleCheckAll" @change="selectDataRange">指定组织范围</el-checkbox></p>
                <div class="data-range-assign">
                  <p v-for="item in ruleDataReduce" :key="item.id">
                    <el-radio class="radio" v-model="roleRadio" :label="item.ruleName" :disabled="showRoleRadio">{{item.ruleName}}</el-radio>
                  </p>
                </div>
                <p class="recover-data"><el-checkbox v-model="roleRecoverRange" >覆盖角色下所有用户设置</el-checkbox></p>
              </div>
            </div>
            <div class="dialog-footer">
              <el-button @click="showRoleDataRange = false">返回</el-button>
              <el-button type="primary" @click="getSubmitRangeDate('role')">保存</el-button>
            </div>
          </el-dialog>
          <!-- 角色可查看的数据范围结束 -->
          <!-- 为角色下的用户设定可查看的数据范围开始 -->
          <el-dialog
            :visible="showSetRoleDataRange"
            size="tiny"
            title=""
            :before-close="handleClose">
            <div class="dailog">
              <h4 class="dialog-title">数据权限设置</h4>
              <p class="dialog-type">
                <span>角色类型：</span>
                <span>{{role.type}}</span>
              </p>
              <p class="dialog-type">
                <span>角色名称：</span>
                <span>{{role.name}}</span>
              </p>
              <p class="dialog-type">
                <span>用户名称：</span>
                <span>{{roleUserName}}</span>
              </p>
              <p class="dialog-type">可查看的数据范围：</p>
              <div class="data-range">
                <p class="data-range-list"><el-checkbox v-model="roleRangeSelf" disabled>本人创建的</el-checkbox></p>
                <p class="data-range-list"><el-checkbox v-model="roleUserCheckAll" @change="selectDataRange">指定组织范围</el-checkbox></p>
                <div class="data-range-assign">
                  <p v-for="item in ruleData" :key="item.id"  @change="diyRuleRadio('role')">
                    <el-radio class="radio" v-model="roleUserRadio" :label="item.ruleName" :disabled="showRoleUserRadio">{{item.ruleName}}</el-radio>
                  </p>
                </div>
                <div class="setting" v-if="showRoleUserDiyRule">
                  <el-tree
                    :data="diyRoleRuleData"
                    show-checkbox
                    node-key="id"
                    ref="diyRoleRuleTree"
                    :default-expanded-all="true"
                    :props="diyRuleProps"
                    @check-change="diyCheckChange"></el-tree>
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showSetRoleDataRange = false">返回</el-button>
              <el-button type="primary" @click="getSubmitRangeDate('roleDiy')">保存</el-button>
            </span>
          </el-dialog>
          <!-- 为角色下的用户设置可查看的数据范围结束 -->
          <!-- 用户可查看的数据范围开始 -->
          <el-dialog
            :visible="showUserDataRange"
            size="tiny"
            title=""
            :before-close="handleClose">
            <div class="dailog">
              <h4 class="dialog-title">数据权限设置</h4>
              <p class="dialog-type">
                <span>用户名称：</span>
                <span>{{user.name}}</span>
              </p>
              <p class="dialog-type">用户可查看的数据范围：</p>
              <div class="data-range">
                <p class="data-range-list"><el-checkbox v-model="userRangeSelf" disabled>本人创建的</el-checkbox></p>
                <p class="data-range-list"><el-checkbox v-model="userCheckAll" @change="selectDataRange">指定组织范围</el-checkbox></p>
                <div class="data-range-assign">
                  <p v-for="item in ruleDataReduce" :key="item.id">
                    <el-radio class="radio" v-model="userRadio" :label="item.ruleName" :disabled="showUserRadio">{{item.ruleName}}</el-radio>
                  </p>
                </div>
                <p class="recover-data"><el-checkbox v-model="userRecoverRange" >覆盖用户下所有用户设置</el-checkbox></p>
              </div>
            </div>
            <div class="dialog-footer">
              <el-button @click="showUserDataRange = false">返回</el-button>
              <el-button type="primary" @click="getSubmitRangeDate('user')">保存</el-button>
            </div>
          </el-dialog>
          <!-- 用户可查看的数据范围结束 -->
          <!-- 为用户下的角色设定可查看的数据范围开始 -->
          <el-dialog
            :visible="showSetUserDataRange"
            size="tiny"
            title=""
            :before-close="handleClose">
            <div class="dailog">
              <h4 class="dialog-title">数据权限设置</h4>
              <p class="dialog-type">
                <span>用户名称：</span>
                <span>{{user.name}}</span>
              </p>
              <p class="dialog-type">
                <span>角色名称：</span>
                <span>{{userRoleName}}</span>
              </p>
              <p class="dialog-type">
                <span>角色类型：</span>
                <span>{{userRoleType}}</span>
              </p>
              <p class="dialog-type">可查看的数据范围：</p>
              <div class="data-range">
                <p class="data-range-list"><el-checkbox v-model="userRangeSelf" disabled>本人创建的</el-checkbox></p>
                <p class="data-range-list"><el-checkbox v-model="userRoleCheckAll" @change="selectDataRange">指定组织范围</el-checkbox></p>
                <div class="data-range-assign">
                  <p v-for="item in ruleData" :key="item.id" @change="diyRuleRadio('user')">
                    <el-radio class="radio"  v-model="userRoleRadio" :label="item.ruleName" :disabled="showUserRoleRadio">{{item.ruleName}}</el-radio>
                  </p>
                </div>
                <div class="setting" v-if="showUserRoleDiyRule">
                  <el-tree
                    :data="diyUserRuleData"
                    show-checkbox
                    node-key="id"
                    ref="diyUserRuleTree"
                    :default-expanded-all="true"
                    :props="diyRuleProps"
                    @check-change="diyCheckChange"></el-tree>
                </div>
              </div>
            </div>
            <div class="dialog-footer">
              <el-button @click="showSetUserDataRange = false">返回</el-button>
              <el-button type="primary" @click="getSubmitRangeDate('userDiy')">保存</el-button>
            </div>
          </el-dialog>
          <!-- 为用户下的角色设置可查看的数据范围结束 -->
			</div>
		</div>

	</div>
</template>
<script>
export default {
  data() {
    return {
      roleUser: '',//保存角色下用户的数据
      userRole: '', //保存用户下角色数据
      defaultRadio: '',//默认选中状态
      showRoleRadio: false, //角色是否显示单选框
      showUserRadio: false, //角色下用户是否显示单选框
      showRoleUserRadio: false, //用户是否显示单选框
      showUserRoleRadio: false, //用户下角色是否显示单选框
      diyRuleProps:{ //自定义规则树的props
        label:'orgname',
        children: 'children'
      },
      diyRoleRuleData: [],//自定义角色下用户规则树的数据
      diyUserRuleData: [], //自定义用户下角色规则树的数据
      showRoleUserDiyRule: false, //不显示角色下用户自定义规则
      showUserRoleDiyRule: false, //不显示用户下角色自定义规则
      roleCountTotal:'',
      roleCountSize:'',
      userCountTotal:'',
      userCountSize: '',
      roleUserName:'', //角色下用户的名称
      roleUserData:{},
      userRoleType: '', //用户下角色的类型
      userRoleName: '', //用户下角色的名字
      userRoleData:{},
      ruleData:[], //用户和角色共用的规则数据
      ruleDataOrg: [], //用户和角色共用的规则数据多一个默认数据
      ruleDiyData:[], //用户和角色公用的自定义规则数据
      ruleDataReduce: [], //用户和角色可查看的数据范围的规则数据
      roleRadio: '', //角色下选中的规则值
      roleOrgRadio: '',
      roleUserRadio:'', //角色下用户选中的规则值
      roleUserOrgRadio: '', //保存一份没有初始选中的规则值
      userRadio: '', //用户下选中的规则值
      userOrgRadio:'',
      userRoleRadio: '', //用户下角色选中的规则值
      userRoleOrgRadio: '',
      showRoleDetail: true, //显示角色下的详细信息
      activeItem: 'role',
      roleRecoverRange: false, //覆盖角色下所有设置
      roleRangeSelf: true,
      userRecoverRange: false,
      userRangeSelf: true,
      roleCheckAll:true, //选中角色可查看的数据范围下的指定组织范围
      roleUserCheckAll: true, //选中角色下用户可查看的数据范围下的指定组织范围
      userCheckAll: true, //选中用户可查看的数据范围下的指定组织范围
      userRoleCheckAll: true, //选中用户下角色可查看的数据范围下的指定组织范围
      roleRange: {
        self: false,
        selfNext: false,
        all: false,
      },
      defaultRoleProps: {
        label: 'user_name',
        children: 'children'
      },
      defaultUserProps: {
        label: 'roleName',
        children: 'children'
      },
      roleRangeChecked: '',
      showRoleDataRange: false, //显示角色的可查看数据范围
      showUserDataRange: false, //显示用户的课查看数据范围
      showSetRoleDataRange: false, //显示角色下用户设定
      showSetUserDataRange: false, //显示用户下角色设定
      role: {
        id:'',
        name: '',
        code: '',
        type: ''
      },
      roleSearch:{
        roleName:'',
        roleType: '',
      },
      userSearch: {
        userName: '',
      },
      roleTypeSelect: '',//角色搜索的选项
      roleTypeItem:[ //角色下拉框
        {
          label: '全部',
          value: ''
        },{
          label: '管理员',
          value: 'mgrsource'
        },{
          label: '业务员',
          value: 'buisource'
        }
      ],
      roleTableData:[], //角色表格的数据
      roleDataRange: [
        {
          label: '角色可查看的数据范围',
          children: [
            {
              label: '本人创建的',
              disabled: true
            }
            // ,{
            //   label: '覆盖角色下所有用户设置'
            // }
          ],
        },
      ],
      userDataRange: [
        {
          label: '用户可查看的数据范围',
          children: [
            {
              label: '本人创建的',
              disabled: true
            }
          ],
        },
      ],
      roleDataDetail: [
        {
          user_name: '为角色下的用户设定可查看的数据范围',
          children: []
        },
      ],
      userDataDetail: [
        {
          roleName: '为用户下的角色设定可查看的数据范围',
          children: []
        },
      ],
      user: {
        id:'',
        account: '',
        name: '',
        state: ''
      },
      userStateSelect:'',
      userStateItem:[
        {
          label: '全部',
          value: ''
        },{
          label: '未启用',
          value: '1'
        },{
          label: '已启用',
          value: '2'
        },{
          label: '已停用',
          value: '3'
        },
      ],
      userTableData:[],
      checked: false
    };
  },
  methods: {
    //返回上一级
    goBack() {
      window.history.back(-1);
    },
    //获取角色数据
    getRoleData(){
      return this.$http({
        url: '/wbalone/roleMGT/listRolePage?pn=1&ps=10&sortType=&search_LIKE_roleName=&search_LIKE_roleCode=&search_EQ_label=',
        method: 'GET',
      }).then((res) => {
        if(res.data.status === 1){
          this.roleTableData = res.data.data.content;
          this.roleCountTotal = res.data.data.totalElements;
          this.roleCountSize = res.data.data.size;
        }
      }).catch(() => {
        this.$message({
          message:'获取角色数据失败',
          type:'error'
        });
      });
    },
    //获取用户数据
    getUserData(){
      return this.$http({
        url: '/ifbp-app-sm/sm/user/pageList?pn=1&ps=10&sortColumn=&search_user_code=&search_user_name=&search_base_doc_type=&search_enablestate=',
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true){
          this.userCountTotal = res.data.data.totalElements;
          this.userCountSize = res.data.data.size;
          var resData = JSON.parse(JSON.stringify(res.data.data.content));
          for(var i = 0;i<resData.length;i++){
            if(resData[i].enablestate === '1'){
             resData[i].enablestate='未启用';
            }else if(resData[i].enablestate === '2'){
              resData[i].enablestate='已启用';
            }else{
              resData[i].enablestate='已停用';
            }
          }
          this.userTableData = resData;
        }
      }).catch(() => {
        this.$message({
          message:'获取用户数据失败',
          type:'error'
        });
      });
    },
    //获取规则数据
    getRuleData(){
      const self = this;
      return this.$http({
        url: '/ifbp-app-sm/sm/rbac/rule/list',
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data));
          self.ruleDataOrg = JSON.parse(JSON.stringify(res.data.data));
          for(var i=0;i<resData.length;i++){
            if(resData[i].type === "diyorg"){
              resData.splice(i,1);
            }
          }
          for(var j in resData){
            if(resData[j].type === "default"){
              self.defaultRadio = resData[j].ruleName;
              resData.splice(j,1);
            }
          }
        self.ruleDataReduce = resData;
         self.ruleData = res.data.data;
        }
      }).catch(() => {
        this.$message({
          message:'获取规则数据失败',
          type: 'error'
        });
      });
    },
    //将数组数据转化为tree数据
    convertTreeData(rows, attributes) {
      var keyNodes = {};
      var parentKeyNodes = {};
      for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          row.id = row[attributes.keyField];
          row.parentId = row[attributes.parentKeyField];
          row.text = row[attributes.textField];
          row.children = [];
          keyNodes[row.id] = row;
          if (parentKeyNodes[row.parentId]) {
            parentKeyNodes[row.parentId].push(row);
          }else {
            parentKeyNodes[row.parentId] = [row];
          }

          var children = parentKeyNodes[row.id];
          if (children) { row.children = children; }

          var pNode = keyNodes[row.parentId];
          if (pNode) { pNode.children.push(row); }
      }
      return parentKeyNodes[attributes.rootKey];
    },
    //获取自定义规则数据
    getDiyRuleData(){
      var attributes = {
        keyField: 'id', //标识
        parentKeyField: 'pid', // 上级标识字段名
        textField: 'orgname', // 文本字段名
        rootKey: null// 根节点标识
      };
      const self = this;
      return this.$http({
        url: '/ifbp-app-bd/bd/org/org/queryGraphList/getAll',
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data));
          var ruleDiyData= self.convertTreeData(resData,attributes);
          self.diyRoleRuleData = ruleDiyData;
          self.diyUserRuleData = ruleDiyData;
        }
      }).catch(() => {
        this.$message({
          message:'获取自定义规则数据失败',
          type: 'error'
        });
      });
    },
    // 判断自定义规则是否被选中，如果是自动选中指定组织
    diyCheckChange(data,selfNode,childNode){
      if(selfNode || childNode){
        this.roleUserRadio ='指定组织';
        this.userRoleRadio ='指定组织';
      }
    },
    //判断是否是某一类规则
    isRuleType(value,ruleData){
      var ruleState = false;
      var rule = this.ruleDataOrg;
      for(var i in rule){
          if(value === rule[i].ruleName){
            if(rule[i].type === ruleData){
              ruleState = true;
            } else {
              ruleState = false;
            }
          }
        }
        return ruleState;
    },
    //根据选中的radio值来判断是否显示自定义规则
    diyRuleRadio(type){
      if(type === 'role'){
        if(this.isRuleType(this.roleUserRadio,'diyorg')){
          this.showRoleUserDiyRule = true;
        } else {
          this.showRoleUserDiyRule = false;
        }
      } else if(type === 'user'){
        if(this.isRuleType(this.userRoleRadio,'diyorg')){
          this.showUserRoleDiyRule = true;
        } else {
          this.showUserRoleDiyRule = false;
        }
      }
    },
    //点击设置按钮之后将选中的值重新设置
    setShowDataRange(type){
      if(type === 'user'){
        this.showUserDataRange = true;
        this.userRadio = this.userOrgRadio;
      } else if(type === 'role'){
        this.showRoleDataRange = true;
        this.roleRadio = this.roleOrgRadio;
      }
    },
    // 覆盖角色下所有用户设置
    recoverRange(data){
        this.$http({
          url: '/ifbp-app-sm/sm/rbac/datapermrule/reset',
          method: 'post',
          data:data,
          dataType: 'json'
        }).then((res) => {
          if(res.data.success === true){
            console.log(res.data.data);
            this.$message("重置成功");           
            this.showRoleDataRange = false;
            this.showSetRoleDataRange = false;
            this.showUserDataRange = false;
            this.showSetUserDataRange = false;
            // this.radio = '';
          } else {
            this.$message({
              message:res.data.message,
              type:'error'
            });
          }
        }).catch(() => {
          this.$message({
            message:'重置失败',
            type: 'error'
          });
        });
    },
    //提交角色和用户的范围设置
    getSubmitRangeDate(type){
      if(this.roleRecoverRange === true){
        var subRoleData = {
          roleId:this.role.id,
          userId:''
        };
        this.recoverRange(subRoleData);
      }else if(this.userRecoverRange === true){
        var subUserData = {
          roleId:'',
          userId:this.user.id
        };
        this.recoverRange(subUserData);
      } else {
      var radio;
      var ruleData = this.ruleDataOrg;
      var roleId = this.role.id;
      var userId = this.user.id;
      var ruleId;
      if(type === 'role'){
        if(this.roleCheckAll === false){
          radio = this.defaultRadio;
        }else{
          radio = this.roleRadio;
        }
      }else if(type === 'user'){
        if(this.userCheckAll === false){
          radio = this.defaultRadio;
        }else{
          radio = this.userRadio;
        }
      } else if(type === 'roleDiy'){
        if(this.roleUserCheckAll === false){
          radio = this.defaultRadio;
        }else{
          radio = this.roleUserRadio;
        }
      } else if(type === 'userDiy'){
        if(this.userRoleCheckAll === false){
          radio = this.defaultRadio;
        }else{
          radio = this.userRoleRadio;
        }
      }
      for(var i=0;i<ruleData.length;i++){
        if(radio === ruleData[i].ruleName){
          ruleId = ruleData[i].ruleCode;
        }
      }
      var submitData = {
        smDatapermDiyList:[],
        smDatapermRule:{}
      };
      var submitDataDiyList = [];
      var submitRoleDataRule = {
          creationtime:'',
          creator:'',
          id:'',
          roleId:roleId,
          ruleId:ruleId,
          type:'role',
          userId:''
        };
      var submitUserDataRule = {
          creationtime:'',
          creator:'',
          id:'',
          roleId:'',
          ruleId:ruleId,
          type:'user',
          userId:userId
        };
      if(type === 'role'){
        this.$set(submitData,'smDatapermRule',submitRoleDataRule);
        this.submitRange(submitData);
        this.getAreadyRoleRule(2,submitRoleDataRule);
      }else if(type === 'user'){
        this.$set(submitData,'smDatapermRule',submitUserDataRule);
        this.submitRange(submitData);
        this.getAreadyUserRule(2,submitUserDataRule); //提交用户的设置数据之后取得数据显示在前台
      } else if(type === 'roleDiy'){
        if(this.isRuleType(this.roleUserRadio,'diyorg')){
          var diyRoleRuleDataChecked = this.$refs.diyRoleRuleTree.getCheckedNodes();
          for(let m=0;m<diyRoleRuleDataChecked.length;m++){
            submitDataDiyList.push({
              creationtime: "",
              creator: "",
              id: "",
              orgId: "",
              roleId: "",
              userId: ""
            });
          this.$set(submitDataDiyList[m],'orgId',diyRoleRuleDataChecked[m].id);
          this.$set(submitDataDiyList[m],'roleId',roleId);
          this.$set(submitDataDiyList[m],'userId',this.roleUser.id);
          }
        }
        submitRoleDataRule.userId = roleId;
        submitRoleDataRule.roleId = this.roleUser.id;
        submitRoleDataRule.type = 'diy';
        this.$set(submitData,'smDatapermDiyList',submitDataDiyList);
        this.$set(submitData,'smDatapermRule',submitRoleDataRule);
        this.submitRange(submitData);
      } else if(type === 'userDiy'){
        if(this.isRuleType(this.userRoleRadio,'diyorg')){
          var diyUserRuleDataChecked = this.$refs.diyUserRuleTree.getCheckedNodes();
          for(let j=0;j<diyUserRuleDataChecked.length;j++){
            submitDataDiyList.push({
              creationtime: "",
              creator: "",
              id: "",
              orgId: "",
              roleId: "",
              userId: ""
            });
          this.$set(submitDataDiyList[j],'orgId', diyUserRuleDataChecked[j].id);
          this.$set(submitDataDiyList[j],'userId', userId);
          this.$set(submitDataDiyList[j],'roleId', this.userRole.id);
          }
        } 
        submitUserDataRule.roleId = this.userRole.id;
        submitUserDataRule.userId = userId;
        submitUserDataRule.type = 'diy';
        this.$set(submitData,'smDatapermDiyList',submitDataDiyList);
        this.$set(submitData,'smDatapermRule',submitUserDataRule);
        this.submitRange(submitData);
      }
      }
    },
    submitRange(data){
      var submitData = data;
      console.log(submitData);
      this.$http({
          url: '/ifbp-app-sm/sm/rbac/datapermrule/save',
          method: 'post',
          data:submitData,
          dataType: 'json'
        }).then((res) => {
          if(res.data.success === true){
            console.log(res.data.data);
            this.$message("保存成功");           
            this.showRoleDataRange = false;
            this.showSetRoleDataRange = false;
            this.showUserDataRange = false;
            this.showSetUserDataRange = false;
          } else {
            this.$message({
              message:res.data.message,
              type:'error'
            });
          }
        }).catch(() => {
          this.$message({
            message:'保存失败',
            type: 'error'
          });
        });
    },
    //选择指定规则自动选中父项
    selectDataRange(){
      if(this.roleCheckAll === true){
        this.showRoleRadio = false;
      }else {
        this.showRoleRadio = true;
      }
      if(this.userCheckAll === true){
        this.showUserRadio = false;
      }else {
        this.showUserRadio = true;
      }
      if(this.roleUserCheckAll === true){
        this.showRoleUserRadio = false;
      }else {
        this.showRoleUserRadio = true;
        this.showRoleUserDiyRule = false;
      }
      if(this.userRoleCheckAll === true){
        this.showUserRoleRadio = false;
      }else {
        this.showUserRoleRadio = true;
        // this.radio = '';
        this.showUserRoleDiyRule = false;
      }
    },
    //搜索角色
    searchRole(){
      var submitData = {
        pn:1,
        ps:10,
        search_LIKE_roleName:this.roleSearch.roleName,
        search_EQ_label:this.roleTypeSelect
      };
      this.$http({
        url: '/wbalone/roleMGT/listRolePage',
        method: 'GET',
        params:submitData,
        dataType: 'json'
      }).then((res) => {
        if(res.data.status === 1){
          this.roleTableData = res.data.data.content;
        }
      }).catch(() => {
        this.$message({
          message:'请求出错',
          type: 'error'
        });
      });
    },
    // 搜索用户
    searchUser(){
      var submitData = {
        pn:1,
        ps:10,
        search_user_name:this.userSearch.userName,
        search_enablestate:this.userStateSelect
      };
      this.$http({
        url: '/ifbp-app-sm/sm/user/pageList',
        method: 'GET',
        params:submitData,
        dataType: 'json'
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data.content));
          for(var i = 0;i<resData.length;i++){
            if(resData[i].enablestate === '1'){
             resData[i].enablestate='未启用';
            }else if(resData[i].enablestate === '2'){
              resData[i].enablestate='已启用';
            }else{
              resData[i].enablestate='已停用';
            }
          }
          this.userTableData = resData;
        }
      }).catch(() => {
        this.$message({
          message:'请求出错',
          type: 'error'
        });
      });
    },
    closeRoleDialog (){
      this.showRoleDataRange = false;
    },
    closeUserDialog (){
      this.showUserDataRange = false;
    },
    handleClick(tab,event){
      this.showRoleDetail = !this.showRoleDetail;
      console.log(tab,event);
    },

    //将数组的数据转换为树状数据
    transTreeData(index,arrData,treeData){
      if(index === 1){
        var rootRole = {
          user_name:'为角色下的用户设定可查看的数据范围',
          children: arrData
        };
        treeData.splice(0,1,rootRole);
      } else {
        var rootUser = {
          roleName:'为用户下的角色设定可查看的数据范围',
          children: arrData
        };
        treeData.splice(0,1,rootUser);
      }
    },
    //初次加载的数据
    initRoleDetail(){
      var rowRole = this.roleTableData[0];
      var rowUser = this.userTableData[0];
      this.roleDetail(rowRole);
      this.userDetail(rowUser);
    },
    // 获取角色下用户的已经设定规则
    getAreadyRoleRule(index,data){
      const self = this;
      var submitRuleData;
      if(index === 1){
        submitRuleData = {
          userId:'',
          roleId:data.id
        };
      } else if(index === 2){
        submitRuleData = {
          userId:'',
          roleId:data.roleId
        };
      }
      
      var roleDataRangeInit = [
            {
              label: '角色可查看的数据范围',
              children: [
                {
                  label: '本人创建的',
                  disabled: true
                }
              ],
            },
          ];
      this.roleDataRange = roleDataRangeInit;
      this.$http({
        url: '/ifbp-app-sm/sm/rbac/datapermrule/get',
        method: 'post',
        params: submitRuleData
      }).then((res) => {
        if(res.data.success === true){
          var resData = res.data.data.smDatapermRule;
          if(resData){
            var ruleData = self.ruleData;
            var ruleName;
            for(var i in ruleData){
              if(ruleData[i].type === 'default'){
                ruleData.splice(i,1);
              }   
            }
            for(var j in ruleData){
              if(resData.ruleId === ruleData[j].id){
                ruleName = ruleData[j].ruleName;
              }   
            }
            var areadyRuleData = {
              label: ruleName
            };
            if(ruleName === undefined){
              self.roleRadio = '';
              self.roleOrgRadio = '';
              self.roleCheckAll = false;
              self.showRoleRadio = true;
              self.showRoleUserRadio = true;
            }else{
              self.roleDataRange[0].children.push(areadyRuleData);
              self.roleRadio = ruleName;
              self.roleOrgRadio = ruleName;
              self.roleCheckAll = true;
            }
        }else {
          self.roleRadio = '';
          self.roleOrgRadio = '';
          self.roleCheckAll = false;
        }
      }
      }).catch(() => {
        this.$message({
          message:'获取角色下用户的已经设定规则失败',
          type:'error'
        });
      });
    },
    //点击角色显示角色下用户
    roleDetail(row,event,column){
      console.log(row,event,column);
      this.role.id = row.id;
      this.role.name = row.roleName;
      this.role.type = row.labelName;
      var submitData ={
        pn: row.ps || 1,
        ps: row.pn || 10,
        sortColumn: row.sorttype || '',
        flag: 1,
        keyword: row.keyword || '',
        roleCode:row.roleCode || '',
        roleId:row.id || ''
      };
      
      const self = this;
      this.$http({
        url: '/wbalone/userMGT/pagingListByRole',
        method: 'GET',
        params: submitData
      }).then((res) => {
        if(res.data.status === 1){
          var resData = JSON.parse(JSON.stringify(res.data.data.content));
          var roleDataDetail = self.roleDataDetail;
          self.transTreeData(1,resData,roleDataDetail);
        }
        
      }).catch(() => {
        this.$message({
          message:'获取角色下用户失败',
          type:'error'
        });
      });
      this.getAreadyRoleRule(1,row);
    },
    //获取用户下的已设定规则数据
    getAreadyUserRule(index,data){
      const self = this;
      var submitRuleData;
      if(index === 1){
        submitRuleData = {
          userId:data.id,
          roleId:''
        };
      } else if(index === 2){
        submitRuleData = {
          userId:data.userId,
          roleId:''
        };
      }
      
      var userDataRangeInit = [
            {
              label: '用户可查看的数据范围',
              children: [
                {
                  label: '本人创建的',
                  disabled: true
                }
              ],
            },
          ];
      this.userDataRange = userDataRangeInit;
      this.$http({
        url: '/ifbp-app-sm/sm/rbac/datapermrule/get',
        method: 'post',
        params: submitRuleData
      }).then((res) => {
        if(res.data.success === true){
          var resData = res.data.data.smDatapermRule;
          if(resData){
            var ruleData = self.ruleData;
            var ruleName;
            for(var i in ruleData){
              if(resData.ruleId === ruleData[i].id){
                ruleName = ruleData[i].ruleName;
              }   
            }
            var areadyRuleData = {
              label: ruleName
            };
            if(ruleName === undefined){
              self.userRadio = '';
              self.userOrgRadio = '';
              self.userCheckAll = false;
              self.showUserRadio = true;
              self.showUserRoleRadio = true;
            }else{
              self.userDataRange[0].children.push(areadyRuleData);
              self.userRadio = ruleName;
              self.userOrgRadio = ruleName;
              self.usercheckAll = true;
            }
            
        }else{
          self.userRadio = '';
          self.userOrgRadio = '';
          self.usercheckAll = false;
        }
      }
      }).catch(() => {
        this.$message({
          message:'获取角色下的已经设定规则失败',
          type:'error'
        });
      });
    },
    //点击用户获取用户下的角色数据
    userDetail(row,event,column){
      console.log(row,event,column);
      this.user.id = row.id;
      this.user.name = row.user_name;
      this.user.type = row.user_type;
      const self = this;
      this.$http({
        url: '/wbalone/roleMGT/findByUserId/'+row.id,
        method: 'GET'
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data));
          var userDataDetail = self.userDataDetail;
          self.transTreeData(0,resData,userDataDetail);
        }
        self.getAreadyUserRule(1,row); //获取用户的已经设定的规则数据
      }).catch(() => {
        this.$message({
          message:'获取用户下角色失败',
          type:'error'
        });
      });

    },
    //点击角色下用户的树触发事件
    handleRoleNode(data){
      var attributes = {
        keyField: 'id', //标识
        parentKeyField: 'pid', // 上级标识字段名
        textField: 'orgname', // 文本字段名
        rootKey: null// 根节点标识
      };
      const self = this;
      this.roleUser = data;
      this.roleUserName = data.user_name;
      this.roleUserData = data;
      var submitData = {
        userId: data.id,
        roleId: this.role.id
      };
      this.$http({
        url: '/ifbp-app-sm/sm/rbac/datapermrule/get',
        method: 'POST',
        params: submitData
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data));
          if(resData.smDatapermDiyList.length === 0){
            var ruleId = resData.smDatapermRule.ruleId;
            for(var i in self.ruleDataOrg){
            if(ruleId === self.ruleDataOrg[i].ruleCode){
              self.roleUserRadio = self.ruleDataOrg[i].ruleName;
            }
          }
        }else{
          self.roleUserRadio = "指定组织";
          self.diyRoleRuleData = self.convertTreeData(resData.smDatapermDiyList,attributes);
          self.showRoleUserDiyRule = true;
        }
        }
      }).catch(() => {
        self.roleUserRadio = '';
        self.showRoleUserDiyRule = false;  
        this.$message({
          message:'获取角色下用户已设置规则失败',
          type:'error'
        });
      });
    },
    // 点击用户下角色树节点的事件
    handleUserNode(data){
      var attributes = {
        keyField: 'id', //标识
        parentKeyField: 'pid', // 上级标识字段名
        textField: 'orgname', // 文本字段名
        rootKey: null// 根节点标识
      };
      this.userRole = data;
      this.userRoleName = data.roleName;
      this.userRoleType = data.labelName;
      this.userRoleData = data;
      var submitData = {
        userId: this.user.id,
        roleId: data.id
      };
      this.$http({
        url: '/ifbp-app-sm/sm/rbac/datapermrule/get',
        method: 'POST',
        params: submitData
      }).then((res) => {
        if(res.data.success === true){
          var resData = JSON.parse(JSON.stringify(res.data.data));
          if(resData.smDatapermDiyList.length === 0){
            var ruleId = resData.smDatapermRule.ruleId;
            for(var i in self.ruleDataOrg){
            if(ruleId === self.ruleDataOrg[i].ruleCode){
              self.userRoleRadio = self.ruleDataOrg[i].ruleName;
            }
          }
        }else{
          self.userRoleRadio = "指定组织";
          self.diyUserRuleData = self.convertTreeData(resData.smDatapermDiyList,attributes);
          self.showUserRoleDiyRule = true;
        }
        }
      }).catch(() => {
        self.roleUserRadio = '';
        self.showRoleUserDiyRule = false;  
        this.$message({
          message:'获取角色下用户已设置规则失败',
          type:'error'
        });
      });
    },
    handleDataAssign(type){
      if(this.showRoleDetail === true){
        this.showSetRoleDataRange = !this.showSetRoleDataRange;
      }else {
        this.showSetUserDataRange = !this.showSetUserDataRange;
      }
      if(type === 'role'){
        console.log('role');
      }else{
        console.log('user');
      }
    },
    handleCheckout(){
      alert('search');
    },
    renderRoleContent(createElement, node){
      var element;
      if (node.node.level === 2) {
        element = createElement('span',[
          createElement('span',{
            domProps: {
              innerText: node.data.user_name
            }
          }),
          createElement('span',{
            class: {
              'el-icon-edit': true
            },
            on: {
              click:this.handleDataAssign
            },
            style: {
              'margin-left':'30px'
            },
          })
        ]);
      } else {
        element = createElement('span',{
          domProps: {
            innerText: node.data.user_name
          }
        });
      }
      return element;
    },
    // renderRoleContent(createElement, node){
    //   var element;
    //   var roleUserSeted;
    //   // for(var i in this.roleUserSeted){
    //   //   if(node.id === this.roleUserSeted[i].id){
    //   //     roleUserSeted = this.roleUserSeted[i].states;
    //   //   }
    //   // }
    //   if(!roleUserSeted){
    //     if (node.node.level === 2) {
    //       element = createElement('span',[
    //         createElement('span',{
    //           domProps: {
    //             innerText: node.data.user_name
    //           }
    //         }),
    //         createElement('span',{
    //           class: {
    //             'el-icon-edit': true
    //           },
    //           style: {
    //             'margin-left':'30px'
    //           },
    //           on: {
    //             click:this.handleDataAssign
    //           }
    //         }),
    //         createElement('span',{
    //           domProps: {
    //             innerText: '（数据范围同用户设置）'
    //           },
    //           style: {
    //             'margin-left':'15px'
    //           }
    //         })
    //       ]);
    //     } else {
    //         element = createElement('span',{
    //           domProps: {
    //             innerText: node.data.user_name
    //           }
    //         });
    //       }
    //     }else{
    //       element = createElement('span',[
    //         createElement('span',{
    //           domProps: {
    //             innerText: node.data.user_name
    //           }
    //         }),
    //         createElement('span',{
    //           class: {
    //             'el-icon-edit': true
    //           },
    //           style: {
    //             'margin-left':'30px'
    //           },
    //           on: {
    //             click:this.handleDataAssign
    //           }
    //         }),
    //         createElement('button',{
    //           domProps: {
    //             innerText: '重置为数据范围同用户设置'
    //           },
    //           style: {
    //             'margin-left':'15px',
    //             'background-color':'#409EFF',
    //             'margin-radius':'4px',
    //             color:'#ffffff',
    //             'text-shadow':'none'
    //           },
    //           on:{
    //             click:this.recoverRange
    //           }
    //         })
    //       ]);
    //     }
    //     return element;
    // },
    renderUserContent(createElement, node){
      var element;
      if (node.node.level === 2) {
        element = createElement('span',[
          createElement('span',{
            domProps: {
              innerText: node.data.roleName
            }
          }),
          createElement('span',{
            class: {
              'el-icon-edit': true
            },
            on: {
              click:this.handleDataAssign
            },
            style: {
              'margin-left':'30px'
            },
          })
        ]);
      } else {
        element = createElement('span',{
          domProps: {
            innerText: node.data.roleName
          }
        });
      }
      return element;
    },
    handleClose(done) {
      const self = this;
      done();
      self.showRoleDataRange = false;
      self.showUserDataRange = false;
      self.showSetRoleDataRange = false;
      self.showSetUserDataRange = false;
      // this.$confirm('确认关闭？').then(() => {
      //     done();
      //     self.showRoleDataRange = false;
      //     self.showUserDataRange = false;
      //     self.showSetRoleDataRange = false;
      //     self.showSetUserDataRange = false;
      //   }).catch(() => {});
    },
    initPages(){
      var promise1 = this.getRoleData();
      var promise2 = this.getUserData();
      var promise3 = this.getRuleData();
      var promise4 = this.getDiyRuleData();
      Promise.all([promise1, promise2, promise3,promise4]).then(() => {
        this.initRoleDetail();
      });
    }
  },
  render: function(roleHandleContent) {
    return roleHandleContent('input',{
      attrs:{
        type: 'button'
      },
      style:{
        width: '40px',
        height: '30px',
        color: 'blue'
      }
    });
  },
  created(){
   this.initPages();
  }
};
</script>
<style>
.data-authority.el-button.is-disabled.el-button--text{
  color:#000;
}
#data-authority .el-dialog__header{
  text-align: center;
}
#data-authority .el-dialog__footer{
  text-align: center;
}
#data-authority .setting .el-tree{
  border:none;
}
</style>


<style scoped>
#data-authority{
  margin: 20px;
  clear: both;
}
.back{
  height: 55px;
  line-height:55px;
  overflow: hidden;
  background-color:#ffffff;
  margin-bottom: 15px;
}
.back-button{
  position:relative;
  top:20%;
  margin-right: 10px;
}
.main-content{
  background-color: #ffffff;
  width:100%;
  min-height:670px;
}
.search{
  margin-bottom:10px;
}
.border-card{
  float:left;
  width: 50%;
  margin: 18px;
  min-width:540px;
}
.detail{
  float:right;
  width: 45%;
  margin: 18px 18px 18px 0;
}
.detail-title{
  height:42px;
  width:100%;
  background-color: #EEF1F6;;
  font-size:14px;
  color:#8391A5;
  font-weight:400;
  padding-top:12px;
  padding-left:12px;
  border: 1px solid #eee;
}
.setRow{
  height:55px;
  line-height: 55px;
  overflow:hidden;
  font-size: 14px;
  margin-left:10px;
}
.row-last{
  margin-left:19px;
}
.set-button{
  margin-left:12px;
}

.dialog{
  margin: 20px;
}
.dialog-title{
  height: 55px;
  line-height: 55px;
  text-align: center;
  margin-top:-10px;
}
.data-range{
  margin-left: 72px;
}
.data-range-assign{
  margin-left: 20px;
  margin-bottom: 10px;
}
.dialog-type{
  margin-bottom: 4px;
}
.recover-data{
  margin: 10px auto;
}
.data-range-list{
  margin-top:10px;
}

.radio {
  margin-top: 5px;
  margin-bottom: 5px;
}
.dialog-footer{
  text-align: center;
}
.setting{
  margin-left:40px;
  padding: 0 0px;

}
.apartment{
  margin-left: 20px;
  margin-bottom:10px;
}
.company{
  margin-bottom:10px;
}
</style>

