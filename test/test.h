const int rawr = 1;

alias boo uint8_t;

typedef enum
{
  a = 11,
  b = "boobaa"
} TestEnum1;

typedef struct {
  uint32_t v1 = 1;
  varint v2 = 1;
} test;

typedef struct {
  boo value1;
  int value2;
  string strvalue;

  switch(value1) {
    case 1:
      unsigned int another11;
      unsigned int another12;
      break;
    case 2:
      variable string another21;
      break;
  };

  int last;
} TestResult;

enum TestEnum2 {
  a = 11,
  b = "boobaa"
};
