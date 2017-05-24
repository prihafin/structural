#!/usr/bin/env node

let structural = require('../lib/structural');
let fs = require('fs');
let path = require('path');
let util = require("util");
let du = require("../res/datautils");

let input = "test2.h";
let out = "test.js";

let lang = require("../lib/language.js");
let text = fs.readFileSync(input, "utf-8");

let output = lang.parse(text, {actions:new structural.Actions()});
//console.log(output);


let builder = require("../lib/builder-js");
let res = builder.build(input, output);

//console.log(res);

fs.writeFileSync(out, res);

let test = require("./test");


process.exit();

console.log("\n=============================================================================================================");
let data = new Buffer(40);
data.fill(0xfe);
let s = test.test2.new();
s.s1 = "123";
console.log(s);
test.test2.write(s, data);
console.log(data);
s = test.test2.read(data, 0);
console.log(s[0]);

console.log("\n-------------------------------------------------------------------------------------------------------------");
data.fill(0xfe);
s = test.test2.new();
console.log(s);
test.test2.write(s, data);
console.log(data);
s = test.test2.read(data, 0);
console.log(s[0]);




console.log("\n=============================================================================================================");
data.fill(0xfe);
s = test.test3.new();
s.i3[4].i1 = 123;
s.i3[5].s1 = "123456789";

console.log(s);
test.test3.write(s, data);
console.log(data);
s = test.test3.read(data, 0);
console.log(s[0]);

