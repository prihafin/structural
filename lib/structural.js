const numeric_types = ["int", "char", "float", "double"];

function filter(items) {
  items = items.filter((i) => { return i.null!==true; });
  //items = items.filter((i) => { return (i.test==="") && (i.elements.lenght===0); });
  return items;
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

  structfield(input, start, end, elements) {
    elements = filter(elements);

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

  enumdecl(input, start, end, elements) {
    elements = filter(elements);
    let res = {name:elements[0].text, type:"enum", fields:elements[2].elements[1].elements};
    return res;
  }

  typedefenumdecl(input, start, end, elements) {
    elements = filter(elements);
    console.log(elements);
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

