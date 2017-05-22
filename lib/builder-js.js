const util = require("util");
const fs = require("fs");

let types = {
  uint8_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeUInt8(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readUInt8(offset++);`;
    }
  },

  uint16_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeUInt16${field.endian}(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readUInt16${field.endian}(offset++);`;
    }
  },

  uint32_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeUInt32${field.endian}(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readUInt32${field.endian}(offset++);`;
    }
  },

  int8_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt8(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readInt8(offset++);`;
    }
  },

  int16_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt16${field.endian}(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readInt16${field.endian}(offset++);`;
    }
  },

  int32_t:{
    default: "0",
    write: function(name, field) {
      return `buf.writeInt32${field.endian}(data.${field.name}, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readInt32${field.endian}(offset++);`;
    }
  },

  char:{
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
        return `res.${field.name} = buf.readUInt8(offset++);`;
      } else {
        return `res.${field.name} = buf.readInt8(offset++);`;
      }
    }
  },

  bool:{
    default: "false",
    write: function(name, field) {
      return `buf.writeUInt8(data.${field.name} ? 1 : 0, offset++);`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readUInt8(offset++) !== 0;`;
    }
  },

  varint:{
    default: "0",
    write: function(name, field) {
      return `offset = writeUIntVar(buf, offset, data.${field.name});`;
    },
    read: function(name, field) {
      return `res.${field.name} = readUIntVar(buf, offset); offset = res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
    }
  },

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
        return `res.${field.name} = readUIntVar(buf, offset); offset = res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
      }
      let size = 4;
      if(field.modifiers.short) size = 2;
      if(field.modifiers.long) size = 8;

      if(field.modifiers.unsigned) {
        return `res.${field.name} = buf.readUInt${size*8}${field.endian}(offset); offset += ${size};`;
      } else {
        return `res.${field.name} = buf.readInt${size*8}${field.endian}(offset); offset += ${size};`;
      }
    }
  },

  int24:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned) {
        return `buf.writeUInt${field.endian}(data.${field.name}, offset, 3); offset += 3;`;
      } else {
        return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 3); offset += 3;`;
      }
    },
    read: function(name, field) {
      if(field.modifiers.unsigned) {
        return `res.${field.name} = buf.readUInt${field.endian}(offset, 3); offset += 3;`;
      } else {
        return `res.${field.name} = buf.readInt${field.endian}(offset, 3); offset += 3;`;
      }
    }
  },

  int40:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned) {
        return `buf.writeUInt${field.endian}(data.${field.name}, offset, 5); offset += 5;`;
      } else {
        return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 5); offset += 5;`;
      }
    },
    read: function(name, field) {
      if(field.modifiers.unsigned) {
        return `res.${field.name} = buf.readUInt${field.endian}(offset, 5); offset += 5;`;
      } else {
        return `res.${field.name} = buf.readInt${field.endian}(offset, 5); offset += 5;`;
      }
    }
  },

  int48:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned) {
        return `buf.writeUInt${field.endian}(data.${field.name}, offset, 6); offset += 6;`;
      } else {
        return `buf.writeInt${size*8}${field.endian}(data.${field.name}, offset, 6); offset += 6;`;
      }
    },
    read: function(name, field) {
      if(field.modifiers.unsigned) {
        return `res.${field.name} = buf.readUInt${field.endian}(offset, 6); offset += 6;`;
      } else {
        return `res.${field.name} = buf.readInt${field.endian}(offset, 6); offset += 6;`;
      }
    }
  },

  float:{
    default: "0.0",
    write: function(name, field) {
      return `buf.writeFloat${field.endian}(data.${field.name}, offset); offset += 4;`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readFloat${field.endian}(offset); offset += 4;`;
    }
  },

  double:{
    default: "0.0",
    write: function(name, field) {
      return `buf.writeFloat${field.endian}(data.${field.name}, offset); offset += 8;`;
    },
    read: function(name, field) {
      return `res.${field.name} = buf.readFloat${field.endian}(offset); offset += 8;`;
    }
  },

  string:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      if(typeof field.modifiers.variable) {
        return `let ${field.name} = Buffer.byteLength(data.${field.name}, "${encoding}"); offset = writeUIntVar(buf, offset, ${field.name}); buf.write(data.${field.name}, offset); offset += ${field.name};`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `offset = writeString(buf, offset, data.${field.length});`;
      }

      if(typeof field.length === "number") {
        return `offset = writeString(buf, offset, ${field.length});`;
      }
      return ``;
    },
    read: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `let ${field.name} = readUIntVar(buf, offset); offset = ${field.name}[1]; res.${field.name} = readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `res.${field.name} = readString(buf, offset, res.${field.length}); offset += res.${field.length};`;
      }

      if(typeof field.length === "number") {
        return `res.${field.name} = readString(buf, offset, ${field.length}); offset += ${field.length};`;
      }
      return ``;
    }
  },

  string8:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      return `let ${field.name} = Buffer.byteLength(data.${field.name}, "${encoding}"); offset = buf.writeUInt8(buf, offset, ${field.name}); buf.write(data.${field.name}, offset); offset += ${field.name};`;
    },
    read: function(name, field) {
      return `let ${field.name} = buf.readUInt8(buf, offset); offset = ${field.name}[1]; res.${field.name} = readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
    }
  },

  string16:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      return `let ${field.name} = Buffer.byteLength(data.${field.name}, "${encoding}"); offset = buf.writeUInt16${field.endianess}(buf, offset, ${field.name}); buf.write(data.${field.name}, offset); offset += ${field.name};`;
    },
    read: function(name, field) {
      return `let ${field.name} = buf.readUInt16${field.endianess}(buf, offset); offset = ${field.name}[1]; res.${field.name} = readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
    }
  },

  string32:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      return `let ${field.name} = Buffer.byteLength(data.${field.name}, "${encoding}"); offset = buf.writeUInt32${field.endianess}(buf, offset, ${field.name}); buf.write(data.${field.name}, offset); offset += ${field.name};`;
    },
    read: function(name, field) {
      return `let ${field.name} = buf.readUInt32${field.endianess}(buf, offset); offset = ${field.name}[1]; res.${field.name} = readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
    }
  },

  cstring:{
    default: '""',
    write: function(name, field, encoding="utf-8") {
      return `offset = writeZString(buf, offset, data.${field.name});`;
    },
    read: function(name, field) {
      return `res.${field.name} = readZString(buf, offset); offset = res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
    }
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
        res += `if(res.${value}===${c.value}) {\n`;

        res += struct_read("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
  },

  struct: {
    default: "{}",
    write: function(name, field) {
      return `offset = ${field.type}.write(data.${field.name}, buf, offset);`;
    },
    read: function(name, field) {
      return `res.${field.name} = ${field.type}.read(buf, offset); offset = res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
    },
  },
}

function struct_type(name, field, isread=true, indent="    ") {
  field.endian = "BE";
  if(field.modifiers.littleendian) field.endian = "LE";

  let handler = types[field.type];
  if(handler===undefined) handler = types["struct"];
  if(handler===undefined) {
    return [indent + "// unknown type "+field.type];
  }

  if(isread)
    return [indent + handler.read(name, field)];
  else
    return [indent + handler.write(name, field)];
}

function struct_read(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = struct_type(name, field, true, indent);
    if(t===undefined) {
      res += indent + "let "+field.name+" = "+field.type+".read(buf, offset);\n";
      res += indent + "res."+field.name+" = "+field.name+"[0]; offset = "+field.name+"[1];\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "res."+field.name+" = buf.read"+t[0]+"(offset); offset = "+t[1];
    }

    res += ";\n";
  }
  return res;
}

function struct_write(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = struct_type(name, field, false, indent);
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
    let type = types[field.type] || {default:`${field.type}.new()`};
    if(field.default!==undefined) type = {default: field.default};
    res += field.name+":"+type.default+",";
  }
  res = res.slice(0, -1);
  return res;
}

function struct(name, fields) {
  let res = "let "+name+" = exports."+name+" = {\n";

  res += "  new: function() {\n";
  res += `    return {write:${name}.write_this,`;
  res += new_fields(fields);
  res += "};\n  },\n";

  res += "  read: function(buf, offset=0) {\n";

  res += `    let res = ${name}.new();\n`;

  res += struct_read(name, fields);

  res += "    return [res, offset];";
  res += "\n  },\n";

  let b = struct_write(name, fields);

  res += "  write: function(data, buf, offset=0) {\n";
  res += b;
  res += "    return offset;"
  res += "\n  },\n";

  res += "  write_this: function(buf, offset=0) {\n    let data = this;\n";
  res += b;
  res += "    return offset;"
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
  }

  res += "}\n";

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