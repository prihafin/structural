#include </dev/javascript/.packages/structural/definitions.h>

#pragma littleendian

const uint32_t const1 = 100;
const uint32_t const2 = 200;

typedef struct MYSTRUCT1 {
  uint32_t len;
  utf8 char arr[10];
} ALIAS1, *PALIAS1, ALIAS2;

#pragma bigendian

typedef struct MYSTRUCT2 {
  uint32_t len;
  reversed unsigned int value1[const1];
};

const uint32_t test1 = const1 + 100;
const uint32_t test2 = const1 + 100 + 200;
const uint32_t test3 = const1 + 100 + 200 + const2;
