const util = require('util');
const path = require('path');
const fs = require('fs');
const os = require('os');

let pragmas = {};
let endianess = os.endianness();

const untransformed = '_u';
const transformed = '_t';

process.env['WARN_UNUSED_TRANSFORM'] = 'false';
const typehandlers = {
  structfield:{

  },

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
        return field.length;
      }
      return 1;
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
      if(field.modifiers.const) return 'offset++;';

      let res =  `this.${field.ident} = buf.readUInt8(offset++);`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = new Array(${field.length});`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}[i] = buf.readUInt8(offset++); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length;
      }
      return 1;
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
      if(field.modifiers.const) return 'offset++;';
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int8(offset++);`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int8(offset++)); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length;
      }
      return 1;
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
      if(field.modifiers.const) return 'offset += 2;';
      let s = field.modifiers.unsigned ? 'U' : '';
      let res =  `this.${field.ident} = buf.read${s}Int16${field.endian}(offset); offset += 2;`;
      if(field.length!==undefined) {
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int16${field.endian}(offset)); offset += 2; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 2;
      }
      return 2;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 3; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 3;
      }
      return 3;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += 4; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 4;
      }
      return 4;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 5; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 5;
      }
      return 5;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 6)); offset += 6; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 6;
      }
      return 6;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int${field.endian}(offset, 7)); offset += 7; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 7;
      }
      return 7;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { let tmp = buf.read${s}Int32${field.endian}(offset); offset += 4; tmp |= buf.read${s}Int32${field.endian}(offset)<<32; offset += 4; this.${field.ident}.push(tmp); }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 8;
      }
      return 8;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int16${field.endian}(offset)); offset += 2; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 2;
      }
      return 2;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += 4; }`;
      }
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return field.length * 4;
      }
      return 4;
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
        res =  `this.${field.ident} = [];`;
        res += ` for(let i=0; i<${field.length}; i++) { this.${field.ident}.push(buf.read${s}Int32${field.endian}(offset)); offset += ${size}; }`;
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
      return 4;
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
      return 8;
    },
  },

  buffer:{
    default: 'null',
    assigns: true,
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
        return field.length;
      }
    },
  },

  char:{
    default: "''",
    notarray: true,
    assigns: true,
    write: function(name, field) {
      if(field.length===undefined || field.modifiers.unsigned) {
        return typehandlers.int8.write(name, field);
      }

      let encoding = field.encoding;
      if(!encoding || encoding=='') encoding = 'utf8';

      if(field.length===Infinity) {
        return `offset = writeZString(buf, offset, this.${field.ident}, ${encoding});`;
      }

      if(typeof field.length === 'number') {
        return `offset = writeString(buf, offset, this.${field.ident}, ${field.length}, '${encoding}');`;
      }

      if(field.length === 'int8') {
        return `buf.writeUInt8(Buffer.byteLength(this.${field.ident}, ${encoding}), offset++); offset = writeString(buf, offset, this.${field.ident}, undefined, '${encoding}');`;
      }

      if(field.length === 'int16') {
        return `buf.writeUInt16${field.endian}(Buffer.byteLength(this.${field.ident}, ${encoding}), offset); offset += 2; offset = writeString(buf, offset, this.${field.ident}, undefined, '${encoding}');`;
      }

      if(field.length === 'int32') {
        return `buf.writeUInt32${field.endian}(Buffer.byteLength(this.${field.ident}, ${encoding}), offset); offset += 4; offset = writeString(buf, offset, this.${field.ident}, undefined, '${encoding}');`;
      }

      if(field.length === 'intv') {
        return `let ${field.ident} = writeIntVar(buf, offset, Buffer.byteLength(this.${field.ident}, ${encoding})); offset = ${field.ident}; offset = writeString(buf, offset, this.${field.ident}, undefined, '${encoding}');`;
      }

      if(field.length === 'uintv') {
        return `let ${field.ident} = writeUIntVar(buf, offset, Buffer.byteLength(this.${field.ident}, ${encoding})); offset = ${field.ident}; offset = writeString(buf, offset, this.${field.ident}, undefined, '${encoding}');`;
      }

      if(typeof field.length === 'string') {
        return `offset = writeString(buf, offset, this.${field.ident}, this.${field.length}, '${encoding}');`;
      }

      throw 'Invalid char type field';
    },
    read: function(name, field) {
      if(field.length===undefined || field.modifiers.unsigned) {
        return typehandlers.int8.read(name, field);
      }

      let encoding = field.encoding;
      if(!encoding || encoding=='') encoding = 'utf8';
      encoding = "'"+encoding+"'";

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
        return typehandlers.int8.size(name, field);
      }

      if(field.length===Infinity) {
        return `offset += this.${field.ident}.length + 1;`;
      }

      if(typeof field.length === 'number') {
        return field.length;
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
        return `offset += this.${field.ident}.length;`;
      }
    },
  },

  cstring:{
    default: "''",
    notarray: true,
    dynamic: true,
    assigns: true,
    write: function(name, field, encoding='utf-8') {
      if(field.length) throw new Error('cstring cannot have length');
      return `offset = writeZString(buf, offset, this.${field.ident});`;
    },
    read: function(name, field) {
      return `this.${field.ident} = readZString(buf, offset); offset = this.${field.ident}[1]; this.${field.ident} = this.${field.ident}[0];`;
    },
    size: function(name, field) {
      return `offset += this.${field.ident}.length + 1;`;
    },
    static_size: function(name, field) {
      return ``;
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
      for(let j=0; j<8; j++) { b = b | ((${n}[${l} - ${algo}]) << j); }
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
      for(let j=0; j<8; j++) { this.${field.ident}[${algo}] = (b>>j) & 1; }
    }`;
      //res = `this.${field.ident} = []; for(let i=0; i<${field.length}; i++) { let ${field.ident} = ${field.type}.read(buf, offset); offset = ${field.ident}[1]; this.${field.ident}.push(${field.ident}[0]); }`;
      return res;
    },
    size: function(name, field) {
      return field.length;
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
    for(let i=0; i<${field.length}; i++) { let b = buf.readUInt8(offset++); for(let j=0; j<8; j++) { if(((b>>j) & 0x01)!==0) this.${field.ident}.push(${algo}); } }`;
      //res = `this.${field.ident} = []; for(let i=0; i<${field.length}; i++) { let ${field.ident} = ${field.type}.read(buf, offset); offset = ${field.ident}[1]; this.${field.ident}.push(${field.ident}[0]); }`;
      return res;
    },
    size: function(name, field) {
      return field.length;
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
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { offset = this.${field.ident}[i].read(buf, offset); }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) return `for(let item of this.${field.ident}) { offset += item.size(); }`;
      return `offset += this.${field.ident}.size();`;
    },
    compare: function(name, field) {
      return `this.${field.ident}.compare(other.${field.ident}, changes, prefix+'${field.ident}.');\n`;
    },
    assign: function(name, field) {
      if(field.length>0) {
        return `if(other.${field.ident}) for(let i=0; i<this.${field.ident}.length; i++) this.${field.ident}[i].assign(other.${field.ident}[i]);\n`;
      } else {
        return `this.${field.ident}.assign(other.${field.ident});\n`;
      }
    }
  },
}

function field_type(name, field, mode='read', indent='    ') {
  if(!field) return [];
  if(!field.type) return [];
  if(field.type==='lambda') return [];

  field.endian = endianess;
  if(field.modifiers.littleendian) field.endian = 'LE';
  if(field.modifiers.bigendian) field.endian = 'BE';

  let handler = typehandlers[field.type];
  if(handler===undefined) handler = typehandlers['typedef struct'];

  if(mode==='read') {
    return [indent + handler.read(name, field)];
  }

  if(mode==='write')
    return [indent + handler.write(name, field)];

  if(mode==='size') {
    res = handler.size(name, field);
    if(typeof res == 'number') return res;
    if(typeof res == 'string') return [indent + res];
  }

  if(mode==='static size') {
    let res = null;
    if(handler.static_size)
      res = handler.static_size(name, field);
    else
      res = handler.size(name, field);

    if(typeof res == 'number') return res;
    if(typeof res == 'string') return [indent + res];
  }

  if(mode==='compare' && handler.compare) {
    return [handler.compare(name, field)];
  }

  if(mode==='assign' && handler.assign) {
    return [handler.assign(name, field)];
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
    if(field.comment) continue;
    if(field.modifiers.static) continue;
    if(field.type=='computed') continue;

    let t = field_type(name, field, 'read', indent);

    if(t===undefined) {
      res += indent + `offset = this.${field.ident}.read(buf, offset);\n`;
      continue;
    }

    if(t.length===1) {
      res += t[0] + '';
    }

    if(field.transform && structs[field.type]) {
      res += '\n'+indent + `this.${field.ident} = this.${field.ident};`;
    }

    if(t.length===2) {
      res += indent + `offset = this.'+field.ident+'.read(buf, offset);\n`;
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
    if(field.comment) continue;
    if(field.modifiers.static) continue;
    if(field.type=='computed') continue;
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
  let rest = 0;

  for(let field of fields) {
    if(!field) continue;
    if(field.comment) continue;
    if(field.modifiers.static) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, 'size', indent);
    if(t===undefined) {
      res += indent + 'offset = '+field.type+'.size(offset);\n';
      continue;
    }

    if(typeof t == 'number') {
      rest += t;
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

  if(rest>0) {
    res += indent + 'offset += '+rest+';\n';
  }

  return res;
}

function struct_static_size(name, fields, indent='    ') {
  let res = '';
  let rest = 0;
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    if(field.modifiers && field.modifiers.static) continue;
    let t = field_type(name, field, 'static size', indent);

    if(typeof t == 'number') {
      rest += t;
      continue;
    }

    if(field.comment) continue;

    if(typehandlers[field.type]===undefined) {
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

  if(rest>0) {
    res += indent + 'offset += '+rest+';\n';
  }

  return res;
}

function struct_compare(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    if(field.comment) continue;
    if(field.modifiers.static) continue;
    if(field.modifiers.const) continue;

    let t = field_type(name, field, 'compare', indent);

    if(t===undefined) {
      res += indent + `if(this.${field.originalIdent}!=other.${field.originalIdent}) changes.push(prefix+'${field.originalIdent}');\n`;
      continue;
    }

    res += indent + t[0];
  }
  return res;
}

function struct_assign(name, fields, indent='    ') {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(field.null===true) continue;
    if(field.comment) continue;
    if(field.modifiers.static) continue;
    if(field.modifiers.const) continue;

    let t = field_type(name, field, 'assign', indent);

    if(t===undefined) {
      res += indent + `if('${field.originalIdent}' in other) this.${field.originalIdent}=other.${field.originalIdent};\n`;
      continue;
    }

    res += indent + `if('${field.originalIdent}' in other) ` + t[0];
  }
  return res;
}


const aliases = {

  'uint':(field) => { field.modifiers.unsigned = true; field.type = 'int'; },

  'uint8':(field) => { field.modifiers.unsigned = true; field.type = 'int8'; },
  'uint16':(field) => { field.modifiers.unsigned = true; field.type = 'int16'; },
  'uint24':(field) => { field.modifiers.unsigned = true; field.type = 'int24'; },
  'uint32':(field) => { field.modifiers.unsigned = true; field.type = 'int32'; },
  'uint40':(field) => { field.modifiers.unsigned = true; field.type = 'int40'; },
  'uint48':(field) => { field.modifiers.unsigned = true; field.type = 'int48'; },
  'uint56':(field) => { field.modifiers.unsigned = true; field.type = 'int56'; },
  'uint64':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },
  'uintmax':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },

  'uintv_t':(field) => { field.modifiers.unsigned = true; field.type = 'uintv'; },
  'uint8_t':(field) => { field.modifiers.unsigned = true; field.type = 'int8'; },
  'uint16_t':(field) => { field.modifiers.unsigned = true; field.type = 'int16'; },
  'uint24_t':(field) => { field.modifiers.unsigned = true; field.type = 'int24'; },
  'uint32_t':(field) => { field.modifiers.unsigned = true; field.type = 'int32'; },
  'uint40_t':(field) => { field.modifiers.unsigned = true; field.type = 'int40'; },
  'uint48_t':(field) => { field.modifiers.unsigned = true; field.type = 'int48'; },
  'uint56_t':(field) => { field.modifiers.unsigned = true; field.type = 'int56'; },
  'uint64_t':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },
  'uintmax_t':(field) => { field.modifiers.unsigned = true; field.type = 'int64'; },

  'intv_t':(field) => { field.type = 'uintv'; },
  'int8_t':(field) => { field.type = 'int8'; },
  'int16_t':(field) => { field.type = 'int16'; },
  'int24_t':(field) => { field.type = 'int24'; },
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

    field.originalIdent = field.ident;
    if(field.transform) field.ident = field.ident+untransformed;

    let alias = aliases[field.type];
    if(alias) {
      alias(field);
    }

    let handler = typehandlers[field.type];
    if(!handler) handler = typehandlers['typedef struct'];

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

    if(field.type=='struct') {
      field.type = 'Structure';
    }

    if(field.type==='switch') {
      for(let _case of field.cases) {
        let tmp = new_fields(_case.fields, names).trim();
        if(tmp!=='')
          res += tmp + ',';
      }
      continue;
    }

    if(field.ident===undefined) continue;

    if(field.modifiers.static) continue;

    let type = typehandlers[field.type] || {default:`new ${field.type}()`, struct: true};
    if(field.default!==undefined) type = {default: field.default};

    let def = type.default;

    if(def instanceof Function) {
      def = def(field.ident, field).trim();
      if(def!='') res += '    ' + def+';\n';
    } else {
      if(field.length!==undefined && field.type!=='char') {
        let ftype = typehandlers[field.type];
        if(ftype===undefined) {
          let tmp = [];
          for(let i=0; i<field.length; i++) tmp.push(def);
          def = '['+tmp.join(',')+']';
        } else {
          if(field.length>0 && !ftype.notarray) {
            def = '[';
            for(let i=0; i<field.length; i++) def += type.default+',';
            def = def.slice(0, def.length-1) + ']';
          } else {
            if(def===undefined) def = '[]';
          }
        }
      }
    }

    let enumerable = (field.modifiers.hidden) ? 'false' : 'true';
    let writable = field.modifiers.const ? 'false' : 'true';

    if(field.type=='computed') {
      def = field.default || 'null';
    }

    if(enumerable=='false' || writable=='false') {
      res += `    Object.defineProperty(this, '${field.ident}', {value:${def}, configurable:false, enumerable:${enumerable}, writable:${writable}});`;
    } else {
      if(field.transform) {
        res += `    Object.defineProperty(this, '_${field.originalIdent}${untransformed}', {value:${def}, configurable:false, enumerable:false, writable:true});`;
        res += `\n    Object.defineProperty(this, '_${field.originalIdent}${transformed}', {value:null, configurable:false, enumerable:false, writable:true});`;
        //res += `\n    Object.defineProperty(this, '${field.originalIdent}', {value:null, configurable:false, enumerable:true, writable:true});`;
        //res += `\n    this.${field.originalIdent} = null;`
        if(field.transform.args) {
          //res += `    this.${field.originalIdent} = new transforms.${field.transform.name}(this, '${field.originalIdent}', ${def}, ${field.transform.args});`;
        } else {
          //res += `    this.${field.originalIdent} = new transforms.${field.transform.name}(this, '${field.originalIdent}', ${def});`;
        }
      } else {
        res += `    this.${field.ident} = ${def};`;
      }
    }

    res += '\n';
  }

  return res;
}

function new_transforms(name, fields, names = []) {
  let res = '';
  for(let field of fields) {
    if(!field.transform) continue;

    let tf = field.originalIdent + transformed;
    let uf = field.originalIdent + untransformed;

    res += `  set ${field.originalIdent}(v) { this._${tf} = v; this._${uf} = transforms.${field.transform.name}.set(v, this._${field.ident}); }\n`;
    res += `  get ${field.originalIdent}() { return this._${tf}; }\n`;

    res += `  set ${uf}(v) { this._${uf} = v; this._${tf} = transforms.${field.transform.name}.get(this.${field.ident}); }\n`;
    res += `  get ${uf}() { return this._${uf}; }\n\n`;
  }
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
  }

  res = res.trim();
  if(res!='')
    return res+'\n';
  return '';
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
  return l.trim();
}

function static_fields(name, namespace, fields) {
  let res = '';
  for(let field of fields) {
    if(!field) continue;
    if(!field.modifiers) continue;
    if(!field.modifiers.static) continue;
    if(namespace!=null) res += namespace + '.';
    res += name + '.' + field.ident + ' = ' + field.default + ';\n';
  }

  res = res.trim();
  if(res!='')
    return res+'\n';
  return '';
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
    res += '  \'' + field.name + '\': ' + field.value + ',';
    res += field.value + ': \'' + field.name + '\',\n';
  }
  res += '}\n';
  res += `exports.${name} = ${name};\n\n`;

  return res.trim();
}

let structs = {};

function struct(item, namespace, name, aliases, declarations, _extends, fields) {
  pre_fields(fields);

  let res = ``;
  let hadname = !!name;

  if(!hadname) throw new Error('Unnamed struct ! Structs MUST have a name');

  structs[name] = item;

  let transformed = false;
  if(!_extends) {
    _extends = 'Structure';
    for(let field of fields) {
      if(field.transform) {
        _extends = 'Structure';
        //transformed = true;
      }

      let type = structs[field.type];
      if(type) {
        if(type.transform) {
          _extends = 'Structure';
          //transformed = true;
          field.transform = type.transform;
          field.originalIdent = field.ident;
          field.ident = field.ident+untransformed;
        }
      }
    }
  }

  res += `class ${name} extends ${_extends} {\n`;

  if(transformed) {
    res += '  constructor(options, proxy) {\n';
    res += '    super(options, proxy); if(proxy!==false) return;\n';
  } else {
    res += '  constructor(options) {\n';
    res += '    super(options);\n';
  }

  res += new_fields(fields);
  res += new_fields_init(fields);
  res += lambdas_init(fields);
  res += '    if(options) this.assign(options);\n';
  res += '  }\n\n';

  res += `  static size(offset=0) {\n`;
  res += `    offset = super.size(offset);\n`;
  res += struct_static_size(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += `  size(offset=0) {\n`;
  res += `    offset = super.size(offset);\n`;
  res += struct_size(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += '  read(buf=null, offset=null) {\n';
  res += `    offset = super.read(buf, offset);\n`;
  res += struct_read(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += '  write(buf=null, offset=null) {\n';
  res += `    offset = super.write(buf, offset);\n`;
  res += struct_write(name, fields);
  res += '    return offset;\n';
  res += '  }\n\n';

  res += `  compare(other, changes=[], prefix='') {\n`;
  res += `    changes = super.compare(other, changes, prefix);\n`;
  res += struct_compare(name, fields);
  res += '    return changes;\n';
  res += '  }\n\n';

  res += `  assign(other) {\n`;
  res += `    if(!other) return;\n`;
  res += `    super.assign(other);\n`;
  res += struct_assign(name, fields);
  res += '  }\n\n';

  res += new_transforms(name, fields);

  res += '}\n';

  res += static_fields(name, namespace, fields);


  if(hadname) {
    if(namespace=='exports') {
      res += `Object.defineProperty(exports, '${item.name}', {value:${name}, configurable:false, enumerable:true, writable:false});\n`
    }
    //res += `Object.freeze(${name});\n`;
    //res += `exports.${name} = ${name};\n`;
  }

  if(declarations) for(let item of declarations) {
    if(item.startsWith('*')) {
      // no point making these entries, they have no meaning in js
      // res += `let ${item.slice(1)} = exports.${item.slice(1)} = null;\n`;
    } else {
      res += `let ${item} = exports.${item} = new ${name}();\n`;
    }
  }

  if(aliases) for(let item of aliases) {
    if(item.startsWith('*')) {
      // no point making these entries, they have no meaning in js
      //res += `let ${item.slice(1)} = exports.${item.slice(1)} = null;\n`;
    } else {
      res += `const ${item} = class ${item} extends ${name} {};\n`;
      res += `Object.defineProperty(exports, '${item}', {value:${item}, configurable:false, enumerable:true, writable:false});\n`
    }
  }

  return res.trim();
}

function defaultTransform(item, name) {
  return `  ${item.transform.name}:Transform,\n`;
}

function exportTransforms(items) {
  let res = '';
  let transforms = {'notnull':true, 'min':true, 'max':true, 'minmax':true};

  for(let item of items) {
    if(!item.name) continue;
    let nametype = typeof item.name;
    if(nametype != 'string') continue;
    //typehandlers[item.name] = item;

    if(item.transform) {
      if(item.transform in transforms) continue;
      transforms[item.transform.name] = true;
      res += `  ${item.transform.name}:Transform,\n`;
    }

    if(item.type=='struct') {
      for(let field of item.fields) {
        if(field.transform) {
          if(field.transform.name in transforms) continue;
          transforms[field.transform.name] = true;
          res += `  ${field.transform.name}:Transform,\n`;
        }
      }
    }
  }
  return res.trim();
}

function exportNamespaces(items, namespace=null, parent='Namespace') {
  let res = '';
  for(let item of items) {
    if(item.type=='namespace') {

      if(namespace) {
        res += parent + '.' + item.name + ' = class '+item.name+` extends ${parent} {}\n`;
      } else {
        res += 'class '+item.name+` extends ${parent} {}\n`;
      }

      res += exportNamespaces(item.elements, item.name, parent=='Namespace' ? item.name : parent + '.' + item.name) + '\n';
    }
  }
  return res.trim();
}

function exportIncludes(items) {
  let res = '';
  let moduleindex = 1;
  for(let item of items) {
    if(item.type=='include') {
      res += `const required_module${moduleindex} = require('${changeExt(item.filepath, '.js')}');\n`;
      res += `if(required_module${moduleindex}.initialize) required_module${moduleindex}.initialize(exports, transformsProxy, Transform);`
      moduleindex++;
      continue;
    }
  }
  return res.trim();
}

function processItems(items, namespace=null, aliases={}) {
  let res = '';
  let nss = [];
  if(namespace!=null) nss = namespace.split('.');

  for(let item of items) {
    if(item.type=='include') continue;

    if(item.type!='namespace') {

      let name = item.name;
      if(namespace) name = namespace + '.' + name;
      aliases[item.name] = name;
      for(let ns of nss) {
        if(ns) {
          aliases[ns + '.' + item.name] = name;
        } else {
          aliases[item.name] = name;
        }
      }
    }

    let _extends = aliases[item.extends] || item.extends;

    if(item.type=='namespace') {
      if(namespace!=null)
        res += processItems(item.elements, namespace+'.'+item.name, aliases);
      else
        res += processItems(item.elements, item.name, aliases);

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
      for(let field of item.fields) {
        let type = typehandlers[field.type];
        if(!type) continue;

        if(type.transform) field.transform = type.transform;
      }

      if(namespace!=null)
        res += '\n' + namespace + '.' + item.name + ' = ' + struct(item, namespace, item.name, item.aliases, item.declarations, _extends, item.fields) + '\n';
      else
        res += '\n' + struct(item, namespace, item.name, item.aliases, item.declarations, _extends, item.fields) + '\n';
      continue;
    }

    if(item.type==='enum') {
      res += _enum(item.name, item.fields);
      continue;
    }

    if(item.const) {
      res += `const ${item.name.ident} = ${item.value};\n`;
      continue;
    }

    res += value(item);
  }
  return res.trim() + '\n';
}

//! EXPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function exportNamespaceExports(items) {
  let res = '';

  for(let item of items) {
    if(item.type!='namespace') continue;
    res += `Object.defineProperty(exports, '${item.name}', {value:${item.name}, configurable:false, enumerable:true, writable:false});\n`;
  }

  function inner(items, namespace='') {
    for(let item of items) {
      let name = namespace;
      if(name=='') name = item.name; else name = name+'.'+item.name;
      if(item.type=='namespace') {
        inner(item.elements, name);
        res += `${name},`;
        continue;
      }
    }
  }
  res += `Object.defineProperty(exports, 'namespaces', {value:[`;
  inner(items);
  res += '], configurable:false, enumerable:false, writable:false});\n';

  return res.trim() + '\n';
}

function exportClassExports(items, namespace='') {
  let res = '';
  for(let item of items) {
    if(item.type!='struct') continue;
    res += `Object.defineProperty(exports, '${item.name}', {value:${item.name}, configurable:false, enumerable:true, writable:false});\n`;
  }

  function inner(items, namespace='') {
    for(let item of items) {
      let name = namespace;
      if(name=='') name = item.name; else name = name+'.'+item.name;
      if(item.type=='namespace') {
        inner(item.elements, name);
        continue;
      }
      if(item.type=='struct') {
        res += `${name},`;
      }
    }
  }
  res += `Object.defineProperty(exports, 'classes', {value:[`;
  inner(items, namespace);
  res += '], configurable:false, enumerable:false, writable:false});\n';

  return res.trim() + '\n';
}

function exportRestExports(items, namespace=null) {
  let res = '';
  for(let item of items) {
    if(item.const) {
      res += `Object.defineProperty(exports, '${item.name.ident}', {value:${item.name.ident}, configurable:false, enumerable:true, writable:false});\n`;
    }
  }
  return res.trim() + '\n';
}

function exportExports(items) {
  let res = '';

  res += exportNamespaceExports(items);
  res += exportClassExports(items);
  res += exportRestExports(items);

  return res.trim();
}

//! BUILD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.build = function build(filename, items) {
  let res = fs.readFileSync(path.join(__dirname, 'js-template.js'), 'utf-8');
  //res = res.replace(/\n/g, '').replace(/\r/g, '');
  res = res.replace('/*HEADER*/', `/** Structural generated this file from ${filename} at ${new Date().toISOString()} */`);

  for(let item of items) {
    if(item.type==='alias') {
      typehandlers[item.name] = typehandlers[item.value];
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
      if(size===8) typehandlers[item.name] = Object.assign({unsigned:true}, typehandlers['int8']);
      if(size===16) typehandlers[item.name] = Object.assign({unsigned:true}, typehandlers['int16']);
      if(size===32) typehandlers[item.name] = Object.assign({unsigned:true}, typehandlers['int32']);

      continue;
    }
  }

  res = res.replace('/*TRANSFORMS*/', exportTransforms(items));

  res = res.replace('/*INCLUDES*/', exportIncludes(items));

  res = res.replace('/*NAMESPACES*/', exportNamespaces(items));

  res = res.replace('/*EXPORTS*/', exportExports(items));

  let tmp = '';

  tmp += processItems(items);

  res = res.replace('/*DEFINITIONS*/', tmp);

  return res;
}

function changeExt(filepath, ext) {
  let tmp = path.parse(filepath);
  tmp.ext = ext;
  tmp.base = undefined;
  tmp.dir = path.relative('.', tmp.dir);
  return './'+path.format(tmp).replace(/\\/g, '/');
}
