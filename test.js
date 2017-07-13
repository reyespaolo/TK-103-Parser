'use strict';

const tk103 = require('./tk-103');

const smsgpsupdateraw = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF');
const smsrawSpeedingAlert = new Buffer('speed!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');
const smsrawOilAlert = new Buffer('oil 24.32%!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');
const smsrawSOSAlert = new Buffer('help me!\nlat:6.319640\nlong:124.975628\nspeed:0.00\nT:17/06/05 16:42\nhttp://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16');
const smsrawSOSAlertLAC = new Buffer('help me!\nLac:c742 dc90\nT:\nLast:\nT:00:00\nhttp://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16');

console.log(tk103.parseTK103(smsrawOilAlert));
console.log(tk103.parseTK103(smsrawSpeedingAlert));
console.log(tk103.parseTK103(smsgpsupdateraw));
console.log(tk103.parseTK103(smsrawSOSAlert));
console.log(tk103.parseTK103(smsrawSOSAlertLAC));


// Door alarm!
// lat:14.496282
// long:120.993023
// speed:0.00
// T:17/06/11 00:27
// http://maps.google.com/maps?f=q&q=14.496282,120.993023&z=16

// help me!
// lat:6.319640
// long:124.975628
// speed:0.00
// T:17/06/05 16:42
// http://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16

// help me!
// Lac:c742 dc90
// T:
// Last:
// T:00:00
// http://maps.google.com/maps?f=q&q=6.049100,124.746815&z=16


// speed!
// lat:6.424677
// long:124.771663
// speed:463.00
// T:17/07/13 13:12
// http://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16

// oil 24.32%!
// lat:14.696282
// long:121.004995
// speed:0.00
// T:17/07/13 13:42
// http://maps.google.com/maps?f=q&q=14.696282,121.004995&z=16

// lat:14.632742
// long:121.001790
// speed:0.00
// T:17/06/05 16:21
// http://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16
// Pwr: ON Door: OFF ACC: OFF
