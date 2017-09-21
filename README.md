# TK-103-Parser

A parser for TK-103A and TK-103B GPS Tracker Protocol.

## Getting Started with SMS Protocol

```

import tk103 from 'tk-103-parser';

const test = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF')

console.log(tk103.parseTK103(test));

```

## Output for SMS Protocol

```
{
  alert: null,
  latitude: '14.632742',
  longitude: '121.001790',
  speed: '0.00',
  date: '16:21',
  parsedDate: undefined,
  dateTime: [Function: Date],
  time: 'http://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16',
  power: 'ON',
  door: 'OFF',
  acc: 'OFF',
  lastlatitude: null,
  lastlongitude: null,
  mnc: null,
  mcc: null,
  timestampsent: null,
  direction: null,
  GPSPosition: null,
  GPSSIgnal: null,
  vehicleBattery: null,
  status: 'Success'
}
```

## SMS Protocol Format
```
acc on!
lat:8.467303
long:124.788797
speed:0.00
T:17/06/05 20:08
http://maps.google.com/maps?f=q&q=8.467303,124.788797&z=16

ACC alarm!
lat:14.324082
long:121.027818
speed:9.13
T:17/06/05 16:35
http://maps.google.com/maps?f=q&q=14.324082,121.027818&z=16

acc off!
lat:14.223530
long:121.081455
speed:0.00
T:17/06/06 02:40
http://maps.google.com/maps?f=q&q=14.223530,121.081455&z=16

ACC off! lat:14.223577 long:121.081497 speed:0.00 dir:147
T:05/06/17 23:54
http://maps.google.com/maps?f=q&q=14.223577,121.081497&z=16

lat:14.496282
long:120.993023
speed:0.00
T:17/06/11 00:27
http://maps.google.com/maps?f=q&q=14.496282,120.993023&z=16

speed!
lat:6.424677
long:124.771663
speed:463.00
T:17/07/13 13:12
http://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16

Lac:2FA6,2E68
T:05/06/17 20:35
PWR:ON Door:OFF ACC:OFF
http://maps.google.com/maps?f=q&q=,&z=16

Lac:c7d8 ce08
T:
Last:
T:15:32
http://maps.google.com/maps?f=q&q=8.354022,124.850563&z=16

Lac:2afa 96d3
T:17/06/05 16:21
Last:
T:21:35
http://maps.google.com/maps?f=q&q=14.384938,121.026440&z=16

help me!
lat:6.319640
long:124.975628
speed:0.00
T:17/06/05 16:42
http://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16

help me!
Lac:c742 dc90
T:
Last:
T:00:00
http://maps.google.com/maps?f=q&q=6.049100,124.746815&z=16

speed!
lat:6.424677
long:124.771663
speed:463.00
T:17/07/13 13:12
http://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16

oil 24.32%!
lat:14.696282
long:121.004995
speed:0.00
T:17/07/13 13:42
http://maps.google.com/maps?f=q&q=14.696282,121.004995&z=16

lat:14.632742
long:121.001790
speed:0.00
T:17/06/05 16:21
http://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16
Pwr: ON Door: OFF ACC: OFF


```
