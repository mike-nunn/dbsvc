var creds = require('./creds.js');
var SpreadSheet = require('edit-google-spreadsheet');

module.exports = function(line, shtName, test) {
  'use strict';

  SpreadSheet.load({
    debug: test,
    spreadsheetId: '1W5tbMTpcX33-bSn1ynhYYDObtg2YpgBhU3Qc0I2tof8',
    worksheetId: shtName,
    //spreadsheetName: 'thankQ',
    //worksheetName: 'data',

    oauth: {
      email: '1058294824205-prhnu5eis1o0g9bjvr9and2336qs5ooi@developer.gserviceaccount.com',
      key: creds.key
    }

  }, function sheetReady(err, sheet) {
    if (err) {
      console.log("google connect error " + err);
      if (err) console.warn(err.message);
    }

    sheet.receive(function(err, rows, info) {
      if (err) console.warn(err.message);
      var lineObj = {};
      lineObj[info.nextRow] = line;
      if (test) {
        console.log(line);
      }
      sheet.add(lineObj);
      sheet.send(function(err) {
        if (err) {
          console.log("google save error " + err);
          if (err) console.warn(err.message);
        }
        console.log(new Date().toUTCString() + " sheet updated " + shtName);
      });
    });
  });
};
