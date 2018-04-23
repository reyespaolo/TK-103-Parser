'use strict'

const config = require('./data.js')
const moment = require('moment')

const dateParse = (date, format) => {
  if (format && date) {
    date = date.split('/')
    format = format.split('/')
    let year, month, day

    for (var key in format) {
      if (format[key] === 'yy') {
        year = '20' + date[key]
      } else if (format[key] === 'mm') {
        month = date[key]
      } else if (format[key] === 'dd') {
        day = date[key]
      }
    }
    return (`${year}-${month}-${day}`)
  }

}

const getIndex = raw => {
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if (raw.protocol === key) {
        console.log(config.mapIndex[key], key, raw.protocol)
        return config.mapIndex[key]
      }
    }
  }
}

const parseTK103 = raw => {
  let parsedData = parse(raw)
  console.log(parsedData)
  let jsonResult = {
    'alert': undefined,
    'latitude': undefined,
    'longitude': undefined,
    'speed': undefined,
    'date': undefined,
    'parsedDate': undefined,
    'dateTime': undefined,
    'time': undefined,
    'power': undefined,
    'door': undefined,
    'acc': undefined,
    'lastLatitude': undefined,
    'lastLongitude': undefined,
    'lac': undefined,
    'cid': undefined,
    'timestampsent': undefined,
    'direction': undefined,
    'GPSPosition': undefined,
    'GPSSignal': undefined,
    'vehicleBattery': undefined
  }
  if (parsedData.status == 'Failed') {
    jsonResult = parsedData
  } else {

    let dataIndex = getIndex(parsedData)
    for (var key in dataIndex) {
      if (dataIndex.hasOwnProperty(key)) {
        if (key === 'alert') {
          jsonResult[key] = config.parseAlarm(parsedData[dataIndex[key]]).AlertType
          jsonResult.status = 'Success'
        } else {
          jsonResult[key] = parsedData[dataIndex[key]]
          jsonResult.status = 'Success'
        }
        jsonResult.protocol = parsedData.protocol
      }
    }
  }
  // console.log(jsonResult)
  if (jsonResult['date'] && jsonResult['time']) {
    jsonResult['parsedDate'] = dateParse(jsonResult['date'], config.dateFormat[parsedData.protocol]) || `${20+jsonResult['date']}` + ` ${jsonResult['time']}`
    // jsonResult['dateTime'] = new Date(jsonResult['parsedDate'])
  } else {
    // jsonResult['dateTime'] = null
  }
  // console.log(jsonResult.dateTime, jsonResult, raw.toString())
  return jsonResult
}

const parse = raw => {
  let result = {
    status: 'Failed',
    message: 'UnknownProtocol',
    raw: raw.toString()
  }
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if (config.patterns[key].test(raw)) {
        result = config.patterns[key].exec(raw)
        result.protocol = key
        return result
      }
    }
  }
  return result
}

module.exports = {
  parse: parse,
  parseTK103: parseTK103
}