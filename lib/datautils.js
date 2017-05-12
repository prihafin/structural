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

function writeUIntVar(buf, offset, value) {
  if(value<128) {
    buf.writeUInt8(value & 0x7f);
    return offset+1;
  }
  if(value<16384) {
    buf.writeUInt8(value & 0x7f);
    buf.writeUInt8((value >>> 7) & 0x7f);
    return offset+2;
  }
  if(value<2097152) {
    buf.writeUInt8(value & 0x7f);
    buf.writeUInt8(value >>> 7 & 0x7f);
    buf.writeUInt8(value >>> 14 & 0x7f | 0x80);
    return offset+3;
  }
  if(value<268435456) {
    buf.writeUInt8(value & 0x7f);
    buf.writeUInt8(value >>> 7 & 0x7f | 0x80);
    buf.writeUInt8(value >>> 14 & 0x7f | 0x80);
    buf.writeUInt8(value >>> 21 & 0x7f | 0x80);
    return offset+4;
  }
  buf.writeUInt8(value & 0x7f);
  buf.writeUInt8(value >>> 7 & 0x7f | 0x80);
  buf.writeUInt8(value >>> 14 & 0x7f | 0x80);
  buf.writeUInt8(value >>> 21 & 0x7f | 0x80);
  buf.writeUInt8(value >>> 28 & 0x7f | 0x80);
  return offset+5; }

function readString(buf, offset, size, encoding="utf-8") {
  let res = buf.toString(encoding, offset, offset+size);
  return res;
}

function readZString(buf, offset, encoding="utf-8") {
  let end = buf.indexOf(0, offset);
  if(end===-1) throw "Buffer contains no zero terminated string";
  if(end===offset) return ["", 1];
  return [buf.toString(encoding, offset, end), end+1];
}

function writeString(buf, offset, value) {
  buf.writeUInt8(offset, value.length);
  offset += 1;
  buf.write(offset, value);
  offset += value.length;
  return offset;
}

function writeString16LE(buf, offset, value) {
  buf.writeUInt16LE(offset, value.length);
  offset += 2;
  buf.write(offset, value);
  offset += value.length;
  return offset;
}

function writeString16BE(buf, offset, value) {
  buf.writeUInt16BE(offset, value.length);
  offset += 2;
  buf.write(offset, value);
  offset += value.length;
  return offset;
}

function writeString32LE(buf, offset, value) {
  buf.writeUInt32LE(offset, value.length);
  offset += 4; buf.write(offset, value);
  offset += value.length;
  return offset;
}

function writeString32BE(buf, offset, value) {
  buf.writeUInt32BE(offset, value.length);
  offset += 4;
  buf.write(offset, value);
  offset += value.length;
  return offset;
}

function writeZString(buf, offset, value) {
  buf.write(offset, value);
  offset += value.length;
  buf.writeUInt8(offset, 0);
  offset += 1;
  return offset;
}
