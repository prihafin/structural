#include <../definitions.h>
#include "test-transform.js"

/*const uint8_t value1 = 1;
const uint8_t value2 = 2;

namespace NS1 {
  namespace NS1_1 {
    struct jee1 { uint8_t val; };
  }
}

namespace NS2 {
  namespace NS2_1 {
    typedef struct jee2 { uint8_t val; };
    namespace NS2_1_2 {
      typedef struct jee3 : jee2 {
        static const uint8_t v1 = 1;
        static const uint8_t v2 = 2;
        uint8_t v3;
      };
    }
  }
}

typedef struct arrwgh {
  static const uint8_t sc = 123;
  uint8_t value1;
  transform(test) uint8_t value2;
  transform(test(1,2,"kolme")) computed virtual1 = 1;
};*/

typedef struct transform(test2(1,2)) transformed {
  uint8_t a;
  uint8_t b;
};

typedef struct laststruct {
  uint8_t plain;
  transformed value1;
  transform(arr) char tekstia[10];
};

hidden typedef struct base {
  uint8_t v1;
};

typedef struct ext1 : base {
  uint8_t v2;
};

typedef struct ext2 : base {
  uint8_t v1;
  uint8_t v2[v1];
};