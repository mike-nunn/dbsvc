var creds = require('./creds.js');
var db = require('odbc')();

var q = {

  getPayments: 'select paymentamount, dateofpayment from batchdetail where dateofpayment between ? and ? ',

  getMail: 'select serialnumber, emailaddress from contact where emailaddress = ? ',

  getTotal: 'select count (distinct serialnumber) totals from pledgeheader where pledgestatus = ? ',

  getActiveSn: 'select distinct serialnumber from pledgeheader where pledgestatus = ? ',

  getNewTot: 'select count (donors.serialnumber) totals  from' +
             ' (select SERIALNUMBER, PLEDGESTATUS from PLEDGEHEADER where PLEDGESTATUS= ? ) fred' +
             ' join (select serialnumber, CREATED from CONTACT where CONTACTTYPE= ? ) donors' +
             ' on donors.SERIALNUMBER = fred.SERIALNUMBER where cast(donors.CREATED as DATE) = ? ',

  getNew: 'select *  from' +
          ' (select SERIALNUMBER, PLEDGESTATUS, CREATED, CREATEDBY, MODIFIED, MODIFIEDBY from PLEDGEHEADER where PLEDGESTATUS= ? ) fred' +
          ' join' +
          ' (select serialnumber, title, firstname, keyname, CREATED, CREATEDBY, MODIFIED, MODIFIEDBY from CONTACT where CONTACTTYPE= ? ) donors' +
          ' on' +
          ' donors.SERIALNUMBER = fred.SERIALNUMBER' +
          ' where  cast(donors.CREATED as DATE) = ? '
};

var getData = function(sqlQ, params){


  try {
    var result = db.openSync(creds.cn);
  } catch (e) {
    console.log(e.message);
  }

  try {
    var rows = db.querySync(q[sqlQ], params);
    db.closeSync();
    return rows;
  } catch (e) {
    db.closeSync();
    console.log("query error " + e.message);
  }
};

var getSql = function(sqlQ, params, callback){
  callback(null, q[sqlQ]);
};

module.exports.getSql = getSql;
module.exports.getData = getData;
// todo, add all those who had no active pledge yesterday but have an active pledge today
