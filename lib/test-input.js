/** Structural generated this file from test-input.h at 2019-05-16T05:31:49.006Z */

const util = require('util'); const os = require('os'); const wide = process.arch.endsWith('64');
let iconv = null;
try {
  // @ts-ignore
  iconv = require('iconv-lite'); iconv.encode('c', 'iso-8859-1');
} catch(e) {}

let INTEGER_SIZE = process.arch.endsWith('64') ? 64 : 32;
let INTEGER_SIZE_BYTES = INTEGER_SIZE===64 ? 8 : 4;
let readIntLE = Buffer.prototype.readInt32LE;
let readIntBE = Buffer.prototype.readInt32BE;
let readUIntLE = Buffer.prototype.readInt32LE;
let readUIntBE = Buffer.prototype.readInt32BE;
function readInt64LE(/** @type Buffer */ buf, offset) { let h = buf.readInt32LE(offset); offset+=2; let l = buf.readInt32LE(offset); offset+=2; return (h<<32) | l; }
function readInt64BE(buf, offset) { let h = buf.readInt32LE(offset); offset+=2; let l = buf.readInt32LE(offset); offset+=2; return (l<<32) | h; }
function readUInt64LE(buf, offset) { let h = buf.readUInt32LE(offset); offset+=2; let l = buf.readUInt32LE(offset); offset+=2; return (h<<32) | l; }
function readUInt64BE(buf, offset) { let h = buf.readUInt32LE(offset); offset+=2; let l = buf.readUInt32LE(offset); offset+=2; return (l<<32) | h; }

if(INTEGER_SIZE===64) {
  // @ts-ignore
  readIntLE = Buffer.prototype.readInt64LE; readIntBE = Buffer.prototype.readInt64BE; readUIntLE = Buffer.prototype.readUInt64LE; readUIntBE = Buffer.prototype.readUInt64BE;
}

let readUInt = null;
function readUIntVar(buf, offset) {
  let i = 0; let v = 0x80; let a = [];
  while(((i===0) || (i<5)) && ((v & 0x80)===128)) {
    a.unshift(v = buf.readUInt8(offset)); offset++; i++;
  }
  let res = 0; i = 0;
  for(let v of a) { res += ((v & 0x7f) << i++*7); }
  return [res, offset];
}

function writeUIntVar(/** @type Buffer */buf, offset, value) {
  if(value<128) {
    buf.writeUInt8(value & 0x7f, offset); return offset+1;
  }
  if(value<16384) {
    buf.writeUInt8((value >>> 7) & 0x7f | 0x80, offset++); buf.writeUInt8(value & 0x7f, offset++); return offset;
  }
  if(value<2097152) {
    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++); buf.writeUInt8(value & 0x7f, offset++); return offset;
  }
  if(value<268435456) {
    buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++); buf.writeUInt8(value & 0x7f, offset++); return offset;
  }
  buf.writeUInt8(value >>> 28 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++); buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++); buf.writeUInt8(value & 0x7f, offset++); return offset;
}

function sizeUIntVar(value) {
  if(value<128) return 1;
  if(value<16384) return 2;
  if(value<2097152) return 3;
  if(value<268435456) return 4;
  return 5;
}

function sizeIntVar() {
  throw new Error('signed variable int not yet supported');
}

function readStringOld(buf, offset, length, encoding='utf8') {
  let res = buf.toString(encoding, offset, offset+length);
  return res;
}

function readString(buf, offset, length, encoding='utf8') {
  let end = offset+length;
  if(end===undefined) end = buf.indexOf(0, offset);
  if(end===-1 || end>offset+length)  end = offset+length;
  if(end===offset) return '';
  let res = buf.toString(encoding, offset, end);
  return res.slice(0, res.indexOf('\x00'));
}

function readZString(buf, offset, encoding='utf8') {
  let end = buf.indexOf(0, offset);
  if(end===-1) throw 'Buffer contains no zero terminated string';
  if(end===offset) return ["", 1];
  return [buf.toString(encoding, offset, end), end+1];
}

function writeString(buf, offset, value, length=undefined, encoding='utf8') {
  value = value.padEnd(length, '\x00');
  buf.write(value, offset, length, encoding);
  if(length===undefined) return offset + Buffer.byteLength(value, encoding);
  return offset+length;
}

function writeString8(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  buf.writeUInt8(l, offset);
  offset += 1;
  value = value.padEnd(l, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  return offset;
}

function writeString16LE(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  buf.writeUInt16LE(l, offset);
  offset += 2;
  value = value.padEnd(l, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  return offset;
}

function writeString16BE(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  buf.writeUInt16BE(l, offset);
  offset += 2;
  value = value.padEnd(l, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  return offset;
}

function writeString32LE(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  buf.writeUInt32LE(l, offset);
  offset += 4;
  value = value.padEnd(l, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  return offset;
}

function writeString32BE(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  buf.writeUInt32BE(l, offset);
  offset += 4;
  value = value.padEnd(l, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  return offset;
}

function writeZString(buf, offset, value, encoding='utf8') {
  let l = Buffer.byteLength(value, encoding);
  value = value.padEnd(l-1, '\x00');
  buf.write(value, offset, undefined, encoding);
  offset += l;
  buf.writeUInt8(0, offset);
  offset += 1;
  return offset;
}

function defaultReadTransform(transform,ident, struct,value,name) { if(process.env['WARN_UNUSED_TRANSFORM']!='false') console.log("\\x1b[38;2;255;50;50mWarning, calling undefined read transform", transform, "for", ident, "\\x1b[0m"); return value; }
function defaultWriteTransform(transform,ident, struct,value,name) { if(process.env['WARN_UNUSED_TRANSFORM']!='false') console.log("\\x1b[38;2;255;50;50mWarning, calling undefined write transform", transform, "for", ident, "\\x1b[0m"); return value; }

class Namespace {
  constructor(fields) {
    Object.assign(this, fields);
  }
}

class TransformValueHandler {
  get(obj, prop, receiver) {
    return obj[prop];
  }

  set(obj, prop, value) {
    obj[prop] = value;
    return true;
  }
}

class Structure {
  constructor() { this.$index = null; }
  [util.inspect.custom](depth, options) { return this.constructor.name + '<' + util.inspect(Object.assign({}, this), {breakLength:Infinity, colors:true, getters:'get', showHidden:true}) + '>'; }
  //[util.inspect.custom](depth, options) { return this.constructor.name + '<' + util.inspect(this, {breakLength:0, colors:true, _getters:'get', showHidden:false}) + '>'; }
  static size(offset=0) { return offset; }
  size(offset=0) { return offset; }
  read(buf=null, offset=null) { return offset; }
  write(buf=null, offset=null) { return offset; }
  compare(other, changes=[], prefix='') { return changes; }
  assign(other) {}
}

class TransformHandler {
  get(obj, prop, receiver) {
    let tmp = obj[prop];
    if(tmp instanceof Transform) return obj[prop+'_untransformed'];
    return tmp;
  }

  set(obj, prop, value) {
    if(!(prop in obj)) throw new Error('cannot set field "'+prop+'" in class "'+obj.constructor.name+'", field does not exist');
    let tmp = obj[prop];
    if(tmp instanceof Transform) {
      obj[prop+'_untransformed'] = tmp.set(value, obj[prop+'_untransformed']);
      return true;
    }
    obj[prop] = value;
    return true;
  }
}

class TransformedStructure extends Structure {
  constructor(options, proxy=true) {
    super();
    if(proxy) return new Proxy(new this.constructor(options, false), new TransformHandler());
  }
}

class Type {
  constructor(v) { this.value = v; }
  static size(offset=0) { return offset; }
  size(offset=0) { return offset; }
  read(buf, offset) { throw 'Custom type has not overridden read(buf, offset)'; }
  write(buf, offset) { throw 'Custom type has not overridden write(buf, offset)'; }
  toJSON() { return this.value; }
  fromJSON(v) { this.value = v; }
  [util.inspect.custom](depth, options) { return this.constructor.name + '<' + util.inspect(this.toJSON(), {breakLength:Infinity, colors:true}) + '>'; }
}

class char { static size() { return 1; } size() { return 1; } }
class short { static size() { return 2; } size() { return 2; } }

class Transform {
  constructor(obj, prop, value) {
    Object.defineProperty(this, 'obj', {value:obj, configurable:false, enumerable:false, writable:true});
    Object.defineProperty(this, 'prop', {value:prop, configurable:false, enumerable:false, writable:true});
    Object.defineProperty(this, 'value', {value:value, configurable:false, enumerable:false, writable:true});
  }
  get(obj, prop, receiver) { return obj[prop]; }
  set(obj, prop, value) { obj[prop] = value; return true; }
  [util.inspect.custom]() { return this.get(this.obj, this.prop); }

  set value(value) {
    this.value = value;
  }
}

class TransformError extends Error {}

const transforms = {
  notnull:class NotNull extends Transform {
    get(struct,value,name) { return value; }
    set(struct,value,name) { if(value==undefined || value==null || value==0) throw new TransformError('"'+struct.constructor.name+'.' + name + '" value cannot be null'); return value; }
  },
  min:class Min extends Transform {
    constructor(obj, prop, min) { super(obj, prop); this.min = min; }
    get(struct,value,name,v2) { return value; }
    set(struct,value,name,v2) { return Math.min(value, this.min); }
  },
  max:class Max extends Transform {
    constructor(obj, prop, max) { super(obj, prop); this.max = max; }
    get(struct,value,name,v2) { return value; }
    set(struct,value,name,v2) { return Math.max(value, this.max); }
  },
  minmax:class MinMax extends Transform {
    constructor(obj, prop, min, max) { super(obj, prop); this.min = min; this.max = max; }
    get(struct,value,name,v2,v3) { return value; }
    set(struct,value,name,v2,v3) { return Math.max(Math.min(value, this.min), this.max); }
  },
  test2:Transform,
  arr:Transform,
}

class TransformsHandler {
  get(target, prop, receiver) {
    let value = target[prop];
    if(!value) {
      if(process.env['WARN_UNUSED_TRANSFORM']=='true') console.log('Warning, setting unused transform handler for', prop);
      value = target[prop] = {read:null, write:null};
    }
    return value;
  }

  set(obj, prop, value) { obj[prop] = value; }
}

const transformsProxy = new Proxy(transforms, new TransformsHandler());

function bind(obj) {
  for(let value of Object.values(transforms)) {
    if(value.read) value.read = value.read.bind(obj);
    if(value.write) value.write = value.write.bind(obj);
  }
}

function initialize(actions) {
  /*INITIALIZE*/
}



class transformed extends Structure {
  constructor(options) {
    super(options);
    this.a = 0;
    this.b = 0;

    if(options) this.assign(options);
  }

  static size(offset=0) {
    offset = super.size(offset);
    offset += 2;
    return offset;
  }

  size(offset=0) {
    offset = super.size(offset);
    offset += 2;
    return offset;
  }

  read(buf=null, offset=null) {
    offset = super.read(buf, offset);
    this.a = buf.readUInt8(offset++);
    this.b = buf.readUInt8(offset++);
    return offset;
  }

  write(buf=null, offset=null) {
    offset = super.write(buf, offset);
    buf.writeUInt8(this.a, offset++);
    buf.writeUInt8(this.b, offset++);
    return offset;
  }

  compare(other, changes=[], prefix='') {
    changes = super.compare(other, changes, prefix);
    if(this.a!=other.a) changes.push(prefix+'a');
    if(this.b!=other.b) changes.push(prefix+'b');
    return changes;
  }

  assign(other) {
    if(!other) return;
    super.assign(other);
    if('a' in other) this.a=other.a;
    if('b' in other) this.b=other.b;
  }

}

class laststruct extends Structure {
  constructor(options) {
    super(options);
    this.plain = 0;
    Object.defineProperty(this, '_value1_u', {value:new transformed(), configurable:false, enumerable:false, writable:true});
    Object.defineProperty(this, '_value1_t', {value:null, configurable:false, enumerable:false, writable:true});
    Object.defineProperty(this, '_tekstia_u', {value:'', configurable:false, enumerable:false, writable:true});
    Object.defineProperty(this, '_tekstia_t', {value:null, configurable:false, enumerable:false, writable:true});

    if(options) this.assign(options);
  }

  static size(offset=0) {
    offset = super.size(offset);
    offset = transformed.size(offset);
    offset += 11;
    return offset;
  }

  size(offset=0) {
    offset = super.size(offset);
    offset += this.value1_u.size();
    offset += 11;
    return offset;
  }

  read(buf=null, offset=null) {
    offset = super.read(buf, offset);
    this.plain = buf.readUInt8(offset++);
    offset = this.value1_u.read(buf, offset);
    this.value1_u = this.value1_u;
    this.tekstia_u = readString(buf, offset, 10, 'utf8'); offset += 10;
    return offset;
  }

  write(buf=null, offset=null) {
    offset = super.write(buf, offset);
    buf.writeUInt8(this.plain, offset++);
    offset = this.value1_u.write(buf, offset);
    offset = writeString(buf, offset, this.tekstia_u, 10, 'utf8');
    return offset;
  }

  compare(other, changes=[], prefix='') {
    changes = super.compare(other, changes, prefix);
    if(this.plain!=other.plain) changes.push(prefix+'plain');
    this.value1_u.compare(other.value1_u, changes, prefix+'value1_u.');
    if(this.tekstia!=other.tekstia) changes.push(prefix+'tekstia');
    return changes;
  }

  assign(other) {
    if(!other) return;
    super.assign(other);
    if('plain' in other) this.plain=other.plain;
    if('value1' in other) this.value1_u.assign(other.value1_u);
    if('tekstia' in other) this.tekstia=other.tekstia;
  }

  set value1(v) { this._value1_t = v; this._value1_u = transforms.test2.set(v, this._value1_u); }
  get value1() { return this._value1_t; }
  set value1_u(v) { this._value1_u = v; this._value1_t = transforms.test2.get(this.value1_u); }
  get value1_u() { return this._value1_u; }

  set tekstia(v) { this._tekstia_t = v; this._tekstia_u = transforms.arr.set(v, this._tekstia_u); }
  get tekstia() { return this._tekstia_t; }
  set tekstia_u(v) { this._tekstia_u = v; this._tekstia_t = transforms.arr.get(this.tekstia_u); }
  get tekstia_u() { return this._tekstia_u; }

}

class base extends Structure {
  constructor(options) {
    super(options);
    this.v1 = 0;

    if(options) this.assign(options);
  }

  static size(offset=0) {
    offset = super.size(offset);
    offset += 1;
    return offset;
  }

  size(offset=0) {
    offset = super.size(offset);
    offset += 1;
    return offset;
  }

  read(buf=null, offset=null) {
    offset = super.read(buf, offset);
    this.v1 = buf.readUInt8(offset++);
    return offset;
  }

  write(buf=null, offset=null) {
    offset = super.write(buf, offset);
    buf.writeUInt8(this.v1, offset++);
    return offset;
  }

  compare(other, changes=[], prefix='') {
    changes = super.compare(other, changes, prefix);
    if(this.v1!=other.v1) changes.push(prefix+'v1');
    return changes;
  }

  assign(other) {
    if(!other) return;
    super.assign(other);
    if('v1' in other) this.v1=other.v1;
  }

}

class ext1 extends base {
  constructor(options) {
    super(options);
    this.v2 = 0;

    if(options) this.assign(options);
  }

  static size(offset=0) {
    offset = super.size(offset);
    offset += 1;
    return offset;
  }

  size(offset=0) {
    offset = super.size(offset);
    offset += 1;
    return offset;
  }

  read(buf=null, offset=null) {
    offset = super.read(buf, offset);
    this.v2 = buf.readUInt8(offset++);
    return offset;
  }

  write(buf=null, offset=null) {
    offset = super.write(buf, offset);
    buf.writeUInt8(this.v2, offset++);
    return offset;
  }

  compare(other, changes=[], prefix='') {
    changes = super.compare(other, changes, prefix);
    if(this.v2!=other.v2) changes.push(prefix+'v2');
    return changes;
  }

  assign(other) {
    if(!other) return;
    super.assign(other);
    if('v2' in other) this.v2=other.v2;
  }

}

class ext2 extends base {
  constructor(options) {
    super(options);
    this.v1 = 0;
    this.v2 = 0;

    if(options) this.assign(options);
  }

  static size(offset=0) {
    offset = super.size(offset);
    this.v1
    offset += 1;
    return offset;
  }

  size(offset=0) {
    offset = super.size(offset);
    this.v1
    offset += 1;
    return offset;
  }

  read(buf=null, offset=null) {
    offset = super.read(buf, offset);
    this.v1 = buf.readUInt8(offset++);
    let v2_tmp = []; for(let i=0; i<this.v1; i++) { v2_tmp.push(buf.readUInt8(offset++)); }; this.v2 = v2_tmp;
    return offset;
  }

  write(buf=null, offset=null) {
    offset = super.write(buf, offset);
    buf.writeUInt8(this.v1, offset++);
    for(let i=0; i<this.v1; i++) { buf.writeUInt8(this.v2[i], offset++); }
    return offset;
  }

  compare(other, changes=[], prefix='') {
    changes = super.compare(other, changes, prefix);
    if(this.v1!=other.v1) changes.push(prefix+'v1');
    if(this.v2!=other.v2) changes.push(prefix+'v2');
    return changes;
  }

  assign(other) {
    if(!other) return;
    super.assign(other);
    if('v1' in other) this.v1=other.v1;
    if('v2' in other) this.v2=other.v2;
  }

}


Object.defineProperty(exports, 'short', {configurable:false, writable:false, enumerable:false, value:short});
Object.defineProperty(exports, 'Namespace', {configurable:false, writable:false, enumerable:false, value:Namespace});
Object.defineProperty(exports, 'Type', {configurable:false, writable:false, enumerable:false, value:Type});
Object.defineProperty(exports, 'Structure', {configurable:false, writable:false, enumerable:false, value:Structure});
Object.defineProperty(exports, 'char', {configurable:false, writable:false, enumerable:false, value:char});
Object.defineProperty(exports, 'TransformError', {configurable:false, writable:false, enumerable:false, value:TransformError});
Object.defineProperty(exports, 'bind', {configurable:false, writable:false, enumerable:false, value:bind});
Object.defineProperty(exports, 'transform', {configurable:false, writable:false, enumerable:false, value:transformsProxy});
Object.defineProperty(exports, 'initialize', {configurable:false, writable:false, enumerable:false, value:initialize});

Object.defineProperty(exports, 'namespaces', {value:[], configurable:false, enumerable:false, writable:false});
Object.defineProperty(exports, 'transformed', {value:transformed, configurable:false, enumerable:true, writable:false});
Object.defineProperty(exports, 'laststruct', {value:laststruct, configurable:false, enumerable:true, writable:false});
Object.defineProperty(exports, 'ext1', {value:ext1, configurable:false, enumerable:true, writable:false});
Object.defineProperty(exports, 'ext2', {value:ext2, configurable:false, enumerable:true, writable:false});
Object.defineProperty(exports, 'classes', {value:[transformed,laststruct,base,ext1,ext2,], configurable:false, enumerable:false, writable:false});

const required_module1 = require('./test-transform.js');
if(required_module1.initialize) required_module1.initialize(exports, transformsProxy, Transform);