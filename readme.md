# structural
library to unify binary format declarations to a single c-like syntax

## install with
`npm install git+http://[repository address]/prihafin/structural -g`

- note the -g to install it as global

## usage
`structural [options] input.h`

### options

- `--language`, `-l` set output language. arguments can be `py` or `js`. default is `js`.
- `--out`, `-o`: set output filename, default is input filename with language as extension. if extension is provided it will be used as the output language.

## supported datatypes

Most of standard C99 types like `char`, `short`, `int`, `long`, `long long`, `int32_t`, `uint16_t`, `float`, `double`, etc... are supported.

Some special types supported are listed below

- `[u]int24_t` three byte integer
- `[u]int40_t` five byte integer
- `[u]int48_t` six byte integer
- `[u]int56_t` seven byte integer
- `variable int` one to five byte unsigned integer (note, always unsigned)
- `[encoding] cstring` zero terminated string
- `[encoding] string name[fieldname] or [encoding] string name[number]` string of a specific size (note, the `fieldname`must be a field defined before this string, or a constant)
- `struct` embedded structure
- `switch(fieldname)` conditional fields
- `nybble name[bytecount]` array of 4bit nybbles
- `[reversed] bitfield name[bytecount]` array of bits, `reversed` will flip bits in each byte around
- `reserved name[bytecount]` array of bytes, the field will be made unenumerable

`unsigned` prefix is supported where applicable.

## available string encodings

utf8, ascii, utf16le, ucs2, base64, latin1, binary, hex

default encoding is utf8

## other

`#pragma bigendian` will make every definition after the pragma be bigendian, `#pragma littleendian` can used also

each field can also be modified with `bigendian` or `littleendian` effectivly flipping each read/written byte around

## example header files

```c
const uint32_t myconstant = 10;
const uint32_t myotherconstant = myconstant + 10;

typedef struct {
  unsigned int24; // unsigned 3 byte number
  long int; // signed 8 byte number
} simple;

typedef struct {
  int value1; // four byte signed integer
  string[10] small; // string of fixed length 10
  switch(value1) {
    case 1:
      // variable size encoded unsigned integer, present only when value1 = 1
      unsigned variable int whee;
      break; // Note, unlike in C, the break is MANDATORY!
  }; // note ";" is mandatory here
  simple embedded; // embedded struct
} demo;
```

## Transformation example

Used files in this example:

```c
// definitions.h

// remember to set include path for the ide of choice
// for vscode on windows it would be:
// "C_Cpp.default.includePath": ["~/appdata/roaming/npm/node_modules/structural"]
// in the settings.json file

#include <definitions.h>

// this include indicates that the used transformations
// are locations in the file "transformations.js"
#include "transformations.js"

typedef struct TransformationTest {
  transform(CapitalizaA) char text[20];
};
```

```javascript
// transformations.js

exports.initialize = (structures, transforms, Transform) => {
  transforms.CapitalizeA = class CapitalizeA extends Transform {
    /** @param {String} value */
    static get(value) {
      return value.replace(/a/g, 'A');
    }

    /** @param {String} value */
    static set(value) {
      return value.replace(/A/g, 'a');
    }
  };
};
```

```javascript
// index.js

const defs = require('./definitions');

let test_data = Buffer.from('abcdefghijabcdefghij');

let test_object = new defs.TransformationTest();

test_object.read(test_data);
console.log(test_object.text);

test_object.text = 'And this goes both ways';
test_object.write(test_data);
console.log(test_data.toString());
```

Now, first run `structural definitions.h` to generate the javascript file `definitions.js` and then execute `node index.js`.

The output would be:

```
AbcdefghijAbcdefghij
and this goes both ways
```

The CapitalizeA transformation will capitalize all the 'a' characters when reading and then lowercase the 'A' characters when writing.

## Notes

The parser definition is constructed with PEG grammar and uses canopy to create the js parser
