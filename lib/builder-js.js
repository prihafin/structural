const util = require("util");
const fs = require("fs");

let types = {
  char:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned) {
        return `buf.writeInt8(data.${field.name}, offset++);`;
      } else {
        return `buf.writeUInt8(data.${field.name}, offset++);`;
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

  int:{
    default: "0",
    write: function(name, field) {
      if(field.modifiers.unsigned && field.modifiers.variable) {
        return `offset += datautils.writeUIntVar(data.${field.name}, offset);`;
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
        return `res.${field.name} = datautils.readUIntVar(buf, offset); offset += res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
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
    write: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `offset += datautils.writeUIntVar(buf, offset, data.${field.name}.length); offset += datautils.writeString(buf, offset, data.${field.name});`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `offset += datautils.writeString(buf, offset, data.${field.length});`;
      }

      if(typeof field.length === "number") {
        return `offset += datautils.writeString(buf, offset, ${field.length});`;
      }

      if(field.length === undefined) {
        return `offset += writeZString(buf, offset, data.${field.name});`;
      }

      return ``;
    },
    read: function(name, field) {
      if(typeof field.modifiers.variable) {
        return `let ${field.name} = datautils.readUIntVar(buf, offset); offset += ${field.name}[1]; res.${field.name} = datautils.readString(buf, offset, ${field.name}[0]); offset += ${field.name}[0];`;
      }

      if(typeof field.length !== "number" && field.length!==undefined) {
        return `res.${field.name} = datautils.readString(buf, offset, res.${field.length}); offset += res.${field.length};`;
      }

      if(typeof field.length === "number") {
        return `res.${field.name} = datautils.readString(buf, offset, ${field.length}); offset += ${field.length};`;
      }

      if(field.length === undefined) {
        return `res.${field.name} = datautils.readZString(buf, offset); offset += res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
      }
      return ``;
    }
  },

  switch: {
    default: undefined,
    write: function(name, field) {
      let res = "";
      let value = field.value;
      for(let c of field.cases) {
        res += `if(data.${value}===${c.value}) {\n`;

        res += buildjs_struct_write("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
    read: function(name, field) {
      let res = "";
      let value = field.value;
      for(let c of field.cases) {
        res += `if(data.${value}===${c.value}) {\n`;

        res += buildjs_struct_read("", c.fields, "      ");

        res += "    }\n    ";
      }
      return res;
    },
  },

  struct: {
    default: "{}",
    write: function(name, field) {
      return `offset += ${field.type}.write(buf, data.${field.name}, offset);`;
    },
    read: function(name, field) {
      return `res.${field.name} = ${field.type}.read(buf, offset); offset += res.${field.name}[1]; res.${field.name} = res.${field.name}[0];`;
    },
  },
}

function buildjs_struct_type(name, field, isread=true, indent="    ") {
  field.endian = "LE";
  if(field.modifiers.bigendian) field.endian = "BE";

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

function buildjs_struct_read(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = buildjs_struct_type(name, field, true, indent);
    if(t===undefined) {
      res += indent + "let "+field.name+" = "+field.type+".read(buf, offset);\n";
      res += indent + "res."+field.name+" = "+field.name+"[0]; offset += "+field.name+"[1];\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "res."+field.name+" = buf.read"+t[0]+"(offset); offset += "+t[1];
    }

    res += ";\n";
  }
  return res;
}

function buildjs_struct_write(name, fields, indent="    ") {
  let res = "";
  for(let field of fields) {
    if(field===undefined) continue;
    let t = buildjs_struct_type(name, field, false, indent);
    if(t===undefined) {
      res += indent + "offset += "+field.type+".write(buf, offset);\n";
      continue;
    }

    if(t.length===1) {
      res += t[0];
    }

    if(t.length===2) {
      res += indent + "buf.write"+t[0]+"(offset); offset += "+t[1];
    }

    res += ";\n";
  }
  return res;
}

function buildjs_struct(name, fields) {
  let res = "let "+name+" = exports."+name+" = {\n";

  res += "  new: function() {\n";
  res += "    return {";
  for(let field of fields) {
    if(field.name===undefined) continue;
    let type = types[field.type] || {default:`${field.type}.new()`};
    if(field.default!==undefined) type = {default: field.default};
    res += field.name+":"+type.default+",";
  }
  res = res.slice(0, -1);
  res += "};\n  },\n";

  res += "  read: function(buf, offset=0) {\n    let start = offset;\n";

  res += "    let res = {";
  let tmp = "";
  for(let field of fields) {
    if(field===undefined || field.name===undefined) continue;
    tmp += field.name+":null,";
  }
  res += tmp.slice(0, -1)+"};\n";

  res += buildjs_struct_read(name, fields);

  res += "    return [res, offset-start];";
  res += "\n  },\n";

  res += "  write: function(buf, data, offset=0) {\n    let start = offset;\n";
  res += buildjs_struct_write(name, fields);
  res += "    return offset-start;"
  res += "\n  },\n";

  return res+"}\n\n";
}

exports.build = function build(filename, items) {
  let res = `// This file was generated from ${filename} at ${new Date()}\n`;

  let du = fs.readFileSync("../lib/datautils.js", "utf-8");
  du = du.replace(/\n/g, "").replace(/\r/g, "");
  console.log(du);
  res += du + "\n\n";

  for(let item of items) {
    if(item['type']==='struct') {
      res += buildjs_struct(item.name, item.fields);
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