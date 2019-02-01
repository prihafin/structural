# structural
library to unify binary format declarations to a single c-like syntax

## install with
`npm install git+http://[repository address]/asseri/structural -g`

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

## examples

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

## Notes

The parser definition is constructed with PEG grammar and uses canopy to create the js parser

Definition file for the datatypes is available, in the root on the installed npm package. On windows the path would be `c:\users\[username]\AppData\Roaming\npm\node_modules\structural\definitions.h`