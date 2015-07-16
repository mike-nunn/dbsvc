

module.exports = function(fData, test) {
  'use strict';
  var SpreadSheet = require('edit-google-spreadsheet');
  var line = [new Date().toUTCString()];

  if(fData._id){
    delete fData._id;
  }

  for (var key in fData) {
    if (fData.hasOwnProperty(key)) {
      if (test){
        console.log(key + " -> " + fData[key]);
      }
      line.push(fData[key]);
    }
  }



  SpreadSheet.load({
    debug: test,
    //spreadsheetId: '1zNsBqQ4gp5h2qw8CUyC7naN1v3-MoMvlkf_hk5D4evg',
    spreadsheetId: '1W5tbMTpcX33-bSn1ynhYYDObtg2YpgBhU3Qc0I2tof8',
    worksheetId: 'od6',
    //worksheetName: 'data',

    oauth: {
      email: '1058294824205-prhnu5eis1o0g9bjvr9and2336qs5ooi@developer.gserviceaccount.com',
      key: process.env.PEM_KEY
    }

  }, function sheetReady(err, sheet) {
    if (err) {
      console.log("google connect error " + err);
      if (err) console.warn(err.message);
    }

    sheet.receive(function(err, rows, info) {
      if (err) console.warn(err.message);
      var lineObj = {};
      lineObj[info.nextRow] = [line];
      if (test){
        console.log(line);
      }
      sheet.add(lineObj);
      sheet.send(function(err) {
        if (err) {
           console.log("google save error " + err);
           if (err) console.warn(err.message);
         }
        console.log(new Date().toUTCString() + " sheet updated");
        process.exit();
      });
    });

  });

};
