<style>
  /*开始的初始化*/
  .documents input,select {
    outline: none;
  }

  .documents {
    font-family: 'ArialMT', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
    width: 1000px;
    height: 510px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 5px solid rgba(239, 243, 246, 1);
    background-color: rgba(255, 255, 255, 1);
    padding: 0px 35px 20px;

  }
  .documents h4 {
    height: 60px;
    line-height: 60px;
    width: 100%;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #393C3E;
    background: url("../../assets/images/documents/u8347.png");
  }
  .documents .inputs {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    position: relative;
  }
  .documents .inputs .el-date-editor.el-input {
    margin-left: -15px;
    width: 193px;
  }

   .documents .inputs .selectCompany {
     position: absolute;
     width: 197px;
     left: 60px;
     top: 60px;
     list-style: none;
     text-align: center;
     background-color: #fff;

   }
  .documents .inputs .selectCompany li {
    height: 36px;
    line-height: 36px;

  }
  .documents .inputs .selectCompany li:hover {
    border: 1px solid #E6EAEE;
    background-color: #F5F8FA;
  }
  .documents .inputs .el-input__inner {
    display: inline-block;
    height: 36px;
    width: 150px;

  }
  .documents .inputs .el-icon-date:before {
    margin-left: -40px;
  }
  .documents .inputs li:nth-child(5) a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: #333333;
    display: inline-block;

  }

  .documents .inputs .ul li{
    float: left;
    display: inline-block;
    list-style: none;
    margin-right: 30px;
  }
  .documents .inputs .ul label{
    margin-right: 5px;
  }
  .documents .inputs .ul li input {
    border: 1px solid rgba(206, 208, 218, 1);
    border-radius: 4px;
    height: 32px;
    padding-left: 5px;
    color: #393C3E;
  }
  .documents .inputs .ul li:nth-child(1) input {
    width: 190px;
  }
  .documents .inputs .ul li:nth-child(1):after {
    content: '';
    margin-left: -15px;
    display: inline-block;
    width: 7px;
    height: 4px;
    background: url("../../assets/images/documents/u8359.png");
  }
  .documents .inputs li:nth-child(2) input,li:nth-child(4) input {
    width: 50px;
  }
  .documents .inputs li:nth-child(3) input {
    width: 150px;
  }
  .documents .inputs li:nth-child(5) {
    margin-right: 0;
  }
  .documents .tables {
    color: #333333;
    font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial';
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
  }
  .documents .tables tr .subject-name{
    font-weight: normal;
    height: 44px;
    line-height: 44px;
    color: #71787E;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 10px;
    vertical-align: middle;
    position: relative;
  }
  .documents .tables .subject-name ul{
    position: absolute;
    list-style: none;
    text-align: left;
    top: 45px;
    left: 0px;
    z-index: 20;
    background-color: #fff;
  }
  .documents .tables .subject-name li {
    width: 150px;
    text-align: center;
    border: 1px solid #9fa9ba;
    border-bottom: none;
    height: 45px;
    line-height: 45px;
    padding: 6px 5px;
    box-sizing: border-box;
    font-size: 12px;
    box-shadow: 1px 1px 2px #9fa9ba;


  }
  .documents .tables .subject-name li:last-child {
    border-bottom: 1px solid #9fa9ba;
  }
  .documents .tables .subject-name ul li label {
    heigth: 28px;
    line-height: 28px;
    display: inline-block;
    width: 40px;
    text-align: center;
    color: #393C3E;
    font-weight: 700;
    }
  .documents .tables .subject-name ul li select {
    appearance: none;
    padding-left: 5px;
    box-sizing: border-box;
    display: inline-block;
    margin-top: -15px;
    width: 98px;
    height: 28px;
    color: #393C3E;
    border: 1px solid rgba(159, 169, 186, 1);
    border-radius: 4px;
    background: url("../../assets/images/documents/u8359.png") no-repeat 90% center;

  }
  .documents .tables tr .subject-name input,.subject-name label {
    padding-left: 0px;
    float: left;
    display: inline-block;
    height: 16px;
    line-height: 16px;
  }
  .documents .tables tr .subject-name a {
    float: right;
    display: inline-block;
    color: #71787E;
    height: 14px;
    line-height: 14px;
  }
  .documents .tables  tr td {
    box-sizing: border-box;
    border: 1px solid rgba(230, 234, 238, 1);
    width: 30px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }

  .documents .tables tr.first-tr td {
    height: 28px;
    line-height: 28px;
  }
  .documents .tables tr.second-tr td {
    height: 29px;
    line-height: 29px;
  }
  .documents .tables  tr.total td {
    height: 42px;
    line-height: 42px;
  }

  .documents .tables  tr td input{
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    text-align: center;
    outline-style: none;
    border: none;
    padding-left: 5px;
  }
  .documents .tables  tr .abstract {
    width: 99px;
    height: 60px;
    vertical-align: middle;

  }
  .documents .tables  tr .subject {
    width: 150px;
    height: 60px;
    vertical-align: middle;

  }
  .documents .tables  tr {
    border: 1px solid rgba(230, 234, 238, 1);
  }
  .documents .tables tr.second-tr td:nth-child(3n+3) {
    border-right: 1px solid #c2f1f8;
  }
  .documents .tables tr.second-tr td:nth-child(3n+12){
    border: 1px solid rgba(230, 234, 238, 1);
  }
  .documents .tables tr.second-tr td:nth-child(3n+14) {
    border-right: 1px solid #c2f1f8;
  }
  .documents .tables tr.second-tr td:nth-child(11n+9){
    border-right: 1px solid #ffc4c4;
  }
  .documents .tables tr.border-color td:nth-child(3n+5) {
    border-right: 1px solid #c2f1f8;
  }
  .documents .tables tr.border-color td:nth-child(3n+14){
    border: 1px solid rgba(230, 234, 238, 1);
  }
  .documents .tables tr.border-color td:nth-child(3n+16) {
    border-right: 1px solid #c2f1f8;
  }
  .documents .tables tr.border-color td:nth-child(11n+11){
    border-right: 1px solid #ffc4c4;
  }

  .documents .footers {
    font-size: 14px;
    width: 920px;
    height: 16px;
    line-height: 16px;
    margin-top: 10px;
    text-align: left;
  }

.documents .footers li {
  display: inline-block;
  width: 110px;
  height: 16px;


}
  .documents .footers li label {
    vertical-align: middle;
  }
  .documents .footers li input {
    vertical-align: middle;
    outline-style: none;
    border: 0px;
    width: 50px;
  }
  .documents .footers li:nth-child(2) {
    margin: 0 280px;
  }
  .documents .footers li:last-child{
    margin-right: 0px;
    float: right;
  }

</style>
<template>
  <div class="documents">
    <h4>记账凭证</h4>
    <div class="inputs">
      <ul class="ul">
        <li><label for="">核算账本</label><input type="text" @blur="bl(account)" @focus="fs" @keyup.enter="searchInput" @click="selects" v-model="account"></li>
        <li><label for="">记字第</label><input type="text">&nbsp;&nbsp;号</li>
        <li>
          <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </div>
        </li>
        <li><label for="">附单据</label><input type="text">&nbsp;&nbsp;张</li>
        <li><a href="http://localhost:8080/upload" class="el-icon-upload">上传附件</a></li>
      </ul>
      <ul :class=" { selectCompany: selswitch } " v-show="selswitch">
       <li v-for="company in companylist" @click="broadcast(company)">{{ company.name }}</li>
      </ul>
    </div>
      <table class="tables">
        <tr class="first-tr">
          <td rowspan="2" class="abstract">摘要</td>
          <td rowspan="2" class="subject">科目名称</td>
          <td colspan="11">借方金额</td>
          <td colspan="11">贷方金额</td>
        </tr>
        <tr class="second-tr">
          <td>亿</td>
          <td>千</td>
          <td style="{border: 1px solid pink;}">百</td>
          <td>十</td>
          <td>万</td>
          <td>千</td>
          <td>百</td>
          <td>十</td>
          <td>元</td>
          <td>角</td>
          <td>分</td>
          <td>亿</td>
          <td>千</td>
          <td>百</td>
          <td>十</td>
          <td>万</td>
          <td>千</td>
          <td>百</td>
          <td>十</td>
          <td>元</td>
          <td>角</td>
          <td>分</td>
        </tr>
            <tr class="border-color" v-for="(product,index) in stocks" >
              <td><input type="hidden"></td>
              <td class="subject-name">
                <input type="text" v-model="product.goods" @click="subjectname(index,product.goods)">
                <div v-show="product.toggle">
                  <label for="">余额: 10000.000</label>
                  <a href="#">科目</a>
                  <ul>
                    <li v-for="client in 1">
                      <label for="">{{ "客户" + client}}</label>
                      <select name="" id="">
                        <option value="">001</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </td>
              <td v-for="(lents,num1) in product.lent">
                <input type="text" :value="lents"
                       @blur="inputBlur(num1,index, $event)"
                       @keydown.enter.prevent="inputBlur(product, $event)">
              </td>
              <td v-for="(borrowers,num2) in product.borrower">
                <input type="text" :value="borrowers"
                       @blur="inputBlur(num2,index, $event)"
                       @keydown.enter.prevent="inputBlur(product, $event)">
              </td>
            </tr>
            <tr class="total">
              <td colspan="2">合计</td>
              <td v-for="n in 21"><input type="text"></td>
            </tr>
      </table>
    <div class="footers">
      <ul>
        <li><label for="">制单人：</label><input type="text" value="王晓璐"></li>
        <li><label for="">审核人：</label><input type="text" value="王晓璐"></li>
        <li><label for="">记账人：</label><input type="text" value="王晓璐"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import companyinformation from '../test.json';
  export default {
      data() {
          return {
              companyData: companyinformation.data,//there are all company information variable
              companylist: [],//memory every company-name
              tmp: '',//tmp data

              account: '山东龙信投资有限公司',//default data
              selswitch: false,//control account-book click event show or hidden
            maxlength: 5,//in order to add tr , so use variable
            moneylength: 11,
            display: 'none',
            message: '',
        // this is date plugin
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            value1: '',
            //end
            newgoods: '',// show subject-name stock
            stocks: [],
            toggle: false,//show or hidden crash
          };
      },
    created: function () {
          const arr = [];
          arr.length = this.moneylength;
          for (let i = 0; i < this.maxlength; i++) {
            /* eslint-disable */
            this.stocks.push({"goods":'',"lent":arr,"borrower":arr});
            /* eslint-enable */
          }
          if (!this.companyData.name){
            this.companyData.forEach((element) => {
              this.companylist.push(element);
            });
            return;
          }
      this.companylist.push(this.companyData);
    },
    methods: {
      repeat(bank){
             const arr = [];
                arr.length = this.moneylength;
                 if(bank > 0) {
                   const tmpchange = bank.toString();
                   const crash = tmpchange.split('');
                   const i = !tmpchange.split('.')[1] ? 0 : tmpchange.split('.')[1].length;
                   console.log(i);
                   let lentlength = tmpchange.indexOf('.') >=0 ? crash.length - (i+1) : crash.length;
                     crash.forEach((ele) => {
                       if(ele !== '.') {
                          arr[arr.length - (lentlength + 2)] = ele;
                         lentlength -= 1;
                        }
                   });
                 }
                 return arr;
      },
      inputBlur(num,index, e) {
        console.log("inputBlur");
        for(let i = 0; i < this.stocks.length; i++) {
            if(i !== index) {
                return;
            }
        }
        const target = e.target;
        this.stocks[index].lent[num] = target.value;
        const tmp = this.stocks[index];
        this.stocks.splice(index,1,tmp);
        this.emitChange(target.value);
        console.log(this.stocks[index]);
      },
      emitChange(obj,val) {
          console.log("this val"+ val,obj);
      },
          selects: function () {
              if(!this.selswitch){
                this.selswitch = true;
                return ;
              }
              this.selswitch = false;
          },
      subjectname: function (index , goods) {
              this.stocks.forEach((element,i) => {
                /* eslint-disable */
                if (i != index) {
                  return
                }
                /* eslint-enable */
        });
              if(goods){
                  this.stocks[index].toggle = !this.stocks[index].toggle;
                  const tmp = this.stocks[index];
                  this.stocks.splice(index,1,tmp);
              }
      },
//at the account book , give value to table subject-name
      broadcast(data) {
        this.selswitch = false;
        this.tmp = data.name;
        this.account = data.name;
        // it is benifit to reset data
        this.stocks = [];
        const arr1 = [];
        arr1.length = this.moneylength;
        for (let i = 0; i < this.maxlength; i++) {
          /* eslint-disable */
          this.stocks.push({"goods":'',"lent": arr1,"borrower": arr1});
          /* eslint-enable */
        }
        if (data.material) {
          if (!data.material.goods) {
            data.material.forEach((element,index) => {
                const obj = {};
                for(const k in element){
                    obj[k] = element[k];
                }
                /* eslint-disable */
                obj.lent = this.repeat(element.lent);
                obj.borrower = this.repeat(element.borrower);
                /* eslint-enable */
                this.stocks[index]= obj;
              });
              return;
          }
          /* eslint-disable */
          const obj = {};
          for(const k in data.material) {
              obj[k] = data.material[k];
          }
          obj.lent = this.repeat(data.material.lent);
          obj.borrower = this.repeat(data.material.borrower);
          /* eslint-enable */
          this.stocks[0] = obj;

        }
      },
//      keyboard up event  search companylist exist
      searchInput: function () {
        console.log(123);
      },
//      auto focus make input.value is null
      fs: function () {
        this.account = '';
      },
//      auto blur make input.value  reset
      bl: function () {
        this.account = this.tmp;
      }
    }
  };
</script>
