#!/usr/bin/env node

'use strict';

var stuff = require('./dbtest1.js');



  stuff.getSql("getMail", ["mike@karuna.org"], function(err, stuffOutPut){
    if(err) return console.log("oops " + err);
//    saveDoc(stuffOutPut[0], true);
//    console.log(stuffOutPut[0]);
    console.log(stuffOutPut);
  });


