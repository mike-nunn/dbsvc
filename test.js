#!/home/mike/.nvm/v0.10.25/bin/node

'use strict';

var stuff = require('./dbtest.js');
var saveDoc = require('./dd-google');
var dateObj = new Date();
var today = dateObj.toISOString().split("T")[0]; 
var line = [];

var newDonorsTot =  stuff.getData("getNewTot", ["Active", "Individual", today]);
var newDonors =  stuff.getData("getNew", ["Active", "Individual", "2015-06-25"]);
var donors =  stuff.getData("getTotal", ["Active"]);

line.push(today);
line.push(donors[0].totals);
line.push(newDonorsTot[0].totals);
//console.log(donors[0]);
saveDoc(line, false);

//process.exit();     
