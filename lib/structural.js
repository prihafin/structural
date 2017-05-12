const numeric_types = ["int", "char", "float", "double"];

exports.Actions = class Actions {
  null() {
    return null;
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
    let res = {name:elements[1].text, type:"struct", fields:elements[5].elements[1].elements};
    return res;
  }

  field(input, start, end, elements) {
    let decl = elements[0];

    if(elements[1].ident) {
      decl['modifiers'][decl['type']] = true;
      decl['type'] = decl['name'];
      decl['name'] = elements[1].ident.text;
    }

    if(decl['type']===undefined) return undefined;

    if(elements[1].elements.length>0) {
      if(typeof elements[1].elements[1]==="number") {
        decl['length'] = elements[1].elements[1];
      } else {
        decl['length'] = elements[1].elements[1].text;
      }
    }

    if(elements[3].elements.length>0) {
      decl['default'] = elements[3].elements[2];
    }

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
      if(e.constdecl) res.push(e.constdecl);
      if(e.structdecl) res.push(e.structdecl);
    }
    return res;
  }

  content(input, start, end, elements) {
    return elements;
  }
}

