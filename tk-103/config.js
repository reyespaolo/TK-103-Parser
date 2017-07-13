'use strict';

const patterns = {
  sms_tk103: /^lat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})\n(https?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)\nPwr: (\w+) Door: (\w+) ACC: (\w+)/,
  sms_tk103_Speeding: /^(speed)!\nlat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Oil: /^(oil) (\d+\.\d+)%!\nlat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_SOS: /^(help me!)\nlat:([-]?\d+\.\d+)\nlong:([-]?\d+\.\d+)\nspeed:(\d+\.\d+)\nT:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_SOSLAC: /^(help me!)\nLac:(\w+) (\w+)\nT:\nLast:\nT:(\d{2}:\d{2})\nhttp?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
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
    oil: 2,
    latitude: 3,
    longitude: 4,
    speed: 5,
    date: 6,
    time: 7
  },
  sms_tk103: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    date: 4,
    time: 5,
    power: 7,
    door: 8,
    acc: 9
  },
  sms_tk103_SOS: {
    alert: 1,
    latitude: 2,
    longitude: 3,
    speed: 4,
    date: 5,
    time: 6
  },
  sms_tk103_SOSLAC: {
    alert: 1,
    mnc: 2,
    mcc: 3,
    time:4,
    lastlatitude: 5,
    lastlongitude: 6
  }
};

const parseAlarm = event => {
  const alarms = {
    'speed': {AlertType: 'SpeedingAlert'},
    'oil': {AlertType: 'OilAlert'},
    'help me!': {AlertType: 'SOSAlert'},
  };
  return event in alarms ? alarms[event] : null;
};


module.exports = {
  patterns: patterns,
  mapIndex: mapIndex,
  parseAlarm:parseAlarm
};
