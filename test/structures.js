/** "Structural" generated this file from structures.h at Thu Jan 17 2019 08:54:30 GMT+0200 (GMT+02:00) */

const util = require("util");
const os = require("os");
const wide = process.arch.endsWith("64");
let INTEGER_SIZE = process.arch.endsWith("64") ? 64 : 32;let readIntLE = Buffer.prototype.readInt32LE;let readIntBE = Buffer.prototype.readInt32BE;let readUIntLE = Buffer.prototype.readInt32LE;let readUIntBE = Buffer.prototype.readInt32BE;/** * @param {Buffer} buf */function readInt64LE(buf, offset) {  let h = buf.readInt32LE(offset); offset+=2;  let l = buf.readInt32LE(offset); offset+=2;  return (h<<32) | l;}function readInt64BE(buf, offset) {  let h = buf.readInt32LE(offset); offset+=2;  let l = buf.readInt32LE(offset); offset+=2;  return (l<<32) | h;}function readUInt64LE(buf, offset) {  let h = buf.readUInt32LE(offset); offset+=2;  let l = buf.readUInt32LE(offset); offset+=2;  return (h<<32) | l;}function readUInt64BE(buf, offset) {  let h = buf.readUInt32LE(offset); offset+=2;  let l = buf.readUInt32LE(offset); offset+=2;  return (l<<32) | h;}if(INTEGER_SIZE===64) {  readIntLE = Buffer.prototype.readInt64LE;  readIntBE = Buffer.prototype.readInt64BE;  readUIntLE = Buffer.prototype.readUInt64LE;  readUIntBE = Buffer.prototype.readUInt64BE;}let readUInt = null;function readUIntVar(buf, offset) {  let i = 0;  let v = 0x80;  let a = [];  while(((i===0) || (i<5)) && ((v & 0x80)===128)) {    a.unshift(v = buf.readUInt8(offset));    offset++; i++;  }  let res = 0;  i = 0;  for(let v of a) {    res += ((v & 0x7f) << i++*7);  }  return [res, offset];}/** * @param {Buffer} buf */function writeUIntVar(buf, offset, value) {  if(value<128) {    buf.writeUInt8(value & 0x7f, offset);    return offset+1;  }  if(value<16384) {    buf.writeUInt8((value >>> 7) & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  if(value<2097152) {    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  if(value<268435456) {    buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  buf.writeUInt8(value >>> 28 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);  buf.writeUInt8(value & 0x7f, offset++);  return offset;}function sizeUIntVar(value) {  if(value<128) return 1;  if(value<16384) return 2;  if(value<2097152) return 3;  if(value<268435456) return 4;  return 5;}function readStringOld(buf, offset, length, encoding="utf-8") {  let res = buf.toString(encoding, offset, offset+length);  return res;}function readString(buf, offset, length, encoding="utf-8") {  let end = offset+length;  if(end===undefined) end = buf.indexOf(0, offset);  if(end===-1 || end>offset+length)  end = offset+length;  if(end===offset) return "";  return buf.toString(encoding, offset, end);}function readZString(buf, offset, encoding="utf-8") {  let end = buf.indexOf(0, offset);  if(end===-1) throw "Buffer contains no zero terminated string";  if(end===offset) return ["", 1];  return [buf.toString(encoding, offset, end), end+1];}function writeString(buf, offset, value, length=undefined, encoding="utf-8") {  buf.write(value, offset, length, encoding);  if(length===undefined) return offset + Buffer.byteLength(value, encoding);  return offset+length;}function writeString8(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt8(l, offset);  offset += 1;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString16LE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt16LE(l, offset);  offset += 2;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString16BE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt16BE(l, offset);  offset += 2;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString32LE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt32LE(l, offset);  offset += 4;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString32BE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt32BE(l, offset);  offset += 4;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeZString(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.write(value, offset, undefined, encoding);  offset += l;  buf.writeUInt8(0, offset);  offset += 1;  return offset;}

const STRUCTURE = class STRUCTURE {
  [util.inspect.custom](depth, options) {
    return options.stylize(this.constructor.name + "<" + JSON.stringify(this) + ">", "special");
  }
};

const TYPE = class TYPE {
  constructor(v) {
    this.value = v;
  }

  static size(offset) {
    throw "Custom type has not overridden static size(offset)";
  }

  size(offset) {
    throw "Custom type has not overridden size(offset)";
  }

  read(buf, offset) {
    throw "Custom type has not overridden read(buf, offset)";
  }

  write(buf, offset) {
    throw "Custom type has not overridden write(buf, offset)";
  }

  toJSON() {
    return this.value;
  }

  fromJSON(v) {
    this.value = v;
  }

  [util.inspect.custom](depth, options) {
    return options.stylize(this.constructor.name + "<" + this.toJSON() + ">", "special");
  }
};

Object.defineProperty(exports, "STRUCTURE", {configurable:false, writable:false, enumerable:false, value:STRUCTURE});
Object.defineProperty(exports, "TYPE", {configurable:false, writable:false, enumerable:false, value:TYPE});

class char {
  static size() {
    return 1;
  }
}
exports.char = char;

class short {
  static size() {
    return 2;
  }
}
exports.short = short;


exports.initialize = function(actions) {
}

exports.RO_VERSIONINFO = 65528;
exports.RA_TODAY = 12937;
exports.RA_POINTDYN = 12995;
exports.RA_AREADYN = 15043;
exports.RA_LINEDYN = 17091;
exports.RA_BOARDDYN = 18243;
exports.RA_FAULTS = 18438;
exports.RA_DISABS = 18484;
exports.RA_WRITEREADBU = 19037;
exports.RA_POINTDYNX = 20922;
exports.RA_POINTVERSION = 23723;
exports.RA_DEBUGSTRU = 23683;
exports.RA_PCCOMMAND = 32224;
exports.RA_PCPACKET = 32256;
exports.RA_PCPACKET_100 = 32256;
exports.RA_EVENT = 98304;
exports.RA_LUXEXTRA = 102400;
exports.RA_LUXREPORT = 163840;
exports.RA_GENERAL = 229376;
exports.RA_ADDRESSPRG = 229440;
exports.RA_AREAPRG = 231488;
exports.RA_KLSPRG = 233536;
exports.RA_USERPRG = 234048;
exports.RA_MAINOUTPUTPRG = 239744;
exports.RA_EXTRAOUTPUTPRG = 239784;
exports.RA_INPUTPRG = 240104;
exports.RA_SERIALCODE = 242152;
exports.RA_INPUTNAMEPRG = 242176;
exports.RA_AREAGABPRG = 244480;
exports.RA_MAINOUTPUTGABPRG = 252672;
exports.RA_EXTRAOUTPUTGABPRG = 252736;
exports.RA_INPUTGABPRG = 253248;
const POINTSTATE = {
  0: "PS_DUMMY",
  1: "PS_CHECKDOUBLE",
  2: "PS_CFGMODE",
  3: "PS_CFGGROUP",
  4: "PS_NORMAL",
  5: "PS_NOTPROGRAMMED",
  6: "PS_PRESENT",
  7: "PS_CHECKERRORS",
  8: "PS_MISSING",
  9: "PS_DADDRESS",
  10: "PS_BATTERY",
  11: "PS_LIGHT",
  12: "PS_WRONGTYPE",
  13: "PS_LINEFAULT",
  14: "PS_CHANGEBATTERY",
}
exports.POINTSTATE = POINTSTATE;

const OBYTEFLAGS = {
  1: "LINE_A_VOLTAGE",
  2: "LINE_A_DATA",
  4: "LINE_B_VOLTAGE",
  8: "LINE_B_DATA",
  16: "EXT_RELAY",
  32: "FAIL_RELAY",
  64: "LINE_A_G_LED",
  128: "LINE_B_G_LED",
}
exports.OBYTEFLAGS = OBYTEFLAGS;

const POINTTYPE = {
  0: "PT_NOTPROGRAMMED",
  1: "PT_QUIDE20",
  2: "PT_QUIDE40",
  3: "PT_SAFETY",
  4: "PT_STEP",
  5: "PT_IO",
  6: "PT_QUIDE70",
  7: "PT_NA88",
  8: "PT_COUNT",
  255: "PT_ACCEPTANY",
}
exports.POINTTYPE = POINTTYPE;

const INTADDROPTION = {
  1: "INTADDROPTION_BSREMOTEINDICATOR",
  2: "INTADDROPTION_USEUPS",
  4: "INTADDROPTION_HIPOWER",
  8: "INTADDROPTION_CHARGER12H",
}
exports.INTADDROPTION = INTADDROPTION;


class PACKET_HEAD extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.syn = 22;
    this.pc_addr = 0;
    this.mem_addr = 0;
    this.page_and_len = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    return offset;
  }

  read(buf, offset=0) {
    this.syn = buf.readUInt8(offset++);
    this.pc_addr = buf.readUInt8(offset++);
    this.mem_addr = buf.readUInt16LE(offset); offset += 2;
    this.page_and_len = buf.readUInt16LE(offset); offset += 2;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.syn, offset++);
    buf.writeUInt8(this.pc_addr, offset++);
    buf.writeUInt16LE(this.mem_addr, offset); offset += 2;
    buf.writeUInt16LE(this.page_and_len, offset); offset += 2;
    return offset;
  }
}
exports.PACKET_HEAD = PACKET_HEAD;

class DISCOVER extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.addr = 0;
    this.version = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 2;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 2;
    return offset;
  }

  read(buf, offset=0) {
    this.addr = buf.readUInt8(offset++);
    this.version = buf.readUInt16LE(offset); offset += 2;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.addr, offset++);
    buf.writeUInt16LE(this.version, offset); offset += 2;
    return offset;
  }
}
exports.DISCOVER = DISCOVER;
exports.DISCOVER_ADDRESS = 32257;

class PCPACKET extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.system = 0;
    this.addr = 0;
    this.version = 0;
    this.faultcount = 0;
    this.disabcount = 0;
    this.eventptr = 0;
    this.pinitcount = 0;
    this.obyte = 0;
    this.ps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.today = [0,0,0,0,0,0,0];
    this.faults = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.disabs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.areastatus = [0,0,0,0];
    this.testall = 0;
    this.outstatus = [0,0,0,0];
    this.res = [0,0,0,0];
    this.instatus = [0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset += 127;
    offset += 7;
    offset += 44;
    offset += 44;
    offset += 4;
    offset++;
    offset += 4;
    offset += 4;
    offset += 8;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset += 127;
    offset += 7;
    offset += 44;
    offset += 44;
    offset += 4;
    offset++;
    offset += 4;
    offset += 4;
    offset += 8;
    return offset;
  }

  read(buf, offset=0) {
    this.system = buf.readUInt8(offset++);
    this.addr = buf.readUInt8(offset++);
    this.version = buf.readUInt16LE(offset); offset += 2;
    this.faultcount = buf.readUInt16LE(offset); offset += 2;
    this.disabcount = buf.readUInt16LE(offset); offset += 2;
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    this.pinitcount = buf.readUInt8(offset++);
    this.obyte = buf.readUInt8(offset++);
    this.ps = [];
    for(let i=0; i<127; i++) { this.ps.push(buf.readUInt8(offset++)); }
    this.today = [];
    for(let i=0; i<7; i++) { this.today.push(buf.readUInt8(offset++)); }
    this.faults = [];
    for(let i=0; i<44; i++) { this.faults.push(buf.readUInt8(offset++)); }
    this.disabs = [];
    for(let i=0; i<44; i++) { this.disabs.push(buf.readUInt8(offset++)); }
    this.areastatus = [];
    for(let i=0; i<4; i++) { this.areastatus.push(buf.readUInt8(offset++)); }
    this.testall = buf.readUInt8(offset++);
    this.outstatus = [];
    for(let i=0; i<4; i++) { this.outstatus.push(buf.readUInt8(offset++)); }
    this.res = [];
    for(let i=0; i<4; i++) { this.res.push(buf.readUInt8(offset++)); }
    this.instatus = [];
    for(let i=0; i<8; i++) { this.instatus.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.system, offset++);
    buf.writeUInt8(this.addr, offset++);
    buf.writeUInt16LE(this.version, offset); offset += 2;
    buf.writeUInt16LE(this.faultcount, offset); offset += 2;
    buf.writeUInt16LE(this.disabcount, offset); offset += 2;
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    buf.writeUInt8(this.pinitcount, offset++);
    buf.writeUInt8(this.obyte, offset++);
    for(let i=0; i<127; i++) { buf.writeUInt8(this.ps[i], offset++); }
    for(let i=0; i<7; i++) { buf.writeUInt8(this.today[i], offset++); }
    for(let i=0; i<44; i++) { buf.writeUInt8(this.faults[i], offset++); }
    for(let i=0; i<44; i++) { buf.writeUInt8(this.disabs[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.areastatus[i], offset++); }
    buf.writeUInt8(this.testall, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.outstatus[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.res[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.instatus[i], offset++); }
    return offset;
  }
}
exports.PCPACKET = PCPACKET;

class PCPACKET_220 extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.system = 0;
    this.addr = 0;
    this.version = 0;
    this.faultcount = 0;
    this.disabcount = 0;
    this.eventptr = 0;
    this.pinitcount = 0;
    this.obyte = 0;
    this.ps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.today = [0,0,0,0,0,0,0];
    this.faults = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.disabs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.areastatus = [0,0,0,0,0,0,0];
    this.res = 0;
    this.testall = 0;
    this.outstatus = [0,0,0,0];
    this.instatus = [0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset += 127;
    offset += 7;
    offset += 44;
    offset += 44;
    offset += 7;
    offset++;
    offset++;
    offset += 4;
    offset += 8;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset += 127;
    offset += 7;
    offset += 44;
    offset += 44;
    offset += 7;
    offset++;
    offset++;
    offset += 4;
    offset += 8;
    return offset;
  }

  read(buf, offset=0) {
    this.system = buf.readUInt8(offset++);
    this.addr = buf.readUInt8(offset++);
    this.version = buf.readUInt16LE(offset); offset += 2;
    this.faultcount = buf.readUInt16LE(offset); offset += 2;
    this.disabcount = buf.readUInt16LE(offset); offset += 2;
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    this.pinitcount = buf.readUInt8(offset++);
    this.obyte = buf.readUInt8(offset++);
    this.ps = [];
    for(let i=0; i<127; i++) { this.ps.push(buf.readUInt8(offset++)); }
    this.today = [];
    for(let i=0; i<7; i++) { this.today.push(buf.readUInt8(offset++)); }
    this.faults = [];
    for(let i=0; i<44; i++) { this.faults.push(buf.readUInt8(offset++)); }
    this.disabs = [];
    for(let i=0; i<44; i++) { this.disabs.push(buf.readUInt8(offset++)); }
    this.areastatus = [];
    for(let i=0; i<7; i++) { this.areastatus.push(buf.readUInt8(offset++)); }
    this.res = buf.readUInt8(offset++);
    this.testall = buf.readUInt8(offset++);
    this.outstatus = [];
    for(let i=0; i<4; i++) { this.outstatus.push(buf.readUInt8(offset++)); }
    this.instatus = [];
    for(let i=0; i<8; i++) { this.instatus.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.system, offset++);
    buf.writeUInt8(this.addr, offset++);
    buf.writeUInt16LE(this.version, offset); offset += 2;
    buf.writeUInt16LE(this.faultcount, offset); offset += 2;
    buf.writeUInt16LE(this.disabcount, offset); offset += 2;
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    buf.writeUInt8(this.pinitcount, offset++);
    buf.writeUInt8(this.obyte, offset++);
    for(let i=0; i<127; i++) { buf.writeUInt8(this.ps[i], offset++); }
    for(let i=0; i<7; i++) { buf.writeUInt8(this.today[i], offset++); }
    for(let i=0; i<44; i++) { buf.writeUInt8(this.faults[i], offset++); }
    for(let i=0; i<44; i++) { buf.writeUInt8(this.disabs[i], offset++); }
    for(let i=0; i<7; i++) { buf.writeUInt8(this.areastatus[i], offset++); }
    buf.writeUInt8(this.res, offset++);
    buf.writeUInt8(this.testall, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.outstatus[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.instatus[i], offset++); }
    return offset;
  }
}
exports.PCPACKET_220 = PCPACKET_220;
exports.PCPACKET_ADDRESS = 32256;

class COUNTERS extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.faultcount = 0;
    this.disabcount = 0;
    this.eventptr = 0;
    this.pinitcount = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    return offset;
  }

  read(buf, offset=0) {
    this.faultcount = buf.readUInt16LE(offset); offset += 2;
    this.disabcount = buf.readUInt16LE(offset); offset += 2;
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    this.pinitcount = buf.readUInt8(offset++);
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.faultcount, offset); offset += 2;
    buf.writeUInt16LE(this.disabcount, offset); offset += 2;
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    buf.writeUInt8(this.pinitcount, offset++);
    return offset;
  }
}
exports.COUNTERS = COUNTERS;
exports.COUNTERS_ADDRESS = 32260;

class OBYTE extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.obyte = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    return offset;
  }

  size(offset=0) {
    offset++;
    return offset;
  }

  read(buf, offset=0) {
    this.obyte = buf.readUInt8(offset++);
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.obyte, offset++);
    return offset;
  }
}
exports.OBYTE = OBYTE;
exports.OBYTE_ADDRESS = 32267;

class POINTSTATES extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.ps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 127;
    return offset;
  }

  size(offset=0) {
    offset += 127;
    return offset;
  }

  read(buf, offset=0) {
    this.ps = [];
    for(let i=0; i<127; i++) { this.ps.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<127; i++) { buf.writeUInt8(this.ps[i], offset++); }
    return offset;
  }
}
exports.POINTSTATES = POINTSTATES;
exports.POINTSTATES_ADDRESS = 32268;

class RESTSTATES extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.mainfaults = [0,0,0,0,0,0,0,0];
    this.pointfaults = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.inputfaults = [0,0,0,0];
    this.maindisabs = [0,0,0,0,0,0,0,0];
    this.pointdisabs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.inputdisabs = [0,0,0,0];
    this.areastatus = [0,0,0,0];
    this.testall = 0;
    this.outstatus = [0,0,0,0];
    this.instatus = [0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 8;
    offset += 32;
    offset += 4;
    offset += 8;
    offset += 32;
    offset += 4;
    offset += 4;
    offset++;
    offset += 4;
    offset += 8;
    return offset;
  }

  size(offset=0) {
    offset += 8;
    offset += 32;
    offset += 4;
    offset += 8;
    offset += 32;
    offset += 4;
    offset += 4;
    offset++;
    offset += 4;
    offset += 8;
    return offset;
  }

  read(buf, offset=0) {
    this.mainfaults = [];
    for(let i=0; i<8; i++) { this.mainfaults.push(buf.readUInt8(offset++)); }
    this.pointfaults = [];
    for(let i=0; i<32; i++) { this.pointfaults.push(buf.readUInt8(offset++)); }
    this.inputfaults = [];
    for(let i=0; i<4; i++) { this.inputfaults.push(buf.readUInt8(offset++)); }
    this.maindisabs = [];
    for(let i=0; i<8; i++) { this.maindisabs.push(buf.readUInt8(offset++)); }
    this.pointdisabs = [];
    for(let i=0; i<32; i++) { this.pointdisabs.push(buf.readUInt8(offset++)); }
    this.inputdisabs = [];
    for(let i=0; i<4; i++) { this.inputdisabs.push(buf.readUInt8(offset++)); }
    this.areastatus = [];
    for(let i=0; i<4; i++) { this.areastatus.push(buf.readUInt8(offset++)); }
    this.testall = buf.readUInt8(offset++);
    this.outstatus = [];
    for(let i=0; i<4; i++) { this.outstatus.push(buf.readUInt8(offset++)); }
    this.instatus = [];
    for(let i=0; i<8; i++) { this.instatus.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.mainfaults[i], offset++); }
    for(let i=0; i<32; i++) { buf.writeUInt8(this.pointfaults[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.inputfaults[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.maindisabs[i], offset++); }
    for(let i=0; i<32; i++) { buf.writeUInt8(this.pointdisabs[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.inputdisabs[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.areastatus[i], offset++); }
    buf.writeUInt8(this.testall, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.outstatus[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.instatus[i], offset++); }
    return offset;
  }
}
exports.RESTSTATES = RESTSTATES;
exports.RESTSTATES_ADDRESS = 32402;

class POINT extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.type = 0;
    this.modebpp = 0;
    this.area = 0;
    this.b_area = 0;
    this.ia_setup = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset += 4;
    offset++;
    offset++;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset += 4;
    offset++;
    offset++;
    return offset;
  }

  read(buf, offset=0) {
    this.type = buf.readUInt8(offset++);
    this.modebpp = buf.readUInt8(offset++);
    this.area = buf.readUInt32LE(offset); offset += 4;
    this.b_area = buf.readUInt8(offset++);
    this.ia_setup = buf.readUInt8(offset++);
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.type, offset++);
    buf.writeUInt8(this.modebpp, offset++);
    buf.writeUInt32LE(this.area, offset); offset += 4;
    buf.writeUInt8(this.b_area, offset++);
    buf.writeUInt8(this.ia_setup, offset++);
    return offset;
  }
}
exports.POINT = POINT;
exports.POINT_ADDRESS = 229440;
exports.POINT_COUNT = 254;
exports.POINT_CACHED = true;

class AREA extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.name = "";
    this.mode = 0;
    this.nobatt_lowbrightness = 0;
    this.nobatt_highbrightness = 0;
    this.options = 0;
    this.hexit_normalmode = 0;
    this.hexit_activemode = 0;
    this.global_id = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 24;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 24;
    return offset;
  }

  read(buf, offset=0) {
    this.name = readString(buf, offset, 32, "utf-8"); offset += 32;
    this.mode = buf.readUInt8(offset++);
    this.nobatt_lowbrightness = buf.readUInt8(offset++);
    this.nobatt_highbrightness = buf.readUInt8(offset++);
    this.options = buf.readUInt8(offset++);
    this.hexit_normalmode = buf.readUInt8(offset++);
    this.hexit_activemode = buf.readUInt8(offset++);
    this.global_id = buf.readUInt16LE(offset); offset += 2;
    this.res = [];
    for(let i=0; i<24; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    offset = writeString(buf, offset, this.name, 32, "utf-8");
    buf.writeUInt8(this.mode, offset++);
    buf.writeUInt8(this.nobatt_lowbrightness, offset++);
    buf.writeUInt8(this.nobatt_highbrightness, offset++);
    buf.writeUInt8(this.options, offset++);
    buf.writeUInt8(this.hexit_normalmode, offset++);
    buf.writeUInt8(this.hexit_activemode, offset++);
    buf.writeUInt16LE(this.global_id, offset); offset += 2;
    for(let i=0; i<24; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
exports.AREA = AREA;
exports.AREA_ADDRESS = 231488;
exports.AREA_COUNT = 32;
exports.AREA_CACHED = true;

class MAINOUTPUT extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.type = 0;
    this.area = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  read(buf, offset=0) {
    this.type = buf.readUInt8(offset++);
    this.area = buf.readUInt32LE(offset); offset += 4;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.type, offset++);
    buf.writeUInt32LE(this.area, offset); offset += 4;
    return offset;
  }
}
exports.MAINOUTPUT = MAINOUTPUT;
exports.MAINOUTPUT_ADDRESS = 239744;
exports.MAINOUTPUT_COUNT = 8;
exports.MAINOUTPUT_CACHED = true;

class EXTRAOUTPUT extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.type = 0;
    this.area = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  read(buf, offset=0) {
    this.type = buf.readUInt8(offset++);
    this.area = buf.readUInt32LE(offset); offset += 4;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.type, offset++);
    buf.writeUInt32LE(this.area, offset); offset += 4;
    return offset;
  }
}
exports.EXTRAOUTPUT = EXTRAOUTPUT;
exports.EXTRAOUTPUT_ADDRESS = 239784;
exports.EXTRAOUTPUT_COUNT = 32;
exports.EXTRAOUTPUT_CACHED = true;

class EXTRAINPUT extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.options = 0;
    this.area = 0;    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 4;
    return offset;
  }

  read(buf, offset=0) {
    this.options = buf.readUInt8(offset++);
    this.area = buf.readUInt32LE(offset); offset += 4;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.options, offset++);
    buf.writeUInt32LE(this.area, offset); offset += 4;
    return offset;
  }
}
exports.EXTRAINPUT = EXTRAINPUT;
exports.EXTRAINPUT_ADDRESS = 240104;
exports.EXTRAINPUT_COUNT = 64;
exports.EXTRAINPUT_CACHED = true;

class EXTRAINPUTNAME extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.name = "";    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    return offset;
  }

  read(buf, offset=0) {
    this.name = readString(buf, offset, 32, "utf-8"); offset += 32;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    offset = writeString(buf, offset, this.name, 32, "utf-8");
    return offset;
  }
}
exports.EXTRAINPUTNAME = EXTRAINPUTNAME;
exports.EXTRAINPUTNAME_ADDRESS = 242176;
exports.EXTRAINPUTNAME_COUNT = 64;
exports.EXTRAINPUTNAME_CACHED = true;

class EVENT extends STRUCTURE {
  constructor(buf, offset) {
    super();
    this.ymdhms = [0,0,0,0];
    this.type = 0;
    this.data = [0,0,0];    

    if(buf instanceof Buffer) {
      if(offset===undefined) offset = 0;
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 4;
    offset++;
    offset += 3;
    return offset;
  }

  size(offset=0) {
    offset += 4;
    offset++;
    offset += 3;
    return offset;
  }

  read(buf, offset=0) {
    this.ymdhms = [];
    for(let i=0; i<4; i++) { this.ymdhms.push(buf.readUInt8(offset++)); }
    this.type = buf.readUInt8(offset++);
    this.data = [];
    for(let i=0; i<3; i++) { this.data.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<4; i++) { buf.writeUInt8(this.ymdhms[i], offset++); }
    buf.writeUInt8(this.type, offset++);
    for(let i=0; i<3; i++) { buf.writeUInt8(this.data[i], offset++); }
    return offset;
  }
}
exports.EVENT = EVENT;
exports.EVENT_ADDRESS = 98304;
exports.EVENT_COUNT = 600;
