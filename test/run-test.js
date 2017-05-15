#!/usr/bin/env node

let structural = require('../lib/structural');
let fs = require('fs');
let path = require('path');
let util = require("util");

let input = "test.h";
let out = "test.js";

let lang = require("../lib/language.js");
let text = fs.readFileSync(input, "utf-8");

let output = lang.parse(text, {actions:new structural.Actions()});

let builder = require("../lib/builder-js");
let res = builder.build(input, output);

console.log(res);

fs.writeFileSync(out, res);

let test = require("./test");

let data = new Buffer("\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff", "ASCII");

let s = test.TestResult.new();

s.value1 = 10;
s.value2 = 11;
s.strvalue = "hellöy";
s.last = 12;

s.write(data);

console.log(data);

s = test.TestResult.read(data, 0);

console.log(s);


