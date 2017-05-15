# install with
<pre>npm install git+http://address/asseri/structural -g</pre>
- note the -g to install it as global

# usage
<pre>structural input.h [--out filename.js]</pre>

# supported datatypes

- <code>[unsigned] char</code> one byte integer
- <code>[unsigned] short int</code> two byte integer
- <code>[unsigned] int</code> four byte integer
- <code>[unsigned] long int</code> eight byte integer
- <code>[unsigned] int24</code> three byte integer
- <code>[unsigned] int40</code> five byte integer
- <code>[unsigned] int48</code> six byte integer
- <code>unsigned variable int</code> one to five byte integer
- <code>float</code> four byte floating point number
- <code>double</code> eight byte floating point number
- <code>cstring</code> zero terminated string
- <code>variable string</code> "unsigned variable int" length prefixed string
- <code>string</code> byte prefixed length string
- <code>string[fieldname]</code> byte length prefixed string of "fieldname" length
- <code>string[number]</code> byte length prefixed string of "number" length
- <code>"struct name"</code> embedded structure
- <code>"switch(fieldname)"</code> conditional fields

# example

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