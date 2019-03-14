/** "Structural" generated this file from structures.h at Fri Feb 01 2019 14:56:57 GMT+0200 (GMT+02:00) */

const util = require("util"); const os = require("os"); const wide = process.arch.endsWith("64");
let INTEGER_SIZE = process.arch.endsWith("64") ? 64 : 32;let INTEGER_SIZE_BYTES = INTEGER_SIZE===64 ? 8 : 4;let readIntLE = Buffer.prototype.readInt32LE;let readIntBE = Buffer.prototype.readInt32BE;let readUIntLE = Buffer.prototype.readInt32LE;let readUIntBE = Buffer.prototype.readInt32BE;/** * @param {Buffer} buf */function readInt64LE(buf, offset) {  let h = buf.readInt32LE(offset); offset+=2;  let l = buf.readInt32LE(offset); offset+=2;  return (h<<32) | l;}function readInt64BE(buf, offset) {  let h = buf.readInt32LE(offset); offset+=2;  let l = buf.readInt32LE(offset); offset+=2;  return (l<<32) | h;}function readUInt64LE(buf, offset) {  let h = buf.readUInt32LE(offset); offset+=2;  let l = buf.readUInt32LE(offset); offset+=2;  return (h<<32) | l;}function readUInt64BE(buf, offset) {  let h = buf.readUInt32LE(offset); offset+=2;  let l = buf.readUInt32LE(offset); offset+=2;  return (l<<32) | h;}if(INTEGER_SIZE===64) {  readIntLE = Buffer.prototype.readInt64LE;  readIntBE = Buffer.prototype.readInt64BE;  readUIntLE = Buffer.prototype.readUInt64LE;  readUIntBE = Buffer.prototype.readUInt64BE;}let readUInt = null;function readUIntVar(buf, offset) {  let i = 0;  let v = 0x80;  let a = [];  while(((i===0) || (i<5)) && ((v & 0x80)===128)) {    a.unshift(v = buf.readUInt8(offset));    offset++; i++;  }  let res = 0;  i = 0;  for(let v of a) {    res += ((v & 0x7f) << i++*7);  }  return [res, offset];}/** * @param {Buffer} buf */function writeUIntVar(buf, offset, value) {  if(value<128) {    buf.writeUInt8(value & 0x7f, offset);    return offset+1;  }  if(value<16384) {    buf.writeUInt8((value >>> 7) & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  if(value<2097152) {    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  if(value<268435456) {    buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);    buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);    buf.writeUInt8(value & 0x7f, offset++);    return offset;  }  buf.writeUInt8(value >>> 28 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 21 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 14 & 0x7f | 0x80, offset++);  buf.writeUInt8(value >>> 7 & 0x7f | 0x80, offset++);  buf.writeUInt8(value & 0x7f, offset++);  return offset;}function sizeUIntVar(value) {  if(value<128) return 1;  if(value<16384) return 2;  if(value<2097152) return 3;  if(value<268435456) return 4;  return 5;}function sizeIntVar() {  throw new Error('signed variable int not yet supported');}function readStringOld(buf, offset, length, encoding="utf-8") {  let res = buf.toString(encoding, offset, offset+length);  return res;}function readString(buf, offset, length, encoding="utf-8") {  let end = offset+length;  if(end===undefined) end = buf.indexOf(0, offset);  if(end===-1 || end>offset+length)  end = offset+length;  if(end===offset) return "";  return buf.toString(encoding, offset, end);}function readZString(buf, offset, encoding="utf-8") {  let end = buf.indexOf(0, offset);  if(end===-1) throw "Buffer contains no zero terminated string";  if(end===offset) return ["", 1];  return [buf.toString(encoding, offset, end), end+1];}function writeString(buf, offset, value, length=undefined, encoding="utf-8") {  buf.write(value, offset, length, encoding);  if(length===undefined) return offset + Buffer.byteLength(value, encoding);  return offset+length;}function writeString8(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt8(l, offset);  offset += 1;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString16LE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt16LE(l, offset);  offset += 2;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString16BE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt16BE(l, offset);  offset += 2;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString32LE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt32LE(l, offset);  offset += 4;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeString32BE(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.writeUInt32BE(l, offset);  offset += 4;  buf.write(value, offset, undefined, encoding);  offset += l;  return offset;}function writeZString(buf, offset, value, encoding="utf-8") {  let l = Buffer.byteLength(value, encoding);  buf.write(value, offset, undefined, encoding);  offset += l;  buf.writeUInt8(0, offset);  offset += 1;  return offset;}

class STRUCTURE {
  [util.inspect.custom](depth, options) { return options.stylize(this.constructor.name + "<" + JSON.stringify(this) + ">", "special"); }
};

class TYPE {
  constructor(v) { this.value = v; }
  static size(offset) { throw "Custom type has not overridden static size(offset)"; }
  size(offset) { throw "Custom type has not overridden size(offset)"; }
  read(buf, offset) { throw "Custom type has not overridden read(buf, offset)"; }
  write(buf, offset) { throw "Custom type has not overridden write(buf, offset)"; }
  toJSON() { return this.value; }
  fromJSON(v) { this.value = v; }
  [util.inspect.custom](depth, options) { return options.stylize(this.constructor.name + "<" + this.toJSON() + ">", "special"); }
};

Object.defineProperty(exports, "STRUCTURE", {configurable:false, writable:false, enumerable:false, value:STRUCTURE});
Object.defineProperty(exports, "TYPE", {configurable:false, writable:false, enumerable:false, value:TYPE});

class char { static size() { return 1; } }
exports.char = char;

class short { static size() { return 2; } }
exports.short = short;

exports.initialize = function(actions) {
}

const RO_VERSIONINFO = 65528;
Object.defineProperty(exports, 'RO_VERSIONINFO', {value:RO_VERSIONINFO, configurable:false, writable:false});

const MEMMAP3KPRG_BASE_ADDRESS = 1611137024;
Object.defineProperty(exports, 'MEMMAP3KPRG_BASE_ADDRESS', {value:MEMMAP3KPRG_BASE_ADDRESS, configurable:false, writable:false});

const OFFSET3K_GENERALPRG = 0;
Object.defineProperty(exports, 'OFFSET3K_GENERALPRG', {value:OFFSET3K_GENERALPRG, configurable:false, writable:false});

const OFFSET3K_LINESETUPPRG = 256;
Object.defineProperty(exports, 'OFFSET3K_LINESETUPPRG', {value:OFFSET3K_LINESETUPPRG, configurable:false, writable:false});

const OFFSET3K_GSMRECEIVERPRG = 512;
Object.defineProperty(exports, 'OFFSET3K_GSMRECEIVERPRG', {value:OFFSET3K_GSMRECEIVERPRG, configurable:false, writable:false});

const OFFSET3K_0x100FREE1 = 768;
Object.defineProperty(exports, 'OFFSET3K_0x100FREE1', {value:OFFSET3K_0x100FREE1, configurable:false, writable:false});

const OFFSET3K_USERPRG = 1024;
Object.defineProperty(exports, 'OFFSET3K_USERPRG', {value:OFFSET3K_USERPRG, configurable:false, writable:false});

const OFFSET3K_KLGPRG = 1536;
Object.defineProperty(exports, 'OFFSET3K_KLGPRG', {value:OFFSET3K_KLGPRG, configurable:false, writable:false});

const OFFSET3K_MAINOUTPUTPRG = 2048;
Object.defineProperty(exports, 'OFFSET3K_MAINOUTPUTPRG', {value:OFFSET3K_MAINOUTPUTPRG, configurable:false, writable:false});

const OFFSET3K_MAININPUTPRG = 2560;
Object.defineProperty(exports, 'OFFSET3K_MAININPUTPRG', {value:OFFSET3K_MAININPUTPRG, configurable:false, writable:false});

const OFFSET3K_USERLOGO = 3072;
Object.defineProperty(exports, 'OFFSET3K_USERLOGO', {value:OFFSET3K_USERLOGO, configurable:false, writable:false});

const OFFSET3K_0x100FREE2 = 3840;
Object.defineProperty(exports, 'OFFSET3K_0x100FREE2', {value:OFFSET3K_0x100FREE2, configurable:false, writable:false});

const OFFSET3K_LOGICOUTPUTPRG = 4096;
Object.defineProperty(exports, 'OFFSET3K_LOGICOUTPUTPRG', {value:OFFSET3K_LOGICOUTPUTPRG, configurable:false, writable:false});

const OFFSET3K_LOGICINPUTPRG = 12288;
Object.defineProperty(exports, 'OFFSET3K_LOGICINPUTPRG', {value:OFFSET3K_LOGICINPUTPRG, configurable:false, writable:false});

const OFFSET3K_POINTPRG = 65536;
Object.defineProperty(exports, 'OFFSET3K_POINTPRG', {value:OFFSET3K_POINTPRG, configurable:false, writable:false});

const OFFSET3K_AREAPRG = 81920;
Object.defineProperty(exports, 'OFFSET3K_AREAPRG', {value:OFFSET3K_AREAPRG, configurable:false, writable:false});

const MEMMAP3KDYN_BASE_ADDRESS = 1611661312;
Object.defineProperty(exports, 'MEMMAP3KDYN_BASE_ADDRESS', {value:MEMMAP3KDYN_BASE_ADDRESS, configurable:false, writable:false});

const OFFSET3K_BOARD = 0;
Object.defineProperty(exports, 'OFFSET3K_BOARD', {value:OFFSET3K_BOARD, configurable:false, writable:false});

const OFFSET3K_PCPACKET = 256;
Object.defineProperty(exports, 'OFFSET3K_PCPACKET', {value:OFFSET3K_PCPACKET, configurable:false, writable:false});

const OFFSET3K_LINE = 512;
Object.defineProperty(exports, 'OFFSET3K_LINE', {value:OFFSET3K_LINE, configurable:false, writable:false});

const OFFSET3K_GSMMODEM = 768;
Object.defineProperty(exports, 'OFFSET3K_GSMMODEM', {value:OFFSET3K_GSMMODEM, configurable:false, writable:false});

const OFFSET3K_NETPACKET = 1024;
Object.defineProperty(exports, 'OFFSET3K_NETPACKET', {value:OFFSET3K_NETPACKET, configurable:false, writable:false});

const OFFSET3K_POINT = 65536;
Object.defineProperty(exports, 'OFFSET3K_POINT', {value:OFFSET3K_POINT, configurable:false, writable:false});

const OFFSET3K_AREA = 73728;
Object.defineProperty(exports, 'OFFSET3K_AREA', {value:OFFSET3K_AREA, configurable:false, writable:false});

const OFFSET3K_GSMMESSAGE = 77824;
Object.defineProperty(exports, 'OFFSET3K_GSMMESSAGE', {value:OFFSET3K_GSMMESSAGE, configurable:false, writable:false});

const MEMMAP3KEVENT_BASE_ADDRESS = 1611857920;
Object.defineProperty(exports, 'MEMMAP3KEVENT_BASE_ADDRESS', {value:MEMMAP3KEVENT_BASE_ADDRESS, configurable:false, writable:false});

const MEMMAP3KREPORT_BASE_ADDRESS = 1611923456;
Object.defineProperty(exports, 'MEMMAP3KREPORT_BASE_ADDRESS', {value:MEMMAP3KREPORT_BASE_ADDRESS, configurable:false, writable:false});


class CAPACALC_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.c = 0;    

    if(buf instanceof Buffer) {
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
    this.c = buf.readUInt8(offset++);
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.c, offset++);
    return offset;
  }
}
Object.defineProperty(exports, 'CAPACALC_STRUCT', {value:CAPACALC_STRUCT, configurable:false, writable:false});
const TEST_STRUCT = CAPACALC_STRUCT;
Object.defineProperty(exports, 'TEST_STRUCT', {value:TEST_STRUCT, configurable:false, writable:false});


class GENERAL_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.serialnum = '';
    this.pcaddress = 0;
    this.sitetext = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.shaddr = 0;
    this.options = 0;
    this.sumday = 0;
    this.summonth = 0;
    this.winday = 0;
    this.winmonth = 0;
    this.autosumwin = 0;
    this.min_addressa = 0;
    this.max_addressa = 0;
    this.min_addressb = 0;
    this.max_addressb = 0;
    this.teststartday = 0;
    this.teststarthour = 0;
    this.testboardlimit = 0;
    this.testpointlimit = 0;
    this.basepolldelay = 0;
    this.capfactor = 0;
    this.testallminutes = 0;
    this.FREE1 = 0;
    this.blockmainsfault = 0;
    this.panelcount = 0;
    this.areamaxminutes = 0;
    this.mygsmnumber = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.gsmoperator = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.gsmcountrycode = [0,0,0,0];
    this.gsmvalid = 0;
    this.gsmoptions = 0;
    this.gsmconnectioncallday = 0;
    this.gsmconnectioncallhour = 0;
    this.gsmconnectioncallminute = 0;
    this.gsmconnectioncallnumber = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.gsmstatusseparator = 0;
    this.minfaultminutes = 0;
    this.pointtoserviceminutes = 0;
    this.serviceday = 0;
    this.servicestarthour = 0;
    this.serviceendhour = 0;
    this.smsoutminutelimit = 0;
    this.startuptesttime = 0;
    this.masteruser = 0;
    this.shortcircuitpollid = 0;
    this.mainstriggerareas = [0,0,0,0,0,0,0,0];
    this.cpcs1 = new Array(8);
    this.cpcs1[0] = new CAPACALC_STRUCT();
    this.cpcs1[1] = new CAPACALC_STRUCT();
    this.cpcs1[2] = new CAPACALC_STRUCT();
    this.cpcs1[3] = new CAPACALC_STRUCT();
    this.cpcs1[4] = new CAPACALC_STRUCT();
    this.cpcs1[5] = new CAPACALC_STRUCT();
    this.cpcs1[6] = new CAPACALC_STRUCT();
    this.cpcs1[7] = new CAPACALC_STRUCT();
;
    this.cpcs2 = new Array(8);
    this.cpcs2[0] = new CAPACALC_STRUCT();
    this.cpcs2[1] = new CAPACALC_STRUCT();
    this.cpcs2[2] = new CAPACALC_STRUCT();
    this.cpcs2[3] = new CAPACALC_STRUCT();
    this.cpcs2[4] = new CAPACALC_STRUCT();
    this.cpcs2[5] = new CAPACALC_STRUCT();
    this.cpcs2[6] = new CAPACALC_STRUCT();
    this.cpcs2[7] = new CAPACALC_STRUCT();
;
    this.skipbatterytestweek = [0,0,0,0,0,0,0,0];
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 16;
    offset += 2;
    offset += 32;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 16;
    offset += 32;
    offset += 4;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 16;
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 8;
    offset = CAPACALC_STRUCT.size(offset) * 8;
    offset = CAPACALC_STRUCT.size(offset) * 8;
    offset += 8;
    offset += 51;
    return offset;
  }

  size(offset=0) {
    offset += 16;
    offset += 2;
    offset += 32;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 16;
    offset += 32;
    offset += 4;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 16;
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 8;
    for(let item of this.cpcs1) { offset += item.size(); }
    for(let item of this.cpcs2) { offset += item.size(); }
    offset += 8;
    offset += 51;
    return offset;
  }

  read(buf, offset=0) {
    this.serialnum = readString(buf, offset, 16, utf-8); offset += 16;
    this.pcaddress = buf.readUInt16LE(offset); offset += 2;
    this.sitetext = [];
    for(let i=0; i<32; i++) { this.sitetext.push(buf.readUInt8(offset++)); }
    this.shaddr = buf.readUInt8(offset++);
    this.options = buf.readUInt8(offset++);
    this.sumday = buf.readUInt8(offset++);
    this.summonth = buf.readUInt8(offset++);
    this.winday = buf.readUInt8(offset++);
    this.winmonth = buf.readUInt8(offset++);
    this.autosumwin = buf.readUInt8(offset++);
    this.min_addressa = buf.readUInt8(offset++);
    this.max_addressa = buf.readUInt8(offset++);
    this.min_addressb = buf.readUInt8(offset++);
    this.max_addressb = buf.readUInt8(offset++);
    this.teststartday = buf.readUInt8(offset++);
    this.teststarthour = buf.readUInt8(offset++);
    this.testboardlimit = buf.readUInt8(offset++);
    this.testpointlimit = buf.readUInt8(offset++);
    this.basepolldelay = buf.readUInt8(offset++);
    this.capfactor = buf.readUInt8(offset++);
    this.testallminutes = buf.readUInt8(offset++);
    this.FREE1 = buf.readUInt8(offset++);
    this.blockmainsfault = buf.readUInt8(offset++);
    this.panelcount = buf.readUInt8(offset++);
    this.areamaxminutes = buf.readUInt8(offset++);
    this.mygsmnumber = [];
    for(let i=0; i<16; i++) { this.mygsmnumber.push(buf.readUInt8(offset++)); }
    this.gsmoperator = [];
    for(let i=0; i<32; i++) { this.gsmoperator.push(buf.readUInt8(offset++)); }
    this.gsmcountrycode = [];
    for(let i=0; i<4; i++) { this.gsmcountrycode.push(buf.readUInt8(offset++)); }
    this.gsmvalid = buf.readUInt8(offset++);
    this.gsmoptions = buf.readUInt8(offset++);
    this.gsmconnectioncallday = buf.readUInt8(offset++);
    this.gsmconnectioncallhour = buf.readUInt8(offset++);
    this.gsmconnectioncallminute = buf.readUInt8(offset++);
    this.gsmconnectioncallnumber = [];
    for(let i=0; i<16; i++) { this.gsmconnectioncallnumber.push(buf.readUInt8(offset++)); }
    this.gsmstatusseparator = buf.readUInt8(offset++);
    this.minfaultminutes = buf.readUInt16LE(offset); offset += 2;
    this.pointtoserviceminutes = buf.readUInt16LE(offset); offset += 2;
    this.serviceday = buf.readUInt8(offset++);
    this.servicestarthour = buf.readUInt8(offset++);
    this.serviceendhour = buf.readUInt8(offset++);
    this.smsoutminutelimit = buf.readUInt8(offset++);
    this.startuptesttime = buf.readUInt8(offset++);
    this.masteruser = buf.readUInt8(offset++);
    this.shortcircuitpollid = buf.readUInt8(offset++);
    this.mainstriggerareas = [];
    for(let i=0; i<8; i++) { this.mainstriggerareas.push(buf.readUInt8(offset++)); }
    this.cpcs1 = new Array(8);
    for(let i=0; i<8; i++) {
      this.cpcs1[i] = new CAPACALC_STRUCT(buf, offset);
      offset += this.cpcs1[i].size();
    }
    this.cpcs2 = new Array(8);
    for(let i=0; i<8; i++) {
      this.cpcs2[i] = new CAPACALC_STRUCT(buf, offset);
      offset += this.cpcs2[i].size();
    }
    this.skipbatterytestweek = [];
    for(let i=0; i<8; i++) { this.skipbatterytestweek.push(buf.readUInt8(offset++)); }
    this.res = [];
    for(let i=0; i<51; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    offset = writeString(buf, offset, this.serialnum, 16, utf-8);
    buf.writeUInt16LE(this.pcaddress, offset); offset += 2;
    for(let i=0; i<32; i++) { buf.writeUInt8(this.sitetext[i], offset++); }
    buf.writeUInt8(this.shaddr, offset++);
    buf.writeUInt8(this.options, offset++);
    buf.writeUInt8(this.sumday, offset++);
    buf.writeUInt8(this.summonth, offset++);
    buf.writeUInt8(this.winday, offset++);
    buf.writeUInt8(this.winmonth, offset++);
    buf.writeUInt8(this.autosumwin, offset++);
    buf.writeUInt8(this.min_addressa, offset++);
    buf.writeUInt8(this.max_addressa, offset++);
    buf.writeUInt8(this.min_addressb, offset++);
    buf.writeUInt8(this.max_addressb, offset++);
    buf.writeUInt8(this.teststartday, offset++);
    buf.writeUInt8(this.teststarthour, offset++);
    buf.writeUInt8(this.testboardlimit, offset++);
    buf.writeUInt8(this.testpointlimit, offset++);
    buf.writeUInt8(this.basepolldelay, offset++);
    buf.writeUInt8(this.capfactor, offset++);
    buf.writeUInt8(this.testallminutes, offset++);
    buf.writeUInt8(this.FREE1, offset++);
    buf.writeUInt8(this.blockmainsfault, offset++);
    buf.writeUInt8(this.panelcount, offset++);
    buf.writeUInt8(this.areamaxminutes, offset++);
    for(let i=0; i<16; i++) { buf.writeUInt8(this.mygsmnumber[i], offset++); }
    for(let i=0; i<32; i++) { buf.writeUInt8(this.gsmoperator[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.gsmcountrycode[i], offset++); }
    buf.writeUInt8(this.gsmvalid, offset++);
    buf.writeUInt8(this.gsmoptions, offset++);
    buf.writeUInt8(this.gsmconnectioncallday, offset++);
    buf.writeUInt8(this.gsmconnectioncallhour, offset++);
    buf.writeUInt8(this.gsmconnectioncallminute, offset++);
    for(let i=0; i<16; i++) { buf.writeUInt8(this.gsmconnectioncallnumber[i], offset++); }
    buf.writeUInt8(this.gsmstatusseparator, offset++);
    buf.writeUInt16LE(this.minfaultminutes, offset); offset += 2;
    buf.writeUInt16LE(this.pointtoserviceminutes, offset); offset += 2;
    buf.writeUInt8(this.serviceday, offset++);
    buf.writeUInt8(this.servicestarthour, offset++);
    buf.writeUInt8(this.serviceendhour, offset++);
    buf.writeUInt8(this.smsoutminutelimit, offset++);
    buf.writeUInt8(this.startuptesttime, offset++);
    buf.writeUInt8(this.masteruser, offset++);
    buf.writeUInt8(this.shortcircuitpollid, offset++);
    for(let i=0; i<8; i++) { buf.writeUInt8(this.mainstriggerareas[i], offset++); }
    for(let item of this.cpcs1) { offset = item.write(buf, offset); }
    for(let item of this.cpcs2) { offset = item.write(buf, offset); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.skipbatterytestweek[i], offset++); }
    for(let i=0; i<51; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'GENERAL_PRG_STRUCT', {value:GENERAL_PRG_STRUCT, configurable:false, writable:false});

const GENERAL_PRG_STRUCT_ADDRESS = 1611137024;
Object.defineProperty(exports, 'GENERAL_PRG_STRUCT_ADDRESS', {value:GENERAL_PRG_STRUCT_ADDRESS, configurable:false, writable:false});


class LINEAREAS_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.aline = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.bline = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32 * 2;
    offset += 32 * 2;
    return offset;
  }

  size(offset=0) {
    offset += 32 * 2;
    offset += 32 * 2;
    return offset;
  }

  read(buf, offset=0) {
        for(let i=0; i<32; i++) { this.aline.push(buf.readUInt16LE(offset)); offset += 2; }
        for(let i=0; i<32; i++) { this.bline.push(buf.readUInt16LE(offset)); offset += 2; }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<32; i++) { buf.writeUInt16LE(this.aline[i], offset); offset += 2; }
    for(let i=0; i<32; i++) { buf.writeUInt16LE(this.bline[i], offset); offset += 2; }
    return offset;
  }
}
Object.defineProperty(exports, 'LINEAREAS_PRG_STRUCT', {value:LINEAREAS_PRG_STRUCT, configurable:false, writable:false});


class LINESETUP3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.lap = new LINEAREAS_PRG_STRUCT();
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset = LINEAREAS_PRG_STRUCT.size(offset);
    offset += 128;
    return offset;
  }

  size(offset=0) {
    offset += this.lap.size();
    offset += 128;
    return offset;
  }

  read(buf, offset=0) {
    offset = this.lap.read(buf, offset);
    this.res = [];
    for(let i=0; i<128; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    offset = this.lap.write(buf, offset);
    for(let i=0; i<128; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'LINESETUP3K_PRG_STRUCT', {value:LINESETUP3K_PRG_STRUCT, configurable:false, writable:false});

const LINESETUP3K_PRG_STRUCT_ADDRESS = 1611137280;
Object.defineProperty(exports, 'LINESETUP3K_PRG_STRUCT_ADDRESS', {value:LINESETUP3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});


class GSMRECEIVER3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.name = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.number = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.pin = [0,0,0,0,0,0];
    this.area = [0,0,0,0,0,0,0,0];
    this.options = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 20;
    offset += 16;
    offset += 6;
    offset += 8;
    offset++;
    offset += 13;
    return offset;
  }

  size(offset=0) {
    offset += 20;
    offset += 16;
    offset += 6;
    offset += 8;
    offset++;
    offset += 13;
    return offset;
  }

  read(buf, offset=0) {
    this.name = [];
    for(let i=0; i<20; i++) { this.name.push(buf.readUInt8(offset++)); }
    this.number = [];
    for(let i=0; i<16; i++) { this.number.push(buf.readUInt8(offset++)); }
    this.pin = [];
    for(let i=0; i<6; i++) { this.pin.push(buf.readUInt8(offset++)); }
    this.area = [];
    for(let i=0; i<8; i++) { this.area.push(buf.readUInt8(offset++)); }
    this.options = buf.readUInt8(offset++);
    this.res = [];
    for(let i=0; i<13; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<20; i++) { buf.writeUInt8(this.name[i], offset++); }
    for(let i=0; i<16; i++) { buf.writeUInt8(this.number[i], offset++); }
    for(let i=0; i<6; i++) { buf.writeUInt8(this.pin[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.area[i], offset++); }
    buf.writeUInt8(this.options, offset++);
    for(let i=0; i<13; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'GSMRECEIVER3K_PRG_STRUCT', {value:GSMRECEIVER3K_PRG_STRUCT, configurable:false, writable:false});

const GSMRECEIVER3K_PRG_STRUCT_ADDRESS = 1611137536;
Object.defineProperty(exports, 'GSMRECEIVER3K_PRG_STRUCT_ADDRESS', {value:GSMRECEIVER3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});


class USER3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.name = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.area = [0,0,0,0,0,0,0,0];
    this.fastfunc = [0,0,0,0,0,0];
    this.options = 0;
    this.ff_area = 0;
    this.ff_point = 0;
    this.ff_data = 0;
    this.code = [0,0,0,0,0,0];
    this.kl = 0;
    this.testcode = 0;
    this.alertsound = 0;
    this.reserved = [0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32;
    offset += 8;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset += 5;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    offset += 8;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset += 5;
    return offset;
  }

  read(buf, offset=0) {
    this.name = [];
    for(let i=0; i<32; i++) { this.name.push(buf.readUInt8(offset++)); }
    this.area = [];
    for(let i=0; i<8; i++) { this.area.push(buf.readUInt8(offset++)); }
    this.fastfunc = [];
    for(let i=0; i<6; i++) { this.fastfunc.push(buf.readUInt8(offset++)); }
    this.options = buf.readUInt8(offset++);
    this.ff_area = buf.readUInt8(offset++);
    this.ff_point = buf.readUInt8(offset++);
    this.ff_data = buf.readUInt8(offset++);
    this.code = [];
    for(let i=0; i<6; i++) { this.code.push(buf.readUInt8(offset++)); }
    this.kl = buf.readUInt8(offset++);
    this.testcode = buf.readUInt8(offset++);
    this.alertsound = buf.readUInt8(offset++);
    this.reserved = [];
    for(let i=0; i<5; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<32; i++) { buf.writeUInt8(this.name[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.area[i], offset++); }
    for(let i=0; i<6; i++) { buf.writeUInt8(this.fastfunc[i], offset++); }
    buf.writeUInt8(this.options, offset++);
    buf.writeUInt8(this.ff_area, offset++);
    buf.writeUInt8(this.ff_point, offset++);
    buf.writeUInt8(this.ff_data, offset++);
    for(let i=0; i<6; i++) { buf.writeUInt8(this.code[i], offset++); }
    buf.writeUInt8(this.kl, offset++);
    buf.writeUInt8(this.testcode, offset++);
    buf.writeUInt8(this.alertsound, offset++);
    for(let i=0; i<5; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'USER3K_PRG_STRUCT', {value:USER3K_PRG_STRUCT, configurable:false, writable:false});
const KLG3K_PRG_STRUCT = USER3K_PRG_STRUCT;
Object.defineProperty(exports, 'KLG3K_PRG_STRUCT', {value:KLG3K_PRG_STRUCT, configurable:false, writable:false});

const USER3K_PRG_STRUCT_ADDRESS = 1611138048;
Object.defineProperty(exports, 'USER3K_PRG_STRUCT_ADDRESS', {value:USER3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const KLG3K_PRG_STRUCT_ADDRESS = 1611138560;
Object.defineProperty(exports, 'KLG3K_PRG_STRUCT_ADDRESS', {value:KLG3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});


class IO3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.name = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.area = [0,0,0,0,0,0,0,0];
    this.type = 0;
    this.function = 0;
    this.devicetype = 0;
    this.deviceaddress = 0;
    this.deviceionumber = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32;
    offset += 8;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 19;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    offset += 8;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 19;
    return offset;
  }

  read(buf, offset=0) {
    this.name = [];
    for(let i=0; i<32; i++) { this.name.push(buf.readUInt8(offset++)); }
    this.area = [];
    for(let i=0; i<8; i++) { this.area.push(buf.readUInt8(offset++)); }
    this.type = buf.readUInt8(offset++);
    this.function = buf.readUInt8(offset++);
    this.devicetype = buf.readUInt8(offset++);
    this.deviceaddress = buf.readUInt8(offset++);
    this.deviceionumber = buf.readUInt8(offset++);
    this.res = [];
    for(let i=0; i<19; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<32; i++) { buf.writeUInt8(this.name[i], offset++); }
    for(let i=0; i<8; i++) { buf.writeUInt8(this.area[i], offset++); }
    buf.writeUInt8(this.type, offset++);
    buf.writeUInt8(this.function, offset++);
    buf.writeUInt8(this.devicetype, offset++);
    buf.writeUInt8(this.deviceaddress, offset++);
    buf.writeUInt8(this.deviceionumber, offset++);
    for(let i=0; i<19; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'IO3K_PRG_STRUCT', {value:IO3K_PRG_STRUCT, configurable:false, writable:false});
const MAINOUTPUT3K_PRG_STRUCT = IO3K_PRG_STRUCT;
Object.defineProperty(exports, 'MAINOUTPUT3K_PRG_STRUCT', {value:MAINOUTPUT3K_PRG_STRUCT, configurable:false, writable:false});
const MAININPUT3K_PRG_STRUCT = IO3K_PRG_STRUCT;
Object.defineProperty(exports, 'MAININPUT3K_PRG_STRUCT', {value:MAININPUT3K_PRG_STRUCT, configurable:false, writable:false});
const LOGICOUTPUT3K_PRG_STRUCT = IO3K_PRG_STRUCT;
Object.defineProperty(exports, 'LOGICOUTPUT3K_PRG_STRUCT', {value:LOGICOUTPUT3K_PRG_STRUCT, configurable:false, writable:false});
const LOGICINPUT3K_PRG_STRUCT = IO3K_PRG_STRUCT;
Object.defineProperty(exports, 'LOGICINPUT3K_PRG_STRUCT', {value:LOGICINPUT3K_PRG_STRUCT, configurable:false, writable:false});

const MAINOUTPUT3K_PRG_STRUCT_ADDRESS = 1611139072;
Object.defineProperty(exports, 'MAINOUTPUT3K_PRG_STRUCT_ADDRESS', {value:MAINOUTPUT3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const MAINOUTPUT3K_PRG_STRUCT_COUNT = 8;
Object.defineProperty(exports, 'MAINOUTPUT3K_PRG_STRUCT_COUNT', {value:MAINOUTPUT3K_PRG_STRUCT_COUNT, configurable:false, writable:false});

const MAININPUT3K_PRG_STRUCT_ADDRESS = 1611139584;
Object.defineProperty(exports, 'MAININPUT3K_PRG_STRUCT_ADDRESS', {value:MAININPUT3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const MAININPUT3K_PRG_STRUCT_COUNT = 8;
Object.defineProperty(exports, 'MAININPUT3K_PRG_STRUCT_COUNT', {value:MAININPUT3K_PRG_STRUCT_COUNT, configurable:false, writable:false});

const LOGICOUTPUT3K_PRG_STRUCT_ADDRESS = 1611141120;
Object.defineProperty(exports, 'LOGICOUTPUT3K_PRG_STRUCT_ADDRESS', {value:LOGICOUTPUT3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const LOGICOUTPUT3K_PRG_STRUCT_COUNT = 256;
Object.defineProperty(exports, 'LOGICOUTPUT3K_PRG_STRUCT_COUNT', {value:LOGICOUTPUT3K_PRG_STRUCT_COUNT, configurable:false, writable:false});

const LOGICINPUT3K_PRG_STRUCT_ADDRESS = 1611149312;
Object.defineProperty(exports, 'LOGICINPUT3K_PRG_STRUCT_ADDRESS', {value:LOGICINPUT3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const LOGICINPUT3K_PRG_STRUCT_COUNT = 256;
Object.defineProperty(exports, 'LOGICINPUT3K_PRG_STRUCT_COUNT', {value:LOGICINPUT3K_PRG_STRUCT_COUNT, configurable:false, writable:false});


class POINT3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.name = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.area = [0,0,0,0];
    this.type = 0;
    this.modebpp = 0;
    this.warea = 0;
    this.ia_setup = 0;
    this.cpcsptr = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 32;
    offset += 4;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset += 22;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    offset += 4;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset += 22;
    return offset;
  }

  read(buf, offset=0) {
    this.name = [];
    for(let i=0; i<32; i++) { this.name.push(buf.readUInt8(offset++)); }
    this.area = [];
    for(let i=0; i<4; i++) { this.area.push(buf.readUInt8(offset++)); }
    this.type = buf.readUInt8(offset++);
    this.modebpp = buf.readUInt8(offset++);
    this.warea = buf.readUInt16LE(offset); offset += 2;
    this.ia_setup = buf.readUInt8(offset++);
    this.cpcsptr = buf.readUInt8(offset++);
    this.res = [];
    for(let i=0; i<22; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<32; i++) { buf.writeUInt8(this.name[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.area[i], offset++); }
    buf.writeUInt8(this.type, offset++);
    buf.writeUInt8(this.modebpp, offset++);
    buf.writeUInt16LE(this.warea, offset); offset += 2;
    buf.writeUInt8(this.ia_setup, offset++);
    buf.writeUInt8(this.cpcsptr, offset++);
    for(let i=0; i<22; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'POINT3K_PRG_STRUCT', {value:POINT3K_PRG_STRUCT, configurable:false, writable:false});

const POINT3K_PRG_STRUCT_ADDRESS = 1611202560;
Object.defineProperty(exports, 'POINT3K_PRG_STRUCT_ADDRESS', {value:POINT3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const POINT3K_PRG_STRUCT_COUNT = 254;
Object.defineProperty(exports, 'POINT3K_PRG_STRUCT_COUNT', {value:POINT3K_PRG_STRUCT_COUNT, configurable:false, writable:false});


class NCSRC3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.paneladdr = 0;
    this.source = 0;    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset += 2;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset += 2;
    return offset;
  }

  read(buf, offset=0) {
    this.paneladdr = buf.readUInt16LE(offset); offset += 2;
    this.source = buf.readUInt16LE(offset); offset += 2;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.paneladdr, offset); offset += 2;
    buf.writeUInt16LE(this.source, offset); offset += 2;
    return offset;
  }
}
Object.defineProperty(exports, 'NCSRC3K_PRG_STRUCT', {value:NCSRC3K_PRG_STRUCT, configurable:false, writable:false});


class AREA3K_PRG_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.name = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.nobatt_lowbrightness = 0;
    this.nobatt_highbrightness = 0;
    this.options = 0;
    this.hexit_normalmode = 0;
    this.hexit_activemode = 0;
    this.net = new Array(6);
    this.net[0] = new NCSRC3K_PRG_STRUCT();
    this.net[1] = new NCSRC3K_PRG_STRUCT();
    this.net[2] = new NCSRC3K_PRG_STRUCT();
    this.net[3] = new NCSRC3K_PRG_STRUCT();
    this.net[4] = new NCSRC3K_PRG_STRUCT();
    this.net[5] = new NCSRC3K_PRG_STRUCT();
;
    this.res = [0,0,0];    

    if(buf instanceof Buffer) {
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
    offset = NCSRC3K_PRG_STRUCT.size(offset) * 6;
    offset += 3;
    return offset;
  }

  size(offset=0) {
    offset += 32;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    for(let item of this.net) { offset += item.size(); }
    offset += 3;
    return offset;
  }

  read(buf, offset=0) {
    this.name = [];
    for(let i=0; i<32; i++) { this.name.push(buf.readUInt8(offset++)); }
    this.nobatt_lowbrightness = buf.readUInt8(offset++);
    this.nobatt_highbrightness = buf.readUInt8(offset++);
    this.options = buf.readUInt8(offset++);
    this.hexit_normalmode = buf.readUInt8(offset++);
    this.hexit_activemode = buf.readUInt8(offset++);
    this.net = new Array(6);
    for(let i=0; i<6; i++) {
      this.net[i] = new NCSRC3K_PRG_STRUCT(buf, offset);
      offset += this.net[i].size();
    }
    this.res = [];
    for(let i=0; i<3; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<32; i++) { buf.writeUInt8(this.name[i], offset++); }
    buf.writeUInt8(this.nobatt_lowbrightness, offset++);
    buf.writeUInt8(this.nobatt_highbrightness, offset++);
    buf.writeUInt8(this.options, offset++);
    buf.writeUInt8(this.hexit_normalmode, offset++);
    buf.writeUInt8(this.hexit_activemode, offset++);
    for(let item of this.net) { offset = item.write(buf, offset); }
    for(let i=0; i<3; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'AREA3K_PRG_STRUCT', {value:AREA3K_PRG_STRUCT, configurable:false, writable:false});

const AREA3K_PRG_STRUCT_ADDRESS = 1611218944;
Object.defineProperty(exports, 'AREA3K_PRG_STRUCT_ADDRESS', {value:AREA3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});

const AREA3K_PRG_STRUCT_COUNT = 32;
Object.defineProperty(exports, 'AREA3K_PRG_STRUCT_COUNT', {value:AREA3K_PRG_STRUCT_COUNT, configurable:false, writable:false});


class NEPTOADVALUES3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.avoltage = 0;
    this.acurrent = 0;
    this.bvoltage = 0;
    this.bcurrent = 0;
    this.fusef3 = 0;
    this.fusef4 = 0;
    this.fusef2batt = 0;
    this.fusef1dcin = 0;
    this.fusef6 = 0;
    this.reserved = 0;    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    return offset;
  }

  read(buf, offset=0) {
    this.avoltage = buf.readUInt16LE(offset); offset += 2;
    this.acurrent = buf.readUInt16LE(offset); offset += 2;
    this.bvoltage = buf.readUInt16LE(offset); offset += 2;
    this.bcurrent = buf.readUInt16LE(offset); offset += 2;
    this.fusef3 = buf.readUInt16LE(offset); offset += 2;
    this.fusef4 = buf.readUInt16LE(offset); offset += 2;
    this.fusef2batt = buf.readUInt16LE(offset); offset += 2;
    this.fusef1dcin = buf.readUInt16LE(offset); offset += 2;
    this.fusef6 = buf.readUInt16LE(offset); offset += 2;
    this.reserved = buf.readUInt16LE(offset); offset += 2;
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.avoltage, offset); offset += 2;
    buf.writeUInt16LE(this.acurrent, offset); offset += 2;
    buf.writeUInt16LE(this.bvoltage, offset); offset += 2;
    buf.writeUInt16LE(this.bcurrent, offset); offset += 2;
    buf.writeUInt16LE(this.fusef3, offset); offset += 2;
    buf.writeUInt16LE(this.fusef4, offset); offset += 2;
    buf.writeUInt16LE(this.fusef2batt, offset); offset += 2;
    buf.writeUInt16LE(this.fusef1dcin, offset); offset += 2;
    buf.writeUInt16LE(this.fusef6, offset); offset += 2;
    buf.writeUInt16LE(this.reserved, offset); offset += 2;
    return offset;
  }
}
Object.defineProperty(exports, 'NEPTOADVALUES3K_STRUCT', {value:NEPTOADVALUES3K_STRUCT, configurable:false, writable:false});


class BOARD3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.dcin = 0;
    this.dcinslot = 0;
    this.dcinnewslot = 0;
    this.dcinslotcntr = 0;
    this.dcinnoisycntr = 0;
    this.batt = 0;
    this.battslot = 0;
    this.battnewslot = 0;
    this.battslotcntr = 0;
    this.battnoisycntr = 0;
    this.charger = 0;
    this.chargerslot = 0;
    this.chargernewslot = 0;
    this.chargerslotcntr = 0;
    this.chargernoisycntr = 0;
    this.fuse3 = 0;
    this.fuse3slot = 0;
    this.fuse3newslot = 0;
    this.fuse3slotcntr = 0;
    this.fuse3noisycntr = 0;
    this.fuse4 = 0;
    this.fuse4slot = 0;
    this.fuse4newslot = 0;
    this.fuse4slotcntr = 0;
    this.fuse4noisycntr = 0;
    this.fuse6 = 0;
    this.fuse6slot = 0;
    this.fuse6newslot = 0;
    this.fuse6slotcntr = 0;
    this.fuse6noisycntr = 0;
    this.chargerref = 0;
    this.measdelay = 0;
    this.measlimit = 0;
    this.outputs = 0;
    this.abcontrol = 0;
    this.abcontroldelay = 0;
    this.batttestdelay = 0;
    this.linelowdelay = 0;
    this.linelowlimit = 0;
    this.runninghours = 0;
    this.tothours = 0;
    this.oldhour = 0;
    this.datetime = new TDATETIME3K_STRUCT();
    this.testscleared = 0;
    this.domanualreport = 0;
    this.pcrelaycontrol = 0;
    this.abservice = 0;
    this.testall = 0;
    this.testallminutes = 0;
    this.blockmainsminutes = 0;
    this.dcoktolines = 0;
    this.needclock = 0;
    this.lineoff = 0;
    this.lineoffminutes = 0;
    this.faultactivecounter = 0;
    this.tampercounter = 0;
    this.createblistweek = 0;
    this.alinebacksecond = 0;
    this.blinebacksecond = 0;
    this.alineshortvoltage = 0;
    this.blineshortvoltage = 0;
    this.wdbeenthere = 0;
    this.alinescvoltage = 0;
    this.blinescvoltage = 0;
    this.batterystate = 0;
    this.batteryflags = 0;
    this.batterytestvalue = 0;
    this.batterywithcharger = 0;
    this.batterycharger = 0;
    this.batterymainstrigger = 0;
    this.batterypins = 0;
    this.batteryresistance = 0;
    this.batteryload1voltage = 0;
    this.batteryload2voltage = 0;
    this.capacityvoltagestart = 0;
    this.capacityvoltagenow = 0;
    this.capacityminutes = 0;
    this.nad = new NEPTOADVALUES3K_STRUCT();
    this.sumdone = 0;
    this.windone = 0;
    this.oldmin = 0;
    this.oldsec = 0;
    this.cancelstartuptest = 0;
    this.paneldisabled = 0;
    this.watts = 0;
    this.wattshour = 0;
    this.randomtestactive = 0;
    this.randomteststart = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset += 4;
    offset++;
    offset = TDATETIME3K_STRUCT.size(offset);
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset += 4;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset = NEPTOADVALUES3K_STRUCT.size(offset);
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 4;
    offset += 4;
    offset += 4;
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset += 4;
    offset += 89;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset += 4;
    offset++;
    offset += this.datetime.size();
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset += 4;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset += this.nad.size();
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 4;
    offset += 4;
    offset += 4;


    offset += 4;
    offset += 89;
    return offset;
  }

  read(buf, offset=0) {
    this.dcin = buf.readUInt16LE(offset); offset += 2;
    this.dcinslot = buf.readUInt8(offset++);
    this.dcinnewslot = buf.readUInt8(offset++);
    this.dcinslotcntr = buf.readUInt8(offset++);
    this.dcinnoisycntr = buf.readUInt8(offset++);
    this.batt = buf.readUInt16LE(offset); offset += 2;
    this.battslot = buf.readUInt8(offset++);
    this.battnewslot = buf.readUInt8(offset++);
    this.battslotcntr = buf.readUInt8(offset++);
    this.battnoisycntr = buf.readUInt8(offset++);
    this.charger = buf.readUInt16LE(offset); offset += 2;
    this.chargerslot = buf.readUInt8(offset++);
    this.chargernewslot = buf.readUInt8(offset++);
    this.chargerslotcntr = buf.readUInt8(offset++);
    this.chargernoisycntr = buf.readUInt8(offset++);
    this.fuse3 = buf.readUInt16LE(offset); offset += 2;
    this.fuse3slot = buf.readUInt8(offset++);
    this.fuse3newslot = buf.readUInt8(offset++);
    this.fuse3slotcntr = buf.readUInt8(offset++);
    this.fuse3noisycntr = buf.readUInt8(offset++);
    this.fuse4 = buf.readUInt16LE(offset); offset += 2;
    this.fuse4slot = buf.readUInt8(offset++);
    this.fuse4newslot = buf.readUInt8(offset++);
    this.fuse4slotcntr = buf.readUInt8(offset++);
    this.fuse4noisycntr = buf.readUInt8(offset++);
    this.fuse6 = buf.readUInt16LE(offset); offset += 2;
    this.fuse6slot = buf.readUInt8(offset++);
    this.fuse6newslot = buf.readUInt8(offset++);
    this.fuse6slotcntr = buf.readUInt8(offset++);
    this.fuse6noisycntr = buf.readUInt8(offset++);
    this.chargerref = buf.readUInt16LE(offset); offset += 2;
    this.measdelay = buf.readUInt16LE(offset); offset += 2;
    this.measlimit = buf.readUInt16LE(offset); offset += 2;
    this.outputs = buf.readUInt8(offset++);
    this.abcontrol = buf.readUInt8(offset++);
    this.abcontroldelay = buf.readUInt8(offset++);
    this.batttestdelay = buf.readUInt16LE(offset); offset += 2;
    this.linelowdelay = buf.readUInt16LE(offset); offset += 2;
    this.linelowlimit = buf.readUInt16LE(offset); offset += 2;
    this.runninghours = buf.readUInt32LE(offset); offset += 4;
    this.tothours = buf.readUInt32LE(offset); offset += 4;
    this.oldhour = buf.readUInt8(offset++);
    offset = this.datetime.read(buf, offset);
    this.testscleared = buf.readUInt8(offset++);
    this.domanualreport = buf.readUInt8(offset++);
    this.pcrelaycontrol = buf.readUInt8(offset++);
    this.abservice = buf.readUInt8(offset++);
    this.testall = buf.readUInt8(offset++);
    this.testallminutes = buf.readUInt8(offset++);
    this.blockmainsminutes = buf.readUInt8(offset++);
    this.dcoktolines = buf.readUInt8(offset++);
    this.needclock = buf.readUInt8(offset++);
    this.lineoff = buf.readUInt8(offset++);
    this.lineoffminutes = buf.readUInt16LE(offset); offset += 2;
    this.faultactivecounter = buf.readUInt16LE(offset); offset += 2;
    this.tampercounter = buf.readUInt16LE(offset); offset += 2;
    this.createblistweek = buf.readUInt8(offset++);
    this.alinebacksecond = buf.readUInt8(offset++);
    this.blinebacksecond = buf.readUInt8(offset++);
    this.alineshortvoltage = buf.readUInt16LE(offset); offset += 2;
    this.blineshortvoltage = buf.readUInt16LE(offset); offset += 2;
    this.wdbeenthere = buf.readUInt16LE(offset); offset += 2;
    this.alinescvoltage = buf.readUInt16LE(offset); offset += 2;
    this.blinescvoltage = buf.readUInt16LE(offset); offset += 2;
    this.batterystate = buf.readUInt8(offset++);
    this.batteryflags = buf.readUInt32LE(offset); offset += 4;
    this.batterytestvalue = buf.readUInt16LE(offset); offset += 2;
    this.batterywithcharger = buf.readUInt16LE(offset); offset += 2;
    this.batterycharger = buf.readUInt16LE(offset); offset += 2;
    this.batterymainstrigger = buf.readUInt16LE(offset); offset += 2;
    this.batterypins = buf.readUInt8(offset++);
    this.batteryresistance = buf.readUInt16LE(offset); offset += 2;
    this.batteryload1voltage = buf.readUInt16LE(offset); offset += 2;
    this.batteryload2voltage = buf.readUInt16LE(offset); offset += 2;
    this.capacityvoltagestart = buf.readUInt16LE(offset); offset += 2;
    this.capacityvoltagenow = buf.readUInt16LE(offset); offset += 2;
    this.capacityminutes = buf.readUInt32LE(offset); offset += 4;
    offset = this.nad.read(buf, offset);
    this.sumdone = buf.readUInt8(offset++);
    this.windone = buf.readUInt8(offset++);
    this.oldmin = buf.readUInt8(offset++);
    this.oldsec = buf.readUInt8(offset++);
    this.cancelstartuptest = buf.readUInt8(offset++);
    this.paneldisabled = buf.readUInt16LE(offset); offset += 2;
    this.watts = buf.readUInt32LE(offset); offset += 4;
    this.wattshour = buf.readUInt32LE(offset); offset += 4;
    this.randomtestactive = buf.readUInt32LE(offset); offset += 4;


    this.randomteststart = buf.readUInt32LE(offset); offset += 4;
    this.res = [];
    for(let i=0; i<89; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.dcin, offset); offset += 2;
    buf.writeUInt8(this.dcinslot, offset++);
    buf.writeUInt8(this.dcinnewslot, offset++);
    buf.writeUInt8(this.dcinslotcntr, offset++);
    buf.writeUInt8(this.dcinnoisycntr, offset++);
    buf.writeUInt16LE(this.batt, offset); offset += 2;
    buf.writeUInt8(this.battslot, offset++);
    buf.writeUInt8(this.battnewslot, offset++);
    buf.writeUInt8(this.battslotcntr, offset++);
    buf.writeUInt8(this.battnoisycntr, offset++);
    buf.writeUInt16LE(this.charger, offset); offset += 2;
    buf.writeUInt8(this.chargerslot, offset++);
    buf.writeUInt8(this.chargernewslot, offset++);
    buf.writeUInt8(this.chargerslotcntr, offset++);
    buf.writeUInt8(this.chargernoisycntr, offset++);
    buf.writeUInt16LE(this.fuse3, offset); offset += 2;
    buf.writeUInt8(this.fuse3slot, offset++);
    buf.writeUInt8(this.fuse3newslot, offset++);
    buf.writeUInt8(this.fuse3slotcntr, offset++);
    buf.writeUInt8(this.fuse3noisycntr, offset++);
    buf.writeUInt16LE(this.fuse4, offset); offset += 2;
    buf.writeUInt8(this.fuse4slot, offset++);
    buf.writeUInt8(this.fuse4newslot, offset++);
    buf.writeUInt8(this.fuse4slotcntr, offset++);
    buf.writeUInt8(this.fuse4noisycntr, offset++);
    buf.writeUInt16LE(this.fuse6, offset); offset += 2;
    buf.writeUInt8(this.fuse6slot, offset++);
    buf.writeUInt8(this.fuse6newslot, offset++);
    buf.writeUInt8(this.fuse6slotcntr, offset++);
    buf.writeUInt8(this.fuse6noisycntr, offset++);
    buf.writeUInt16LE(this.chargerref, offset); offset += 2;
    buf.writeUInt16LE(this.measdelay, offset); offset += 2;
    buf.writeUInt16LE(this.measlimit, offset); offset += 2;
    buf.writeUInt8(this.outputs, offset++);
    buf.writeUInt8(this.abcontrol, offset++);
    buf.writeUInt8(this.abcontroldelay, offset++);
    buf.writeUInt16LE(this.batttestdelay, offset); offset += 2;
    buf.writeUInt16LE(this.linelowdelay, offset); offset += 2;
    buf.writeUInt16LE(this.linelowlimit, offset); offset += 2;
    buf.writeUInt32LE(this.runninghours, offset); offset += 4;
    buf.writeUInt32LE(this.tothours, offset); offset += 4;
    buf.writeUInt8(this.oldhour, offset++);
    offset = this.datetime.write(buf, offset);
    buf.writeUInt8(this.testscleared, offset++);
    buf.writeUInt8(this.domanualreport, offset++);
    buf.writeUInt8(this.pcrelaycontrol, offset++);
    buf.writeUInt8(this.abservice, offset++);
    buf.writeUInt8(this.testall, offset++);
    buf.writeUInt8(this.testallminutes, offset++);
    buf.writeUInt8(this.blockmainsminutes, offset++);
    buf.writeUInt8(this.dcoktolines, offset++);
    buf.writeUInt8(this.needclock, offset++);
    buf.writeUInt8(this.lineoff, offset++);
    buf.writeUInt16LE(this.lineoffminutes, offset); offset += 2;
    buf.writeUInt16LE(this.faultactivecounter, offset); offset += 2;
    buf.writeUInt16LE(this.tampercounter, offset); offset += 2;
    buf.writeUInt8(this.createblistweek, offset++);
    buf.writeUInt8(this.alinebacksecond, offset++);
    buf.writeUInt8(this.blinebacksecond, offset++);
    buf.writeUInt16LE(this.alineshortvoltage, offset); offset += 2;
    buf.writeUInt16LE(this.blineshortvoltage, offset); offset += 2;
    buf.writeUInt16LE(this.wdbeenthere, offset); offset += 2;
    buf.writeUInt16LE(this.alinescvoltage, offset); offset += 2;
    buf.writeUInt16LE(this.blinescvoltage, offset); offset += 2;
    buf.writeUInt8(this.batterystate, offset++);
    buf.writeUInt32LE(this.batteryflags, offset); offset += 4;
    buf.writeUInt16LE(this.batterytestvalue, offset); offset += 2;
    buf.writeUInt16LE(this.batterywithcharger, offset); offset += 2;
    buf.writeUInt16LE(this.batterycharger, offset); offset += 2;
    buf.writeUInt16LE(this.batterymainstrigger, offset); offset += 2;
    buf.writeUInt8(this.batterypins, offset++);
    buf.writeUInt16LE(this.batteryresistance, offset); offset += 2;
    buf.writeUInt16LE(this.batteryload1voltage, offset); offset += 2;
    buf.writeUInt16LE(this.batteryload2voltage, offset); offset += 2;
    buf.writeUInt16LE(this.capacityvoltagestart, offset); offset += 2;
    buf.writeUInt16LE(this.capacityvoltagenow, offset); offset += 2;
    buf.writeUInt32LE(this.capacityminutes, offset); offset += 4;
    offset = this.nad.write(buf, offset);
    buf.writeUInt8(this.sumdone, offset++);
    buf.writeUInt8(this.windone, offset++);
    buf.writeUInt8(this.oldmin, offset++);
    buf.writeUInt8(this.oldsec, offset++);
    buf.writeUInt8(this.cancelstartuptest, offset++);
    buf.writeUInt16LE(this.paneldisabled, offset); offset += 2;
    buf.writeUInt32LE(this.watts, offset); offset += 4;
    buf.writeUInt32LE(this.wattshour, offset); offset += 4;
    buf.writeUInt32LE(this.randomtestactive, offset); offset += 4;


    buf.writeUInt32LE(this.randomteststart, offset); offset += 4;
    for(let i=0; i<89; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'BOARD3K_STRUCT', {value:BOARD3K_STRUCT, configurable:false, writable:false});

const BOARD3K_PRG_STRUCT_ADDRESS = 1611661312;
Object.defineProperty(exports, 'BOARD3K_PRG_STRUCT_ADDRESS', {value:BOARD3K_PRG_STRUCT_ADDRESS, configurable:false, writable:false});


class TDATETIME3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.dayno = 0;    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    return offset;
  }

  read(buf, offset=0) {
    this.year = buf.readUInt8(offset++);
    this.month = buf.readUInt8(offset++);
    this.day = buf.readUInt8(offset++);
    this.hour = buf.readUInt8(offset++);
    this.minute = buf.readUInt8(offset++);
    this.second = buf.readUInt8(offset++);
    this.dayno = buf.readUInt8(offset++);
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.year, offset++);
    buf.writeUInt8(this.month, offset++);
    buf.writeUInt8(this.day, offset++);
    buf.writeUInt8(this.hour, offset++);
    buf.writeUInt8(this.minute, offset++);
    buf.writeUInt8(this.second, offset++);
    buf.writeUInt8(this.dayno, offset++);
    return offset;
  }
}
Object.defineProperty(exports, 'TDATETIME3K_STRUCT', {value:TDATETIME3K_STRUCT, configurable:false, writable:false});


class FD3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.count = 0;
    this.board = [0,0,0,0,0,0,0,0];
    this.point = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.input = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.reserved = [0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset += 8;
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset = undefined.size(offset);
    offset += 32;
    offset += 32;
    offset += 6;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset += 8;









    offset += 32;
    offset += 32;
    offset += 6;
    return offset;
  }

  read(buf, offset=0) {
    this.count = buf.readUInt16LE(offset); offset += 2;
    this.board = [];
    for(let i=0; i<8; i++) { this.board.push(buf.readUInt8(offset++)); }









    this.point = [];
    for(let i=0; i<32; i++) { this.point.push(buf.readUInt8(offset++)); }
    this.input = [];
    for(let i=0; i<32; i++) { this.input.push(buf.readUInt8(offset++)); }
    this.reserved = [];
    for(let i=0; i<6; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.count, offset); offset += 2;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.board[i], offset++); }









    for(let i=0; i<32; i++) { buf.writeUInt8(this.point[i], offset++); }
    for(let i=0; i<32; i++) { buf.writeUInt8(this.input[i], offset++); }
    for(let i=0; i<6; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'FD3K_STRUCT', {value:FD3K_STRUCT, configurable:false, writable:false});


class PCPACKET3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.system = 0;
    this.pcaddress = 0;
    this.version = 0;
    this.today = new TDATETIME3K_STRUCT();
    this.eventptr = 0;
    this.fault = new FD3K_STRUCT();
    this.disab = new FD3K_STRUCT();
    this.pinitcount = 0;
    this.obyte = 0;
    this.testall = 0;
    this.areastatus = [0,0,0,0,0,0,0,0];
    this.outstatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.instatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.promdate = [0,0,0];
    this.programmedpoints = 0;
    this.activepoints = 0;
    this.timecutareas = [0,0,0,0,0,0,0,0];
    this.activeareas = 0;
    this.panelcount = 0;
    this.reserved = [0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset = TDATETIME3K_STRUCT.size(offset);
    offset += 2;
    offset = FD3K_STRUCT.size(offset);
    offset = FD3K_STRUCT.size(offset);
    offset++;
    offset++;
    offset++;
    offset += 8;
    offset += 17;
    offset += 33;
    offset += 3;
    offset += 2;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 4;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset += this.today.size();
    offset += 2;
    offset += this.fault.size();
    offset += this.disab.size();
    offset++;
    offset++;
    offset++;
    offset += 8;
    offset += 17;
    offset += 33;
    offset += 3;
    offset += 2;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 4;
    return offset;
  }

  read(buf, offset=0) {
    this.system = buf.readUInt8(offset++);
    this.pcaddress = buf.readUInt16LE(offset); offset += 2;
    this.version = buf.readUInt16LE(offset); offset += 2;
    offset = this.today.read(buf, offset);
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    offset = this.fault.read(buf, offset);
    offset = this.disab.read(buf, offset);
    this.pinitcount = buf.readUInt8(offset++);
    this.obyte = buf.readUInt8(offset++);
    this.testall = buf.readUInt8(offset++);
    this.areastatus = [];
    for(let i=0; i<8; i++) { this.areastatus.push(buf.readUInt8(offset++)); }
    this.outstatus = [];
    for(let i=0; i<17; i++) { this.outstatus.push(buf.readUInt8(offset++)); }
    this.instatus = [];
    for(let i=0; i<33; i++) { this.instatus.push(buf.readUInt8(offset++)); }
    this.promdate = [];
    for(let i=0; i<3; i++) { this.promdate.push(buf.readUInt8(offset++)); }
    this.programmedpoints = buf.readUInt16LE(offset); offset += 2;
    this.activepoints = buf.readUInt16LE(offset); offset += 2;
    this.timecutareas = [];
    for(let i=0; i<8; i++) { this.timecutareas.push(buf.readUInt8(offset++)); }
    this.activeareas = buf.readUInt8(offset++);
    this.panelcount = buf.readUInt8(offset++);
    this.reserved = [];
    for(let i=0; i<4; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.system, offset++);
    buf.writeUInt16LE(this.pcaddress, offset); offset += 2;
    buf.writeUInt16LE(this.version, offset); offset += 2;
    offset = this.today.write(buf, offset);
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    offset = this.fault.write(buf, offset);
    offset = this.disab.write(buf, offset);
    buf.writeUInt8(this.pinitcount, offset++);
    buf.writeUInt8(this.obyte, offset++);
    buf.writeUInt8(this.testall, offset++);
    for(let i=0; i<8; i++) { buf.writeUInt8(this.areastatus[i], offset++); }
    for(let i=0; i<17; i++) { buf.writeUInt8(this.outstatus[i], offset++); }
    for(let i=0; i<33; i++) { buf.writeUInt8(this.instatus[i], offset++); }
    for(let i=0; i<3; i++) { buf.writeUInt8(this.promdate[i], offset++); }
    buf.writeUInt16LE(this.programmedpoints, offset); offset += 2;
    buf.writeUInt16LE(this.activepoints, offset); offset += 2;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.timecutareas[i], offset++); }
    buf.writeUInt8(this.activeareas, offset++);
    buf.writeUInt8(this.panelcount, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'PCPACKET3K_STRUCT', {value:PCPACKET3K_STRUCT, configurable:false, writable:false});

const PCPACKET3K_STRUCT_ADDRESS = 1611661568;
Object.defineProperty(exports, 'PCPACKET3K_STRUCT_ADDRESS', {value:PCPACKET3K_STRUCT_ADDRESS, configurable:false, writable:false});


class LINE3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.highvoltage = 0;
    this.hvslot = 0;
    this.hvnewslot = 0;
    this.hvslotcntr = 0;
    this.hvnoisycntr = 0;
    this.current = 0;
    this.cuslot = 0;
    this.cunewslot = 0;
    this.cuslotcntr = 0;
    this.cunoisycntr = 0;
    this.lowvoltage = 0;
    this.lvslot = 0;
    this.lvnewslot = 0;
    this.lvslotcntr = 0;
    this.lvnoisycntr = 0;
    this.measdelay = 0;
    this.measlimit = 0;
    this.btestminute = 0;
    this.gethighlow = 0;
    this.pollme = 0;
    this.pollmecount = 0;
    this.dcoktoline = 0;
    this.reserved = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 101;
    return offset;
  }

  size(offset=0) {
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 101;
    return offset;
  }

  read(buf, offset=0) {
    this.highvoltage = buf.readUInt16LE(offset); offset += 2;
    this.hvslot = buf.readUInt8(offset++);
    this.hvnewslot = buf.readUInt8(offset++);
    this.hvslotcntr = buf.readUInt8(offset++);
    this.hvnoisycntr = buf.readUInt8(offset++);
    this.current = buf.readUInt16LE(offset); offset += 2;
    this.cuslot = buf.readUInt8(offset++);
    this.cunewslot = buf.readUInt8(offset++);
    this.cuslotcntr = buf.readUInt8(offset++);
    this.cunoisycntr = buf.readUInt8(offset++);
    this.lowvoltage = buf.readUInt16LE(offset); offset += 2;
    this.lvslot = buf.readUInt8(offset++);
    this.lvnewslot = buf.readUInt8(offset++);
    this.lvslotcntr = buf.readUInt8(offset++);
    this.lvnoisycntr = buf.readUInt8(offset++);
    this.measdelay = buf.readUInt16LE(offset); offset += 2;
    this.measlimit = buf.readUInt16LE(offset); offset += 2;
    this.btestminute = buf.readUInt8(offset++);
    this.gethighlow = buf.readUInt8(offset++);
    this.pollme = buf.readUInt8(offset++);
    this.pollmecount = buf.readUInt8(offset++);
    this.dcoktoline = buf.readUInt8(offset++);
    this.reserved = [];
    for(let i=0; i<101; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt16LE(this.highvoltage, offset); offset += 2;
    buf.writeUInt8(this.hvslot, offset++);
    buf.writeUInt8(this.hvnewslot, offset++);
    buf.writeUInt8(this.hvslotcntr, offset++);
    buf.writeUInt8(this.hvnoisycntr, offset++);
    buf.writeUInt16LE(this.current, offset); offset += 2;
    buf.writeUInt8(this.cuslot, offset++);
    buf.writeUInt8(this.cunewslot, offset++);
    buf.writeUInt8(this.cuslotcntr, offset++);
    buf.writeUInt8(this.cunoisycntr, offset++);
    buf.writeUInt16LE(this.lowvoltage, offset); offset += 2;
    buf.writeUInt8(this.lvslot, offset++);
    buf.writeUInt8(this.lvnewslot, offset++);
    buf.writeUInt8(this.lvslotcntr, offset++);
    buf.writeUInt8(this.lvnoisycntr, offset++);
    buf.writeUInt16LE(this.measdelay, offset); offset += 2;
    buf.writeUInt16LE(this.measlimit, offset); offset += 2;
    buf.writeUInt8(this.btestminute, offset++);
    buf.writeUInt8(this.gethighlow, offset++);
    buf.writeUInt8(this.pollme, offset++);
    buf.writeUInt8(this.pollmecount, offset++);
    buf.writeUInt8(this.dcoktoline, offset++);
    for(let i=0; i<101; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'LINE3K_STRUCT', {value:LINE3K_STRUCT, configurable:false, writable:false});

const LINE3K_STRUCT_ADDRESS = 1611661824;
Object.defineProperty(exports, 'LINE3K_STRUCT_ADDRESS', {value:LINE3K_STRUCT_ADDRESS, configurable:false, writable:false});


class GSMMODEM3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.state = 0;
    this.delay = 0;
    this.limit = 0;
    this.retry = 0;
    this.flags = 0;
    this.head = 0;
    this.tail = 0;
    this.sent = 0;
    this.test = 0;
    this.lineopendelay = 0;
    this.ctype = 0;
    this.caller = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.sms_time = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.pin = [0,0,0,0,0,0];
    this.onoff = 0;
    this.gsmservicecaller = 0;
    this.servicecallcount = 0;
    this.resettargets = 0;
    this.prealarmresettargets = 0;
    this.prodexquerydelay = 0;
    this.hhlquerydelay = 0;
    this.sentmask = 0;
    this.numbermask = 0;
    this.mode = 0;
    this.outminute = 0;
    this.faultarea = [0,0,0,0];
    this.activearea = [0,0,0,0];
    this.eventptr = 0;
    this.connectcalldone = 0;
    this.signalq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.showsignalq = 0;
    this.area = 0;
    this.pointaddress = 0;
    this.pluscount = 0;
    this.res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset += 16;
    offset += 30;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 4;
    offset += 4;
    offset += 2;
    offset++;
    offset += 20;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 139;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset += 16;
    offset += 30;
    offset += 6;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset += 4;
    offset += 4;
    offset += 2;
    offset++;
    offset += 20;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 139;
    return offset;
  }

  read(buf, offset=0) {
    this.state = buf.readUInt8(offset++);
    this.delay = buf.readUInt16LE(offset); offset += 2;
    this.limit = buf.readUInt16LE(offset); offset += 2;
    this.retry = buf.readUInt8(offset++);
    this.flags = buf.readUInt8(offset++);
    this.head = buf.readUInt8(offset++);
    this.tail = buf.readUInt8(offset++);
    this.sent = buf.readUInt8(offset++);
    this.test = buf.readUInt8(offset++);
    this.lineopendelay = buf.readUInt16LE(offset); offset += 2;
    this.ctype = buf.readUInt8(offset++);
    this.caller = [];
    for(let i=0; i<16; i++) { this.caller.push(buf.readUInt8(offset++)); }
    this.sms_time = [];
    for(let i=0; i<30; i++) { this.sms_time.push(buf.readUInt8(offset++)); }
    this.pin = [];
    for(let i=0; i<6; i++) { this.pin.push(buf.readUInt8(offset++)); }
    this.onoff = buf.readUInt8(offset++);
    this.gsmservicecaller = buf.readUInt8(offset++);
    this.servicecallcount = buf.readUInt8(offset++);
    this.resettargets = buf.readUInt16LE(offset); offset += 2;
    this.prealarmresettargets = buf.readUInt16LE(offset); offset += 2;
    this.prodexquerydelay = buf.readUInt16LE(offset); offset += 2;
    this.hhlquerydelay = buf.readUInt16LE(offset); offset += 2;
    this.sentmask = buf.readUInt16LE(offset); offset += 2;
    this.numbermask = buf.readUInt8(offset++);
    this.mode = buf.readUInt8(offset++);
    this.outminute = buf.readUInt8(offset++);
    this.faultarea = [];
    for(let i=0; i<4; i++) { this.faultarea.push(buf.readUInt8(offset++)); }
    this.activearea = [];
    for(let i=0; i<4; i++) { this.activearea.push(buf.readUInt8(offset++)); }
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    this.connectcalldone = buf.readUInt8(offset++);
    this.signalq = [];
    for(let i=0; i<20; i++) { this.signalq.push(buf.readUInt8(offset++)); }
    this.showsignalq = buf.readUInt8(offset++);
    this.area = buf.readUInt8(offset++);
    this.pointaddress = buf.readUInt8(offset++);
    this.pluscount = buf.readUInt8(offset++);
    this.res = [];
    for(let i=0; i<139; i++) { this.res.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.state, offset++);
    buf.writeUInt16LE(this.delay, offset); offset += 2;
    buf.writeUInt16LE(this.limit, offset); offset += 2;
    buf.writeUInt8(this.retry, offset++);
    buf.writeUInt8(this.flags, offset++);
    buf.writeUInt8(this.head, offset++);
    buf.writeUInt8(this.tail, offset++);
    buf.writeUInt8(this.sent, offset++);
    buf.writeUInt8(this.test, offset++);
    buf.writeUInt16LE(this.lineopendelay, offset); offset += 2;
    buf.writeUInt8(this.ctype, offset++);
    for(let i=0; i<16; i++) { buf.writeUInt8(this.caller[i], offset++); }
    for(let i=0; i<30; i++) { buf.writeUInt8(this.sms_time[i], offset++); }
    for(let i=0; i<6; i++) { buf.writeUInt8(this.pin[i], offset++); }
    buf.writeUInt8(this.onoff, offset++);
    buf.writeUInt8(this.gsmservicecaller, offset++);
    buf.writeUInt8(this.servicecallcount, offset++);
    buf.writeUInt16LE(this.resettargets, offset); offset += 2;
    buf.writeUInt16LE(this.prealarmresettargets, offset); offset += 2;
    buf.writeUInt16LE(this.prodexquerydelay, offset); offset += 2;
    buf.writeUInt16LE(this.hhlquerydelay, offset); offset += 2;
    buf.writeUInt16LE(this.sentmask, offset); offset += 2;
    buf.writeUInt8(this.numbermask, offset++);
    buf.writeUInt8(this.mode, offset++);
    buf.writeUInt8(this.outminute, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.faultarea[i], offset++); }
    for(let i=0; i<4; i++) { buf.writeUInt8(this.activearea[i], offset++); }
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    buf.writeUInt8(this.connectcalldone, offset++);
    for(let i=0; i<20; i++) { buf.writeUInt8(this.signalq[i], offset++); }
    buf.writeUInt8(this.showsignalq, offset++);
    buf.writeUInt8(this.area, offset++);
    buf.writeUInt8(this.pointaddress, offset++);
    buf.writeUInt8(this.pluscount, offset++);
    for(let i=0; i<139; i++) { buf.writeUInt8(this.res[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'GSMMODEM3K_STRUCT', {value:GSMMODEM3K_STRUCT, configurable:false, writable:false});

const GSMMODEM3K_STRUCT_ADDRESS = 1611662080;
Object.defineProperty(exports, 'GSMMODEM3K_STRUCT_ADDRESS', {value:GSMMODEM3K_STRUCT_ADDRESS, configurable:false, writable:false});


class NETPACKET3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.system = 0;
    this.pcaddress = 0;
    this.version = 0;
    this.today = new TDATETIME3K_STRUCT();
    this.eventptr = 0;
    this.fault = new FD3K_STRUCT();
    this.disab = new FD3K_STRUCT();
    this.pinitcount = 0;
    this.obyte = 0;
    this.testall = 0;
    this.areastatus = [0,0,0,0,0,0,0,0];
    this.outstatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.instatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.promdate = [0,0,0];
    this.programmedpoints = 0;
    this.activepoints = 0;
    this.timecutareas = [0,0,0,0,0,0,0,0];
    this.activeareas = 0;
    this.panelcount = 0;
    this.reserved = [0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset = TDATETIME3K_STRUCT.size(offset);
    offset += 2;
    offset = FD3K_STRUCT.size(offset);
    offset = FD3K_STRUCT.size(offset);
    offset++;
    offset++;
    offset++;
    offset += 8;
    offset += 17;
    offset += 33;
    offset += 3;
    offset += 2;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 4;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset += 2;
    offset += 2;
    offset += this.today.size();
    offset += 2;
    offset += this.fault.size();
    offset += this.disab.size();
    offset++;
    offset++;
    offset++;
    offset += 8;
    offset += 17;
    offset += 33;
    offset += 3;
    offset += 2;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 4;
    return offset;
  }

  read(buf, offset=0) {
    this.system = buf.readUInt8(offset++);
    this.pcaddress = buf.readUInt16LE(offset); offset += 2;
    this.version = buf.readUInt16LE(offset); offset += 2;
    offset = this.today.read(buf, offset);
    this.eventptr = buf.readUInt16LE(offset); offset += 2;
    offset = this.fault.read(buf, offset);
    offset = this.disab.read(buf, offset);
    this.pinitcount = buf.readUInt8(offset++);
    this.obyte = buf.readUInt8(offset++);
    this.testall = buf.readUInt8(offset++);
    this.areastatus = [];
    for(let i=0; i<8; i++) { this.areastatus.push(buf.readUInt8(offset++)); }
    this.outstatus = [];
    for(let i=0; i<17; i++) { this.outstatus.push(buf.readUInt8(offset++)); }
    this.instatus = [];
    for(let i=0; i<33; i++) { this.instatus.push(buf.readUInt8(offset++)); }
    this.promdate = [];
    for(let i=0; i<3; i++) { this.promdate.push(buf.readUInt8(offset++)); }
    this.programmedpoints = buf.readUInt16LE(offset); offset += 2;
    this.activepoints = buf.readUInt16LE(offset); offset += 2;
    this.timecutareas = [];
    for(let i=0; i<8; i++) { this.timecutareas.push(buf.readUInt8(offset++)); }
    this.activeareas = buf.readUInt8(offset++);
    this.panelcount = buf.readUInt8(offset++);
    this.reserved = [];
    for(let i=0; i<4; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.system, offset++);
    buf.writeUInt16LE(this.pcaddress, offset); offset += 2;
    buf.writeUInt16LE(this.version, offset); offset += 2;
    offset = this.today.write(buf, offset);
    buf.writeUInt16LE(this.eventptr, offset); offset += 2;
    offset = this.fault.write(buf, offset);
    offset = this.disab.write(buf, offset);
    buf.writeUInt8(this.pinitcount, offset++);
    buf.writeUInt8(this.obyte, offset++);
    buf.writeUInt8(this.testall, offset++);
    for(let i=0; i<8; i++) { buf.writeUInt8(this.areastatus[i], offset++); }
    for(let i=0; i<17; i++) { buf.writeUInt8(this.outstatus[i], offset++); }
    for(let i=0; i<33; i++) { buf.writeUInt8(this.instatus[i], offset++); }
    for(let i=0; i<3; i++) { buf.writeUInt8(this.promdate[i], offset++); }
    buf.writeUInt16LE(this.programmedpoints, offset); offset += 2;
    buf.writeUInt16LE(this.activepoints, offset); offset += 2;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.timecutareas[i], offset++); }
    buf.writeUInt8(this.activeareas, offset++);
    buf.writeUInt8(this.panelcount, offset++);
    for(let i=0; i<4; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'NETPACKET3K_STRUCT', {value:NETPACKET3K_STRUCT, configurable:false, writable:false});

const NETPACKET3K_STRUCT_ADDRESS = 1611662336;
Object.defineProperty(exports, 'NETPACKET3K_STRUCT_ADDRESS', {value:NETPACKET3K_STRUCT_ADDRESS, configurable:false, writable:false});


class POINT3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.state = 0;
    this.capa = 0;
    this.lightamps = 0;
    this.pqcounts = 0;
    this.fieldstatus = 0;
    this.iostate = 0;
    this.hoursalive = 0;
    this.week = 0;
    this.battvoltage = 0;
    this.linevoltage = 0;
    this.actfaults = 0;
    this.latchfaults = 0;
    this.precapa = 0;
    this.bestcapa = 0;
    this.bestweek = 0;
    this.prestate = 0;
    this.version = 0;
    this.servicecounter = 0;
    this.newstate = 0;
    this.newpq = 0;
    this.address_marker = 0;
    this.commissioning_type = 0;
    this.db_marker = 0;
    this.reserved = [0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset++;
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset++;
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 8;
    return offset;
  }

  size(offset=0) {
    offset++;

    offset++;
    offset++;
    offset++;

    offset++;
    offset++;
    offset++;

    offset++;

    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset++;
    offset++;
    offset++;
    offset++;
    offset++;
    offset += 8;
    return offset;
  }

  read(buf, offset=0) {
    this.state = buf.readUInt8(offset++);

    this.capa = buf.readUInt8(offset++);
    this.lightamps = buf.readUInt8(offset++);
    this.pqcounts = buf.readUInt8(offset++);

    this.fieldstatus = buf.readUInt8(offset++);
    this.iostate = buf.readUInt8(offset++);
    this.hoursalive = buf.readUInt8(offset++);

    this.week = buf.readUInt8(offset++);

    this.battvoltage = buf.readUInt8(offset++);
    this.linevoltage = buf.readUInt8(offset++);
    this.actfaults = buf.readUInt8(offset++);
    this.latchfaults = buf.readUInt8(offset++);
    this.precapa = buf.readUInt8(offset++);
    this.bestcapa = buf.readUInt8(offset++);
    this.bestweek = buf.readUInt8(offset++);
    this.prestate = buf.readUInt8(offset++);
    this.version = buf.readUInt8(offset++);
    this.servicecounter = buf.readUInt16LE(offset); offset += 2;
    this.newstate = buf.readUInt8(offset++);
    this.newpq = buf.readUInt8(offset++);
    this.address_marker = buf.readUInt8(offset++);
    this.commissioning_type = buf.readUInt8(offset++);
    this.db_marker = buf.readUInt8(offset++);
    this.reserved = [];
    for(let i=0; i<8; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.state, offset++);

    buf.writeUInt8(this.capa, offset++);
    buf.writeUInt8(this.lightamps, offset++);
    buf.writeUInt8(this.pqcounts, offset++);

    buf.writeUInt8(this.fieldstatus, offset++);
    buf.writeUInt8(this.iostate, offset++);
    buf.writeUInt8(this.hoursalive, offset++);

    buf.writeUInt8(this.week, offset++);

    buf.writeUInt8(this.battvoltage, offset++);
    buf.writeUInt8(this.linevoltage, offset++);
    buf.writeUInt8(this.actfaults, offset++);
    buf.writeUInt8(this.latchfaults, offset++);
    buf.writeUInt8(this.precapa, offset++);
    buf.writeUInt8(this.bestcapa, offset++);
    buf.writeUInt8(this.bestweek, offset++);
    buf.writeUInt8(this.prestate, offset++);
    buf.writeUInt8(this.version, offset++);
    buf.writeUInt16LE(this.servicecounter, offset); offset += 2;
    buf.writeUInt8(this.newstate, offset++);
    buf.writeUInt8(this.newpq, offset++);
    buf.writeUInt8(this.address_marker, offset++);
    buf.writeUInt8(this.commissioning_type, offset++);
    buf.writeUInt8(this.db_marker, offset++);
    for(let i=0; i<8; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'POINT3K_STRUCT', {value:POINT3K_STRUCT, configurable:false, writable:false});

const POINT3K_STRUCT_ADDRESS = 1611726848;
Object.defineProperty(exports, 'POINT3K_STRUCT_ADDRESS', {value:POINT3K_STRUCT_ADDRESS, configurable:false, writable:false});

const POINT3K_STRUCT_COUNT = 254;
Object.defineProperty(exports, 'POINT3K_STRUCT_COUNT', {value:POINT3K_STRUCT_COUNT, configurable:false, writable:false});


class AREA3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.status = 0;
    this.prestatus = 0;
    this.winput = 0;
    this.teston = 0;
    this.preteston = 0;
    this.currbright = 0;
    this.newbright = 0;
    this.currmode = 0;
    this.newmode = 0;
    this.oncounter = 0;
    this.extact = 0;
    this.preextact = 0;
    this.mainsactivated = 0;
    this.testoncounter = 0;
    this.minutesoncounter = 0;
    this.reserved2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset++;
    offset++;
    offset += 2;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset = undefined.size(offset);
    offset++;
    offset += 2;
    offset += 2;
    offset += 14;
    return offset;
  }

  size(offset=0) {
    offset++;
    offset++;
    offset += 2;

    offset++;

    offset++;
    offset++;

    offset++;

    offset++;

    offset++;

    offset++;

    offset++;

    offset++;

    offset++;
    offset += 2;
    offset += 2;
    offset += 14;
    return offset;
  }

  read(buf, offset=0) {
    this.status = buf.readUInt8(offset++);
    this.prestatus = buf.readUInt8(offset++);
    this.winput = buf.readUInt16LE(offset); offset += 2;

    this.teston = buf.readUInt8(offset++);

    this.preteston = buf.readUInt8(offset++);
    this.currbright = buf.readUInt8(offset++);

    this.newbright = buf.readUInt8(offset++);

    this.currmode = buf.readUInt8(offset++);

    this.newmode = buf.readUInt8(offset++);

    this.oncounter = buf.readUInt8(offset++);

    this.extact = buf.readUInt8(offset++);

    this.preextact = buf.readUInt8(offset++);

    this.mainsactivated = buf.readUInt8(offset++);
    this.testoncounter = buf.readUInt16LE(offset); offset += 2;
    this.minutesoncounter = buf.readUInt16LE(offset); offset += 2;
    this.reserved2 = [];
    for(let i=0; i<14; i++) { this.reserved2.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt8(this.status, offset++);
    buf.writeUInt8(this.prestatus, offset++);
    buf.writeUInt16LE(this.winput, offset); offset += 2;

    buf.writeUInt8(this.teston, offset++);

    buf.writeUInt8(this.preteston, offset++);
    buf.writeUInt8(this.currbright, offset++);

    buf.writeUInt8(this.newbright, offset++);

    buf.writeUInt8(this.currmode, offset++);

    buf.writeUInt8(this.newmode, offset++);

    buf.writeUInt8(this.oncounter, offset++);

    buf.writeUInt8(this.extact, offset++);

    buf.writeUInt8(this.preextact, offset++);

    buf.writeUInt8(this.mainsactivated, offset++);
    buf.writeUInt16LE(this.testoncounter, offset); offset += 2;
    buf.writeUInt16LE(this.minutesoncounter, offset); offset += 2;
    for(let i=0; i<14; i++) { buf.writeUInt8(this.reserved2[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'AREA3K_STRUCT', {value:AREA3K_STRUCT, configurable:false, writable:false});

const AREA3K_STRUCT_ADDRESS = 1611735040;
Object.defineProperty(exports, 'AREA3K_STRUCT_ADDRESS', {value:AREA3K_STRUCT_ADDRESS, configurable:false, writable:false});

const AREA3K_STRUCT_COUNT = 32;
Object.defineProperty(exports, 'AREA3K_STRUCT_COUNT', {value:AREA3K_STRUCT_COUNT, configurable:false, writable:false});


class GSMMESSAGE3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.number = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.text = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.needack = 0;
    this.acked = 0;
    this.exists = 0;
    this.tosetups = 0;
    this.reserved = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 16;
    offset += 160;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 75;
    return offset;
  }

  size(offset=0) {
    offset += 16;
    offset += 160;
    offset++;
    offset++;
    offset++;
    offset += 2;
    offset += 75;
    return offset;
  }

  read(buf, offset=0) {
    this.number = [];
    for(let i=0; i<16; i++) { this.number.push(buf.readUInt8(offset++)); }
    this.text = [];
    for(let i=0; i<160; i++) { this.text.push(buf.readUInt8(offset++)); }
    this.needack = buf.readUInt8(offset++);
    this.acked = buf.readUInt8(offset++);
    this.exists = buf.readUInt8(offset++);
    this.tosetups = buf.readUInt16LE(offset); offset += 2;
    this.reserved = [];
    for(let i=0; i<75; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    for(let i=0; i<16; i++) { buf.writeUInt8(this.number[i], offset++); }
    for(let i=0; i<160; i++) { buf.writeUInt8(this.text[i], offset++); }
    buf.writeUInt8(this.needack, offset++);
    buf.writeUInt8(this.acked, offset++);
    buf.writeUInt8(this.exists, offset++);
    buf.writeUInt16LE(this.tosetups, offset); offset += 2;
    for(let i=0; i<75; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'GSMMESSAGE3K_STRUCT', {value:GSMMESSAGE3K_STRUCT, configurable:false, writable:false});

const GSMMESSAGE3K_STRUCT_ADDRESS = 1611739136;
Object.defineProperty(exports, 'GSMMESSAGE3K_STRUCT_ADDRESS', {value:GSMMESSAGE3K_STRUCT_ADDRESS, configurable:false, writable:false});


class EVENT3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.seconds = 0;
    this.type = 0;
    this.data = [0,0,0];    

    if(buf instanceof Buffer) {
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
    this.seconds = buf.readUInt32LE(offset); offset += 4;
    this.type = buf.readUInt8(offset++);
    this.data = [];
    for(let i=0; i<3; i++) { this.data.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt32LE(this.seconds, offset); offset += 4;
    buf.writeUInt8(this.type, offset++);
    for(let i=0; i<3; i++) { buf.writeUInt8(this.data[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'EVENT3K_STRUCT', {value:EVENT3K_STRUCT, configurable:false, writable:false});

const EVENT3K_STRUCT_ADDRESS = 1611857920;
Object.defineProperty(exports, 'EVENT3K_STRUCT_ADDRESS', {value:EVENT3K_STRUCT_ADDRESS, configurable:false, writable:false});

const EVENT3K_STRUCT_COUNT = 1;
Object.defineProperty(exports, 'EVENT3K_STRUCT_COUNT', {value:EVENT3K_STRUCT_COUNT, configurable:false, writable:false});


class REPORT3K_STRUCT extends STRUCTURE {
  constructor(buf, offset=0) {
    super();
    this.seconds = 0;
    this.dcinws = 0;
    this.battws = 0;
    this.chargerws = 0;
    this.fuse3ws = 0;
    this.fuse4ws = 0;
    this.lineahws = 0;
    this.linealws = 0;
    this.linebhws = 0;
    this.lineblws = 0;
    this.lineacws = 0;
    this.linebcws = 0;
    this.rhours = 0;
    this.tothours = 0;
    this.faultcount = 0;
    this.boardfault = [0,0,0,0,0,0,0,0];
    this.disabcount = 0;
    this.boarddisab = [0,0,0,0,0,0,0,0];
    this.week = 0;
    this.reporttype = 0;
    this.fuse6ws = 0;
    this.reserved = [0,0,0,0,0,0];
    this.reserved2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.reserved3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.pointstate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.pointcapa = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.lightamps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.extras = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.versions = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.reserved5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.reserved6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];    

    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }
  }

  static size(offset=0) {
    offset += 4;
    offset = undefined.size(offset);
    offset += 2;
    offset = undefined.size(offset);
    offset += 2;
    offset = undefined.size(offset);
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset += 4;
    offset += 2;
    offset += 8;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 2;
    offset += 6;
    offset += 64;
    offset += 128;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    return offset;
  }

  size(offset=0) {
    offset += 4;

    offset += 2;

    offset += 2;

    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 4;
    offset += 4;
    offset += 2;
    offset += 8;
    offset += 2;
    offset += 8;
    offset++;
    offset++;
    offset += 2;
    offset += 6;
    offset += 64;
    offset += 128;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    offset += 256;
    return offset;
  }

  read(buf, offset=0) {
    this.seconds = buf.readUInt32LE(offset); offset += 4;

    this.dcinws = buf.readUInt16LE(offset); offset += 2;

    this.battws = buf.readUInt16LE(offset); offset += 2;

    this.chargerws = buf.readUInt16LE(offset); offset += 2;
    this.fuse3ws = buf.readUInt16LE(offset); offset += 2;
    this.fuse4ws = buf.readUInt16LE(offset); offset += 2;
    this.lineahws = buf.readUInt16LE(offset); offset += 2;
    this.linealws = buf.readUInt16LE(offset); offset += 2;
    this.linebhws = buf.readUInt16LE(offset); offset += 2;
    this.lineblws = buf.readUInt16LE(offset); offset += 2;
    this.lineacws = buf.readUInt16LE(offset); offset += 2;
    this.linebcws = buf.readUInt16LE(offset); offset += 2;
    this.rhours = buf.readUInt32LE(offset); offset += 4;
    this.tothours = buf.readUInt32LE(offset); offset += 4;
    this.faultcount = buf.readUInt16LE(offset); offset += 2;
    this.boardfault = [];
    for(let i=0; i<8; i++) { this.boardfault.push(buf.readUInt8(offset++)); }
    this.disabcount = buf.readUInt16LE(offset); offset += 2;
    this.boarddisab = [];
    for(let i=0; i<8; i++) { this.boarddisab.push(buf.readUInt8(offset++)); }
    this.week = buf.readUInt8(offset++);
    this.reporttype = buf.readUInt8(offset++);
    this.fuse6ws = buf.readUInt16LE(offset); offset += 2;
    this.reserved = [];
    for(let i=0; i<6; i++) { this.reserved.push(buf.readUInt8(offset++)); }
    this.reserved2 = [];
    for(let i=0; i<64; i++) { this.reserved2.push(buf.readUInt8(offset++)); }
    this.reserved3 = [];
    for(let i=0; i<128; i++) { this.reserved3.push(buf.readUInt8(offset++)); }
    this.pointstate = [];
    for(let i=0; i<256; i++) { this.pointstate.push(buf.readUInt8(offset++)); }
    this.pointcapa = [];
    for(let i=0; i<256; i++) { this.pointcapa.push(buf.readUInt8(offset++)); }
    this.lightamps = [];
    for(let i=0; i<256; i++) { this.lightamps.push(buf.readUInt8(offset++)); }
    this.extras = [];
    for(let i=0; i<256; i++) { this.extras.push(buf.readUInt8(offset++)); }
    this.versions = [];
    for(let i=0; i<256; i++) { this.versions.push(buf.readUInt8(offset++)); }
    this.reserved5 = [];
    for(let i=0; i<256; i++) { this.reserved5.push(buf.readUInt8(offset++)); }
    this.reserved6 = [];
    for(let i=0; i<256; i++) { this.reserved6.push(buf.readUInt8(offset++)); }
    return offset;
  }

  write(buf, offset=0) {
    let data = this;
    buf.writeUInt32LE(this.seconds, offset); offset += 4;

    buf.writeUInt16LE(this.dcinws, offset); offset += 2;

    buf.writeUInt16LE(this.battws, offset); offset += 2;

    buf.writeUInt16LE(this.chargerws, offset); offset += 2;
    buf.writeUInt16LE(this.fuse3ws, offset); offset += 2;
    buf.writeUInt16LE(this.fuse4ws, offset); offset += 2;
    buf.writeUInt16LE(this.lineahws, offset); offset += 2;
    buf.writeUInt16LE(this.linealws, offset); offset += 2;
    buf.writeUInt16LE(this.linebhws, offset); offset += 2;
    buf.writeUInt16LE(this.lineblws, offset); offset += 2;
    buf.writeUInt16LE(this.lineacws, offset); offset += 2;
    buf.writeUInt16LE(this.linebcws, offset); offset += 2;
    buf.writeUInt32LE(this.rhours, offset); offset += 4;
    buf.writeUInt32LE(this.tothours, offset); offset += 4;
    buf.writeUInt16LE(this.faultcount, offset); offset += 2;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.boardfault[i], offset++); }
    buf.writeUInt16LE(this.disabcount, offset); offset += 2;
    for(let i=0; i<8; i++) { buf.writeUInt8(this.boarddisab[i], offset++); }
    buf.writeUInt8(this.week, offset++);
    buf.writeUInt8(this.reporttype, offset++);
    buf.writeUInt16LE(this.fuse6ws, offset); offset += 2;
    for(let i=0; i<6; i++) { buf.writeUInt8(this.reserved[i], offset++); }
    for(let i=0; i<64; i++) { buf.writeUInt8(this.reserved2[i], offset++); }
    for(let i=0; i<128; i++) { buf.writeUInt8(this.reserved3[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.pointstate[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.pointcapa[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.lightamps[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.extras[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.versions[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.reserved5[i], offset++); }
    for(let i=0; i<256; i++) { buf.writeUInt8(this.reserved6[i], offset++); }
    return offset;
  }
}
Object.defineProperty(exports, 'REPORT3K_STRUCT', {value:REPORT3K_STRUCT, configurable:false, writable:false});

const REPORT3K_STRUCT_ADDRESS = 1611923456;
Object.defineProperty(exports, 'REPORT3K_STRUCT_ADDRESS', {value:REPORT3K_STRUCT_ADDRESS, configurable:false, writable:false});

const REPORT3K_STRUCT_COUNT = 1;
Object.defineProperty(exports, 'REPORT3K_STRUCT_COUNT', {value:REPORT3K_STRUCT_COUNT, configurable:false, writable:false});

