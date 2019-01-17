const util = require("util");
const structural = require('../bin/structural');
const numeric_types = ["int", "char", "short", "long", "float", "double", "uint8_t", "uint16_t", "uint32_t", "uint64_t", "int8_t", "int16_t", "int32_t", "int64_t"];

function filter(items) {
  items = items.filter((i) => {
    if(i.null===true) return false;
    return true;
  });
  return items;
}

exports.processDefines = function processDefines(text) {
  let defines = [];
  text = text.split("\n");
  text = text.filter((row) => {
    let isdef = row.startsWith("#define");
    if(isdef) {
      row = row.trim().split(" ");
      defines.push([row[1], row.slice(2).join(" ")]);
    }
    return !isdef;
  });
  text = text.join("\n");

  for(let define of defines) {
    let r = new RegExp("\\b" + define[0] + "\\b", "g");
    text = text.replace(r, define[1]);
  }
  return text;
}

exports.Actions = class Actions {
  null() {
    return {null:true};
  }

  sysinclude(input, start, end, e) {
    return {type:'sysinclude', filepath:e[3].text};
  }

  include(input, start, end, e) {
    let res = {type:'include', filepath:e[3].text};
    structural.parse(res.filepath);
    return res;
  }

  pragma(input, start, end, e) {
    e = filter(e);
    let res = {type:"pragma", name:e[1], args:[]}
    for(let arg of e[2].elements) {
      arg = filter(arg.elements)[0];
      res.args.push(arg);
    }
    return res;
  }

  pident(input, start, end, e) {
    return e[0].text + e[1].text + e[2].text;
  }

  ident(input, start, end, e) {
    return e[0].text + e[1].text;
  }

  maybearray(input, start, end, elements) {
    let res = {name:elements[0]};
    if(typeof elements[1] === "string" || typeof elements[1] === "number") res.length = elements[1];
    return res;
  }

  decl(input, start, end, elements) {
    let name = elements[0].elements.pop();
    let type = elements[0].elements.pop();
    let length = name.length || type.length;

    let mods = {};
    for(let mod of elements[0].elements) {
      mods[mod.name] = (mods[mod.name] || 0) + 1;
    }

    let res = {modifiers:mods, name:name.name, type:type.name};
    if(length) res.length = length;

    return res;
  }

  number(input, start, end, elements) {
    let n = '';
    elements.forEach((e) => {
      n += e.text;
    });
    return +n;
  }

  string(input, start, end, elements) {
    return elements[1].text;
  }

  aliasdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {
      type:"alias",
      name:elements[0].text,
      value:elements[1].text,
    };
    return res;
  }

  constdecl(input, start, end, elements) {
    let r = elements[1];
    let v = elements[3];

    if(numeric_types.indexOf(r['type'])>-1) {
       if(typeof v!=="number") throw "Cannot assign non numeric value to number";
    } else {
       if(typeof v==="number") throw "Cannot assign numeric value to non numeric type";
    }

    r['value'] = elements[3];
    r['const'] = true;
    return r;
  }

  structdecl(input, start, end, elements) {
    let name = null;
    let aliases = [];
    if(typeof elements[2] == 'string') {
      name = elements[2];
    }

    let ealiases = elements[10].elements;
    if(ealiases.length>0) {
      aliases.push(ealiases[0]);
      for(let ea of ealiases[2].elements) {
        aliases.push(ea.pident);
      }
    }

    let res = {name:name, declarations:aliases, type:"struct", fields:elements[6].elements[1].elements};
    return res;
  }

  typedefstructdecl(input, start, end, elements) {
    let name = null;
    let aliases = [];
    if(typeof elements[2] == 'string') {
      name = elements[2];
    }

    let ealiases = elements[10].elements;
    if(ealiases.length>0) {
      aliases.push(ealiases[0]);
      for(let ea of ealiases[2].elements) {
        aliases.push(ea.pident);
      }
    }

    let res = {name:name, aliases:aliases, type:"struct", fields:elements[6].elements[1].elements};
    return res;
  }

  structfield(input, start, end, elements) {
    elements = filter(elements);
    let decl = elements[0];
    if(decl['type']===undefined) return undefined;
    if(elements[3].array!==undefined) decl['length'] = elements[3].array;
    if(elements[2] && elements[2].elements.length>2) decl['default'] = elements[2].elements[2];
    return decl;
  }

  lambdafield(input, start, end, elements) {
    elements = filter(elements);
    let r = {type:"lambda", name:elements[2], get:[], set:[]}

    for(let item of elements[4].get.elements) {
      if(item.op.text) {
        r.get.push(item.op.text);
        continue;
      }
      r.get.push(item.op);
    }

    if(elements[4].set.lambdaexpr) {
      r.set.push(elements[4].set.elements[3]);
      for(let item of elements[4].set.lambdaexpr.elements) {
        if(item.op.text) {
          r.set.push(item.op.text);
          continue;
        }
        r.set.push(item.op);
      }
    }

    if(r.get.length===0) r.get = null;
    if(r.set.length===0) r.set = null;

    return r;
  }

  length(input, start, end, elements) {
    if(typeof elements[2]==="object") return Infinity;
    return elements[2];
  }

  enumdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[0], type:"enum", fields:elements[2].elements[1].elements};
    return res;
  }

  typedefenumdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[6], type:"enum", fields:elements[3].elements[1].elements};
    return res;
  }

  enumfield(input, start, end, elements) {
    elements = filter(elements);
    if(typeof elements[1]==="string") elements[1] = '"'+elements[1]+'"';

    let decl = {
      name: elements[0],
      value: elements[1]
    };

    return decl;
  }

  case(input, start, end, elements) {
    return {type:"case", value: elements[3] ,fields:elements[6].elements[0].elements[1].elements};
  }

  switch(input, start, end, elements) {
    return {type:"switch", value:elements[4].text, cases:elements[9].elements, modifiers:{}};
  }

  decls(input, start, end, elements) {
    let res = [];
    for(let e of elements) {
      if(e.aliasdecl) res.push(e.aliasdecl);
      if(e.constdecl) res.push(e.constdecl);
      if(e.structdecl) res.push(e.structdecl);
      if(e.typedefstructdecl) res.push(e.typedefstructdecl);
      if(e.enumdecl) res.push(e.enumdecl);
      if(e.typedefenumdecl) res.push(e.typedefenumdecl);
      if(e.pragma) res.push(e.pragma);
      if(e.include) res.push(e.include);
    }
    return res;
  }

  content(input, start, end, elements) {
    return elements;
  }
}

function trimNull(e) {
}