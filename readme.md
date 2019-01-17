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

- `[unsigned] char` one byte integer
- `[unsigned] short` two byte integer
- `[unsigned] long` four byte integer

- `[unsigned] int` 2 or 4 byte integer
- `[unsigned] int8` one byte integer
- `[unsigned] int16` two byte integer
- `[unsigned] int24` three byte integer
- `[unsigned] int32` four byte integer
- `[unsigned] int40` five byte integer
- `[unsigned] int48` six byte integer
- `[unsigned] int56` seven byte integer
- `[unsigned] int64` eight byte integer
- `variable int` one to five byte unsigned integer (note, always unsigned)

- `float` four byte floating point number
- `double` eight byte floating point number
- `[encoding] cstring` zero terminated string
- `[encoding] string[fieldname] or [encoding] string[number]` string of a specific size (note, the `fieldname`must be a field defined before this string)
- `"struct name"` embedded structure
- `"switch(fieldname)"` conditional fields
- `nybble[bytecount]` array of 4bit nybbles
- `[reversed] bitfield[bytecount]` array of bits, `reversed` will flip bits in each byte around
- `reserved[bytecount]` array of bytes, the field will be made unenumerable

## available string encodings

utf8, ascii, utf16le, ucs2, base64, latin1, binary, hex

default encoding is utf8

## other

each field can also be modified with `bigendian` or `littleendian` effectivly flipping each read/written byte around

## examples

```c
typedef struct {
  unsigned int24; // unsigned 3 byte number;
  long int; // signed 8 byte number;
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