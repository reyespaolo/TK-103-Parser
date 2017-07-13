'use strict';

const pad = require('pad');
const moment = require('moment');

const getIndex = raw => {
  if(raw.protocol == "sms_tk103_Speeding"){
    return mapIndex.sms_tk103_Speeding;
  }else if(raw.protocol == "sms_tk103_Oil"){
    return mapIndex.sms_tk103_Oil;
  }else if(raw.protocol == "sms_tk103"){
    return mapIndex.sms_tk103;

  }
};

const parseTK103 = raw => {
  let parsedData = parse(raw);
  let jsonResult = {};
  let dataIndex = getIndex(parsedData)
  if(parsedData.status == "Failed"){
    jsonResult = parsedData
  }else{
    for (var key in dataIndex) {
      if (dataIndex.hasOwnProperty(key)) {
          if(key == "alert"){
            jsonResult[key] = parseAlrm(parsedData[dataIndex[key]]).AlertType
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
  if (patterns.sms_tk103.test(raw)) {
    result = patterns.sms_tk103.exec(raw);
    result.protocol = "sms_tk103"
  } else if (patterns.sms_tk103_Speeding.test(raw)) {
    result = (patterns.sms_tk103_Speeding.exec(raw));
    result.protocol = "sms_tk103_Speeding"
  } else if (patterns.sms_tk103_Oil.test(raw)) {
    result = (patterns.sms_tk103_Oil.exec(raw));
    result.protocol = "sms_tk103_Oil"
  }
  return result;
};

const parseAlrm = event => {
  const alarms = {
    'speed': {AlertType: 'SpeedingAlert'},
    'oil': {AlertType: 'OilAlert'},

  };
  return event in alarms ? alarms[event] : null;
};

module.exports = {
  parse: parse,
  parseTK103: parseTK103
};

///////////////////// Pattern and Mapping
const patterns = {
  sms_tk103: /^lat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})\n(https?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)\nPwr: (\w+) Door: (\w+) ACC: (\w+)/,
  sms_tk103_Speeding: /^(speed)!\nlat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Oil: /^(oil) (\d+\.\d+)%!\nlat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
};

const mapIndex = {
  sms_tk103_Speeding: {
    alert: 1,
    latitude: 2,
    longitude: 3,
    speed: 4,
    date: 5,
    time: 6
  },
  sms_tk103_Oil: {
    alert: 1,
    latitude: 2,
    longitude: 3,
    speed: 4,
    date: 5,
    time: 6
  },
  sms_tk103: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    date: 4,
    time: 5,
    Power: 7,
    Door: 8,
    ACC: 9
  }
};
