#!/usr/bin/env node

let structural = require('../lib/structural');
let fs = require('fs');
let path = require('path');
let util = require("util");
let du = require("../res/datautils");

let input = "test.h";
let out = "test.js";

let lang = require("../lib/language.js");
let text = fs.readFileSync(input, "utf-8");

let output = lang.parse(text, {actions:new structural.Actions()});
console.log(output);


let builder = require("../lib/builder-js");
let res = builder.build(input, output);

//console.log(res);

fs.writeFileSync(out, res);

let test = require("./test");

let data = new Buffer("\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff", "ASCII");

let s = test.test.new();



test.test.write(s, data);

console.log(data);

s = test.test.read(data, 0);

console.log(s);

data.fill(0xff);

function readUIntVar(buf, offset) {
  let i = 0;
  let v = 0x80;
  let a = [];

  while(((i===0) || (i<5)) && ((v & 0x80)===128)) {
    a.unshift(v = buf.readUInt8(offset));
    offset++; i++;
  }
  let res = 0;
  i = 0;
  for(let v of a) {
    res += ((v & 0x7f) << i++*7);
  }
  return [res, offset];
}


let len = writeUIntVar(data, 0, 123000);

console.log(len, data);

console.log(readUIntVar(data, 0));
