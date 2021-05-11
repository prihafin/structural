const fs = require('fs');
const s = require('../bin/structural');
const l = require('./language');
const c = require('child_process');
const util = require('util');
const red = '\x1b[38;2;255;60;60m';
const green = '\x1b[38;2;60;255;60m';
const ok = green+'[ok]\x1b[0m';
const error = red+'[error]\x1b[0m';
let res = [];

class Transform {
  constructor(obj, prop, initial) { this.value = null; this.obj = obj; this.prop = prop; this.set(obj, prop, initial); }
  get(obj, prop, value) { return value; }
  set(obj, prop, value) { return value; }
  [util.inspect.custom]() { return this.get(this.obj, this.prop); }
}

class TestTransform extends Transform {
  get(obj, prop, value) {
    return obj.a + obj.b;
  }

  set(obj, prop, value) {
    obj.a = value / 2;
    obj.b = value / 2;
  }
}

class TransformHandler {
  get(obj, prop, receiver) {
    let tmp = obj[prop];
    if(tmp instanceof Transform) return tmp.get(obj, prop, obj[prop]);
    return tmp;
  }

  set(obj, prop, value) {
    if(!(prop in obj)) throw new Error('cannot set field "'+prop+'" in class "'+obj.constructor.name+'", field does not exist');
    let tmp = obj[prop];
    if(tmp instanceof Transform) {
      obj[prop] = tmp.set(obj, prop, value);
      return true;
    }
    obj[prop] = value;
    return true;
  }
}

class Structure {
}

class TransformedStructure extends Structure {
  constructor(options, proxy=true) {
    super();
    if(proxy) return new Proxy(new this.constructor(options, false), new TransformHandler());
  }
}

class TEST extends TransformedStructure {
  constructor(options, proxy) {
    super(options, proxy); if(proxy!==false) return;
    this.a = 0;
    this.b = 0;
    this.value = new TestTransform(this, 'value', 100);
  }
}

let obj = new TEST();

res = c.execSync('canopy language.peg --lang js');

if(res.length>0) {
  console.error(error, 'language.peg compile failed');
  process.exit(1);
}

console.log(ok, 'language.peg compiled ok');

function logError(e) {
  let [err, line, ...rest] = e.stack.split('\n');
  let rx = new RegExp('\\((.*)\\)');
  code = rx.exec(line)[1].replace(':', '@');
  [filename,row,col] = code.split(':')
  filename = filename.replace('@', ':');
  code = fs.readFileSync(filename, {encoding:'utf8'}).split('\n');

  let type;
  [type, err] = err.split(':');

  let before = code[row-1].slice(0, col-1);
  let after = code[row-1].slice(col-1);

  console.log('\x1b[0m'+code[row-2]);
  console.log('\x1b[0m'+before+after);
  console.log(''.padStart(col-2, ' '), '\x1b[38;2;255;70;70m╚═ ['+type+']\x1b[38;2;255;130;130m'+err+'\x1b[0m');
  console.log('\x1b[0m'+code[row]);
  console.log('\n'+line);
  console.log(rest.join('\n'));
}

setTimeout(() => {
  //try {
    let res = s.parse({filename:'test-input.h', language:'py'});
    if(res) {
      console.error(error, 'error processing test-input.h');
      process.exit(1);
    } else {
      console.log(ok, 'test-input.h compiled ok');
    }

    res = s.parse({filename:'test-input.h', language:'js'});
    if(res) {
      console.error(error, 'error processing test-input.h');
      process.exit(1);
    } else {
      console.log(ok, 'test-input.h compiled ok');
    }

    let structures = require('./test-input.js');

    console.log();

    let obj = new structures.laststruct();

    console.log('1 ::=', obj);
    obj.value1 = 10;
    console.log('2 ::=', obj.value1, obj.value1_u);
  //} catch(e) {
//    logError(e);
  //}
}, 100);


class t {
  constructor() {
    let desc = Object.getOwnPropertyDescriptors(this.__proto__);
    desc.val.enumerable = true;
    //console.log('V', desc.val);
    //Object.defineProperty(this, 'val', {value: desc.val, enumerable:true});
  }

  set val(v) {
    this._v = v;
  }

  get val() {
    return this._v;
  }
}

let o = new t();

o.val = 100;

console.log(o);