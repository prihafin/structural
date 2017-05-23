const int rawr = 1;

alias boo uint8_t;

typedef enum
{
  a = 11,
  b = 12
} TestEnum1;

typedef struct {
  uint8_t i1;
  char s1[uint8_t];
} simple;

typedef struct {
  uint32_t i1 = 1;
  uint32_t i2;
  char s1[];
  uint8_t i3;
  char s2[uint8_t];
  char s3[i2];
  char s4[uintv_t];
  TestEnum1 baa_enum;
} test1;

typedef struct {
  uint32_t i1 = 1;
  uint32_t i2 = 2;
  char s1[uintv_t];
  uintv_t i3 = 0xff;
} test2;

typedef struct {
  uint32_t i1 = 1;
  uint32_t i2 = 2;
  simple i3[10];
} test3;

typedef struct {
  boo value1;
  int value2;
  char strvalue[uintv_t];

  switch(value1) {
    case 1:
      unsigned int another11;
      unsigned int another12;
      break;
    case 2:
      char another21[uintv_t];
      break;
  };

  int last;
} TestResult;

enum TestEnum2 {
  a = 99,
  b = "boobaa"
};
