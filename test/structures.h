/*
Original document:
  \\172.16.0.19\rd\Projects\Neptolux\NEPTO-3K HedGraphics integration\NEPTO-3K - muistirakenteet.docx
  modification date 2018-09-19
*/

#include </dev/javascript/.packages/structural/definitions.h>

#pragma littleendian

const uint32_t RO_VERSIONINFO           = 0x0FFF8; // rom

const uint32_t MEMMAP3KPRG_BASE_ADDRESS	= 0x60080000;
const uint32_t OFFSET3K_GENERALPRG      = 0x00000000;
const uint32_t OFFSET3K_LINESETUPPRG    = 0x00000100;
const uint32_t OFFSET3K_GSMRECEIVERPRG  = 0x00000200;
const uint32_t OFFSET3K_0x100FREE1      = 0x00000300;
const uint32_t OFFSET3K_USERPRG         = 0x00000400;
const uint32_t OFFSET3K_KLGPRG          = 0x00000600;
const uint32_t OFFSET3K_MAINOUTPUTPRG   = 0x00000800;
const uint32_t OFFSET3K_MAININPUTPRG    = 0x00000A00;
const uint32_t OFFSET3K_USERLOGO        = 0x00000C00;
const uint32_t OFFSET3K_0x100FREE2      = 0x00000F00;

const uint32_t OFFSET3K_LOGICOUTPUTPRG  = 0x00001000;
const uint32_t OFFSET3K_LOGICINPUTPRG   = 0x00003000;

const uint32_t OFFSET3K_POINTPRG        = 0x00010000;
const uint32_t OFFSET3K_AREAPRG         = 0x00014000;

const uint32_t MEMMAP3KDYN_BASE_ADDRESS = 0x60100000;	// Dynamic persistent memory start address (board, line, point dyn etc)
const uint32_t OFFSET3K_BOARD           = 0x00000000;
const uint32_t OFFSET3K_PCPACKET        = 0x00000100;
const uint32_t OFFSET3K_LINE            = 0x00000200;
const uint32_t OFFSET3K_GSMMODEM        = 0x00000300;
const uint32_t OFFSET3K_NETPACKET       = 0x00000400;

const uint32_t OFFSET3K_POINT           = 0x00010000;
const uint32_t OFFSET3K_AREA            = 0x00012000;
const uint32_t OFFSET3K_GSMMESSAGE      = 0x00013000;

const uint32_t MEMMAP3KEVENT_BASE_ADDRESS  = 0x60130000;	// Event persistent memory start address
const uint32_t MEMMAP3KREPORT_BASE_ADDRESS = 0x60140000;	// Report persistent memory start address

typedef struct {
  uint8_t c;
} CAPACALC_STRUCT, TEST_STRUCT;

typedef struct {
  ascii char serialnum[16]; // old, not used
  uint16_t pcaddress;
  uint8_t sitetext[32]; // name of the panel / site
  uint8_t shaddr;
  uint8_t options;
  uint8_t sumday;
  uint8_t summonth;
  uint8_t winday;
  uint8_t winmonth;
  uint8_t autosumwin;
  uint8_t min_addressa;
  uint8_t max_addressa;
  uint8_t min_addressb;
  uint8_t max_addressb;
  uint8_t teststartday;
  uint8_t teststarthour;
  uint8_t testboardlimit;
  uint8_t testpointlimit;
  uint8_t basepolldelay;
  uint8_t capfactor;
  uint8_t testallminutes;
  uint8_t FREE1;
  uint8_t blockmainsfault;
  uint8_t panelcount;
  uint8_t areamaxminutes;
  uint8_t mygsmnumber[16];
  uint8_t gsmoperator[32];
  uint8_t gsmcountrycode[4];
  uint8_t gsmvalid;
  uint8_t gsmoptions;
  uint8_t gsmconnectioncallday;
  uint8_t gsmconnectioncallhour;
  uint8_t gsmconnectioncallminute;
  uint8_t gsmconnectioncallnumber[16];
  uint8_t gsmstatusseparator;
  uint16_t minfaultminutes;
  uint16_t pointtoserviceminutes;
  uint8_t serviceday;
  uint8_t servicestarthour;
  uint8_t serviceendhour;
  uint8_t smsoutminutelimit;
  uint8_t startuptesttime;
  uint8_t masteruser;
  uint8_t shortcircuitpollid;
  uint8_t mainstriggerareas[8];
  CAPACALC_STRUCT cpcs1[8];
  CAPACALC_STRUCT cpcs2[8];
  uint8_t skipbatterytestweek[8];
  uint8_t res[51];
} GENERAL_PRG_STRUCT;

const uint32_t GENERAL_PRG_STRUCT_ADDRESS = 0x60080000;

typedef struct {
  uint16_t aline[32];
  uint16_t bline[32];
} LINEAREAS_PRG_STRUCT;

typedef struct {
  LINEAREAS_PRG_STRUCT lap;
  uint8_t res[128];
} LINESETUP3K_PRG_STRUCT;

const uint32_t LINESETUP3K_PRG_STRUCT_ADDRESS = 0x60080100;

typedef struct {
	uint8_t name[20];		// 0
	uint8_t number[16];		// 20
	uint8_t pin[6];			// 36
	uint8_t area[8];		// 42
	uint8_t options;		// 50
	uint8_t res[13];		// 51 size 64bytes x 4 = 256 (0x100)
} GSMRECEIVER3K_PRG_STRUCT;

const uint32_t GSMRECEIVER3K_PRG_STRUCT_ADDRESS = 0x60080200;

typedef struct {
	uint8_t name[32];		// 32
	uint8_t area[8];		// 40
	uint8_t fastfunc[6]; 		// 46
	uint8_t options;		// 47 KLGOPT_xxx
	uint8_t ff_area;		// 48
	uint8_t ff_point;		// 49
	uint8_t ff_data;		// 50
	uint8_t code[6];		// 56
	uint8_t kl;			// 57
	uint8_t testcode;		// 58
	uint8_t alertsound;		// 59
	uint8_t reserved[5];		// 64   64bytes*8klgs=512[0x200] 64bytes*8users=512[0x200]
} USER3K_PRG_STRUCT, KLG3K_PRG_STRUCT;

const uint32_t USER3K_PRG_STRUCT_ADDRESS = 0x60080400;
const uint32_t KLG3K_PRG_STRUCT_ADDRESS = 0x60080600;

typedef struct IO3K_PRG_STRUCT {
  uint8_t name[32];
  uint8_t area[8];
  uint8_t type;
  uint8_t function;
  uint8_t devicetype;
  uint8_t deviceaddress;
  uint8_t deviceionumber;
  uint8_t res[19];
} MAINOUTPUT3K_PRG_STRUCT, MAININPUT3K_PRG_STRUCT, LOGICOUTPUT3K_PRG_STRUCT, LOGICINPUT3K_PRG_STRUCT;

const uint32_t MAINOUTPUT3K_PRG_STRUCT_ADDRESS = 0x60080800;
const uint32_t MAINOUTPUT3K_PRG_STRUCT_COUNT = 8;

const uint32_t MAININPUT3K_PRG_STRUCT_ADDRESS = 0x60080A00;
const uint32_t MAININPUT3K_PRG_STRUCT_COUNT = 8;

const uint32_t LOGICOUTPUT3K_PRG_STRUCT_ADDRESS = 0x60081000;
const uint32_t LOGICOUTPUT3K_PRG_STRUCT_COUNT = 256;

const uint32_t LOGICINPUT3K_PRG_STRUCT_ADDRESS = 0x60083000;
const uint32_t LOGICINPUT3K_PRG_STRUCT_COUNT = 256;

typedef struct {
  uint8_t name[32];
  uint8_t area[4];
  uint8_t type;
  uint8_t modebpp;
  uint16_t warea;
  uint8_t ia_setup;
  uint8_t cpcsptr;
  uint8_t res[22];
} POINT3K_PRG_STRUCT;

const uint32_t POINT3K_PRG_STRUCT_ADDRESS = 0x60090000;
const uint32_t POINT3K_PRG_STRUCT_COUNT = 254;

typedef struct {
  uint16_t paneladdr;
  uint16_t source;
} NCSRC3K_PRG_STRUCT;

typedef struct {
  uint8_t name[32];
  uint8_t nobatt_lowbrightness;
  uint8_t nobatt_highbrightness;
  uint8_t options;
  uint8_t hexit_normalmode;
  uint8_t hexit_activemode;
  NCSRC3K_PRG_STRUCT net[6];
  uint8_t res[3];
} AREA3K_PRG_STRUCT;

const uint32_t AREA3K_PRG_STRUCT_ADDRESS = 0x60094000;
const uint32_t AREA3K_PRG_STRUCT_COUNT = 32;

typedef struct {
	uint16_t avoltage;				// 0
	uint16_t acurrent;				// 2
	uint16_t bvoltage;				// 4
	uint16_t bcurrent;				// 6
	uint16_t fusef3;				// 8
	uint16_t fusef4;				// 10
	uint16_t fusef2batt;			// 12
	uint16_t fusef1dcin;			// 14
	uint16_t fusef6;				// 16
	uint16_t reserved;				// 18 => 20 tavua
} NEPTOADVALUES3K_STRUCT;

typedef struct {
	uint16_t dcin;			// 0 w
	uint8_t dcinslot;			// 2
	uint8_t dcinnewslot;			// 3
	uint8_t dcinslotcntr;			// 4
	uint8_t dcinnoisycntr;		// 5
	uint16_t batt;			// 6 w
	uint8_t battslot;			// 8
	uint8_t battnewslot;			// 9
	uint8_t battslotcntr;			// 10
	uint8_t battnoisycntr;		// 11
	uint16_t charger;			// 12 w
	uint8_t chargerslot;			// 14
	uint8_t chargernewslot;		// 15
	uint8_t chargerslotcntr;		// 16
	uint8_t chargernoisycntr;		// 17
	uint16_t fuse3;			// 18 w
	uint8_t fuse3slot;			// 20
	uint8_t fuse3newslot;		// 21
	uint8_t fuse3slotcntr;		// 22
	uint8_t fuse3noisycntr;		// 23
	uint16_t fuse4;			// 24 w
	uint8_t fuse4slot;			// 26
	uint8_t fuse4newslot;		// 27
	uint8_t fuse4slotcntr;		// 28
	uint8_t fuse4noisycntr;		// 29
	uint16_t fuse6;			// 30 w N3K lisäys
	uint8_t fuse6slot;			// 32
	uint8_t fuse6newslot;		// 33
	uint8_t fuse6slotcntr;		// 34
	uint8_t fuse6noisycntr;		// 35
	uint16_t chargerref;			// 36 w
	uint16_t measdelay;			// 38 w
	uint16_t measlimit;			// 40 w
	uint8_t outputs;			// 42 this is obyte!!
	uint8_t abcontrol;			// 43
	uint8_t abcontroldelay;		// 44
	uint16_t batttestdelay;		// 45 w
	uint16_t linelowdelay;		// 47 w
	uint16_t linelowlimit;			// 49 w
	uint32_t runninghours;		// 51 w
	uint32_t tothours;			// 55 w
	uint8_t oldhour;			// 59
	TDATETIME3K_STRUCT datetime;	// 60
	uint8_t testscleared;			// 67
	uint8_t domanualreport;		// 68
	uint8_t pcrelaycontrol;		// 69
	uint8_t abservice;			// 70
	uint8_t testall;			// 71
	uint8_t testallminutes;		// 72
	uint8_t blockmainsminutes;		// 73
	uint8_t dcoktolines;			// 74
	uint8_t needclock;			// 75
	uint8_t lineoff;			// 76	0
	uint16_t lineoffminutes;		// 77 	1 w
	uint16_t faultactivecounter;		// 79 	3 w 		* v1.96 *
	uint16_t tampercounter;		// 81 	5 w 		* v1.97 *
	uint8_t createblistweek;		// 83	7 		* v1.97 *
	uint8_t alinebacksecond;		// 84	8		* v2.06 *
	uint8_t blinebacksecond;		// 85 	9		* v2.06 *
	uint16_t alineshortvoltage;		// 86	10 w		* v2.06 *
	uint16_t blineshortvoltage;		// 88	12 w 	* v2.06 *
	uint16_t wdbeenthere;		// 90	14 w     * v2.09 *
	uint16_t alinescvoltage;		// 92	16 w		* v2.10 *
	uint16_t blinescvoltage;		// 94	18 w		* v2.10 *
	uint8_t batterystate;			// 96	20       * neptoarm */
	uint32_t batteryflags;		// 97	21       * neptoarm */
	uint16_t batterytestvalue;		// 101	25 battery
	uint16_t batterywithcharger;		// 103	27
	uint16_t batterycharger;		// 105	29
	uint16_t batterymainstrigger;		// 107	31
	uint8_t batterypins;			// 109	33
	uint16_t batteryresistance;		// 110	34
	uint16_t batteryload1voltage;		// 112	36
	uint16_t batteryload2voltage;		// 114	38
	uint16_t capacityvoltagestart;		// 116	40
	uint16_t capacityvoltagenow;		// 118	42
	uint32_t capacityminutes;		// 120	44
	NEPTOADVALUES3K_STRUCT nad;	// 124
	uint8_t sumdone;			// 144
	uint8_t windone;			// 145
	uint8_t oldmin;			// 146
	uint8_t oldsec;			// 147
	uint8_t cancelstartuptest;		// 148 estää testin käynnistymisen, kun dc-jännite nostetaan linjaan (esim. tehdaskäynnistys!)
	uint16_t paneldisabled;		// 149 irtikytketyt keskukset
	uint32_t watts;			// 151
	uint32_t wattshour;			// 155
	uint32_t randomtestactive;		// 159 v1.01 	0xFFFFFFFF = done for the week
			//	0xF000xxxx = waiting for minute xxxx after weekly report (10080 minutes in week)
			//  		0xFF00xxxx = test run for xxxx minutes
	uint32_t randomteststart;		// 163	random minute 1...10080 after a report is stored
	uint8_t res[89];			// 167	-> size 256	[0x100]
} BOARD3K_STRUCT;

const uint32_t BOARD3K_PRG_STRUCT_ADDRESS = 0x60100000;

typedef struct {
	uint8_t year;
	uint8_t month;
	uint8_t day;
	uint8_t hour;
	uint8_t minute;
	uint8_t second;
	uint8_t dayno;
} TDATETIME3K_STRUCT;

typedef struct {
	uint16_t count;		// 0
	uint8_t board[8]; 		// 2 	64 possible:
				//		0x0..0x9 jännitteet
				//		0xA..0xf vapaa
				//		0x10..0x1f sarja-io 0..f putoaa pois
				//		0x20..0x27 klg 0..7 kansi avattu
				//		0x28..0x2f klg 0..7 poistettu
				//		0x30..0x37 keskussisäänmeno viallinen/vikavalvonta aktiivi
				//		0x38..0x3d vapaa
				//		0x3e A-linja huoltotila
				//		0x3f B-linja huoltotila
	uint8_t point[32];		// 10	256 point faulty bits
	uint8_t input[32]; 		// 42   256 input faulty bits
	uint8_t reserved[6]; 	// 74 -> size 80 bytes
} FD3K_STRUCT;

typedef struct {
	uint8_t system;				// 0
	uint16_t pcaddress;				// 1
	uint16_t version;				// 3 W
	TDATETIME3K_STRUCT today; 		// 5
	uint16_t eventptr;				// 12 W
	FD3K_STRUCT fault;			// 14
	FD3K_STRUCT disab;			// 94
	uint8_t pinitcount;				// 174
	uint8_t obyte;				// 175
	uint8_t testall;				// 176
	uint8_t areastatus[8];			// 177
	uint8_t outstatus[17];			// 185 1. tavu keskuksen lähdöt, +16 loogisille
	uint8_t instatus[33];				// 202 1. tavu keskuksen sisäänmenoille, +32 loogisille
	uint8_t promdate[3];				// 235
	uint16_t programmedpoints;			// 238
	uint16_t activepoints;			// 240
	uint8_t timecutareas[8];			// 242
	uint8_t activeareas;				// 250
	uint8_t panelcount;				// 251
	uint8_t reserved[4];				// 252	=> size 256
} PCPACKET3K_STRUCT;

const uint32_t PCPACKET3K_STRUCT_ADDRESS = 0x60100100;

typedef struct {
	uint16_t highvoltage;		// 0 W
	uint8_t hvslot;		// 2
	uint8_t hvnewslot;		// 3
	uint8_t hvslotcntr;		// 4
	uint8_t hvnoisycntr;		// 5
	uint16_t current;		// 6 W
	uint8_t cuslot;		// 8
	uint8_t cunewslot;		// 9
	uint8_t cuslotcntr;		// 10
	uint8_t cunoisycntr;		// 11
	uint16_t lowvoltage;		// 12 W
	uint8_t lvslot;		// 14
	uint8_t lvnewslot;		// 15
	uint8_t lvslotcntr;		// 16
	uint8_t lvnoisycntr;		// 17
	uint16_t measdelay;		// 18 W
	uint16_t measlimit;		// 20 W
	uint8_t btestminute;		// 22
	uint8_t gethighlow;		// 23
	uint8_t pollme;		// 24
	uint8_t pollmecount;		// 25
	uint8_t dcoktoline;		// 26 virrankulutuksen kautta j„nnitevalvonta
	uint8_t reserved[101];	// 27 -> size 128 	2 x 128 = 256
} LINE3K_STRUCT;

const uint32_t LINE3K_STRUCT_ADDRESS = 0x60100200;

typedef struct {
	uint8_t state;			// 0
	uint16_t delay;			// 1 w
	uint16_t limit;			// 3 w
	uint8_t retry;			// 5
	uint8_t flags;			// 6
	uint8_t head;			// 7
	uint8_t tail;				// 8
	uint8_t sent;			// 9
	uint8_t test;				// 10
	uint16_t lineopendelay;		// 11 w
	uint8_t ctype;			// 13
	uint8_t caller[16];			// 14
	uint8_t sms_time[30];		// 30
	uint8_t pin[6];			// 60
	uint8_t onoff;			// 66
	uint8_t gsmservicecaller;		// 67
	uint8_t servicecallcount;		// 68
	uint16_t resettargets;		// 69 w
	uint16_t prealarmresettargets;	// 71 w
	uint16_t prodexquerydelay;		// 73 w
	uint16_t hhlquerydelay;		// 75 w
	uint16_t sentmask;			// 77 w
	uint8_t numbermask;		// 79
	uint8_t mode;			// 80
	uint8_t outminute;			// 81
	uint8_t faultarea[4];			// 82
	uint8_t activearea[4];		// 86
	uint16_t eventptr;			// 90 w
	uint8_t connectcalldone;		// 92
	uint8_t signalq[20];			// 93
	uint8_t showsignalq;			// 113
	uint8_t area;			// 114
	uint8_t pointaddress;			// 115
	uint8_t pluscount;			// 116 neptoarm v3.00
	uint8_t res[139];			// 117 -> size 256
} GSMMODEM3K_STRUCT;

const uint32_t GSMMODEM3K_STRUCT_ADDRESS = 0x60100300;

// copy of PCPACKET3K_STRUCT
typedef struct {
	uint8_t system;				// 0
	uint16_t pcaddress;				// 1
	uint16_t version;				// 3 W
	TDATETIME3K_STRUCT today; 		// 5
	uint16_t eventptr;				// 12 W
	FD3K_STRUCT fault;			// 14
	FD3K_STRUCT disab;			// 94
	uint8_t pinitcount;				// 174
	uint8_t obyte;				// 175
	uint8_t testall;				// 176
	uint8_t areastatus[8];			// 177
	uint8_t outstatus[17];			// 185 1. tavu keskuksen lähdöt, +16 loogisille
	uint8_t instatus[33];				// 202 1. tavu keskuksen sisäänmenoille, +32 loogisille
	uint8_t promdate[3];				// 235
	uint16_t programmedpoints;			// 238
	uint16_t activepoints;			// 240
	uint8_t timecutareas[8];			// 242
	uint8_t activeareas;				// 250
	uint8_t panelcount;				// 251
	uint8_t reserved[4];				// 252	=> size 256
} NETPACKET3K_STRUCT;

const uint32_t NETPACKET3K_STRUCT_ADDRESS = 0x60100400;

typedef struct {
	uint8_t state; 		/* 0 	Lower nybble = state ; higher  BTEST flags */
	uint8_t capa;		// 1
	uint8_t lightamps;		// 2
	uint8_t pqcounts; 		/* 3	lower 'Q' query ; higher 'P' poll */
	uint8_t fieldstatus;		// 4
	uint8_t iostate;		// 5
	uint8_t hoursalive; 		/* 6	hours w/o reset */
	uint8_t week;		// 7
// old point limit...
	uint8_t battvoltage;		// 8
	uint8_t linevoltage;		// 9
	uint8_t actfaults;		// 10
	uint8_t latchfaults;		// 11
	uint8_t precapa;		// 12
	uint8_t bestcapa;		// 13
	uint8_t bestweek;		// 14
	uint8_t prestate;		// 15
	uint8_t version;		// 16
	uint16_t servicecounter;	// 17
	uint8_t newstate;		// 19
	uint8_t newpq;		// 20
	uint8_t address_marker; 	// 21 battery marker to store battery full to SPIFLASH
	uint8_t commissioning_type; 	// 22 tyyppi, joka löydetty käyttöönotossa
	uint8_t db_marker;		// 23
	uint8_t reserved[8];		// 24 -> size 32 	256 x 32=8192 [0x2000]
} POINT3K_STRUCT;

const uint32_t POINT3K_STRUCT_ADDRESS = 0x60110000;
const uint32_t POINT3K_STRUCT_COUNT = 254;

typedef struct {
	uint8_t status;		// 0
	uint8_t prestatus;		// 1
	uint16_t winput;  		/* 2 	pienin ohjaava input-numero. FFFFh, jos ei inputohjausta */
	uint8_t teston;  		/* 4	=PC/KLG-ohjaus p„„lle */
	uint8_t preteston;		// 5
	uint8_t currbright;		/* 6	nyk. dyn. ohjattu kirkkaus */
	uint8_t newbright; 		/* 7	uusi dyn. ohjattu kirkkaus */
	uint8_t currmode;		/* 8	nyk. dyn. ohjattu kirkkaus */
	uint8_t newmode;		/* 9	uusi dyn. ohjattu kirkkaus */
	uint8_t oncounter;		/* 10	lasketaan aktiiviminuutteja */
	uint8_t extact;		/* 11	ulkoinen ohjaus (toiselta keskukselta) */
	uint8_t preextact;		/* 12	ed. ulkoinen ohjaus */
	uint8_t mainsactivated; 	// 13	ohjattu pääjännitteen tarkkailulla
	uint16_t testoncounter;	// 14   N3K - testiohjauksen aika (globaalista asetuksesta!)
	uint16_t minutesoncounter; 	// 16 N3K - laskee aktiivi minuutteja (oncounter ~5min slotteja)
	uint8_t reserved2[14];	// 18	=> size 32  	64 x 32=2048[0x800]
} AREA3K_STRUCT;

const uint32_t AREA3K_STRUCT_ADDRESS = 0x60112000;
const uint32_t AREA3K_STRUCT_COUNT = 32;

typedef struct {
	uint8_t number[16];			// 0
	uint8_t text[160];			// 16
	uint8_t needack;			// 176
	uint8_t acked;			// 177
	uint8_t exists;			// 178
	uint16_t tosetups;			// 179 W
	uint8_t reserved[75];			// 181 -> size 256
} GSMMESSAGE3K_STRUCT;

const uint32_t GSMMESSAGE3K_STRUCT_ADDRESS = 0x60113000;

typedef struct {
	uint32_t seconds; 	// seconds since 1.1.2010
	uint8_t	type;
	uint8_t data[3];
} EVENT3K_STRUCT;

const uint32_t EVENT3K_STRUCT_ADDRESS = 0x60130000;
const uint32_t EVENT3K_STRUCT_COUNT = 1;

#define RESERVED_POINT_COUNT 256

typedef struct {
	uint32_t seconds;		/* 0 seconds since 1.1.2010 */
	uint16_t dcinws;		/* 4 value + slot  SSSSSSWW WWWWWWWW */
	uint16_t battws;		/* 6 value + slot  */
	uint16_t chargerws;		// 8
	uint16_t fuse3ws;		// 10
	uint16_t fuse4ws;		// 12
	uint16_t lineahws;		// 14
	uint16_t linealws;		// 16
	uint16_t linebhws;		// 18
	uint16_t lineblws;		// 20
	uint16_t lineacws;		// 22
	uint16_t linebcws;		// 24
	uint32_t rhours;		// 26
	uint32_t tothours;		// 30
	uint16_t faultcount;		// 34
	uint8_t boardfault[8];	// 36
	uint16_t disabcount;		// 44
	uint8_t boarddisab[8];	// 46
	uint8_t week;		// 54
	uint8_t reporttype;		// 55
	uint16_t fuse6ws;		// 56
	uint8_t reserved[6];		// 58
	uint8_t reserved2[64];	// 64
	uint8_t reserved3[128];	// 128
	uint8_t pointstate[RESERVED_POINT_COUNT];	// 256
	uint8_t pointcapa[RESERVED_POINT_COUNT];	// 512
	uint8_t lightamps[RESERVED_POINT_COUNT];	// 768
	uint8_t extras[RESERVED_POINT_COUNT];		// 1024
	uint8_t versions[RESERVED_POINT_COUNT];		// 1280
	uint8_t reserved5[256];	// 1536
	uint8_t reserved6[256];	// 1792 => size 2048
} REPORT3K_STRUCT;

const uint32_t REPORT3K_STRUCT_ADDRESS = 0x60140000;
const uint32_t REPORT3K_STRUCT_COUNT = 1;

/*
this is
a multiline
comment
*/