const numeric_types = ["int", "char", "float", "double"];

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

  decl(input, start, end, elements) {
    let res = {modifiers:{}};
    let mods = [];

    let e = elements[0];
    while(e) {
      if(e.elements[0]) mods.push(e.elements[0].text);
      e=e.elements[2];
    }

    res['name'] = mods.pop();
    res['type'] = mods.pop();
    mods.forEach((v) => {
      res['modifiers'][v] = true;
    });

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
       if(typeof v==="number") throw "Cannot assign numeric value to nun numeric type";
    }

    r['value'] = elements[3];
    return r;
  }

  structdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[0].text, type:"struct", fields:elements[2].elements[1].elements};
    return res;
  }

  typedefstructdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[6].text, type:"struct", fields:elements[3].elements[1].elements};
    return res;
  }

  structfield0(input, start, end, elements) {
    elements = filter(elements);
    let decl = elements[0];
    if(decl['type']===undefined) return undefined;
    if(elements[3].array!==undefined) decl['length'] = elements[3].array;
    if(elements[4] && elements[4].elements.length>1) decl['default'] = elements[4].elements[2];
    return decl;
  }

  structfield1(input, start, end, elements) {
    elements = filter(elements);
    let decl = elements[0];
    if(elements[3].array!==undefined) decl['length'] = elements[3].array;
    if(elements[4] && elements[4].elements.length>1) decl['default'] = elements[4].elements[2];
    return decl;
  }

  structfield2(input, start, end, elements) {
    elements = filter(elements);
    let decl = elements[0];
    decl['type'] = decl['name'];
    decl['name'] = elements[2].text;
    if(elements[1].array!==undefined) decl['length'] = elements[1].array;
    return decl;
  }


  length(input, start, end, elements) {
      console.log(elements);
    if(typeof elements[2]==="number") return {array:elements[2]};
    if(elements[2].text==="") return {array:null};
    return {array: elements[2].text};
  }

  enumdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[0].text, type:"enum", fields:elements[2].elements[1].elements};
    return res;
  }

  typedefenumdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[6].text, type:"enum", fields:elements[3].elements[1].elements};
    return res;
  }

  enumfield(input, start, end, elements) {
    elements = filter(elements);
    if(typeof elements[1]==="string") elements[1] = '"'+elements[1]+'"';

    let decl = {
      name: elements[0].text,
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
    }
    return res;
  }

  content(input, start, end, elements) {
    return elements;
  }
}

