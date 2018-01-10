
Mock.mock('/baseapp/countryzone/queryById/0001Z010000000079UJS',{
  "status" : true,
  "msg" : "查询成功",
  "data" : {
    "codeth" : "BWA",
    "ts" : 1505890339000,
    "status" : null,
    "bbanrule" : null,
    "beanMap" : {
      "pk_format_ref" : {
        "FMT0Z000000000000003" : {
          "id" : "FMT0Z000000000000003",
          "code" : "EN-UK",
          "name" : "英国英语"
        }
      },
      "pk_timezone_ref" : {
        "0001Z010000000079U2C" : {
          "id" : "0001Z010000000079U2C",
          "code" : "P0200",
          "name" : "东欧时间(UTC+02:00)"
        }
      }
    },
    "code" : "BW",
    "pk_lang" : "english",
    "ibanlength" : null,
    "wholename" : "博茨瓦那",
    "dataoriginflag" : 0,
    "pk_country" : "0001Z010000000079UJS",
    "creator" : null,
    "creationtime" : null,
    "modifier" : "#UAP#",
    "pk_currtype" : null,
    "pk_org" : null,
    "ibanrule" : null,
    "description" : null,
    "name" : "博茨瓦那",
    "phonecode" : "267",
    "ename" : null,
    "modifiedtime" : 1505890339000,
    "pk_format" : "FMT0Z000000000000003",
    "iseucountry" : null,
    "pk_timezone" : "0001Z010000000079U2C",
    "dr" : 0
  }
});

Mock.mock('/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/queryTemplate?pk_temp=097ec6c6-0bcd-4bd6-afb0-f785567cd99d', {"form":{"name":"国家地区表单-新模板","describe":"描述","pkMetadata":"11b3797b-3b9f-436a-893b-9d53cfdb3166","sysflag":"Y","pk_temp":"097ec6c6-0bcd-4bd6-afb0-f785567cd99d"},"formLayout":"<el-form _id=\"jtuaatt40ok\" v-comp=\"\" v-drop=\"{muilt: true}\" v-select=\"\" :inline=\"true\" :model=\"countryzone\" :rules=\"rules\" ref=\"countryzone-form\"><el-form-item _id=\"2da61nqnoze\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"编码\" prop=\"code\" required=\"required\"><el-input _id=\"jc1bnudeu\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.code\"><\/el-input><\/el-form-item><el-form-item _id=\"l4b3duv24b\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"三位代码\" prop=\"codeth\" required=\"required\"><el-input _id=\"qxmx2rgqcw\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.codeth\"><\/el-input><\/el-form-item><el-form-item _id=\"ozulg8pidtb\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"名称\" prop=\"name\" required=\"required\"><el-input _id=\"y01ygisys6j\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.name\"><\/el-input><\/el-form-item><el-form-item _id=\"uueo415a46\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"英文名称\" prop=\"ename\"><el-input _id=\"kyr4nx4ecme\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.ename\" disabled=\"disabled\"><\/el-input><\/el-form-item><el-form-item _id=\"3z68wj9qef2\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"全称\" prop=\"wholename\"><el-input _id=\"c1s1zc8umnr\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.wholename\"><\/el-input><\/el-form-item><el-form-item _id=\"yd54l6suuh\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"电话代码\" prop=\"phonecode\"><el-input _id=\"50dmk183m52\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.phonecode\"><\/el-input><\/el-form-item><el-form-item _id=\"1ilrcubpr94h\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"描述\" prop=\"description\"><el-input _id=\"7bo4qn6dqju\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.description\"><\/el-input><\/el-form-item><el-form-item _id=\"4qfv6akxnl\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"时区\" prop=\"pk_timezone\"><el-ref _id=\"zfb6xguldjc\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.pk_timezone\" field=\"pk_timezone\" :template-value=\"countryzone\"><\/el-ref><\/el-form-item><el-form-item _id=\"yat6f2bspoq\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"语种\" prop=\"pk_lang\" required=\"required\"><el-input _id=\"rwcwmf43d6j\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.pk_lang\"><\/el-input><\/el-form-item><el-form-item _id=\"h8v39yurvzg\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"数据格式\" prop=\"pk_format\"><el-ref _id=\"vcumc7l3cbf\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.pk_format\" field=\"pk_format\" :template-value=\"countryzone\" ref-code=\"formatdocref\" :query-params=\"params\"><\/el-ref><\/el-form-item><el-form-item _id=\"3evwdaxv5ke\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"创建人\" prop=\"creator\"><el-ref _id=\"uc92q55rp9h\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.creator\" field=\"creator\" :template-value=\"countryzone\" disabled=\"disabled\"><\/el-ref><\/el-form-item><el-form-item _id=\"5jeezk3ajhx\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"创建时间\" prop=\"creationtime\"><el-date-picker _id=\"slhtcndn04q\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.creationtime\"><\/el-date-picker><\/el-form-item><el-form-item _id=\"uai0keomv2\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"最后修改人\" prop=\"modifier\"><el-ref _id=\"8pi512t6y4h\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.modifier\" field=\"modifier\" :template-value=\"countryzone\" disabled=\"disabled\"><\/el-ref><\/el-form-item><el-form-item _id=\"54wcl0waxon\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"最后修改时间\" prop=\"modifiedtime\"><el-date-picker _id=\"f55anmfdd5n\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.modifiedtime\"><\/el-date-picker><\/el-form-item><el-form-item _id=\"mk6x5gicqsg\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"本位币\" prop=\"pk_currtype\"><el-ref _id=\"a71c9wi6kti\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.pk_currtype\" field=\"pk_currtype\" :template-value=\"countryzone\" disabled=\"disabled\"><\/el-ref><\/el-form-item><el-form-item _id=\"a2m82ewd0i6\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"欧盟国家\" prop=\"iseucountry\"><el-select _id=\"0fftzjr8ppzk\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.iseucountry\"><\/el-select><\/el-form-item><el-form-item _id=\"6zojswgg9bk\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"IBAN总长度\" prop=\"ibanlength\"><el-input _id=\"xcdd9wvdqmd\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.ibanlength\" disabled=\"disabled\"><\/el-input><\/el-form-item><el-form-item _id=\"qqzmk3z4ox\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"BBAN规则\" prop=\"bbanrule\"><el-input _id=\"cogg7izvnnp\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.bbanrule\" disabled=\"disabled\"><\/el-input><\/el-form-item><el-form-item _id=\"vigdqyken5s\" v-comp=\"\" v-dnd=\"\" v-select=\"\" label=\"IBAN域规则\" prop=\"ibanrule\"><el-input _id=\"xd5y5sw9fi\" v-comp=\"\" :editable=\"editable\" v-model=\"countryzone.ibanrule\" disabled=\"disabled\"><\/el-input><\/el-form-item><\/el-form>","formData":{"countryzone":[]},"formVersion":"1"});

Mock.mock('/uitemplate_web/iref_ctr/refInfo/?refCode=formatdocref', {"refUIType":"RefGrid","refCode":"formatdocref","strFieldCode":["refcode","refname"],"strFieldName":["编码","名称"],"strHiddenFieldCode":["id"],"rootName":"数据格式","refModelUrl":"http://127.0.0.1:80/baseapp/formatdocRef/","refName":"数据格式","refClientPageInfo":{"pageSize":100,"currPageIndex":0,"pageCount":0}});

Mock.mock('/uitemplate_web/iref_ctr/filterRefJSON',{"data":[{"id":"FMT0Z000000000000001","refcode":"ZH-TW","refname":"台湾繁体"},{"id":"FMT0Z000000000000002","refcode":"ZH-HK","refname":"香港繁体"},{"id":"FMT0Z000000000000003","refcode":"EN-UK","refname":"英国英语"},{"id":"0001AA100000001V17UN","refcode":"03","refname":"03"},{"id":"0001AA100000001V17UP","refcode":"05","refname":"05"},{"id":"0001AA100000001T6IMH","refcode":"02","refname":"02"},{"id":"0001AA100000001T6IMG","refcode":"2","refname":"2"},{"id":"0001AA100000001W1F37","refcode":"thl-01","refname":"名称-01"},{"id":"000111100000001Y9AVC","refcode":"00001","refname":"人力资源"},{"id":"1001111000000000OPO6","refcode":"11111","refname":"1111111111"},{"id":"000111100000001Z1HNP","refcode":"2017001","refname":"数据格式名称"},{"id":"FMT0Z000000000000004","refcode":"EN-US","refname":"美国英语"},{"id":"FMT0Z000000000000000","refcode":"ZH-CN","refname":"中文简体"}],"refViewModel":{"content":"","refModelUrl":"http://127.0.0.1:80/baseapp/formatdocRef/","transmitParam":"{\"code\":\"CN\"}","refClientPageInfo":{"pageSize":100,"currPageIndex":0,"pageCount":0}},"page":{"pageSize":100,"currPageIndex":0,"pageCount":0},"allpks":null});