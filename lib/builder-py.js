let pragmas = {};

const types = {
  uint8_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `U${field.endian}Int8("${field.name}")`;
    },
  },
  uint16_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `U${field.endian}Int16("${field.name}")`;
    },
  },
  uint32_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `U${field.endian}Int32("${field.name}")`;
    },
  },
  uint64_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `U${field.endian}Int64("${field.name}")`;
    },
  },
  int8_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `S${field.endian}Int8("${field.name}")`;
    },
  },
  int16_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `S${field.endian}Int16("${field.name}")`;
    },
  },
  int32_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `S${field.endian}Int32("${field.name}")`;
    },
  },
  int64_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `S${field.endian}Int64("${field.name}")`;
    },
  },

  uintv_t:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `U${field.endian}Int64("${field.name}")`;
    },
  },

  float:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `${field.endian}Float32("${field.name}")`;
    },
  },
  double:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `${field.endian}Float64("${field.name}")`;
    },
  },

  char:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      let encoding = '"utf-8"';
      if(field.modifiers.ascii) encoding = '"ascii"';
      if(field.modifiers.utf16le) encoding = '"utf16le"';
      if(field.modifiers.ucs2) encoding = '"ucs2"';
      if(field.modifiers.base64) encoding = '"base64"';
      if(field.modifiers.latin1) encoding = '"latin1"';
      if(field.modifiers.binary) encoding = '"binary"';
      if(field.modifiers.hex) encoding = '"hex"';

      if(field.length===Infinity) return `CString("${field.name}", encoding=${encoding})`;
      return `String("${field.name}", ${field.length}, encoding=${encoding})`;
    },
  },

  struct:{
    default: "0",
    pre: function(field) {
      if(field.length===Infinity) throw "(u)int arrays must have a length";
      if(field.length!==undefined && typeof field.length!=="number") field.length = "this."+field.length;
    },
    field: function(name, field) {
      return `Struct("${field.name}", Embed(${field.type}))`;
    },
  },
}

function value(item) {
  if(item['type']==="bool") {
    return item['name']+" = " + (item['value']==="TRUE" ? "True" : "False") + "\n";
  }

  if(item['type']!=='string') {
    return item['name']+" = "+item['value']+"\n";
  } else {
    return item['name']+" = \""+item['value']+"\"\n";
  }
}

function _enum(name, fields) {
  res = `\n${name} = {\n`;
  for(let field of fields) {
    res += "  " + field.value + ": \"" + field.name + "\",\n";
  }
  return res + "}\n";
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

function field_type(name, field, mode="field", indent="    ") {
  if(field.type==="lambda") {
    let l = "";
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
    return [indent+`Computed("${field.name}", lambda ctx: ${l.trim()})`];
  }

  field.endian = "B";
  if(field.modifiers.littleendian) field.endian = "L";

  let handler = types[field.type];
  if(handler===undefined) handler = types["struct"];
  if(handler===undefined) {
    return null;
  }

  let res = null;

  if(mode==="field")
    res = handler.field(name, field);

  if(mode==="read")
    res = handler.read(name, field);

  if(mode==="write")
    res = handler.write(name, field);

  if(mode==="size")
    res = handler.size(name, field);

  if(field.length!==undefined && field.type!=="char") {
    res = `Array(${field.length}, ${res})`;
  }

  return [indent + res];
}

function struct(name, fields) {
  pre_fields(fields);

  res = `\nclass ${name}_Struct(Struct):\n`
  res += "    def new(self, *args):\n"
  res += "        r = Struct.new(self, *args)\n"
  res += "        r.__is__ = self.__is__(r)\n\n"
  res += "    def __is__(self, inst):\n"
  res += "        def wrap(self, other):\n"
  res += "          return "

  for(let field of fields) {
    res += `self.${field.name}==other.${field.name} and `;
  }
  res = res.slice(0, res-length-5);

  res += "        return partial(wrap, inst)\n"

  for(let field of fields) {
    if(field.null===true) continue;
    if(field.default!==undefined) {
      res += `        r.${field.name} = ${field.default}\n`
      continue;
    }
    let t = field_type(name, field);
  }
  res += "        return r\n"

  res += `\n${name} = ${name}_Struct('${name}',\n`;
  for(let field of fields) {
    if(field.null===true) continue;
    let t = field_type(name, field);
    if(t===null) {
      res += `# unknown type ${field.type} for field ${field.name}\n`;
      continue;
    }

    res += t[0];
    res += ",\n";
  }
  return res + ")\n";
}

exports.build = function build(filename, items) {
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

  let res = `# "Structural" generated this file from ${filename} at ${new Date()}\n\n`;

  res += "from construct2 import *\n\n";

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