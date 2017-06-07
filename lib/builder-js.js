const util = require("util");
const fs = require("fs");

let pragmas = {};

const types = {
  uint8_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int8(data.${n}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int8(offset++);`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int8(offset++)); }`;
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

  uint16_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int16${field.endian}(data.${n}, offset); offset += 2;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int16${field.endian}(offset); offset += 2;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int16${field.endian}(offset)); offset += 2; }`;
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

  uint24_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int${field.endian}(data.${n}, offset, 3); offset += 3;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int${field.endian}(offset, 3); offset += 3;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 3; }`;
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

  uint32_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int32${field.endian}(data.${n}, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int32${field.endian}(offset); offset += 4;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int32${field.endian}(offset)); offset += 4; }`;
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

  uint40_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int${field.endian}(data.${n}, offset, 5); offset += 5;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int${field.endian}(offset, 5); offset += 5;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int${field.endian}(offset, 3)); offset += 5; }`;
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

  uint48_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int${field.endian}(data.${n}, offset, 6); offset += 6;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res =  `data.${field.name} = buf.read${s}Int${field.endian}(offset, 6); offset += 6;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.read${s}Int${field.endian}(offset, 6)); offset += 6; }`;
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

  uint64_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `buf.write${s}Int32${field.endian}(data.${n} & 0xffffffff, offset); offset += 4; buf.write${s}Int32${field.endian}((data.${field.name} >> 32) & 0xffffffff, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let s = "U"; if(field.signed) s = "";
      let res = `data.${field.name} = buf.read${s}Int32${field.endian}(offset); offset += 4; data.${field.name} |= (buf.read${s}Int32${field.endian}(offset++) << 32); offset += 4;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { let tmp = buf.read${s}Int32${field.endian}(offset); offset += 4; tmp |= buf.read${s}Int32${field.endian}(offset)<<32; offset += 4; data.${field.name}.push(tmp); }`;
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

  int8_t:{
    default: "0",
    pre: function(field) { return types.uint8_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint8_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint8_t.read(name, field); },
    size: function(name, field) { return types.uint8_t.size(name, field); },
  },

  int16_t:{
    default: "0",
    pre: function(field) { return types.uint16_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint16_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint16_t.read(name, field); },
    size: function(name, field) { return types.uint16_t.size(name, field); },
  },

  int24_t:{
    default: "0",
    pre: function(field) { return types.uint24_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint24_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint24_t.read(name, field); },
    size: function(name, field) { return types.uint24_t.size(name, field); },
  },

  int32_t:{
    default: "0",
    pre: function(field) { return types.uint32_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint32_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint32_t.read(name, field); },
    size: function(name, field) { return types.uint32_t.size(name, field); },
  },

  int40_t:{
    default: "0",
    pre: function(field) { return types.uint40_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint40_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint40_t.read(name, field); },
    size: function(name, field) { return types.uint40_t.size(name, field); },
  },

  int48_t:{
    default: "0",
    pre: function(field) { return types.uint48_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint48_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint48_t.read(name, field); },
    size: function(name, field) { return types.uint48_t.size(name, field); },
  },

  int64_t:{
    default: "0",
    pre: function(field) { return types.uint64_t.pre(field); },
    write: function(name, field) { field.signed=true; return types.uint64_t.write(name, field); },
    read: function(name, field) { field.signed=true; return types.uint64_t.read(name, field); },
    size: function(name, field) { return types.uint64_t.size(name, field); },
  },


  uintv_t:{
    default: "0",
    write: function(name, field) {
      return `offset = writeUIntVar(buf, offset, data.${field.name});`;
    },
    read: function(name, field) {
      return `data.${field.name} = readUIntVar(buf, offset); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
    },
    size: function(name, field) {
      return `offset += sizeUIntVar(data.${field.name});`;
    },
  },

/*  intv_t:{
    default: "0",
    write: function(name, field) {
      return `offset = writeIntVar(buf, offset, data.${field.name});`;
    },
    read: function(name, field) {
      return `data.${field.name} = readIntVar(buf, offset); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
    },
    size: function(name, field) {
      return `offset += sizeIntVar(data.${field.name});`;
    },
  }, */

  int:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned && field.modifiers.variable) {
        return `offset = writeUIntVar(buf, offset, data.${field.name});`;
      }
      let size = 4;
      if(field.modifiers.short) size = 2;
      if(field.modifiers.long) size = 8;
      if(field.modifiers.unsigned) {
        return `buf.writeUInt${size*8}${field.endian}(data.${field.name}, offset); offset += ${size};`;
      } else {
        return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset); offset += ${size};`;
      }
    },
    read: function(name, field) {
      if(field.modifiers.unsigned && field.modifiers.variable) {
        return `data.${field.name} = readUIntVar(buf, offset); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
      }
      let size = 4;
      if(field.modifiers.short) size = 2;
      if(field.modifiers.long) size = 8;

      if(field.modifiers.unsigned) {
        return `data.${field.name} = buf.readUInt${size*8}${field.endian}(offset); offset += ${size};`;
      } else {
        return `data.${field.name} = buf.readInt${size*8}${field.endian}(offset); offset += ${size};`;
      }
    },
    size: function(name, field) {
      let size = 4;
      if(field.modifiers.short) size = 2;
      if(field.modifiers.long) size = 8;
      return `offset += ${size};`;
    },
  },

  float:{
    default: "0.0",
    write: function(name, field) {
      return `buf.writeFloat${field.endian}(data.${field.name}, offset); offset += 4;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readFloat${field.endian}(offset); offset += 4;`;
    },
    size: function(name, field) {
      return `offset += 4;`;
    },
  },

  double:{
    default: "0.0",
    write: function(name, field) {
      return `buf.writeFloat${field.endian}(data.${field.name}, offset); offset += 8;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readFloat${field.endian}(offset); offset += 8;`;
    },
    size: function(name, field) {
      return `offset += 8;`;
    },
  },

  buffer:{
    default: "null",
    write: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `offset = writeUIntVar(buf, offset, data.${field.name}.length); ${field.name}.copy(buf, offset); offset += ${field.name}.length;`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `offset = data.${field.name}.copy(buf, offset, 0, data.${field.length}); offset += data.${field.length};`;
      }

      if(typeof field.length === "number") {
        return `offset = data.${field.name}.copy(buf, offset, 0, ${field.length});`;
      }
    },
    read: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `let ${field.name} = readUIntVar(buf, offset); offset = ${field.name}[1]; data.${field.name} = buf.slice(offset, offset+${field.name}[0]); offset += ${field.name}[0];`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `data.${field.name} = buf.slice(offset, offset+data.${field.length}); offset += data.${field.length};`;
      }

      if(typeof field.length === "number") {
        return `data.${field.name} = buf.slice(offset, offset+${field.length}); offset += ${field.length};`;
      }
      return ``;
    },
    size: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `offset += sizeUIntVar(data.${field.name}.length) + ${field.name}.length;`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `offset += data.${field.length};`;
      }

      if(typeof field.length === "number") {
        return `offset += ${field.length};`;
      }
    },
  },

  char:{
    default: '""',
    write: function(name, field) {
      let encoding = '"utf-8"';
      if(field.modifiers.ascii) encoding = '"ascii"';
      if(field.modifiers.utf16le) encoding = '"utf16le"';
      if(field.modifiers.ucs2) encoding = '"ucs2"';
      if(field.modifiers.base64) encoding = '"base64"';
      if(field.modifiers.latin1) encoding = '"latin1"';
      if(field.modifiers.binary) encoding = '"binary"';
      if(field.modifiers.hex) encoding = '"hex"';

      if(field.length===Infinity) {
        return `offset = writeZString(buf, offset, data.${field.name}, ${encoding});`;
      }

      if(typeof field.length === "number") {
        return `offset = writeString(buf, offset, data.${field.name}, ${field.length}, ${encoding});`;
      }

      if(field.length === "uint8_t") {
        return `buf.writeUInt8(Buffer.byteLength(data.${field.name}, ${encoding}), offset++); offset = writeString(buf, offset, data.${field.name}, undefined, ${encoding});`;
      }

      if(field.length === "uint16_t") {
        return `buf.writeUInt16${field.endian}(Buffer.byteLength(data.${field.name}, ${encoding}), offset); offset += 2; offset = writeString(buf, offset, data.${field.name}, undefined, ${encoding});`;
      }

      if(field.length === "uint32_t") {
        return `buf.writeUInt32${field.endian}(Buffer.byteLength(data.${field.name}, ${encoding}), offset); offset += 4; offset = writeString(buf, offset, data.${field.name}, undefined, ${encoding});`;
      }

      if(field.length === "uintv_t") {
        return `let ${field.name} = writeUIntVar(buf, offset, Buffer.byteLength(data.${field.name}, ${encoding})); offset = ${field.name}; offset = writeString(buf, offset, data.${field.name}, undefined, ${encoding});`;
      }

      if(typeof field.length === "string") {
        return `offset = writeString(buf, offset, data.${field.name}, data.${field.length}, ${encoding});`;
      }

      throw "Invalid char type field";
    },
    read: function(name, field) {
      let encoding = '"utf-8"';
      if(field.modifiers.ascii) encoding = '"ascii"';
      if(field.modifiers.utf16le) encoding = '"utf16le"';
      if(field.modifiers.ucs2) encoding = '"ucs2"';
      if(field.modifiers.base64) encoding = '"base64"';
      if(field.modifiers.latin1) encoding = '"latin1"';
      if(field.modifiers.binary) encoding = '"binary"';
      if(field.modifiers.hex) encoding = '"hex"';

      if(field.length===Infinity) {
        return `data.${field.name} = readZString(buf, offset, ${encoding}); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
      }

      if(typeof field.length === "number") {
        return `data.${field.name} = readString(buf, offset, ${field.length}, ${encoding}); offset += ${field.length};`;
      }

      if(field.length === "uint8_t") {
        return `let ${field.name} = buf.readUInt8(offset++); data.${field.name} = readString(buf, offset, ${field.name}, ${encoding}); offset += ${field.name};`;
      }

      if(field.length === "uint16_t") {
        return `let ${field.name} = buf.readUInt16${field.endian}(offset++); data.${field.name} = readString(buf, offset, ${field.name}, ${encoding}); offset += ${field.name};`;
      }

      if(field.length === "uint32_t") {
        return `let ${field.name} = buf.readUInt32${field.endian}(offset++); data.${field.name} = readString(buf, offset, ${field.name}, ${encoding}); offset += ${field.name};`;
      }

      if(field.length === "uintv_t") {
        return `let ${field.name} = readUIntVar(buf, offset); offset = ${field.name}[1]; data.${field.name} = readString(buf, offset, ${field.name}[0], ${encoding}); offset += ${field.name}[0];`;
      }

      if(typeof field.length === "string") {
        return `data.${field.name} = readString(buf, offset, data.${field.length}, ${encoding}); offset += data.${field.length};`;
      }

      throw "Invalid char type field";
    },
    size: function(name, field) {
      if(field.length===Infinity) {
        return `offset += data.${field.name}.length + 1;`;
      }

      if(typeof field.length === "number") {
        return `offset += ${field.length};`;
      }

      if(field.length === "uint8_t") {
        return `offset += data.${field.name}.length + 1;`;
      }

      if(field.length === "uint16_t") {
        return `offset += data.${field.name}.length + 2;`;
      }

      if(field.length === "uint32_t") {
        return `offset += data.${field.name}.length + 4;`;
      }

      if(field.length === "uintv_t") {
        return `offset += data.${field.name}.length + sizeUIntVar(data.${field.name}.length);`;
      }

      if(typeof field.length === "string") {
        return `offset += data.${field.length};`;
      }
    },
  },

  cstring:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      return `offset = writeZString(buf, offset, data.${field.name});`;
    },
    read: function(name, field) {
      return `data.${field.name} = readZString(buf, offset); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
    },
    size: function(name, field) {
      if(field.length === "uint8_t") {
        return `offset += data.${field.name}.length + 1;`;
      }
    },
  },

  switch: {
    default: undefined,
    write: function(name, field) {
      let res = "";
      let value = field.value;
      for(let c of field.cases) {
        res += `if(data.${value}===${c.value}) {\n`;

        res += struct_write("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
    read: function(name, field) {
      let res = "";
      let value = field.value;
      for(let c of field.cases) {
        res += `if(data.${value}===${c.value}) {\n`;

        res += struct_read("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
    size: function(name, field) {
      let res = "";
      let value = field.value;
      for(let c of field.cases) {
        res += `if(data.${value}===${c.value}) {\n`;

        res += struct_size("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
  },

  struct: {
    default: "{}",
    pre: function(field) {
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      let n = field.name; if(field.length!==undefined) n += "[i]";
      let res = `offset = data.${n}.write(buf, offset);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      res = `let ${field.name} = ${field.type}.read(buf, offset); offset = ${field.name}[1]; data.${field.name} = ${field.name}[0];`;
      if(field.length!==undefined) res = `data.${field.name} = []; for(let i=0; i<${field.length}; i++) { let ${field.name} = ${field.type}.read(buf, offset); offset = ${field.name}[1]; data.${field.name}.push(${field.name}[0]); }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) return `for(let i=0; i<${field.length}; i++) { offset += data.${field.name}[i].size(); }`;
      return `offset += data.${field.name}.size();`;
    },
  },
}

// aliases
types["bool"] = types["uint8_t"];


function field_type(name, field, mode="read", indent="    ") {
  if(field.type==="lambda") return [];

  field.endian = "BE";
  if(field.modifiers.littleendian) field.endian = "LE";

  let handler = types[field.type];
  if(handler===undefined) handler = types["struct"];
  if(handler===undefined) {
    return [indent + "// unknown type "+field.type];
  }

  if(mode==="read")
    return [indent + handler.read(name, field)];

  if(mode==="write")
    return [indent + handler.write(name, field)];

  if(mode==="size")
    return [indent + handler.size(name, field)];
}

function struct_read(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, "read", indent);
    if(t===undefined) {
      res += indent + "let "+field.name+" = "+field.type+".read(buf, offset);\n";
      res += indent + "data."+field.name+" = "+field.name+"[0]; offset = "+field.name+"[1];\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "data."+field.name+" = buf.read"+t[0]+"(offset); offset = "+t[1];
    }

    res += "\n";
  }
  return res;
}

function struct_write(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, "write", indent);
    if(t===undefined) {
      res += indent + `offset = ${field.type}.write(buf, offset);\n`;
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "buf.write"+t[0]+"(offset); offset = "+t[1];
    }

    res += "\n";
  }
  return res;
}

function struct_size(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.null===true) continue;
    let t = field_type(name, field, "size", indent);
    if(t===undefined) {
      res += indent + "offset = "+field.type+".size(offset);\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "offset = "+t[1];
    }

    res += "\n";
  }
  return res;
}

function pre_fields(fields) {
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.name===undefined) continue;
    if(field.null===true) continue;
    let handler = types[field.type];
    if(handler===undefined) handler = types["struct"];
    if(handler && handler.pre) handler.pre(field);
  }
}

function new_fields(fields, names = []) {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.null===true) continue;
    if(field.name!==undefined && names.indexOf(field.name)>-1) continue;
    if(field.type==="lambda") continue;

    names.push(field.name);

    if(field.type==="switch") {
      for(let _case of field.cases) {
        let tmp = new_fields(_case.fields, names);
        if(tmp!=="")
          res += tmp + ",";
      }
      continue;
    }

    if(field.name===undefined) continue;

    let type = types[field.type] || {default:`${field.type}.new()`, struct: true};
    if(field.default!==undefined) type = {default: field.default};
    if(field.length!==undefined && field.type!=="char") {
      type = {default: "[]"};
    }
    res += field.name+":"+type.default+",";
  }
  res = res.slice(0, -1);
  return res;
}

function new_fields_init(fields, names = []) {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.null===true) continue;
    if(field.name!==undefined && names.indexOf(field.name)>-1) continue;
    if(field.type==="lambda") continue;
    names.push(field.name);

    if(field.name===undefined) continue;

    let type = types[field.type] || {default:`${field.type}.new()`, struct: true};
    if(field.default!==undefined) type = {default: field.default};
    if(type.struct) {
      res += `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(${field.type}.new()); }`;
    }
  }
  return res;
}

function lambdas_init(fields) {
  l = "";
  for(let field of fields) {
    if(field.type==="lambda") {
      l += `    Object.defineProperty(data, "${field.name}", {`;
      if(field.get!==null) {
        l += "get: function() { return";
        for(let op of field.get) {
          l += " ";
          if(typeof op==="string") {
            if(op==="(") { l += op; continue; }
            if(op===")") { l += op; continue; }
            if(op==="&") { l += op; continue; }
            if(op==="|") { l += op; continue; }
            if(op==="^") { l += op; continue; }
            if(op==="~") { l += op; continue; }
            if(op==="<<") { l += op; continue; }
            if(op===">>") { l += op; continue; }
            if(op==="+") { l += op; continue; }
            if(op==="-") { l += op; continue; }
            if(op==="*") { l += op; continue; }
            if(op==="/") { l += op; continue; }
            l += "this."+op;
            continue;
          }
          l += op;
        }
        l += "; }";
      }

      if(field.get && field.set) l += ", ";

      if(field.set!==null) {
        l += "set: function(value) { ";
        l += `this.${field.set.shift()} =`;
        for(let op of field.set) {
          l += " ";
          if(typeof op==="string") {
            if(op==="(") { l += op; continue; }
            if(op===")") { l += op; continue; }
            if(op==="&") { l += op; continue; }
            if(op==="|") { l += op; continue; }
            if(op==="^") { l += op; continue; }
            if(op==="~") { l += op; continue; }
            if(op==="<<") { l += op; continue; }
            if(op===">>") { l += op; continue; }
            if(op==="+") { l += op; continue; }
            if(op==="-") { l += op; continue; }
            if(op==="*") { l += op; continue; }
            if(op==="/") { l += op; continue; }
            if(op==="value") { l += op; continue; }

            l += "this."+op;
            continue;
          }
          l += op;
        }
        l += "; }";
      }

      l += "});\n"
    }
  }
  return l;
}

function value(item) {
  if(item['type']==="bool") {
    return "let " + item['name']+" = exports."+item['name'] + " = " + (item['value']==="TRUE" ? "true" : "false") + ";\n";
  }

  if(item['type']!=='string') {
    return "let "+item['name']+" = exports."+item['name']+" = "+item['value']+";\n";
  } else {
    return "let "+item['name']+" = exports."+item['name']+" = \""+item['value']+"\";\n";
  }
}

function _enum(name, fields) {
  let res = "let "+name+" = exports."+name+" = {\n";
  for(let field of fields) {
    if(field.null===true) continue;
    res += "  " + field.value + ": \"" + field.name + "\",\n";
  }
  return res+"}\n\n";
}

function struct(name, fields) {
  pre_fields(fields);

  let res = ``;

  res += `function ${name}_write_this(buf, offset=0) {\n    let data = this;\n`;
  res += struct_write(name, fields);
  res += "    return offset;"
  res += "\n}\n";

  res += `function ${name}_size_this(offset=0) {\n    let data = this;\n`;
  res += struct_size(name, fields);
  res += "    return offset;"
  res += "\n}\n";

  res += "let "+name+" = exports."+name+" = {\n";

  res += "  new: function() {\n";
  res += "    let data = {" + new_fields(fields) + "};\n";
  res += "    " + new_fields_init(fields).trim() + "\n";
  res += `    Object.defineProperty(data, "write", {value:${name}_write_this});\n`;
  res += `    Object.defineProperty(data, "size", {value:${name}_size_this});\n`;
  res += lambdas_init(fields) + "\n";
  res += "    return data;\n";
  res += "  },\n";

  res += "  read: function(buf, offset=0) {\n";

  res += `    let data = ${name}.new();\n`;

  res += struct_read(name, fields);

  res += "    return [data, offset];";
  res += "\n  },\n";

  return res+"}\n\n";
}

exports.build = function build(filename, items) {
  let res = `// "Structural" generated this file from ${filename} at ${new Date()}\n`;

  let du = fs.readFileSync(__dirname+"/../res/datautils.js", "utf-8");
  du = du.replace(/\n/g, "").replace(/\r/g, "");

  res += du + "\n\n";

  res += "exports.initialize = function(actions) {\n";

  for(let item of items) {
    if(item['type']==='alias') {
      types[item.name] = types[item.value];
      continue;
    }

    if(item['type']==='enum') {
      let size = 8;
      for(let field of item.fields) {
        if(field.null===true) continue;
        if(typeof field.value==="string") {
          size = 0;
          break;
        }
        if(typeof field.value==="number") {
          if(field.value>255) size = 16;
          if(field.value>65535) size = 32;
        }
      }
      if(size===0) continue;
      if(size===8) types[item.name] = types["uint8_t"];
      if(size===16) types[item.name] = types["uint16_t"];
      if(size===32) types[item.name] = types["uint32_t"];
      continue;
    }
  }

  res += "}\n\n";

  for(let item of items) {
     if(item['type']==='pragma') {
      pragmas[item.name] = item.args;
      continue;
    }

   if(item['type']==='alias') {
      continue;
    }

    if(item['type']==='struct') {
      res += struct(item.name, item.fields);
      continue;
    }

    if(item['type']==='enum') {
      res += _enum(item.name, item.fields);
      continue;
    }

    res += value(item);
  }

  return res;
}