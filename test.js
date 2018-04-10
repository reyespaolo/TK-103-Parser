'use strict';

const tk103 = require('./tk-103');
const smsgpsupdateraw = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF');
const smsrawSpeedingAlert = new Buffer('speed!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');
const smsrawOilAlert = new Buffer('oil 24.32%!\nlat:-33.361133\nlong:124.771663\nspeed:463.00\nT:17/07/13 12:32\nhttp://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16');
const smsrawSOSAlert = new Buffer('help me!\nlat:6.319640\nlong:124.975628\nspeed:0.00\nT:17/06/05 16:42\nhttp://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16');
const smsrawSOSAlertLAC = new Buffer('help me!\nLac:c742 dc90\nT:\nLast:\nT:00:00\nhttp://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16');
const smsrawLAC = new Buffer('Lac:2afa 96d3\nT:17/06/05 16:21\nLast:\nT:21:35\nhttp://maps.google.com/maps?f=q&q=14.384938,121.026440&z=16');
const smsrawLAC1 = new Buffer('Lac:2afa 96d3\nT:\nLast:\nT:15:32\nhttp://maps.google.com/maps?f=q&q=8.354022,124.850563&z=16');
const smsrawLAC2 = new Buffer('Lac:2afa,96d3\nT:05/06/17 20:35\nPWR:ON Door:OFF ACC:OFF\nhttp://maps.google.com/maps?f=q&q=8.354022,124.850563&z=16');
const smsrawDoorAlert = new Buffer('Door alarm!\nlat:14.496282\nlong:120.993023\nspeed:0.00\nT:17/06/11 00:27\nhttp://maps.google.com/maps?f=q&q=14.496282,120.993023&z=16');
const smsrawACCOffAlertDir = new Buffer('ACC off! lat:14.223577 long:121.081497 speed:0.00 dir:147\nT:05/06/17 23:54\nhttp://maps.google.com/maps?f=q&q=14.223577,121.081497&z=16');
const smsrawACCOffAlert = new Buffer('ACC off!\nlat:14.223577\nlong:121.081497\nspeed:0.00\nT:05/06/17 23:54\nhttp://maps.google.com/maps?f=q&q=14.223577,121.081497&z=16');
const smsrawACCOnAlert = new Buffer('acc on!\nlat:8.467303\nlong:121.081497\nspeed:0.00\nT:17/06/05 20:08\nhttp://maps.google.com/maps?f=q&q=8.467303,124.788797&z=16');
const smsrawACCOnAlertDir = new Buffer('ACC on! lat:14.223577 long:121.081497 speed:0.00 dir:182\nT:05/06/17 23:54\nhttp://maps.google.com/maps?f=q&q=14.223577,121.081497&z=16');
const smsrawACCAlert = new Buffer('ACC alarm!\nlat:14.324082\nlong:124.788797\nspeed:9.13\nT:17/06/05 16:35\nhttp://maps.google.com/maps?f=q&q=14.324082,121.027818&z=16');
const smsrawTest = new Buffer('lat:14.836857\nlong:120.852707\nspeed:0.00 \nT:17/09/04 13:13\nhttp://maps.google.com/maps?f=q&q=14.836857,120.852707&z=16\nPwr: ON Door: OFF ACC: ON');
const test = new Buffer('lat:14.632742\nlong:121.001790\nspeed:0.00\nT:17/06/05 16:21\nhttp://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16\nPwr: ON Door: OFF ACC: OFF')

// console.log(tk103.parseTK103(test));
// console.log(tk103.parseTK103(smsrawSOSAlert));
console.log(tk103.parseTK103(smsrawDoorAlert));

// //
// console.log(tk103.parseTK103(smsrawOilAlert));
// console.log(tk103.parseTK103(smsrawSpeedingAlert));
// console.log(tk103.parseTK103(smsgpsupdateraw));
// console.log(tk103.parseTK103(smsrawSOSAlert));
// console.log(tk103.parseTK103(smsrawSOSAlertLAC));
// console.log(tk103.parseTK103(smsrawLAC));
// console.log(tk103.parseTK103(smsrawLAC1));
// console.log(tk103.parseTK103(smsrawLAC2));
// console.log(tk103.parseTK103(smsrawDoorAlert));
// console.log(tk103.parseTK103(smsrawACCOffAlertDir));
// console.log(tk103.parseTK103(smsrawACCOffAlert));
// console.log(tk103.parseTK103(smsrawACCAlert));
// console.log(tk103.parseTK103(smsrawACCOnAlert));

// console.log(tk103.parseTK103(smsrawTest));


// acc on!
// lat:8.467303
// long:124.788797
// speed:0.00
// T:17/06/05 20:08
// http://maps.google.com/maps?f=q&q=8.467303,124.788797&z=16
//
// ACC alarm!
// lat:14.324082
// long:121.027818
// speed:9.13
// T:17/06/05 16:35
// http://maps.google.com/maps?f=q&q=14.324082,121.027818&z=16
//
// smsrawACCOffAlert
// acc off!
// lat:14.223530
// long:121.081455
// speed:0.00
// T:17/06/06 02:40
// http://maps.google.com/maps?f=q&q=14.223530,121.081455&z=16
//
// smsrawACCOffAlertDir
// ACC off! lat:14.223577 long:121.081497 speed:0.00 dir:147
// T:05/06/17 23:54
// http://maps.google.com/maps?f=q&q=14.223577,121.081497&z=16
//
// Door alarm!
// lat:14.496282
// long:120.993023
// speed:0.00
// T:17/06/11 00:27
// http://maps.google.com/maps?f=q&q=14.496282,120.993023&z=16
//
// smsrawSpeedingAlert
// speed!
// lat:6.424677
// long:124.771663
// speed:463.00
// T:17/07/13 13:12
// http://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16
//
// smsrawLAC2
// Lac:2FA6,2E68
// T:05/06/17 20:35
// PWR:ON Door:OFF ACC:OFF
// http://maps.google.com/maps?f=q&q=,&z=16
//
// smsrawLAC1
// Lac:c7d8 ce08
// T:
// Last:
// T:15:32
// http://maps.google.com/maps?f=q&q=8.354022,124.850563&z=16
//
// smsrawLAC
// Lac:2afa 96d3
// T:17/06/05 16:21
// Last:
// T:21:35
// http://maps.google.com/maps?f=q&q=14.384938,121.026440&z=16
//
// smsrawSOSAlertLAC
// help me!
// lat:6.319640
// long:124.975628
// speed:0.00
// T:17/06/05 16:42
// http://maps.google.com/maps?f=q&q=6.319640,124.975628&z=16
//
// smsrawSOSAlert
// help me!
// Lac:c742 dc90
// T:
// Last:
// T:00:00
// http://maps.google.com/maps?f=q&q=6.049100,124.746815&z=16
//
// smsrawSpeedingAlert
// speed!
// lat:6.424677
// long:124.771663
// speed:463.00
// T:17/07/13 13:12
// http://maps.google.com/maps?f=q&q=6.424677,124.771663&z=16
//
// smsrawOilAlert
// oil 24.32%!
// lat:14.696282
// long:121.004995
// speed:0.00
// T:17/07/13 13:42
// http://maps.google.com/maps?f=q&q=14.696282,121.004995&z=16
//
// smsgpsupdateraw
// lat:14.632742
// long:121.001790
// speed:0.00
// T:17/06/05 16:21
// http://maps.google.com/maps?f=q&q=6.226433,125.075470&z=16
// Pwr: ON Door: OFF ACC: OFF
