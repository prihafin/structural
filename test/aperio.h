#define AadpIpPduId uint8_t
#define AadpIpUint uintv_t
#define AadpIpShort uint16_t
#define AadpIpString char[uintv_t]
#define AadpIpGenericId char[uintv_t]

typedef enum
{
    PDU_ID_0_RESERVED = 0,
    HELLO_REQUEST = 1,
    HELLO_RESPONSE = 2,
    DEVICE_GROUP_INFO_NOTIFICATION = 3,
    PDU_ID_4_RESERVED = 4,
    CREDENTIAL_NOTIFICATION = 5,
    KEYPAD_NOTIFICATION = 6,
    RESTART_COMMAND = 7,
    INDICATION_COMMAND = 8,
    INDICATION_RESULT = 9,
    GET_SUPPORTED_DOOR_MODES_COMMAND = 10,
    GET_SUPPORTED_DOOR_MODES_RESULT = 11,
    DOOR_OPENING_COMMAND = 12,
    DOOR_OPENING_RESULT = 13,
    PDU_ID_14_RESERVED = 14,
    SET_DOOR_MODE_COMMAND = 15,
    SET_DOOR_MODE_RESULT = 16,
    STATUS_REQUEST = 17,
    STATUS_RESPONSE = 18,
    GET_DEVICE_PROPERTY_COMMAND = 19,
    GET_DEVICE_PROPERTY_RESULT = 20,
    DTC_NOTIFICATION = 21,
    GET_DTC_STATUS_COMMAND = 22,
    GET_DTC_STATUS_RESULT = 23,
    CLEAR_DTC_COMMAND = 24,
    CLEAR_DTC_RESULT = 25,
    GET_DEVICE_LIST_COMMAND = 26,
    GET_DEVICE_LIST_RESULT = 27,
    PDU_ID_28_RESERVED = 28,
    PDU_ID_29_RESERVED = 29,
    ALARM_NOTIFICATION_DRAFT = 30,
    GET_ALARM_STATUS_COMMAND_DRAFT = 31,
    ALARM_STATUS_RESULT_DRAFT = 32,
    CONFIRM_ALARM_COMMAND_DRAFT = 33,
    CONFIRM_ALARM_RESULT_DRAFT = 34,
    ACTION_WITH_TIMER_COMMAND_DRAFT = 35,
    ACTION_WITH_TIMER_RESULT_DRAFT = 36,
    PDU_ID_37_RESERVED = 37,
    PDU_ID_38_RESERVED = 38,
    PDU_ID_39_RESERVED = 39,
    TIME_NOTIFICATION = 40,
    SET_TIME_COMMAND = 41,
    SET_TIME_RESULT = 42,
    GET_TIME_COMMAND = 43,
    GET_TIME_RESULT = 44,
    PDU_ID_45_RESERVED = 45,
    PDU_ID_46_RESERVED = 46,
    PDU_ID_47_RESERVED = 47,
    PDU_ID_48_RESERVED = 48,
    PDU_ID_49_RESERVED = 49,
    SET_DEVICE_PROPERTY_COMMAND = 50,
    SET_DEVICE_PROPERTY_RESULT = 51,
    PDU_ID_52_RESERVED = 52,
    PDU_ID_53_RESERVED = 53,
    PDU_ID_54_RESERVED = 54,
    PDU_ID_55_RESERVED = 55,
    PDU_ID_56_RESERVED = 56,
    PDU_ID_57_RESERVED = 57,
    PDU_ID_58_RESERVED = 58,
    PDU_ID_59_RESERVED = 59,
    PDU_ID_60_RESERVED = 60,
    PDU_ID_61_RESERVED = 61,
    PDU_ID_62_RESERVED = 62,
    PDU_ID_63_RESERVED = 63,
    GET_DOOR_STATE_COMMAND = 64,
    DOOR_STATE_RESULT = 65,
    DOOR_STATE_NOTIFICATION = 66,
    PDU_ID_67_RESERVED = 67,
    GET_LOCK_STATE_COMMAND = 68,
    LOCK_STATE_RESULT = 69,
    LOCK_STATE_NOTIFICATION = 70,
    PDU_ID_71_RESERVED = 71,
    GET_KEY_CYLINDER_STATE_COMMAND = 72,
    KEY_CYLINDER_STATE_RESULT = 73,
    KEY_CYLINDER_STATE_NOTIFICATION = 74,
    PDU_ID_75_RESERVED = 75,
    GET_HANDLE_STATE_COMMAND = 76,
    HANDLE_STATE_RESULT = 77,
    HANDLE_STATE_NOTIFICATION = 78,
    PDU_ID_79_RESERVED = 79,
    GET_TAMPER_STATE_COMMAND = 80,
    TAMPER_STATE_RESULT = 81,
    TAMPER_STATE_NOTIFICATION = 82,
    PDU_ID_83_RESERVED = 83,
    GET_ACTIVATOR_STATE_COMMAND_DRAFT = 84,
    ACTIVATOR_STATE_RESULT_DRAFT = 85,
    ACTIVATOR_STATE_NOTIFICATION_DRAFT = 86,
    PDU_ID_87_RESERVED = 87,
    PDU_ID_88_RESERVED = 88,
    PDU_ID_89_RESERVED = 89,
    DOOR_MODE_NOTIFICATION_DRAFT = 90,
    PDU_ID_91_RESERVED = 91,
    PDU_ID_92_RESERVED = 92,
    PDU_ID_93_RESERVED = 93,
    PDU_ID_94_RESERVED = 94,
    PDU_ID_95_RESERVED = 95,
    PDU_ID_96_RESERVED = 96,
    PDU_ID_97_RESERVED = 97,
    PDU_ID_98_RESERVED = 98,
    PDU_ID_99_RESERVED = 99,
    PDU_ID_100_RESERVED = 100,
    PDU_ID_101_RESERVED = 101,
    PDU_ID_102_RESERVED = 102,
    PDU_ID_103_RESERVED = 103,
    PDU_ID_104_RESERVED = 104,
    PDU_ID_105_RESERVED = 105,
    PDU_ID_106_RESERVED = 106,
    PDU_ID_107_RESERVED = 107,
    PDU_ID_108_RESERVED = 108,
    PDU_ID_109_RESERVED = 109,
    PDU_ID_110_RESERVED = 110,
    PDU_ID_111_RESERVED = 111,
    PDU_ID_112_RESERVED = 112,
    PDU_ID_113_RESERVED = 113,
    PDU_ID_114_RESERVED = 114,
    PDU_ID_115_RESERVED = 115,
    PDU_ID_116_RESERVED = 116,
    PDU_ID_117_RESERVED = 117,
    PDU_ID_118_RESERVED = 118,
    PDU_ID_119_RESERVED = 119,
    PDU_ID_120_RESERVED = 120,
    PDU_ID_121_RESERVED = 121,
    PDU_ID_122_RESERVED = 122,
    PDU_ID_123_RESERVED = 123,
    PDU_ID_124_RESERVED = 124,
    PDU_ID_125_RESERVED = 125,
    PDU_ID_126_RESERVED = 126,
    PDU_ID_127_RESERVED = 127
} AadpIpPduId;

typedef enum
{
AADP_IP_FALSE = 0x00,
AADP_IP_TRUE  = 0xFF
} AadpIpBool;

typedef enum
{
UNKNOWN = 0,
OK = 1,
OK_PENDING = 2,
FAIL = 3,
UNAVAILABLE = 4,
FAIL_TYPE_ERROR = 5,
FAIL_ENUM_ERROR = 6
} AadpIpStatus;

typedef enum
{
EXISTING = 0,
ADDED = 1,
REMOVED = 2
} AadpIpDeviceGroupInfoNotificationType;

typedef enum
{
UNKNOWN = 0,
INSIDE = 1,
OUTSIDE = 2,
BOTH = 3
} AadpIpDoorSide;

typedef struct
{
    AadpIpGenericId deviceGroupId;
    AadpIpString name; // Optional name of this device group
    AadpIpString location; // Optional location of this device group
} AadpIpDeviceGroupInfo;


//struct timestamp {
//  unsigned variable int timestamp;
//}

struct time {
  uintv_t timestamp;
  short int timezone;
};

struct timing {
  timingmode mode;
  unsigned variable int time;
};

struct dtcinfo {
  unsigned variable int dtcid;
  unsigned varaible int dtctime;
  bool isfailing;
  bool hasfailed;
  bool testcompleted;
};

typedef struct
{
    uint8_t   major = 1;
    uint8_t   minor = 3;
    uintv_t   patch = 0;
} AadpIpVersion;

typedef struct {
    AadpIpPduId pduId;
    AadpIpVersion version;
} HelloRequest;

typedef struct {
    AadpIpPduId pduId = 2;
    AadpIpVersion version;
    AadpIpUint pingInterval = 10;
} HelloResponse;

typedef struct {
    AadpIpPduId pduId;
    AadpIpDeviceGroupInfo deviceGroupinfo;
    AadpIpDeviceGroupInfoNotificationType notificationType;
} DeviceGroupInfoNotification;

typedef struct {
    AadpIpPduId pduId;
    AadpIpStatus status;
} StatusRequest;

typedef struct {
    AadpIpPduId pduId = 18;
    AadpIpStatus status;
} StatusResponse;

typedef struct {
    AadpIpPduId pduId;
    AadpIpGenericId deviceGroupId;
    AadpIpDoorSide doorSide;
    AadpIpArrayOfCredentialBlock ArrayOfCredentialBlock;
} CredentialNotification;

typedef struct
{
    AadpIpCredentialBlockType credentialBlockType;
    AadpIpShort length; // Number of bytes in credential array
    AadpIpUint validBits; // Number of valid bits of last data byte in array
    uint8_t data[length]; // Credential data array
} AadpIpCredentialBlock;

typedef struct
{
    AadpIpUint nrOfElements;
    AadpIpCredentialBlock credentialBlock[nrOfElements];
} AadpIpArrayOfCredentialBlock;
