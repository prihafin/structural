# "Structural" generated this file from C:\dev\javascript\.packages\structural\test\test.h at Wed Aug 16 2017 10:18:06 GMT+0300 (FLE Daylight Time)

from construct2 import *

from functools import partial


class d_Struct(Struct):
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
          return self.a==other.a and self.b==other.b
        return partial(wrap, inst)

d = d_Struct('d',
    Struct("a", Embed(BYTE)),
    String("b", undefined, encoding="utf-8"),
)
