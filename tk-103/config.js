'use strict';

const patterns = {
  sms_tk103: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ](https?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)[\r|\n|\ ]Pwr:[\r|\n|\ ](\w+) Door:[\r|\n|\ ](\w+) ACC:[\r|\n|\ ](\w+)/,
  sms_tk103_Alert: /^(speed!|help me!|Door alarm!|ACC alarm!|ACC off!|acc off|ACC on!|acc on!)[\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Alert_dir: /^(speed!|help me!|Door alarm!|ACC alarm!|ACC off!|ACC on!|acc on!)[\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]dir:(\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Oil: /^(oil) (\d+\.\d+)%![\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_SOSLAC: /^(help me!)[\r|\n|\ ]Lac:(\w+) (\w+)[\r|\n|\ ]T:[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC: /^Lac:(\w+) (\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]Last:\nT:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC1: /^Lac:(\w+) (\w+)[\r|\n|\ ]T:[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC2: /^Lac:(\w+),(\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\w+) Door:(\w+) ACC:(\w+)[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/
};

const mapIndex = {
  sms_tk103_Alert: {
      alert: 1,
      latitude: 2,
      longitude: 3,
      speed: 4,
      date: 5,
      time: 6
  },
  sms_tk103_Alert_dir: {
    alert: 1,
    latitude: 2,
    longitude: 3,
    speed: 4,
    direction: 5,
    date: 6,
    time: 7
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
  sms_tk103_SOSLAC: {
    alert: 1,
    mnc: 2,
    mcc: 3,
    lasttime:4,
    lastlatitude: 5,
    lastlongitude: 6
  },
  sms_tk103_LAC: {
    mnc: 1,
    mcc: 2,
    date: 3,
    time: 4,
    lasttime: 5,
    lastlatitude: 6,
    lastlongitude: 7,
  },
  sms_tk103_LAC1: {
    mnc: 1,
    mcc: 2,
    lasttime: 3,
    lastlatitude: 4,
    lastlongitude: 5,
  },
  sms_tk103_LAC2: {
    mnc: 1,
    mcc: 2,
    date: 3,
    time: 4,
    power: 5,
    door: 6,
    acc: 7,
    lastlatitude: 8,
    lastlongitude: 9,
  }
};

const parseAlarm = event => {
  const alarms = {
    'speed!': {AlertType: 'SpeedingAlert'},
    'oil': {AlertType: 'OilAlert'},
    'help me!': {AlertType: 'SOSAlert'},
    'Door alarm!': {AlertType: 'DoorAlert'},
    'ACC alarm!': {AlertType: 'ACCAlarm'},
    'ACC off!': {AlertType: 'DoorAlert'},
    'ACC on!': {AlertType: 'ACCOn'},
    'acc on!': {AlertType: 'ACCOn'},
  };
  return event in alarms ? alarms[event] : null;
};


module.exports = {
  patterns: patterns,
  mapIndex: mapIndex,
  parseAlarm:parseAlarm,
};
