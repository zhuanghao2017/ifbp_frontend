var fs = require('fs');
var path = require('path');
module.exports = new Promise(function(resolve,reject){
  console.log('start reading');
  var basePath = __dirname + '/../src';
  var appPath = 'apps';
  var appName = ''; // specific app name
  var filesArr = {}, routeMap = [];
  var stat, content;

  var parseFile = function(curPath, name){
    var filePath = path.join(basePath, curPath, name);
    var state = fs.statSync(filePath);
    if (!state.isFile()) {
      var dir = fs.readdirSync(filePath);
      if (name.length > 0) {
        curPath = curPath + '/' + name;
      }
      dir.forEach((index) => {
        parseFile(curPath, index);
      });
    } else if (name === 'index.js') {
      console.log('get index.js in ' + curPath);
      //content = fs.readFileSync(indexPath, 'utf8');
      console.log('require file: ' + filePath);
      content = require(filePath);
      console.log(content);
      filesArr[curPath] = content.routes;
    }
  }
  if(fs.existsSync(path.join(basePath, appPath, appName))){
    parseFile(appPath, appName);
  }

  var routeStr = function(route, appName, bundle){
    bundle = bundle ? bundle : appName;
    var path = '../' + appName + '/' + route.component;
    console.log(path);
    return `{name: "${route.name}",path: "${route.path}",component: r => require.ensure([], () => r(require("${path}")), "${bundle}")},`
  };
  Object.keys(filesArr).forEach((key) => {
    filesArr[key].forEach((route) => {
      routeMap += routeStr(route, key);
    });
  });

  try{
    fs.writeFileSync(__dirname + '/../src/router/apps-route.js', 'export default { routes:[' + routeMap + ']}');
  }catch(e){
    console.log(e);
    reject();
  }

  resolve(filesArr);
});
