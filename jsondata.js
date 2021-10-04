var lineReader = require('line-reader');
var fs = require('fs')

var jsonObj = {};
var obj = [];
var file = "scripts/SensorJson.json"
var num= 0;

lineRead();
async function lineRead(){
lineReader.eachLine('scripts/input.txt', function(line, last) {
      console.log(num);
      num++;
    
        convertJson(line)
      if(last){
          
        // bleData(obj);
        var data = JSON.stringify(obj)
    fs.writeFileSync(file,data);
    // obj.forEach(value => writeStream.write(`${value}\n`));

  }
});
}

function convertJson(data){
    var currentVal = data
    if(!currentVal.includes("------******STOP******------")){
        var value = JSON.parse(data)
        var temp = value;
        jsonObj = value;
        obj.push(jsonObj);
        // let jsonData = JSON.stringify(temp)
        // fs.appendFileSync(file, jsonData+','+'\n')
        // console.log(jsonObj)
    }
  
}

function bleData(data) {
    var jsonobj = {};
    var bleString = '';
    var bleObj = {};
    var bleData = [];
    var currentVal = data
    if(!currentVal.includes("------******STOP******------")){
    data.forEach(element => {
        if(element.msg.includes('<')){
            bleString = element.msg
        }else if(element.msg.includes('>')){
                bleString += element.msg
                var string = bleString.replace('<','');
                var finalStr = string.replace('>','');
                jsonobj['timestamp'] = finalStr
                // bleObj = jsonobj
                bleData.push(jsonobj)
        }else{
            bleString += element.msg
           
        }        
    });
}else{
    console.log('STOP text')
}
    var bleMsg = JSON.stringify(bleData)
    fs.writeFileSync(file,bleMsg);
    console.log(bleData)
}