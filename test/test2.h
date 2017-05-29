typedef enum {
  a = 1,
  b = 2,
} enumtest;

typedef struct {
  uint8_t i1 = 123;
  enumtest arr[i1];
} simple;
