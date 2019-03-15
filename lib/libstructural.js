//const util = require("util");
const structural = require('../bin/structural');
const numeric_types = ["int", "char", "short", "long", "float", "double", "uint8_t", "uint16_t", "uint32_t", "uint64_t", "int8_t", "int16_t", "int32_t", "int64_t"];
const fs = require('fs');
const aliases = {'uint24':'uint24_t'};

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
  debug(input, start, end, e) {
    console.log('\x1b[1;32mTEST:', input.slice(start, end), '=>\n\x1b[0m', e, '\x1b[0m');
    return {debug:true};
  }

  flatten(input, start, end, e) {
    let res = {};
    for(let item of e) {
      if(!item) continue;
      if(item.constructor.name=='TreeNode') continue;
      res = Object.assign(res, item);
    }

    return res;
  }

  ws(input, start, end, e) { return {}; }
  eq(input, start, end, e) { return {}; }
  eol(input, start, end, e) { return {}; }
  comma(input, start, end, e) { return {}; }
  null(input, start, end, e) { return {}; }

  comment1(input, start, end, e) {
    return {comment: e[1].text};
  }

  comment2(input, start, end, e) {
    return {comment: e[1].text};
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
    let res = {type:"pragma", name:e[2], args:[]}
    for(let arg of e[3].elements) {
      arg = filter(arg.elements)[0];
      res.args.push(arg);
    }
    return res;
  }

  ident(input, start, end, e) {
    return {ident:e[0].text + e[2].text};
  }

  idents(input, start, end, e) {
    if(e.length==0) return {};
    let idents = [e[0].ident];
    for(let item of e[2].elements) {
      if(item.ident) idents.push(item.ident.ident);
    }
    return {idents};
  }

  maybearray(input, start, end, e) {
    let res = {name:e[0]};
    if(typeof e[1] === "string" || typeof e[1] === "number") res.length = e[1];
    return res;
  }

  decl(input, start, end, e) {
    let name = e[0].elements.pop();
    let type = e[0].elements.pop();
    let length = name.length || type.length;

    let mods = {};
    for(let mod of e[0].elements) {
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

  encoding(input, start, end, e) {
    return {encoding:e[0].ident};
  }

  string_type(input, start, end, e) {
    return {encoding:e[0].elements[0].encoding, type:{ident:e[0].elements[1].text}, modifiers:{}};
  }

  other_type(input, start, end, e) {
    let modifiers = {};
    for(let item of e) {
      if(item.modifier) modifiers[item.modifier] = true;
    }
    return {type:e[3], modifiers};
  }

  string(input, start, end, e) {
    return "'"+e[1].text+"'";
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

  constdecl(input, start, end, e) {
    let res = e[1];

    let values = [];
    function getValue(v) {
      if(v.ident) return v.ident;
      return v;
    }

    values.push(getValue(e[4].value));

    for(let item of e[4].elements[1].elements) {
      values.push(item.elements[1].text);
      values.push('' + getValue(item.value));
    }

    res.value = values.join(' ');
    res.const = true;
    return res;
  }

  structfields(input, start, end, e) {
    return {fields:e[1].elements};
  }

  structdecl(input, start, end, e) {
    let name = null;
    let transform = null;

    let aliases = [];
    if(typeof e[2] == 'string') {
      name = e[2];
    } else {
      name = e[2].ident;
    }

    if(e[3].transform) {
      transform = e[3].transform.transform;
    }

    let ealiases = e[10].elements;
    if(ealiases.length>0) {
      aliases.push(...ealiases);
      for(let ea of ealiases[2].elements) {
        aliases.push(ea.pident);
      }
    }

    if(!name && aliases.length>0) name = aliases.shift();

    let res = {name, declarations:aliases, transform, type:'struct', fields:e[7].fields};
    return res;
  }

  typedefstructdecl(input, start, end, e) {
    let first = e[1].elements[1];
    let second = e[2].elements[1];

    let name = null;
    let transform = null;
    let aliases = [];

    if(first && typeof first.ident == 'string') {
      name = first.ident;
    }

    if(first && typeof first.transform == 'string') {
      transform = first.transform;
    }

    if(second && typeof second.transform == 'string') {
      transform = second.transform;
    }

    if(e[10].idents) aliases.push(...e[10].idents);

    if(!name && aliases.length>0) name = aliases.shift();

    let res = {name, aliases, transform, type:'struct', fields:e[6].fields};
    return res;
  }

  typestr(input, start, end, e) {
    return {type:input.slice(start, end)};
  }

  default(input, start, end, e) {
    return {default:e[2]};
  }

  modifier(input, start, end, e) {
    return {modifier:e[0].text};
  }

  transform(input, start, end, e) {
    return {transform:e[1].ident};
  }

  type(input, start, end, e) {
    let res = {type:e[0].type.ident, modifiers:e[0].modifiers};
    if(e[0].encoding) res.encoding = e[0].encoding;
    return res;
  }

  structfield(input, start, end, e) {
    let res = {ident:e[0].ident, type:e[0].type, modifiers:e[0].modifiers};
    if(e[0].transform!=undefined) res.transform = e[0].transform;
    if(e[0].length!=undefined) res.length = e[0].length;
    if(e[0].encoding) res.encoding = e[0].encoding;
    if(e[0].default) res.default = e[0].default;
    return res;
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

  length(input, start, end, e) {
    if(typeof e[2]==="object") return {length:e[2].ident};
    return {length:e[2]};
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

  content(input, start, end, e) {
    return e;
  }
}

let lang = null;

exports.parse = function parse(text, options, language='js', filename='unknown-file') {
  options = Object.assign({filename:'unknown-file', parser:'language'}, options);

  lang = require(`../lib/${options.parser}.js`);

  text = exports.processDefines(text).trim();
  text = text.replace(/unsigned[\r\n\t ]+long[\r\n\t ]+long[\r\n\t ]+/g, 'uint64_t ');
  text = text.replace(/long[\r\n\t ]+long[\r\n\t ]+/g, 'int64_t ');
  text = text.replace(/unsigned[\r\n\t ]+long[\r\n\t ]+/g, 'uint32_t ');
  text = text.replace(/long[\r\n\t ]+/g, 'int32_t ');

  let items = lang.parse(text, {actions:new exports.Actions()});
  let builder = require('../lib/builder-'+options.language);

  return builder.build(options.filename, items);
}

exports.parseFile = function parse(filename, options) {
  options = Object.assign({language:'js', filename}, options);
  return exports.parse(fs.readFileSync(filename, 'utf-8'), options);
}
