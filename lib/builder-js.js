const util = require("util");
const fs = require("fs");

let types = {
  uint8_t:{
    default: "0",
    pre: function(field) {
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt8(data.${field.name}, offset++);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt8(offset++);`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt8(offset++)); }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt16${field.endian}(data.${field.name}, offset); offset += 2;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt16${field.endian}(offset); offset += 2;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt16${field.endian}(offset)); offset += 2; }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt${field.endian}(data.${field.name}, offset, 3); offset += 3;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt${field.endian}(offset, 3); offset += 3;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt${field.endian}(offset, 3)); offset += 3; }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt32${field.endian}(data.${field.name}, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt32${field.endian}(offset); offset += 4;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt32${field.endian}(offset)); offset += 4; }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt${field.endian}(data.${field.name}, offset, 5); offset += 5;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt${field.endian}(offset, 5); offset += 5;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt${field.endian}(offset, 3)); offset += 5; }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt${field.endian}(data.${field.name}, offset, 6); offset += 6;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res =  `data.${field.name} = buf.readUInt${field.endian}(offset, 6); offset += 6;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { data.${field.name}.push(buf.readUInt${field.endian}(offset, 6)); offset += 6; }`;
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
      if(field.length!==undefined && typeof field.length!=="number") field.length = "data."+field.length;
    },
    write: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      let res = `buf.writeUInt32${field.endian}(data.${field.name} & 0xffffffff, offset); offset += 4; buf.writeUInt32${field.endian}((data.${field.name} >> 32) & 0xffffffff, offset); offset += 4;`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      let res = `data.${field.name} = buf.readUInt32${field.endian}(offset); offset += 4; data.${field.name} |= (buf.readUInt32${field.endian}(offset++) << 32); offset += 4;`;
      if(field.length!==undefined) {
        res =  `data.${field.name} = [];`;
        res = `for(let i=0; i<${field.length}; i++) { let tmp = buf.readUInt32${field.endian}(offset); offset += 4; tmp |= buf.readUInt32${field.endian}(offset)<<32; offset += 4; data.${field.name}.push(tmp); }`;
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
    write: function(name, field) {
      return `buf.writeInt8(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt8(offset++);`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length};`;
      }
      return `offset++;`;
    },
  },

  int16_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt16${field.endian}(data.${field.name}, offset); offset += 2;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt16${field.endian}(offset); offset += 2;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 2;`;
      }
      return `offset += 2;`;
    },
  },

  int24_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 3); offset += 3;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt${field.endian}(offset, 3); offset += 3;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 3;`;
      }
      return `offset += 3;`;
    },
  },

  int32_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt32${field.endian}(data.${field.name}, offset); offset += 4;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt32${field.endian}(offset); offset += 4;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 4;`;
      }
      return `offset += 4;`;
    },
  },

  int40_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 5); offset += 5;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt${field.endian}(offset, 5); offset += 5;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 5;`;
      }
      return `offset += 5;`;
    },
  },

  int48_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 6); offset += 6;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readInt${field.endian}(offset, 6); offset += 6;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 6;`;
      }
      return `offset += 6;`;
    },
  },

  int64_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeUInt32${field.endian}(data.${field.name} & 0xffffffff, offset); offset += 4;\nbuf.writeInt32${field.endian}((data.${field.name} >> 32) & 0xffffffff, offset); offset += 4;`;
    },
    read: function(name, field) {
      return `data.${field.name} = buf.readUInt32${field.endian}(offset); offset += 4;\ndata.${field.name} |= (buf.readInt32${field.endian}(offset) << 32); offset += 4;`;
    },
    size: function(name, field) {
      if(field.length!==undefined) {
        return `offset += ${field.length} * 8;`;
      }
      return `offset += 8;`;
    },
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

  _char:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned) {
        return `buf.writeUInt8(data.${field.name}, offset++);`;
      } else {
        return `buf.writeInt8(data.${field.name}, offset++);`;
      }
    },
    read: function(name, field) {
      if(field.modifiers.unsigned) {
        return `data.${field.name} = buf.readUInt8(offset++);`;
      } else {
        return `data.${field.name} = buf.readInt8(offset++);`;
      }
    },
    size: function(name, field) {
      return `offset++;`;
    },
  },

  char:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      if(field.length===null) {
        return `offset = writeZString(buf, offset, data.${field.name});`;
      }

      if(typeof field.length === "number") {
        return `offset = writeString(buf, offset, ${field.length});`;
      }

      if(field.length === "uint8_t") {
        return `buf.writeUInt8(Buffer.byteLength(data.${field.name}, "utf-8"), offset++); offset = writeString(buf, offset, data.${field.name});`;
      }

      if(field.length === "uint16_t") {
        return `buf.writeUInt16${field.endian}(Buffer.byteLength(data.${field.name}, "utf-8"), offset); offset += 2; offset = writeString(buf, offset, data.${field.name});`;
      }

      if(field.length === "uint32_t") {
        return `buf.writeUInt32${field.endian}(Buffer.byteLength(data.${field.name}, "utf-8"), offset); offset += 4; offset = writeString(buf, offset, data.${field.name});`;
      }

      if(field.length === "uintv_t") {
        return `let ${field.name} = writeUIntVar(buf, offset, Buffer.byteLength(data.${field.name}, "utf-8")); offset = ${field.name}; offset = writeString(buf, offset, data.${field.name});`;
      }

      if(typeof field.length === "string") {
        return `offset = writeString(buf, offset, data.${field.name}, data.${field.length});`;
      }

      throw "Invalid char type field";
    },
    read: function(name, field) {
      if(field.length===null) {
        return `data.${field.name} = readZString(buf, offset); offset = data.${field.name}[1]; data.${field.name} = data.${field.name}[0];`;
      }

      if(typeof field.length === "number") {
        return `data.${field.name} = readString(buf, offset, ${field.length}); offset += ${field.length};`;
      }

      if(field.length === "uint8_t") {
        return `let ${field.name} = buf.readUInt8(offset++); data.${field.name} = readString(buf, offset, ${field.name}); offset += ${field.name};`;
      }

      if(field.length === "uint16_t") {
        return `let ${field.name} = buf.readUInt16${field.endian}(offset++); data.${field.name} = readString(buf, offset, ${field.name}); offset += ${field.name};`;
      }

      if(field.length === "uint32_t") {
        return `let ${field.name} = buf.readUInt32${field.endian}(offset++); data.${field.name} = readString(buf, offset, ${field.name}); offset += ${field.name};`;
      }

      if(field.length === "uintv_t") {
        return `let ${field.name} = readUIntVar(buf, offset); offset = ${field.name}[1]; data.${field.name} = readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
      }

      if(typeof field.length === "string") {
        return `data.${field.name} = readString(buf, offset, data.${field.length}); offset += data.${field.length};`;
      }

      throw "Invalid char type field";
    },
    size: function(name, field) {
      if(field.length===null) {
        return `offset = writeZString(buf, offset, data.${field.name});`;
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
      if(field.length!==undefined) field.name += "[i]";
      let res = `offset = ${field.type}.write(data.${field.name}, buf, offset);`;
      if(field.length!==undefined) res = `for(let i=0; i<${field.length}; i++) { ` + res + ` }`;
      return res;
    },
    read: function(name, field) {
      res = `let ${field.name} = ${field.type}.read(buf, offset); offset = ${field.name}[1]; data.${field.name} = ${field.name}[0];`;
      if(field.length!==undefined) res = `data.${field.name} = []; for(let i=0; i<${field.length}; i++) { let ${field.name} = ${field.type}.read(buf, offset); offset = ${field.name}[1]; data.${field.name}.push(${field.name}[0]); }`;
      return res;
    },
    size: function(name, field) {
      if(field.length!==undefined) field.name += "[i]";
      if(field.length!==undefined) res = `offset += ${field.type}.size(data.${field.name}) * ${field.length};`;
      return `offset += data.${field.name}.size();`;
    },
  },
}

// aliases
types["bool"] = types["uint8_t"];


function struct_type(name, field, mode="read", indent="    ") {
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
    let t = struct_type(name, field, "read", indent);
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

    res += ";\n";
  }
  return res;
}

function struct_write(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = struct_type(name, field, "write", indent);
    if(t===undefined) {
      res += indent + "offset = "+field.type+".write(buf, offset);\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "buf.write"+t[0]+"(offset); offset = "+t[1];
    }

    res += ";\n";
  }
  return res;
}

function struct_size(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = struct_type(name, field, "size", indent);
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

    res += ";\n";
  }
  return res;
}

function pre_fields(fields) {
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.name===undefined) continue;
    let handler = types[field.type];
    if(handler===undefined) handler = types["struct"];
    if(handler && handler.pre) handler.pre(field);
  }
}

function new_fields(fields, names = []) {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    if(field.name!==undefined && names.indexOf(field.name)>-1) continue;
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
    if(field.name!==undefined && names.indexOf(field.name)>-1) continue;
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
  res += "    return data;\n";
  res += "  },\n";

  res += "  read: function(buf, offset=0) {\n";

  res += `    let data = ${name}.new();\n`;

  res += struct_read(name, fields);

  res += "    return [data, offset];";
  res += "\n  },\n";

  return res+"}\n\n";
}

function _enum(name, fields) {
  let res = "let "+name+" = exports."+name+" = {\n";
  for(let field of fields) {
    res += "  " + field.value + ": \"" + field.name + "\",\n";
  }
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

    if(item['type']!=='string') {
      res += "let "+item['name']+" = exports."+item['name']+" = "+item['value']+";\n";
    } else {
      res += "let "+item['name']+" = exports."+item['name']+" = \""+item['value']+"\";\n";
    }
  }

  return res;
}