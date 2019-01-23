#include "../definitions.h"

#define BYTE uint8_t
#define WORD uint16_t

// Panel addresses
const uint32_t RO_VERSIONINFO       = 0x0FFF8; // rom
const uint32_t RA_TODAY             = 0x03289; // Page 0
const uint32_t RA_POINTDYN          = 0x032C3; // Page 0
const uint32_t RA_AREADYN           = 0x03AC3; // Page 0
const uint32_t RA_LINEDYN           = 0x042C3; // Page 0
const uint32_t RA_BOARDDYN          = 0x04743; // Page 0
const uint32_t RA_FAULTS            = 0x04806; // Page 0
const uint32_t RA_DISABS            = 0x04834; // Page 0
const uint32_t RA_WRITEREADBU       = 0x04A5D; // Page 0
const uint32_t RA_POINTDYNX         = 0x051BA; // Page 0
const uint32_t RA_POINTVERSION      = 0x05CAB; // Page 0
const uint32_t RA_DEBUGSTRU         = 0x05C83; // Page 0
const uint32_t RA_PCCOMMAND         = 0x07DE0; // Page 0
const uint32_t RA_PCPACKET          = 0x07E00; // Page 0
const uint32_t RA_PCPACKET_100      = 0x07E00; // Page 0
const uint32_t RA_EVENT             = 0x18000; // Page 1
const uint32_t RA_LUXEXTRA          = 0x19000; // Page 1
const uint32_t RA_LUXREPORT         = 0x28000; // Page 2
const uint32_t RA_GENERAL           = 0x38000; // Page 3
const uint32_t RA_ADDRESSPRG        = 0x38040; // Page 3
const uint32_t RA_AREAPRG           = 0x38840; // Page 3
const uint32_t RA_KLSPRG            = 0x39040; // Page 3
const uint32_t RA_USERPRG           = 0x39240; // Page 3
const uint32_t RA_MAINOUTPUTPRG     = 0x3A880; // Page 3
const uint32_t RA_EXTRAOUTPUTPRG    = 0x3A8A8; // Page 3
const uint32_t RA_INPUTPRG          = 0x3A9E8; // Page 3
const uint32_t RA_SERIALCODE        = 0x3B1E8; // Page 3
const uint32_t RA_INPUTNAMEPRG      = 0x3B200; // Page 3
const uint32_t RA_AREAGABPRG        = 0x3BB00; // Page 3 v2.2x
const uint32_t RA_MAINOUTPUTGABPRG  = 0x3DB00; // Page 3 v2.2x
const uint32_t RA_EXTRAOUTPUTGABPRG = 0x3DB40; // Page 3 v2.2x
const uint32_t RA_INPUTGABPRG       = 0x3DD40; // Page 3 v2.2x

typedef enum {
  PS_DUMMY = 0, // Stabilizing
  PS_CHECKDOUBLE = 1, // Check for double address
  PS_CFGMODE = 2, // Configure operating modes
  PS_CFGGROUP = 3, // Configure groups (=areas)
  PS_NORMAL = 4, // Normal operation
  PS_NOTPROGRAMMED = 5, // A not programmed address
  PS_PRESENT = 6, // Not programmed but device found
  PS_CHECKERRORS = 7, // Error checking
  PS_MISSING = 8, // Faulty: missing
  PS_DADDRESS = 9, // Faulty: double address
  PS_BATTERY = 10, // Faulty: low/missing battery
  PS_LIGHT = 11, // Faulty: LED fault
  PS_WRONGTYPE = 12, // Faulty: programmed type different from field device
  PS_LINEFAULT = 13, // Faulty: low line voltage on device
  PS_CHANGEBATTERY = 14 // Faulty: battery capacity low
} POINTSTATE;

typedef enum {
  LINE_A_VOLTAGE    = 0b00000001,
  LINE_A_DATA       = 0b00000010,
  LINE_B_VOLTAGE    = 0b00000100,
  LINE_B_DATA       = 0b00001000,
  EXT_RELAY         = 0b00010000,
  FAIL_RELAY        = 0b00100000,
  LINE_A_G_LED      = 0b01000000,
  LINE_B_G_LED      = 0b10000000,
} OBYTEFLAGS;

typedef enum {
  PT_NOTPROGRAMMED = 0,
  PT_QUIDE20 = 1,
  PT_QUIDE40 = 2,
  PT_SAFETY = 3,
  PT_STEP = 4,
  PT_IO = 5,
  PT_QUIDE70 = 6,
  PT_NA88 = 7,
  PT_COUNT = 8,
  PT_ACCEPTANY = 255
} POINTTYPE;

typedef enum {
  INTADDROPTION_BSREMOTEINDICATOR = 0x01,
  INTADDROPTION_USEUPS = 0x02,
  INTADDROPTION_HIPOWER = 0x04,
  INTADDROPTION_CHARGER12H = 0x08
} INTADDROPTION;

typedef struct {
  uint8_t  syn = 0x16;
  uint8_t  pc_addr;
  uint16_t mem_addr;
  uint16_t page_and_len; // page in high nybble, len in low 3 nybbles
//  uint8_t  data[len];
//  uint8_t chk_sum;
//  uint8_t  etx = 0x03;
} PACKET_HEAD;

typedef struct {
  BYTE addr; // PC address
  WORD version; // Panel version e.g. value 210 => v2.10
} DISCOVER;

const uint32_t DISCOVER_ADDRESS = 0x07E01;

typedef struct {
  BYTE system; // "N" for neptolux
  BYTE addr; // PC address
  WORD version; // Panel version e.g. value 210 => v2.10
  WORD faultcount; // Number of faults in panel
  WORD disabcount; // Number of disablements in panel
  WORD eventptr; // counter of new (not read by PC) events in panel memory (0..500)
  BYTE pinitcount; // number of points in initialization state
  BYTE obyte; // low level state of board outputs (see OBYTE definitition)
  BYTE ps[127]; // state of all addresses, lower nybble A­line, higher nybble B­line
  // e.g. ps[5]=0x52 => 02.006=Not programmed, 01.006=Configuring
  // operating modes (see POINTSTATE)
  BYTE today[7]; // year , month , day , hour , minute , second , dayno
  BYTE faults[44]; // v < 2.20 main 8, point 32, input 4
  BYTE disabs[44]; // v < 2.20 main 8, point 32, input 4

  BYTE areastatus[4]; // Bitwise AREA state (1=active)
  BYTE testall; // TEST ALL activated
  BYTE outstatus[4]; // bitwise states of external outputs
  BYTE res[4];

  //BYTE areastatustestalloutstatus[13]; // Spacer for the above commented version dependent part
  BYTE instatus[8]; // bitwise status of inputs 1..64 (1­active)
} PCPACKET;

typedef struct {
  BYTE system; // "N" for neptolux
  BYTE addr; // PC address
  WORD version; // Panel version e.g. value 210 => v2.10
  WORD faultcount; // Number of faults in panel
  WORD disabcount; // Number of disablements in panel
  WORD eventptr; // counter of new (not read by PC) events in panel memory (0..500)
  BYTE pinitcount; // number of points in initialization state
  BYTE obyte; // low level state of board outputs (see OBYTE definitition)
  BYTE ps[127]; // state of all addresses, lower nybble A­line, higher nybble B­line
  // e.g. ps[5]=0x52 => 02.006=Not programmed, 01.006=Configuring
  // operating modes (see POINTSTATE)
  BYTE today[7]; // year , month , day , hour , minute , second , dayno
  BYTE faults[44]; // v >= 2.20 main 4, point 32, input 8
  BYTE disabs[44]; // v >= 2.20 main 4, point 32, input 8

  BYTE areastatus[7]; // v2.2x AREA state for 56 areas
  BYTE res; // v2.2x not used
  BYTE testall; // v2.2x TEST ALL activated
  BYTE outstatus[4]; // v2.2x bitwise states of external outputs

  //BYTE areastatustestalloutstatus[13]; // Spacer for the above commented version dependent part

  BYTE instatus[8]; // bitwise status of inputs 1..64 (1=­active)
} PCPACKET_220; // "english version"

const uint32_t PCPACKET_ADDRESS = 0x07E00;

typedef struct {
  WORD faultcount; // Number of faults in panel
  WORD disabcount; // Number of disablements in panel
  WORD eventptr; // counter of new (not read by PC) events in panel memory (0..500)
  BYTE pinitcount; // number of points in initialization state
} COUNTERS;

const uint32_t COUNTERS_ADDRESS = 0x07E04;

typedef struct {
  BYTE obyte; // low level state of board outputs (see OBYTE definitition)
} OBYTE;

const uint32_t OBYTE_ADDRESS = 0x07E0b;

typedef struct {
  BYTE ps[127]; // state of all addresses, lower nybble A­line, higher nybble B­line
} POINTSTATES;

const uint32_t POINTSTATES_ADDRESS = 0x07E0c;

typedef struct {
  BYTE mainfaults[8];
  BYTE pointfaults[32];
  BYTE inputfaults[4];

  BYTE maindisabs[8];
  BYTE pointdisabs[32];
  BYTE inputdisabs[4];

  BYTE areastatus[4];
  BYTE testall;
  BYTE outstatus[4]; // ext outs
  BYTE res[4]

  BYTE instatus[8]; // bitwise status of inputs 1..64 (1­=active)
} RESTSTATES;

const uint32_t RESTSTATES_ADDRESS = 0x07E92;

typedef struct {
  POINTTYPE type;
  BYTE modebpp;
  uint32_t area;
  BYTE b_area;
  BYTE ia_setup;
} POINT;

const uint32_t POINT_ADDRESS = 0x38040;
const uint32_t POINT_COUNT = 254;
const bool POINT_CACHED = true;

typedef struct {
  char name[32];
  BYTE mode;
  BYTE nobatt_lowbrightness;
  BYTE nobatt_highbrightness;
  BYTE options;
  BYTE hexit_normalmode;
  BYTE hexit_activemode;
  uint16_t global_id;
  BYTE res[24];
} AREA;

const uint32_t AREA_ADDRESS = 0x38840;
const uint32_t AREA_COUNT = 32;
const bool AREA_CACHED = true;

typedef struct {
  BYTE type;
  uint32_t area; // bitwise areas this belongs to
} MAINOUTPUT;

const uint32_t MAINOUTPUT_ADDRESS = 0x3a880;
const uint32_t MAINOUTPUT_COUNT = 8;
const bool MAINOUTPUT_CACHED = true;

typedef struct {
  BYTE type;
  littleendian uint32_t area; // bitwise areas this belongs to
} EXTRAOUTPUT;

const uint32_t EXTRAOUTPUT_ADDRESS = 0x3a8a8;
const uint32_t EXTRAOUTPUT_COUNT = 32; // really 64, but can show states only for 32
const bool EXTRAOUTPUT_CACHED = true;

typedef struct {
  BYTE options;
  littleendian uint32_t area; // bitwise areas this belongs to
} EXTRAINPUT;

const uint32_t EXTRAINPUT_ADDRESS = 0x3a9e8;
const uint32_t EXTRAINPUT_COUNT = 64;
const bool EXTRAINPUT_CACHED = true;

typedef struct {
  char name[32];
} EXTRAINPUTNAME;

const uint32_t EXTRAINPUTNAME_ADDRESS = 0x3b200;
const uint32_t EXTRAINPUTNAME_COUNT = 64;
const bool EXTRAINPUTNAME_CACHED = true;

typedef struct {
	BYTE ymdhms[4];
	POINTTYPE type;
	BYTE data[3];
} EVENT;

const uint32_t EVENT_ADDRESS = 0x18000;
const uint32_t EVENT_COUNT = 600;
