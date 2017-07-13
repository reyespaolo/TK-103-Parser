'use strict';

const tk103 = require('./tk-103');

const smsgpsupdateraw = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF');
const smsrawSpeedingAlert = new Buffer('speed!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');
const smsrawOilAlert = new Buffer('oil 24.32%!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');


console.log(tk103.parseTK103(smsrawOilAlert));
console.log(tk103.parseTK103(smsrawSpeedingAlert));
console.log(tk103.parseTK103(smsgpsupdateraw));


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
