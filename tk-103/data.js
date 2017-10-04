'use strict'

const patterns = {
  sms_tk103_Alert: /^(low battery!|Power alarm!|speed!|help me!|Door alarm!|ACC alarm!|ACC off!|acc off!|ACC on!|acc on!)[\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Alert_1: /^(low battery!|Power alarm!|speed!|help me!|Door alarm!|ACC alarm!|ACC off!|acc off!|ACC on!|acc on!)[\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+) [\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Alert_dir: /^(speed!|help me!|Door alarm!|ACC alarm!|ACC off!|ACC on!|acc on!)[\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]dir:(\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Oil: /^(oil) (\d+\.\d+)%![\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_Oil_1: /^(oil) (\d+\.\d+)%![\r|\n|\ ]lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+) [\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})/,
  sms_tk103_SOSLAC: /^(help me!)[\r|\n|\ ]Lac:(\w+) (\w+)[\r|\n|\ ]T:[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC: /^Lac:(\w+) (\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]Last:\nT:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC1: /^Lac:(\w+) (\w+)[\r|\n|\ ]T:[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC2: /^Lac:(\w+),(\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\w+) Door:(\w+) ACC:(\w+)[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103_LAC3: /^lat:long:speed:Lac:(\w+) (\w+)[\r|\n|\ ]/,
  sms_tk103_LAC4: /^Lac:(\w+),(\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\w+) Door:(\w+) ACC:(\w+)/,
  sms_alert_LAC: /^(ACC alarm!|acc on!|Acc on!|ACC ON!|Acc On!|acc off!|Acc off!|ACC OFF!|Acc Off!|Power alarm!)[\r|\n|\ ]Lac:(\w+) (\w+)[\r|\n|\ ]T:[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
  sms_tk103A: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ](https?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)[\r|\n|\ ]Pwr:[\r|\n|\ ](\w+) Door:[\r|\n|\ ](\w+) ACC:[\r|\n|\ ](\w+)/,
  sms_tk103: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ](http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)[\r|\n|\ ]Pwr:[\r|\n|\ ](\w+) Door:[\r|\n|\ ](\w+) ACC:[\r|\n|\ ](\w+)/,
  sms_tk103B: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+) [\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ](http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=[-]?\d+\.\d+,[-]?\d+\.\d+\&z=16)[\r|\n|\ ]Pwr:[\r|\n|\ ](\w+) Door:[\r|\n|\ ](\w+) ACC:[\r|\n|\ ](\w+)/,
  sms_tk103BDir: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]dir:(\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]Door:(\OFF|ON|off|on|Off|On)/,
  sms_tk103BDir_1: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+)[\r|\n|\ ]speed:(\d+\.\d+)[\r|\n|\ ]dir:(\d+).[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]Door:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]ACC:(\OFF|ON|off|on|Off|On)/,
  sms_tk103BDir_2: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+) speed:(\d+\.\d+)[\r|\n|\ ]dir:(\d+.\d+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]Door:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]ACC:(\OFF|ON|off|on|Off|On)/,
  sms_tk103BDir_3: /^lat:([-]?\d+\.\d+)[\r|\n|\ ]long:([-]?\d+\.\d+) speed:(\d+\.\d+)[\r|\n|\ ]dir:(.*)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]PWR:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]Door:(\OFF|ON|off|on|Off|On)[\r|\n|\ ]ACC:(\OFF|ON|off|on|Off|On)/,
  sms_tk103_Alert_ACCON: /^(acc on!|Acc On)[\r|\n|\ ]Lac:(\w+) (\w+)[\r|\n|\ ]T:(\d{2}\/\d{2}\/\d{2}) (\d{2}:\d{2})[\r|\n|\ ]Last:[\r|\n|\ ]T:(\d{2}:\d{2})[\r|\n|\ ]http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&q=([-]?\d+\.\d+),([-]?\d+\.\d+)\&z=16/,
}

const dateFormat = {
  sms_tk103_Alert: "yy/mm/dd",
  sms_tk103_Alert_1: "yy/mm/dd",
  sms_tk103_Alert_dir: "mm/dd/yy",
  sms_tk103BDir: "dd/mm/yy",
  sms_tk103: "yy/mm/dd",
  sms_tk103_Oil: "yy/mm/dd",
  sms_tk103_LAC: "yy/mm/dd",
  sms_tk103_LAC1: "yy/mm/dd",
  sms_tk103_LAC2: "yy/mm/dd",
  sms_tk103_Oil_1: "yy/mm/dd",
  sms_tk103BDir_1: "dd/mm/yy",
  sms_tk103_LAC4: "dd/mm/yy",
  sms_tk103BDir_2: "dd/mm/yy",
  sms_tk103BDir_3: "dd/mm/yy",
  sms_tk103_Alert_ACCON: "yy/mm/dd"
}

const mapIndex = {
  sms_tk103_Alert_ACCON: {
    alert: 1,
    lac: 2,
    cid: 3,
    date: 4,
    time: 5,
    lastTime: 6,
    lastLatitude: 7,
    lastLongitude: 8
  },
  sms_alert_LAC: {
    alert: 1,
    lac: 2,
    cid: 3,
    time: 4,
    lastlatitude: 5,
    lastlongitude: 6
  },
  sms_tk103_LAC3: {
    lac: 1,
    cid: 2,
  },
  sms_tk103A: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    date: 5,
    time: 6,
    power: 7,
    door: 8,
    acc: 9
  },
  sms_tk103BDir_1: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    direction: 4,
    date: 5,
    time: 6,
    power: 7,
    door: 8,
    acc: 9
  },
  sms_tk103BDir: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    direction: 4,
    date: 5,
    time: 6,
    power: 7,
    door: 8,
    acc: 9

  },
  sms_tk103BDir_2: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    direction: 4,
    date: 5,
    time: 6,
    power: 7,
    door: 8,
    acc: 9
  },
  sms_tk103BDir_3: {
    latitude: 1,
    longitude: 2,
    speed: 3,
    direction: 4,
    date: 5,
    time: 6,
    power: 7,
    door: 8,
    acc: 9
  },
  sms_tk103_Alert: {
    alert: 1,
    latitude: 2,
    longitude: 3,
    speed: 4,
    date: 5,
    time: 6
  },
  sms_tk103_Alert_1: {
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
  sms_tk103_Oil_1: {
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
  sms_tk103B: {
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
    lac: 2,
    cid: 3,
    lastTime: 4,
    lastLatitude: 5,
    lastLongitude: 6
  },
  sms_tk103_LAC: {
    lac: 1,
    cid: 2,
    date: 3,
    time: 4,
    lastTime: 5,
    lastLatitude: 6,
    lastLongitude: 7,
  },
  sms_tk103_LAC1: {
    lac: 1,
    cid: 2,
    lastTime: 3,
    lastLatitude: 4,
    lastLongitude: 5,
  },
  sms_tk103_LAC2: {
    lac: 1,
    cid: 2,
    date: 3,
    time: 4,
    power: 5,
    door: 6,
    acc: 7,
    lastLatitude: 8,
    lastLongitude: 9,
  },
  sms_tk103_LAC4: {
    lac: 1,
    cid: 2,
    date: 3,
    time: 4,
    power: 5,
    door: 6,
    acc: 7,
    lastLatitude: 8,
    lastLongitude: 9,
  }
}

const parseAlarm = event => {
  const alarms = {
    'speed!': {
      AlertType: 'SpeedingAlert'
    },
    'oil': {
      AlertType: 'OilAlert'
    },
    'help me!': {
      AlertType: 'SOSAlert'
    },
    'Door alarm!': {
      AlertType: 'DoorAlert'
    },
    'ACC alarm!': {
      AlertType: 'ACCAlarm'
    },
    'ACC off!': {
      AlertType: 'ACCOff'
    },
    'ACC on!': {
      AlertType: 'ACCOn'
    },
    'acc on!': {
      AlertType: 'ACCOn'
    },
    'acc off!': {
      AlertType: 'ACCOff'
    },
    'Power alarm!': {
      AlertType: 'PowerAlarm'
    },
    'low battery!': {
      AlertType: 'LowBattery'
    }

  }
  return event in alarms ? alarms[event] : null
}


module.exports = {
  patterns: patterns,
  mapIndex: mapIndex,
  parseAlarm: parseAlarm,
  dateFormat: dateFormat
}