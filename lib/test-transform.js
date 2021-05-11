exports.initialize = (structures, transforms, Transform) => {
  transforms.test1 = class test extends Transform {
    static get(obj, prop, value) {
      console.log('get', value);
      return value / 10;
    }

    static set(obj, prop, value) {
      console.log('set', value);
      return value * 10;
    }
  };

  transforms.test2 = class test extends Transform {
    static get(value) {
      return value.a + value.b;
    }

    static set(value, old) {
      old.a = value / 3;
      old.b = value / 1.5;
      return old;
    }
  };

  transforms.datetime = class Datetime3k {
    static get(value) {
      return new Date(value.year+2000, value.month-1, value.day, value.hour, value.minute, value.second);
    }

    static set(value, old) {
      let res = new structures.TDATETIME3K();
      return old;
    }
  }

}