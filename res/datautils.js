let iconv = null;
try {
  iconv = require('iconv-lite');
  iconv.encode('c', 'iso-8859-1');
} catch(e) {
}

let INTEGER_SIZE = process.arch.endsWith('64') ? 64 : 32;
let INTEGER_SIZE_BYTES = INTEGER_SIZE===64 ? 8 : 4;

let readIntLE = Buffer.prototype.readInt32LE;
let readIntBE = Buffer.prototype.readInt32BE;
let readUIntLE = Buffer.prototype.readInt32LE;
let readUIntBE = Buffer.prototype.readInt32BE;

/**
 * @param {Buffer} buf
 */
function readInt64LE(buf, offset) {
  let h = buf.readInt32LE(offset); offset+=2;
  let l = buf.readInt32LE(offset); offset+=2;
  return (h<<32) | l;
}

function readInt64BE(buf, offset) {
  let h = buf.readInt32LE(offset); offset+=2;
  let l = buf.readInt32LE(offset); offset+=2;
  return (l<<32) | h;
}

function readUInt64LE(buf, offset) {
  let h = buf.readUInt32LE(offset); offset+=2;
  let l = buf.readUInt32LE(offset); offset+=2;
  return (h<<32) | l;
}

function readUInt64BE(buf, offset) {
  let h = buf.readUInt32LE(offset); offset+=2;
  let l = buf.readUInt32LE(offset); offset+=2;
  return (l<<32) | h;
}

if(INTEGER_SIZE===64) {
  readIntLE = Buffer.prototype.readInt64LE;
  readIntBE = Buffer.prototype.readInt64BE;
  readUIntLE = Buffer.prototype.readUInt64LE;
  readUIntBE = Buffer.prototype.readUInt64BE;
}

let readUInt = null;

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

/**
 * @param {Buffer} buf
 */
function writeUIntVar(buf, offset, value) {
  if(value<128) {
    buf.writeUInt8(value & 0x7f, offset);
    return offset+1;
  }
  if(value<16384) {
    buf.writeUInt8((value >>> 7) & 0x7f | 0x80, offset++);
    buf.writeUInt8(value & 0x7f, offset++);
    return offset;
  }
  if(value<2097152) {
    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);
    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);
    buf.writeUInt8(value & 0x7f, offset++);
    return offset;
  }
  if(value<268435456) {
    buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);
    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);
    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);
    buf.writeUInt8(value & 0x7f, offset++);
    return offset;
  }
  buf.writeUInt8(value >>> 28 & 0x7f | 0x80, offset++);
  buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);
  buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);
  buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);
  buf.writeUInt8(value & 0x7f, offset++);
  return offset;
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
