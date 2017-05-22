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
    console.log("byte!");
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
  buf.write(value, offset);
  offset += Buffer.byteLength(value, "utf-8");
  return offset;
}

function writeString8(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.writeUInt8(l, offset);
  offset += 1;
  buf.write(value, offset);
  offset += l;
  return offset;
}

function writeString16LE(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.writeUInt16LE(l, offset);
  offset += 2;
  buf.write(value, offset);
  offset += l;
  return offset;
}

function writeString16BE(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.writeUInt16BE(l, offset);
  offset += 2;
  buf.write(value, offset);
  offset += l;
  return offset;
}

function writeString32LE(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.writeUInt32LE(l, offset);
  offset += 4;
  buf.write(value, offset);
  offset += l;
  return offset;
}

function writeString32BE(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.writeUInt32BE(l, offset);
  offset += 4;
  buf.write(value, offset);
  offset += l;
  return offset;
}

function writeZString(buf, offset, value) {
  let l = Buffer.byteLength(value, "utf-8");
  buf.write(value, offset);
  offset += l;
  buf.writeUInt8(0, offset);
  offset += 1;
  return offset;
}
