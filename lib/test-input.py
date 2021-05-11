# "Structural" generated this file from test-input.h at Thu May 16 2019 08:31:48 GMT+0300 (GMT+03:00)

from construct2 import *

from functools import partial

undefined = undefined

class transformed_Struct(Struct):
    def parse(self, *args):
        r = Struct.parse(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def new(self, *args):
        r = Struct.new(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def __is__(self, inst):
        def wrap(self, other):
          re
        return partial(wrap, inst)

transformed = transformed_Struct('transformed',
    UBInt8("undefined"),
    UBInt8("undefined"),
)

class laststruct_Struct(Struct):
    def parse(self, *args):
        r = Struct.parse(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def new(self, *args):
        r = Struct.new(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def __is__(self, inst):
        def wrap(self, other):
          re
        return partial(wrap, inst)

laststruct = laststruct_Struct('laststruct',
    UBInt8("undefined"),
    Struct("undefined", Embed(transformed)),
    String("undefined", 10, encoding="utf-8"),
)

class base_Struct(Struct):
    def parse(self, *args):
        r = Struct.parse(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def new(self, *args):
        r = Struct.new(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def __is__(self, inst):
        def wrap(self, other):
          re
        return partial(wrap, inst)

base = base_Struct('base',
    UBInt8("undefined"),
)

class ext1_Struct(Struct):
    def parse(self, *args):
        r = Struct.parse(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def new(self, *args):
        r = Struct.new(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def __is__(self, inst):
        def wrap(self, other):
          re
        return partial(wrap, inst)

ext1 = ext1_Struct('ext1',
    UBInt8("undefined"),
)

class ext2_Struct(Struct):
    def parse(self, *args):
        r = Struct.parse(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def new(self, *args):
        r = Struct.new(self, *args)
        r.__is__ = self.__is__(r)
        return r

    def __is__(self, inst):
        def wrap(self, other):
          re
        return partial(wrap, inst)

ext2 = ext2_Struct('ext2',
    UBInt8("undefined"),
    Array(v1, UBInt8("undefined")),
)
