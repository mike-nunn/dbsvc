#!/home/mike/.nvm/v0.10.25/bin/node

'use strict';

var stuff = require('./db.js');
var fs = require('fs');
var yest = require('./yesterdaySn.json');
var saveDoc = require('./google');
var shtData = 'od6';
var shtDeleted = 'otbynfb';
var shtNew = 'ojprszg';
var dateObj = new Date();
var todayDate = dateObj.toISOString().split("T")[0];
var dateTime = dateObj.toUTCString();

var tod =  stuff.getData("getActiveSn", ["Active"]);


// check if a serial number is in the array of seial number objects
function inDay(value, arr){
    var count=arr.length;
    for(var i=0;i<count;i++){
        if(arr[i].serialnumber==value){return true;}
    }
    return false;
}

// check to see if each of yestardays serial numbers are in todays list
// if not they go into the deleted array
var deletedSNs = [];
for (var j = 0, jlen = yest.length; j < jlen; j++) {
  if(!(inDay(yest[j].serialnumber, tod))){
      deletedSNs.push([dateTime, "\'" + yest[j].serialnumber]);
  }
}

// check to see if each of todays serial numbers are in yesterdays list
// if not they go into the new donors list
var newSNs = [];
for (var j = 0, jlen = tod.length; j < jlen; j++) {
  if(!(inDay(tod[j].serialnumber, yest))){
      newSNs.push([dateTime, "\'" + tod[j].serialnumber]);
  }
}

var stats = [[dateTime, todayDate, tod.length, deletedSNs.length, newSNs.length ]];

saveDoc(stats, shtData, false);

if (deletedSNs.length > 0) {
  saveDoc(deletedSNs, shtDeleted, false);
}

if (newSNs.length > 0) {
  saveDoc(newSNs, shtNew, false);
}
//use the -p option in production to write the sn data to file
if (process.argv[2] == '-p') {
  fs.writeFile("yesterdaySn.json", JSON.stringify(tod), "utf8", function(err) {
    if (err) {
      console.log("Failed to write file:", err);
    } else {
      console.log("File written.");
    }
  });
}
