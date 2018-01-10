<template>
<div id="messageCenter">
  <div class="messageheader">
    <span class="sp0">消息中心</span>
  </div>
  <div class="handle">
    <el-checkbox v-model="checked" @change="toggleSelection(tableData)">全选</el-checkbox>
    <el-button type="primary" @click="deleteRow" style="margin-left: 10px;">批量删除</el-button>
    <el-button v-if="read===0" type="primary" @click="setRead">标记为已读</el-button>
    <div class="back">
      <el-button type="primary" @click="goBack()">返回</el-button>
    </div>
    <div class="search">
      <el-input placeholder="消息标题/发送人" icon="search" v-model="input2" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
      </el-input>
    </div>
  </div>
  <div class="handle-body">
    <div class="div1">
      <div class="setLabel">
        <span>类型:</span>
      </div>
      <ul>
        <li id="all" class="active1" @click="queryType('',$event)">全部</li>
        <li id="inform" @click="queryType('通知',$event)">通知</li>
        <li id="notice" @click="queryType('公告',$event)">公告</li>
        <li id="task" @click="queryType('任务',$event)">任务</li>
        <li id="warning" @click="queryType('预警',$event)">预警</li>
      </ul>
    </div>
    <div class="div1">
      <div class="setLabel">
        <span>日期范围:</span>
      </div>
      <ul>
        <li id="nearAll" class="active1" @click="querydaysData('',$event)">全部</li>
        <li id="nearDay" @click="querydaysData(3,$event)">最近三天</li>
        <li id="nearWeek" @click="querydaysData(7,$event)">最近一周</li>
        <li id="nearMouth" @click="querydaysData(30,$event)">最近一个月</li>
        <li id="nearMore" @click="querydaysData(60,$event)">更早</li>
      </ul>
    </div>
    <div class="div1">
      <div class="setLabel">
        <span>消息状态:</span>
      </div>
      <ul>
        <li id="unRead" class="active1" @click="queryRead(0,$event)">未读</li>
        <li id="allRead" @click="queryRead(1,$event)">已读</li>
      </ul>
    </div>
  </div>
  <div class="tableList">
    <transition name="el-fade-in-linear">
      <el-table v-if="showtable" ref="multipleTable" :data="tableData" :show-header="false" @selection-change="handleSelectionChange" @row-click="messDetail" style="width: 100%">
        <el-table-column type="selection" width="55" className="xk"></el-table-column>
        <el-table-column property="title" label="内容" className="content">
          <template scope="scope">
                      <span v-if="scope.row.read_flag === '1'" class="background_grey">{{scope.row.title}}</span>
                      <span v-else-if="scope.row.read_flag === '0'">{{scope.row.title}}</span>
                  </template>
        </el-table-column>
        <el-table-column label="发送日期" width="350" className="mdate">
          <template scope="scope">
                       <span>发送人:</span>
                       <span>{{scope.row.creataor_name}}</span>
                       <span>|</span>
                       <span>发送时间:</span>
                         <span>{{scope.row.send_time | time1}}</span>
                     </template>
        </el-table-column>
      </el-table>

    </transition>

  </div>
  <div class="block1">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next, jumper" :total="totalElements">
    </el-pagination>
  </div>
  <el-dialog title="提示" v-model="delDialogVisible" :modal="true" size="tiny">
    <span>确认删除信息？删除后无法恢复。</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteClick">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
// import json from '../1.json';
//import json1 from '../2.json';
export default {
  data() {
    return {
      checked: false,
      input2: '',
      tableData: [],
      currentPage: 1,
      totalElements: 0,
      size: 5,
      arr: [],
      day: '',
      read: 0,
      type:'',
      delDialogVisible: false,
      showtable: true,
    };
  },
  created() {
    this.dataSearch();
  },
  methods: {
    handleIconClick() {
      this.dataSearch();
    },
    goBack() {
      this.$router.go(-1);
    },
    deleteRow() {
      if (this.arr.length > 0) {
        this.delDialogVisible = true;
      }
    },
    deleteClick() {
      this.$http({
        url: '/ifbp-app-sm/sm/messageCenter/delete',
        method: 'post',
        data: this.arr,
      }).then((res) => {
        if (res.data.success === true) {
          if (window.env === 'dev') {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          this.delDialogVisible = false;
          this.dataSearch();
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          });
        }
      }).catch(() => {
        this.$message({
          message: 'Network error',
          type: 'error'
        });
      });
    },
    setRead() {
      if (this.read === "1") {
        this.arr = [];
      }
      if (this.arr.length > 0) {
        this.$http({
          url: '/ifbp-app-sm/sm/messageCenter/setRead',
          method: 'post',
          data: this.arr,
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '置为已读成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.data,
              type: 'error'
            });
          }
          this.dataSearch();

        });
      }
    },
    messDetail(row, event) { //信息详情
      if (event.target.className.indexOf("el-checkbox") < 0) {
        // console.log(event, column);
        location.hash = '/messageDetail/' + row.pk_message;
      }

    },
    querydaysData(day, event) {
      var target = event.currentTarget;
      var children = target.parentNode.children;
      for (let i = 0; i < children.length; i++) {
        $(children[i]).removeClass("active1");
      }
      $(target).addClass("active1");
      this.day = day;
      this.dataSearch();

    },
    queryRead(read, ev) {
      var tar = ev.currentTarget;
      var children = tar.parentNode.children;
      for (let i = 0; i < children.length; i++) {
        $(children[i]).removeClass("active1");
      }
      $(tar).addClass("active1");
      this.read = read;
      this.dataSearch();
    },
    queryType(type,e){
      var ta=e.currentTarget;
      var children = ta.parentNode.children;
      for (let i = 0; i < children.length; i++) {
        $(children[i]).removeClass("active1");
      }
      $(ta).addClass("active1");
      this.type = type;
      this.dataSearch();

    },
    dataSearch(pn) {
      // this.tableData=json.data.content;
      this.showtable = false;
      this.arr = [];
      this.tableData = [];
      var url;
      if (pn === undefined) {
        url = "/ifbp-app-sm/sm/messageCenter/pageList?timePeriod=" + this.day + "&type="+this.type+"&messageType=" + this.read + "&pn=1&ps=5&title_creator=" + this.input2;
      } else {
        url = "/ifbp-app-sm/sm/messageCenter/pageList?timePeriod=" + this.day + "&type="+this.type+"&messageType=" + this.read + "&pn=" + pn + "&ps=5&title_creator=" + this.input2;
      }
      this.$http({
        url: url,
        method: 'get',
      }).then((res) => {
        this.showtable = true;
        if (res.data.success) {
          this.tableData = res.data.data.content;
          this.totalElements = res.data.data.totalElements;
        } else {
          this.$message({
            message: res.data.data,
            type: 'error'
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      this.dataSearch(val);
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        val.forEach((v) => {
          if (this.arr.indexOf(v.pk_message) === (-1)) {
            this.arr.push(v.pk_message);
          }
        });
        if (val.length === this.tableData.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    },
    toggleSelection(rows) {
      if (this.checked) {
        rows.forEach((row) => {
          if (this.arr.indexOf(row.pk_message) === (-1)) {
            this.arr.push(row.pk_message);
          }
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        this.arr = [];
      }
    },
  }

};
</script>
<style>
#messageCenter {
  width: 98%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

#messageCenter .messageheader {
  font-size: 18px;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 0;
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
}

#messageCenter .handle {
  background: #fff;
  height: 70px;
  line-height: 70px;
  padding-left: 20px;
}

#messageCenter .handle .back,
#messageCenter .handle .search {
  float: right;
  margin-right: 25px;
}

#messageCenter .handle-body {
  margin-top: 10px;
  background: #fff;
  padding: 15px 5px;
}

#messageCenter .handle-body {
  font-size: 14px;
  color: #666666;
}

#messageCenter .handle-body ul {
  display: inline-block;
}

#messageCenter .handle-body ul li {
  display: inline-block;
  margin: 20px 0 10px 20px;
}

#messageCenter .handle-body .setLabel {
  width: 80px;
  display: inline-block;
  text-align: right;
  margin: 20px 0 0 0;
}

#messageCenter .handle-body ul li:hover {
  cursor: pointer;
}

.active1 {
  background: #1baede;
  color: #fff;
  padding: 2px 6px;
}

#messageCenter .tableList {
  margin-top: 20px;
}

#messageCenter .block1 .el-pagination {
  float: right;
}

#messageCenter .block1 {
  margin-top: 10px;
  margin-bottom: 20px;
}

#messageCenter .el-table tr {
  height: 58px !important;
  padding-top: 10px;
}

#messageCenter .el-table {
  border: none !important;
}

#messageCenter .el-table::after,
#messageCenter .el-table::before {
  background-color: transparent!important;
}

#messageCenter .tableList .mdate {
  font-size: 12px;
  color: #9e9e9e;
  /*padding-top: 15px;*/
}

#messageCenter .tableList .content .cell {
  width: 800px;
  font-size: 14px !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  color: #262626 !important;
}

#messageCenter .background_grey {
  color: #9e9e9e!important;
}

#messageCenter .el-table__empty-block {
  background-color: #eeeff1;
}

</style>
