const util = require('util');
const path = require('path');
const fs = require('fs');
const os = require('os');

let unnamed_struct_count = 0;
let pragmas = {};
let endianess = os.endianness();
endianess = 'BE';

const types = {
  nybble:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw 'int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      if(field.length===undefined) field.length = 1;
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int8(this.${n}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int8(offset++);`;
      if(field.length===undefined) field.length = 1;
      res =  `this.${field.ident} = [];\n`;
      if(field.endian==='BE')
        res += `    for(let i=0; i<${field.length}; i++) { let b = buf.read${s}Int8(offset++); this.${field.ident}.push((b & 0xf0) >> 4); this.${field.ident}.push(b & 0x0f); }`;
      else
        res += `    for(let i=0; i<${field.length}; i++) { let b = buf.read${s}Int8(offset++); this.${field.ident}.push(b & 0x0f); this.${field.ident}.push((b & 0xf0) >> 4); }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length};`;
      }
      return `offset++;`;
    },
  },

  reserved:{
    default: function(name, field) {
      if(field.length!==undefined) {
        let val = [];
        for(let i=0; i<field.length; i++) {
          val.push(0);
        }
        return `Object.defineProperty(this, "${field.ident}", {configurable:false, enumerable:false, writable:true, value:[${val.join(",")}]})`;
      } else {
        return `Object.defineProperty(this, "${field.ident}", {configurable:false, enumerable:false, writable:true, value:0})`;
      }
    },
    pre: function(field) {
      if(field.length===Infinity) throw 'reserved arrays must have a length';
      if(field.length!==undefined && typeof field.length!=='number') field.length = 'this.'+field.length;
    },
    write: function(name, field) {
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.writeUInt8(this.${n}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res = null;
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      res = `for(let i=0; i<${field.length}; i++) { this.${n} = buf.readUInt8(offset++); }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length};`;
      }
      return `offset++;`;
    },
  },

  bool:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw 'bool arrays must have a length';
    },
    write: function(name, field) {
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.writeUInt8(this.${n}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `this.${field.ident} = buf.readUInt8(offset++);`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = new Array(${field.length});\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}[i] = buf.readUInt8(offset++); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length};`;
      }
      return `offset++;`;
    },
  },

  int8:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int8(this.${n}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int8(offset++);`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int8(offset++)); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length};`;
      }
      return `offset++;`;
    },
  },

  int16:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int16${field.endian}(this.${n}, offset); offset += 2;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int16${field.endian}(offset); offset += 2;`;
      if(field.length!==undefined) {
        res +=  `this.${field.ident} = [];\n`;
        res = `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int16${field.endian}(offset)); offset += 2; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 2;`;
      }
      return `offset += 2;`;
    },
  },

  int24:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int${field.endian}(this.${n}, offset, 3); offset += 3;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int${field.endian}(offset, 3); offset += 3;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 3; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 3;`;
      }
      return `offset += 3;`;
    },
  },

  int32:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int32${field.endian}(this.${n}, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int32${field.endian}(offset); offset += 4;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += 4; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 4;`;
      }
      return `offset += 4;`;
    },
  },

  int40:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int${field.endian}(this.${n}, offset, 5); offset += 5;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int${field.endian}(offset, 5); offset += 5;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 5; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 5;`;
      }
      return `offset += 5;`;
    },
  },

  int48:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int${field.endian}(this.${n}, offset, 6); offset += 6;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int${field.endian}(offset, 6); offset += 6;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 6)); offset += 6; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 6;`;
      }
      return `offset += 6;`;
    },
  },

  int56:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int${field.endian}(this.${n}, offset, 7); offset += 7;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int${field.endian}(offset, 7); offset += 7;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 7)); offset += 7; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 7;`;
      }
      return `offset += 7;`;
    },
  },

  int64:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int32${field.endian}(this.${n} & 0xffffffff, offset); offset += 4; buf.write${s}Int32${field.endian}((this.${field.ident} >> 32) & 0xffffffff, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res = `this.${field.ident} = buf.read${s}Int32${field.endian}(offset); offset += 4; this.${field.ident} |= (buf.read${s}Int32${field.endian}(offset++) << 32); offset += 4;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { let tmp = buf.read${s}Int32${field.endian}(offset); offset += 4; tmp |= buf.read${s}Int32${field.endian}(offset)<<32; offset += 4; this.${field.ident}.push(tmp); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 8;`;
      }
      return `offset += 8;`;
    },
  },

  short:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int16${field.endian}(this.${n}, offset); offset += 2;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int16${field.endian}(offset); offset += 2;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int16${field.endian}(offset)); offset += 2; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 2;`;
      }
      return `offset += 2;`;
    },
  },

  long:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident; if(field.length!==undefined) n += '[i]';
      let res = `buf.write${s}Int32${field.endian}(this.${n}, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int32${field.endian}(offset); offset += 4;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += 4; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 4;`;
      }
      return `offset += 4;`;
    },
  },

  intv:{
    default: '0',
    pre: function(field) {
      throw new Error('signed variable int type not yet supported');
    },
    write: function(name, field) {
      throw new Error('signed variable int type not yet supported');
      return `offset = writeIntVar(buf, offset, this.${field.ident});`;
    },
    read: function(name, field) {
      throw new Error('signed variable int type not yet supported');
      return `this.${field.ident} = readIntVar(buf, offset); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
    },
    size: function(name, field) {
      throw new Error('signed variable int type not yet supported');
      return `offset += sizeIntVar(this.${field.ident});`;
    },
  },

  uintv:{
    default: '0',
    write: function(name, field) {
      return `offset = writeUIntVar(buf, offset, this.${field.ident});`;
    },
    read: function(name, field) {
      return `this.${field.ident} = readUIntVar(buf, offset); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
    },
    size: function(name, field) {
      return `offset += sizeUIntVar(this.${field.ident});`;
    },
  },

  int:{
    default: '0',
    pre: function(field) {
      if(field.length===Infinity) throw '(u)int arrays must have a length';
    },
    write: function(name, field) {
      if(field.modifiers.variable) {
        if(field.length) throw new Error('variable int type cannot be an array');
        return `offset = writeUIntVar(buf, offset, this.${field.ident});`;
      }

      let size = 'INTEGER_SIZE_BYTES';
      let s = field.modifiers.unsigned ? 'U' : '';
      let n = field.ident;
      if(field.length!==undefined) n += '[i]';
      res = `buf.write${s}Int${field.endian}(this.${n}, offset, ${size}); offset += ${size};`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      if(field.modifiers.variable) {
        return `this.${field.ident} = readUIntVar(buf, offset); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
      }

      let size = 'INTEGER_SIZE_BYTES';
      let s = field.modifiers.unsigned ? 'U' : '';
      res = `this.${field.ident} = buf.read${s}Int${field.endian}(offset, ${size}); offset += ${size};`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];\n`;
        res += `    for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += ${size}; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.modifiers.variable) return `offset += sizeUIntVar(this.${field.ident});`;
      return 'offset += INTEGER_SIZE_BYTES;';
    },
  },

  float:{
    default: '0.0',
    write: function(name, field) {
      return `buf.writeFloat${field.endian}(this.${field.ident}, offset); offset += 4;`;
    },
    read: function(name, field) {
      return `this.${field.ident} = buf.readFloat${field.endian}(offset); offset += 4;`;
    },
    size: function(name, field) {
      return `offset += 4;`;
    },
  },

  double:{
    default: '0.0',
    write: function(name, field) {
      return `buf.writeDouble${field.endian}(this.${field.ident}, offset); offset += 8;`;
    },
    read: function(name, field) {
      return `this.${field.ident} = buf.readDouble${field.endian}(offset); offset += 8;`;
    },
    size: function(name, field) {
      if(field.modifiers.long) throw new Error('long double not supported');
      return `offset += 8;`;
    },
  },

  buffer:{
    default: 'null',
    write: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `offset = writeUIntVar(buf, offset, this.${field.ident}.length); ${field.ident}.copy(buf, offset); offset += ${field.ident}.length;`;
      }

      if(typeof field.length !== 'number' && field.length!==undefined) {
        return `offset = this.${field.ident}.copy(buf, offset, 0, this.${field.length}); offset += this.${field.length};`;
      }

      if(typeof field.length === 'number') {
        return `offset = this.${field.ident}.copy(buf, offset, 0, ${field.length});`;
      }
    },
    read: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `let ${field.ident} = readUIntVar(buf, offset); offset = ${field.ident}[1]; this.${field.ident} = buf.slice(offset, offset+${field.ident}[0]); offset += ${field.ident}[0];`;
      }

      if(typeof field.length !== 'number' && field.length!==undefined) {
        return `this.${field.ident} = buf.slice(offset, offset+this.${field.length}); offset += this.${field.length};`;
      }

      if(typeof field.length === 'number') {
        return `this.${field.ident} = buf.slice(offset, offset+${field.length}); offset += ${field.length};`;
      }
      return ``;
    },
    size: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `offset += sizeUIntVar(this.${field.ident}.length) + ${field.ident}.length;`;
      }

      if(typeof field.length !== 'number' && field.length!==undefined) {
        return `offset += this.${field.length};`;
      }

      if(typeof field.length === 'number') {
        return `offset += ${field.length};`;
      }
    },
  },

  char:{
    default: function(name, field) {
      if(field.modifiers.unsigned) return `this.${name} = 0`;
      if(field.length===undefined) return 'this.${name} = 0';
      return `this.${name} = ''`;
    },
    write: function(name, field) {
      if(field.length===undefined || field.modifiers.unsigned) {
        return types.int8.write(name, field);
      }

      let encoding = 'utf-8';
      if(field.modifiers.ascii) encoding = 'ascii';
      if(field.modifiers.utf16le) encoding = 'utf16le';
      if(field.modifiers.ucs2) encoding = 'ucs2';
      if(field.modifiers.base64) encoding = 'base64';
      if(field.modifiers.latin1) encoding = 'latin1';
      if(field.modifiers.binary) encoding = 'binary';
      if(field.modifiers.hex) encoding = 'hex';

      if(field.length===Infinity) {
        return `offset = writeZString(buf, offset, this.${field.ident}, ${encoding});`;
      }

      if(typeof field.length === 'number') {
        return `offset = writeString(buf, offset, this.${field.ident}, ${field.length}, ${encoding});`;
      }

      if(field.length === 'int8') {
        return `buf.writeUInt8(Buffer.byteLength(this.${field.ident}, ${encoding}), offset++); offset = writeString(buf, offset, this.${field.ident}, undefined, ${encoding});`;
      }

      if(field.length === 'int16') {
        return `buf.writeUInt16${field.endian}(Buffer.byteLength(this.${field.ident}, ${encoding}), offset); offset += 2; offset = writeString(buf, offset, this.${field.ident}, undefined, ${encoding});`;
      }

      if(field.length === 'int32') {
        return `buf.writeUInt32${field.endian}(Buffer.byteLength(this.${field.ident}, ${encoding}), offset); offset += 4; offset = writeString(buf, offset, this.${field.ident}, undefined, ${encoding});`;
      }

      if(field.length === 'intv') {
        return `let ${field.ident} = writeIntVar(buf, offset, Buffer.byteLength(this.${field.ident}, ${encoding})); offset = ${field.ident}; offset = writeString(buf, offset, this.${field.ident}, undefined, ${encoding});`;
      }

      if(field.length === 'uintv') {
        return `let ${field.ident} = writeUIntVar(buf, offset, Buffer.byteLength(this.${field.ident}, ${encoding})); offset = ${field.ident}; offset = writeString(buf, offset, this.${field.ident}, undefined, ${encoding});`;
      }

      if(typeof field.length === 'string') {
        return `offset = writeString(buf, offset, this.${field.ident}, this.${field.length}, ${encoding});`;
      }

      throw 'Invalid char type field';
    },
    read: function(name, field) {
      if(field.length===undefined || field.modifiers.unsigned) {
        return types.int8.read(name, field);
      }

      let encoding = 'utf-8';
      if(field.modifiers.ascii) encoding = 'ascii';
      if(field.modifiers.utf16le) encoding = 'utf16le';
      if(field.modifiers.ucs2) encoding = 'ucs2';
      if(field.modifiers.base64) encoding = 'base64';
      if(field.modifiers.latin1) encoding = 'latin1';
      if(field.modifiers.binary) encoding = 'binary';
      if(field.modifiers.hex) encoding = 'hex';

      if(field.length===Infinity) {
        return `this.${field.ident} = readZString(buf, offset, ${encoding}); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
      }

      if(typeof field.length === 'number') {
        return `this.${field.ident} = readString(buf, offset, ${field.length}, ${encoding}); offset += ${field.length};`;
      }

      if(field.length === 'int8') {
        return `let ${field.ident} = buf.readUInt8(offset++); this.${field.ident} = readString(buf, offset, ${field.ident}, ${encoding}); offset += ${field.ident};`;
      }

      if(field.length === 'int16') {
        return `let ${field.ident} = buf.readUInt16${field.endian}(offset++); this.${field.ident} = readString(buf, offset, ${field.ident}, ${encoding}); offset += ${field.ident};`;
      }

      if(field.length === 'int32') {
        return `let ${field.ident} = buf.readUInt32${field.endian}(offset++); this.${field.ident} = readString(buf, offset, ${field.ident}, ${encoding}); offset += ${field.ident};`;
      }

      if(field.length === 'intv') {
        return `let ${field.ident} = readIntVar(buf, offset); offset = ${field.ident}[1]; this.${field.ident} = readString(buf, offset, ${field.ident}[0], ${encoding}); offset += ${field.ident}[0];`;
      }

      if(field.length === 'uintv') {
        return `let ${field.ident} = readUIntVar(buf, offset); offset = ${field.ident}[1]; this.${field.ident} = readString(buf, offset, ${field.ident}[0], ${encoding}); offset += ${field.ident}[0];`;
      }

      if(typeof field.length === 'string') {
        return `this.${field.ident} = readString(buf, offset, this.${field.length}, ${encoding}); offset += this.${field.length};`;
      }

      throw 'Invalid char type field';
    },
    size: function(name, field) {
      if(field.length===undefined || field.modifiers.unsigned) {
        return types.int8.size(name, field);
      }

      if(field.length===Infinity) {
        return `offset += this.${field.ident}.length + 1;`;
      }

      if(typeof field.length === 'number') {
        return `offset += ${field.length};`;
      }

      if(field.length === 'int8') {
        return `offset += this.${field.ident}.length + 1;`;
      }

      if(field.length === 'int16') {
        return `offset += this.${field.ident}.length + 2;`;
      }

      if(field.length === 'int32') {
        return `offset += this.${field.ident}.length + 4;`;
      }

      if(field.length === 'intv') {
        return `offset += this.${field.ident}.length + sizeIntVar(this.${field.ident}.length);`;
      }

      if(field.length === 'uintv') {
        return `offset += this.${field.ident}.length + sizeUIntVar(this.${field.ident}.length);`;
      }

      if(typeof field.length === 'string') {
        return `offset += this.${field.length};`;
      }
    },
  },

  cstring:{
    default: '',
    write: function(name, field, encoding='utf-8') {
      return `offset = writeZString(buf, offset, this.${field.ident});`;
    },
    read: function(name, field) {
      return `this.${field.ident} = readZString(buf, offset); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
    },
    size: function(name, field) {
      if(field.length === 'int8') {
        return `offset += this.${field.ident}.length + 1;`;
      }
    },
  },

  switch: {
    default: undefined,
    write: function(name, field) {
      let res = '';
      let value = field.value;
      for(let c of field.cases) {
        res += `if(this.${value}===${c.value}) {\n`;

        res += struct_write('', c.fields, '      ');

        res += '    }\n    ';
      }
      return res;
    },
    read: function(name, field) {
      let res = '';
      let value = field.value;
      for(let c of field.cases) {
        res += `if(this.${value}===${c.value}) {\n`;

        res += struct_read('', c.fields, '      ');

        res += '    }\n    ';
      }
      return res;
    },
    size: function(name, field) {
      let res = '';
      let value = field.value;
      for(let c of field.cases) {
        res += `if(this.${value}===${c.value}) {\n`;

        res += struct_size('', c.fields, '      ');

        res += '    }\n    ';
      }
      return res;
    },
  },

  bitfield: {
    default: function(name, field) {
      let res = `this.${name} = [`;
      for(let i=0; i<field.length*8; i++) res += '0,';
      return res.slice(0, res.length-1) + ']';
    },
    pre: function(field) {
      if(field.length===undefined) throw 'bitfield type must have a length';
      if(field.length===Infinity) throw 'bitfield array cannot have undefined length';
    },
    write: function(name, field) {
      let n = 'this.'+field.ident;
      let l = field.length*8-1;
      let algo = '(i*8+j)';

      if(field.modifiers.reversed) algo = '(i*8+(7-j))';
      if(field.modifiers.littleendian) algo = `${l} - ` + algo;

      res = `
    for(let i=0; i<${field.length}; i++) {
      let b = 0;
      for(let j=0; j<8; j++) {
        b = b | ((${n}[${l} - ${algo}]) << j);
      }
      buf.writeUInt8(b, offset++);
    }`;
      return res;
    },
    read: function(name, field) {
      let l = field.length*8-1;
      let algo = '(i*8+j)';

      if(field.modifiers.littleendian)
        field.modifiers.reversed = !field.modifiers.reversed;

      if(field.modifiers.reversed) algo = '(i*8+(7-j))';
      if(field.modifiers.littleendian) algo = `${l} - ` + algo;

      res = `
    for(let i=0; i<${field.length}; i++) {
      let b = buf.readUInt8(offset++);
      for(let j=0; j<8; j++) {
        this.${field.ident}[${algo}] = (b>>j) & 1;
      }
    }`;
      //res = `this.${field.ident} = []; for(let i=0; i<${field.length}; i++) { let ${field.ident} = ${field.type}.read(buf, offset); offset = ${field.ident}[1]; this.${field.ident}.push(${field.ident}[0]); }`;
      return res;
    },
    size: function(name, field) {
      return `offset += ${field.length};`;
    },
  },

  bitlist: {
    default: function(name, field) {
      return `this.${name} = []`;
    },
    pre: function(field) {
      if(field.length===undefined) throw 'bitlist type must have a length';
      if(field.length===Infinity) throw 'bitlist array cannot have undefined length';
    },
    write: function(name, field) {
      return `throw 'Writing bitlists is not yet supported';`;
    },
    read: function(name, field) {
      let l = field.length*8-1;
      let algo = '(i*8+j)';

      if(field.modifiers.littleendian)
        field.modifiers.reversed = !field.modifiers.reversed;

      if(field.modifiers.reversed) algo = '(i*8+(7-j))';
      if(field.modifiers.littleendian) algo = `${l} - ` + algo;

      res = `
    this.${field.ident} = [];
    for(let i=0; i<${field.length}; i++) {
      let b = buf.readUInt8(offset++);
      for(let j=0; j<8; j++) {
        if(((b>>j) & 0x01)!==0) this.${field.ident}.push(${algo});
      }
    }`;
      //res = `this.${field.ident} = []; for(let i=0; i<${field.length}; i++) { let ${field.ident} = ${field.type}.read(buf, offset); offset = ${field.ident}[1]; this.${field.ident}.push(${field.ident}[0]); }`;
      return res;
    },
    size: function(name, field) {
      return `offset += ${field.length};`;
    },
  },

  'typedef struct': {
    default: '{}',
    pre: function(field) {
    },
    write: function(name, field) {
      let n = field.ident;
      if(field.length!==undefined) n += '[i]';
      let res = `offset = this.${n}.write(buf, offset);`;
      if(field.length!==undefined) res = `for(let item of this.${field.ident}) { offset = item.write(buf, offset); }`;
      return res;
    },
    read: function(name, field) {
      res = `offset = this.${field.ident}.read(buf, offset);`;
      if(field.length!==undefined) res = `this.${field.ident} = new Array(${field.length});
    for(let i=0; i<${field.length}; i++) {
      this.${field.ident}[i] = new ${field.type}(buf, offset);
      offset += this.${field.ident}[i].size();
    }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) return `for(let item of this.${field.ident}) { offset += item.size(); }`;
      return `offset += this.${field.ident}.size();`;
    },
  },
}

function field_type(name, field, mode='read', indent='    ') {
  if(!field) return [];
  if(!field.type) return [];
  if(field.type==='lambda') return [];

  field.endian = endianess;
  if(field.modifiers.littleendian) field.endian = 'LE';
  if(field.modifiers.bigendian) field.endian = 'BE';

  let handler = types[field.type];
  if(handler===undefined) handler = types['typedef struct'];
  if(handler===undefined) {
    return [indent + '// unknown type '+field.type];
  }

  if(mode==='read')
    return [indent + handler.read(name, field)];

  if(mode==='write')
    return [indent + handler.write(name, field)];

  if(mode==='size')
    return [indent + handler.size(name, field)];

  if(mode==='static size') {
    if(handler.static_size)
      return [indent + handler.static_size(name, field)];
    else
      return [indent + handler.size(name, field)];
  }
}

function struct_pre(struct, indent='    ') {
  let names = [];

  for(let f of struct.fields) {
    if(!f) continue;
    if(typeof f.length=='string' && names.includes(f.length)) {
      f.length = 'this.'+f.length;
    }
    names.push(f.ident);
  }
}

function struct_read(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, 'read', indent);
    if(t===undefined) {
      res += indent + 'offset = this.'+field.ident+'.read(buf, offset);\n';
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + 'offset = this.'+field.ident+'.read(buf, offset);\n';
    }

    res += '\n';
  }
  return res;
}

function struct_write(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, 'write', indent);
    if(t===undefined) {
      res += indent + `offset = ${field.type}.write(buf, offset);\n`;
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + 'buf.write'+t[0]+'(offset); offset = '+t[1];
    }

    res += '\n';
  }
  return res;
}

function struct_size(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, 'size', indent);
    if(t===undefined) {
      res += indent + 'offset = '+field.type+'.size(offset);\n';
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + 'offset = '+t[1];
    }

    res += '\n';
  }
  return res;
}

function struct_static_size(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, 'static size', indent);

    if(types[field.type]===undefined) {
      if(field.length) {
        res += indent + `offset = ${field.type}.size(offset) * ${field.length};\n`;
      } else {
        res += indent + `offset = ${field.type}.size(offset);\n`;
      }
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + 'offset = '+t[1];
    }

    res += '\n';
  }
  return res;
}

const aliases = {

  'uint':(field) => { field.modifiers.unsigned = true; field.type = 'int'; },

  'uint8':(field) => { field.modifiers.unsigned = true; field.type = 'int8'; },
  'uint16':(field) => { field.modifiers.unsigned = true; field.type = 'int16'; },
  'uint32':(field) => { field.modifiers.unsigned = true; field.type = 'int32'; },
  'uint40':(field) => { field.modifiers.unsigned = true; field.type = 'int40'; },
  'uint48':(field) => { field.modifiers.unsigned = true; field.type = 'int48'; },
  'uint56':(field) => { field.modifiers.unsigned = true; field.type = 'int56'; },
  'uint64':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },
  'uintmax':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },

  'uintv_t':(field) => { field.modifiers.unsigned = true; field.type = 'uintv'; },
  'uint8_t':(field) => { field.modifiers.unsigned = true; field.type = 'int8'; },
  'uint16_t':(field) => { field.modifiers.unsigned = true; field.type = 'int16'; },
  'uint32_t':(field) => { field.modifiers.unsigned = true; field.type = 'int32'; },
  'uint40_t':(field) => { field.modifiers.unsigned = true; field.type = 'int40'; },
  'uint48_t':(field) => { field.modifiers.unsigned = true; field.type = 'int48'; },
  'uint56_t':(field) => { field.modifiers.unsigned = true; field.type = 'int56'; },
  'uint64_t':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },
  'uintmax_t':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },

  'intv_t':(field) => { field.type = 'uintv'; },
  'int8_t':(field) => { field.type = 'int8'; },
  'int16_t':(field) => { field.type = 'int16'; },
  'int32_t':(field) => { field.type = 'int32'; },
  'int40_t':(field) => { field.type = 'int40'; },
  'int48_t':(field) => { field.type = 'int48'; },
  'int56_t':(field) => { field.type = 'int56'; },
  'int64_t':(field) => { field.type = 'int64'; },
  'intmax_t':(field) => { field.type = 'int64'; },
}

function pre_fields(fields) {
  for(let field of fields) {
    if(!field) continue;
    if(field.ident===undefined) continue;
    if(field.null===true) continue;

    let alias = aliases[field.type];
    if(alias) {
      alias(field);
    }

    let handler = types[field.type];

    if(!handler) handler = types['typedef struct'];

    if(handler.unsigned===true) field.modifiers = Object.assign(field.modifiers, {unsigned:true});

    if(handler.pre) {
      handler.pre(field);
    }
  }
}

function new_fields(fields, names = []) {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    if(field.ident!==undefined && names.indexOf(field.ident)>-1) continue;
    if(field.type==='lambda') continue;

    names.push(field.ident);

    if(field.type==='switch') {
      for(let _case of field.cases) {
        let tmp = new_fields(_case.fields, names);
        if(tmp!=='')
          res += tmp + ',';
      }
      continue;
    }

    if(field.ident===undefined) continue;

    let type = types[field.type] || {default:`new ${field.type}()`, struct: true};
    if(field.default!==undefined) type = {default: field.default};

    let def = type.default;

    if(def instanceof Function) {
      res += '    ' + def(field.ident, field)+';\n';
    } else {
      if(field.length!==undefined && field.type!=='char') {
        if(types[field.type]===undefined) {
          let tmp = `new Array(${field.length});\n`;
          for(let i=0; i<field.length; i++) {
            tmp += `    this.${field.ident}[${i}] = ${def};\n`;
          }
          def = tmp;
        } else {
          if(field.length>0) {
            def = '[';
            for(let i=0; i<field.length; i++) def += type.default+',';
            def = def.slice(0, def.length-1) + ']';
          } else {
            def = '[]';
          }
        }
      }
      res += `    this.${field.ident} = ${def};\n`;
    }
  }
  res = res.slice(0, -1);
  return res;
}

function new_fields_init(fields, names = []) {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    if(field.ident!==undefined && names.indexOf(field.ident)>-1) continue;
    if(field.type==='lambda') continue;
    names.push(field.ident);

    if(field.ident===undefined) continue;

    let type = types[field.type] || {default:`${field.type}.new()`, struct: true};
    if(field.default!==undefined) type = {default: field.default};
  }
  return res;
}

function lambdas_init(fields) {
  l = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.type==='lambda') {
      l += `    Object.defineProperty(data, "${field.ident}", {`;
      if(field.get!==null) {
        l += 'get: function() { return';
        for(let op of field.get) {
          l += ' ';
          if(typeof op==='string') {
            if(op==='(') { l += op; continue; }
            if(op===')') { l += op; continue; }
            if(op==='&') { l += op; continue; }
            if(op==='|') { l += op; continue; }
            if(op==='^') { l += op; continue; }
            if(op==='~') { l += op; continue; }
            if(op==='<<') { l += op; continue; }
            if(op==='>>') { l += op; continue; }
            if(op==='+') { l += op; continue; }
            if(op==='-') { l += op; continue; }
            if(op==='*') { l += op; continue; }
            if(op==='/') { l += op; continue; }
            l += 'this.'+op;
            continue;
          }
          l += op;
        }
        l += '; }';
      }

      if(field.get && field.set) l += ', ';

      if(field.set!==null) {
        l += 'set: function(value) { ';
        l += `this.${field.set.shift()} =`;
        for(let op of field.set) {
          l += ' ';
          if(typeof op==='string') {
            if(op==='(') { l += op; continue; }
            if(op===')') { l += op; continue; }
            if(op==='&') { l += op; continue; }
            if(op==='|') { l += op; continue; }
            if(op==='^') { l += op; continue; }
            if(op==='~') { l += op; continue; }
            if(op==='<<') { l += op; continue; }
            if(op==='>>') { l += op; continue; }
            if(op==='+') { l += op; continue; }
            if(op==='-') { l += op; continue; }
            if(op==='*') { l += op; continue; }
            if(op==='/') { l += op; continue; }
            if(op==='value') { l += op; continue; }

            l += 'this.'+op;
            continue;
          }
          l += op;
        }
        l += '; }';
      }

      l += '});\n'
    }
  }
  return l;
}

function value(item) {
  if(item['type']==='bool') {
    return 'exports.'+item.name + ' = ' + (item.value.toUpperCase()==='TRUE' ? 'true' : 'false') + ';\n';
  }

  if(item['type']!=='string') {
    return 'exports.'+item.name+' = '+item.value+';\n';
  }

  return 'exports.'+item.name+' = \''+item.value+'\';\n';
}

function _enum(name, fields) {
  let res = `const ${name} = {\n`;
  for(let field of fields) {
    if(field.null===true) continue;
    res += '  ' + field.value + ': \'' + field.ident + '\',\n';
  }
  res += '}\n';
  res += `exports.${name} = ${name};\n\n`;

  return res;
}

function struct(name, aliases, declarations, fields) {
  pre_fields(fields);

  let res = ``;
  let hadname = !!name;

  if(!hadname) throw new Error('Unnamed struct ! Structs MUST have a name');

  res += `class ${name} extends STRUCTURE {\n`;

  res += '  constructor(buf, offset=0) {\n';
  res += '    super();\n';
  res += new_fields(fields);
  res += '    ' + new_fields_init(fields).trim() + '\n';
  //res += `    Object.defineProperty(data, 'write', {value:${name}_write_this});\n`;
//  res += `    Object.defineProperty(data, 'size', {value:${name}_size_this});\n`;
  res += lambdas_init(fields);
  res += `
    if(buf instanceof Buffer) {
      this.read(buf, offset);
    } else if(buf!==undefined) {
      Object.assign(this, buf);
    }\n`;
  //res += '    return data;\n';
  res += '  }\n\n';


  res += `  static size(offset=0) {\n`;
  res += struct_static_size(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += `  size(offset=0) {\n`;
  res += struct_size(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += '  read(buf, offset=0) {\n';

  res += struct_read(name, fields);

  res += '    return offset;';
  res += '\n  }\n\n';

  res += `  write(buf, offset=0) {\n    let data = this;\n`;
  res += struct_write(name, fields);
  res += '    return offset;\n';
  res += '  }\n';
  res += '}\n';

  if(hadname) {
    res += `Object.defineProperty(exports, '${name}', {value:${name}, configurable:false, enumerable:true, writable:false});\n`
    //res += `exports.${name} = ${name};\n`;
  }

  if(declarations) for(let item of declarations) {
    if(item.startsWith('*')) {
      // no point making these entries, they bhave no meaning in js
      // res += `let ${item.slice(1)} = exports.${item.slice(1)} = null;\n`;
    } else {
      res += `let ${item} = exports.${item} = new ${name}();\n`;
    }
  }

  if(aliases) for(let item of aliases) {
    if(item.startsWith('*')) {
      // no point making these entries, they bhave no meaning in js
      //res += `let ${item.slice(1)} = exports.${item.slice(1)} = null;\n`;
    } else {
      res += `const ${item} = ${name};\n`;
      res += `Object.defineProperty(exports, '${item}', {value:${item}, configurable:false, enumerable:true, writable:false});\n`
    }
  }

  return res;
}

exports.build = function build(filename, items) {
  let res = `/** "Structural" generated this file from ${filename} at ${new Date()} */\n\n`;

  let du = fs.readFileSync(__dirname+'/../res/datautils.js', 'utf-8');
  du = du.replace(/\n/g, '').replace(/\r/g, '');

  res += 'const util = require("util"); const os = require("os"); const wide = process.arch.endsWith("64");\n';

  res += du + '\n';

  res += `
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
\n`;

  res += 'exports.initialize = function(actions) {\n';

  endianess = 'LE';

  for(let item of items) {
    if(item.type==='alias') {
      types[item.name] = types[item.value];
      continue;
    }

    if(item.type==='enum') {
      let size = 8;
      for(let field of item.fields) {
        if(field.null===true) continue;
        if(typeof field.value==='string') {
          size = 0;
          break;
        }
        if(typeof field.value==='number') {
          if(field.value>255) size = 16;
          if(field.value>65535) size = 32;
        }
      }

      if(size===0) continue;
      if(size===8) types[item.name] = Object.assign({unsigned:true}, types['int8']);
      if(size===16) types[item.name] = Object.assign({unsigned:true}, types['int16']);
      if(size===32) types[item.name] = Object.assign({unsigned:true}, types['int32']);

      continue;
    }
  }

  res += '}\n\n';

  endianess = os.endianness();

  for(let item of items) {
    if(item.type=='include') {
      res += `require('${changeExt(item.filepath, '.js')}')\n`;
      continue;
    }

    if(item.type==='pragma') {
      if(item.name==='bigendian') endianess = 'BE';
      if(item.name==='littleendian') endianess = 'LE';
      pragmas[item.name] = item.args;
      continue;
    }

   if(item.type==='alias') {
      continue;
    }

    if(item.type==='struct') {
      struct_pre(item);
      res += '\n' + struct(item.name, item.aliases, item.declarations, item.fields) + '\n';
      continue;
    }

    if(item.type==='enum') {
      res += _enum(item.name, item.fields);
      continue;
    }

    if(item.const) {
      res += `const ${item.name.ident} = ${item.value};\n`;
      res += `Object.defineProperty(exports, '${item.name.ident}', {value:${item.name.ident}, configurable:false, enumerable:true, writable:false});\n\n`;
      continue;
    }

    res += value(item);
  }

  return res;
}

function changeExt(filepath, ext) {
  let tmp = path.parse(filepath);
  tmp.ext = ext;
  tmp.base = undefined;
  tmp.dir = path.relative('.', tmp.dir);
  return './'+path.format(tmp).replace(/\\/g, '/');
}