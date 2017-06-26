# structural
library to unify binary format declarations to a single c-like syntax

## install with
`npm install git+http://address/asseri/structural -g`
- note the -g to install it as global

## usage
`structural input.h [--out filename.js]`

## supported datatypes

- `[unsigned] char` one byte integer
- `[unsigned] short int` two byte integer
- `[unsigned] int` four byte integer
- `[unsigned] long int` eight byte integer
- `[unsigned] int24` three byte integer
- `[unsigned] int40` five byte integer
- `[unsigned] int48` six byte integer
- `unsigned variable int` one to five byte integer
- `float` four byte floating point number
- `double` eight byte floating point number
- `cstring` zero terminated string
- `variable string` "unsigned variable int" length prefixed string
- `string` byte prefixed length string
- `string[fieldname]` byte length prefixed string of "fieldname" length
- `string[number]` byte length prefixed string of "number" length
- `"struct name"` embedded structure
- `"switch(fieldname)"` conditional fields

## example

```c
struct simple {
  unsigned int24; // unsigned 3 byte string;
  long int; // signed 8 byte string;
}

struct demo {
  int value1; // four byte signed integer
  string[10] small; // string of fixed length 10
  switch(value1) {
    case 1:
      // variable size encoded unsigned integer, present only when value1 = 1
      unsigned variable int whee;
      break; // Note, unlike in C, the break is MANDATORY!
  }; // note ";" is mandatory here
  simple embedded; // embedded struct
}
```