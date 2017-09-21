# TK-103-Parser

A parser for TK-103A and TK-103B GPS Tracker Protocol.

##Getting Started

```

import tk103 from 'tk-103-parser';

const test = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF')

console.log(tk103.parseTK103(test));

```
