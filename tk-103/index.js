'use strict';
const config = require('./config.js');

const getIndex = raw => {
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if(raw.protocol === key){
        return config.mapIndex[key];
      }
    }
  }
};

const parseTK103 = raw => {
  let parsedData = parse(raw);
  let jsonResult = {
    "alert" : null,
    "latitude":null,
    "longitude":null,
    "speed":null,
    "date":null,
    "time":null,
    "power":null,
    "door":null,
    "acc":null,
    "lastlatitude":null,
    "lastlongitude":null,
    "mnc":null,
    "mcc":null,
    "timestampsent":null
  };
  let dataIndex = getIndex(parsedData);
  if(parsedData.status == "Failed"){
    jsonResult = parsedData;
  }else{
    for (var key in dataIndex) {
      if (dataIndex.hasOwnProperty(key)) {
          if(key === "alert"){
            jsonResult[key] = config.parseAlarm(parsedData[dataIndex[key]]).AlertType;
          }else{
            jsonResult[key] = parsedData[dataIndex[key]];
          }
      }
    }
  }
  return jsonResult;
};

const parse = raw => {
  let result = {status: 'Failed', message: 'UnknownProtocol', raw: raw.toString()};
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if(config.patterns[key].test(raw)){
          result = config.patterns[key].exec(raw);
          result.protocol = key;
      }
    }
  }
  return result;
};

module.exports = {
  parse: parse,
  parseTK103: parseTK103
};