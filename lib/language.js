(function() {
  'use strict';

  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };

  var formatError = function (input, offset, expected) {
    var lines = input.split(/\n/g),
        lineNo = 0,
        position = 0;

    while (position <= offset) {
      position += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + expected.join(', ') + '\n',
        line = lines[lineNo - 1];

    message += line + '\n';
    position -= line.length + 1;

    while (position < offset) {
      message += ' ';
      position += 1;
    }
    return message + '^';
  };

  var inherit = function (subclass, parent) {
    var chain = function() {};
    chain.prototype = parent.prototype;
    subclass.prototype = new chain();
    subclass.prototype.constructor = subclass;
  };

  var TreeNode = function(text, offset, elements) {
    this.text = text;
    this.offset = offset;
    this.elements = elements || [];
  };

  TreeNode.prototype.forEach = function(block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
      block.call(context, el[i], i, el);
    }
  };

  var TreeNode1 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['aliasdecl'] = elements[1];
  };
  inherit(TreeNode1, TreeNode);

  var TreeNode2 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['constdecl'] = elements[1];
  };
  inherit(TreeNode2, TreeNode);

  var TreeNode3 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefstructdecl'] = elements[1];
  };
  inherit(TreeNode3, TreeNode);

  var TreeNode4 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['structdecl'] = elements[1];
  };
  inherit(TreeNode4, TreeNode);

  var TreeNode5 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefenumdecl'] = elements[1];
  };
  inherit(TreeNode5, TreeNode);

  var TreeNode6 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['enumdecl'] = elements[1];
  };
  inherit(TreeNode6, TreeNode);

  var TreeNode7 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['comment1'] = elements[1];
  };
  inherit(TreeNode7, TreeNode);

  var TreeNode8 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['const'] = elements[0];
    this['decl'] = elements[1];
    this['eq'] = elements[2];
    this['eol'] = elements[4];
  };
  inherit(TreeNode8, TreeNode);

  var TreeNode9 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefstruct'] = elements[0];
    this['ws'] = elements[1];
    this['structfields'] = elements[6];
    this['eol'] = elements[12];
  };
  inherit(TreeNode9, TreeNode);

  var TreeNode10 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['struct'] = elements[0];
    this['ws'] = elements[1];
    this['ident'] = elements[2];
    this['structfields'] = elements[6];
    this['eol'] = elements[10];
  };
  inherit(TreeNode10, TreeNode);

  var TreeNode11 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['decl'] = elements[0];
    this['default'] = elements[3];
    this['eol'] = elements[5];
  };
  inherit(TreeNode11, TreeNode);

  var TreeNode12 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[3];
    this['ident'] = elements[4];
  };
  inherit(TreeNode12, TreeNode);

  var TreeNode13 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['decl'] = elements[0];
    this['default'] = elements[6];
    this['eol'] = elements[8];
  };
  inherit(TreeNode13, TreeNode);

  var TreeNode14 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['decl'] = elements[0];
    this['default'] = elements[4];
    this['eol'] = elements[6];
  };
  inherit(TreeNode14, TreeNode);

  var TreeNode15 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['decl'] = elements[0];
    this['length'] = elements[3];
    this['default'] = elements[5];
    this['eol'] = elements[7];
  };
  inherit(TreeNode15, TreeNode);

  var TreeNode16 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['decl'] = elements[0];
    this['length'] = elements[1];
    this['eol'] = elements[5];
  };
  inherit(TreeNode16, TreeNode);

  var TreeNode17 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['alias'] = elements[0];
    this['ws'] = elements[1];
    this['ident'] = elements[4];
    this['eol'] = elements[6];
  };
  inherit(TreeNode17, TreeNode);

  var TreeNode18 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefenum'] = elements[0];
    this['ws'] = elements[1];
    this['enumfields'] = elements[6];
    this['ident'] = elements[10];
    this['eol'] = elements[12];
  };
  inherit(TreeNode18, TreeNode);

  var TreeNode19 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['enum'] = elements[0];
    this['ws'] = elements[1];
    this['enumfields'] = elements[6];
    this['eol'] = elements[10];
  };
  inherit(TreeNode19, TreeNode);

  var TreeNode20 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
    this['eq'] = elements[1];
  };
  inherit(TreeNode20, TreeNode);

  var TreeNode21 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[4];
    this['eol'] = elements[12];
  };
  inherit(TreeNode21, TreeNode);

  var TreeNode22 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[2];
    this['number'] = elements[3];
  };
  inherit(TreeNode22, TreeNode);

  var TreeNode23 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['list'] = elements[0];
  };
  inherit(TreeNode23, TreeNode);

  var TreeNode24 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
  };
  inherit(TreeNode24, TreeNode);

  var TreeNode25 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
  };
  inherit(TreeNode25, TreeNode);

  var FAILURE = {};

  var Grammar = {
    _read_content: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._content = this._cache._content || {};
      var cached = this._cache._content[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      address0 = this._read_decls();
      this._cache._content[index0] = [address0, this._offset];
      return address0;
    },

    _read_decls: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._decls = this._cache._decls || {};
      var cached = this._cache._decls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== FAILURE) {
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(2);
        var address2 = FAILURE;
        var index4 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index4, index4), index4);
          this._offset = index4;
        }
        if (address2 !== FAILURE) {
          elements1[0] = address2;
          var address3 = FAILURE;
          address3 = this._read_aliasdecl();
          if (address3 !== FAILURE) {
            elements1[1] = address3;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address1 = FAILURE;
        } else {
          address1 = new TreeNode1(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address1 === FAILURE) {
          this._offset = index2;
          var index5 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var index6 = this._offset;
          address4 = this._read_ws();
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index6, index6), index6);
            this._offset = index6;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_constdecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2 === null) {
            address1 = FAILURE;
          } else {
            address1 = new TreeNode2(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          }
          if (address1 === FAILURE) {
            this._offset = index2;
            var index7 = this._offset, elements3 = new Array(2);
            var address6 = FAILURE;
            var index8 = this._offset;
            address6 = this._read_ws();
            if (address6 === FAILURE) {
              address6 = new TreeNode(this._input.substring(index8, index8), index8);
              this._offset = index8;
            }
            if (address6 !== FAILURE) {
              elements3[0] = address6;
              var address7 = FAILURE;
              address7 = this._read_typedefstructdecl();
              if (address7 !== FAILURE) {
                elements3[1] = address7;
              } else {
                elements3 = null;
                this._offset = index7;
              }
            } else {
              elements3 = null;
              this._offset = index7;
            }
            if (elements3 === null) {
              address1 = FAILURE;
            } else {
              address1 = new TreeNode3(this._input.substring(index7, this._offset), index7, elements3);
              this._offset = this._offset;
            }
            if (address1 === FAILURE) {
              this._offset = index2;
              var index9 = this._offset, elements4 = new Array(2);
              var address8 = FAILURE;
              var index10 = this._offset;
              address8 = this._read_ws();
              if (address8 === FAILURE) {
                address8 = new TreeNode(this._input.substring(index10, index10), index10);
                this._offset = index10;
              }
              if (address8 !== FAILURE) {
                elements4[0] = address8;
                var address9 = FAILURE;
                address9 = this._read_structdecl();
                if (address9 !== FAILURE) {
                  elements4[1] = address9;
                } else {
                  elements4 = null;
                  this._offset = index9;
                }
              } else {
                elements4 = null;
                this._offset = index9;
              }
              if (elements4 === null) {
                address1 = FAILURE;
              } else {
                address1 = new TreeNode4(this._input.substring(index9, this._offset), index9, elements4);
                this._offset = this._offset;
              }
              if (address1 === FAILURE) {
                this._offset = index2;
                var index11 = this._offset, elements5 = new Array(2);
                var address10 = FAILURE;
                var index12 = this._offset;
                address10 = this._read_ws();
                if (address10 === FAILURE) {
                  address10 = new TreeNode(this._input.substring(index12, index12), index12);
                  this._offset = index12;
                }
                if (address10 !== FAILURE) {
                  elements5[0] = address10;
                  var address11 = FAILURE;
                  address11 = this._read_typedefenumdecl();
                  if (address11 !== FAILURE) {
                    elements5[1] = address11;
                  } else {
                    elements5 = null;
                    this._offset = index11;
                  }
                } else {
                  elements5 = null;
                  this._offset = index11;
                }
                if (elements5 === null) {
                  address1 = FAILURE;
                } else {
                  address1 = new TreeNode5(this._input.substring(index11, this._offset), index11, elements5);
                  this._offset = this._offset;
                }
                if (address1 === FAILURE) {
                  this._offset = index2;
                  var index13 = this._offset, elements6 = new Array(2);
                  var address12 = FAILURE;
                  var index14 = this._offset;
                  address12 = this._read_ws();
                  if (address12 === FAILURE) {
                    address12 = new TreeNode(this._input.substring(index14, index14), index14);
                    this._offset = index14;
                  }
                  if (address12 !== FAILURE) {
                    elements6[0] = address12;
                    var address13 = FAILURE;
                    address13 = this._read_enumdecl();
                    if (address13 !== FAILURE) {
                      elements6[1] = address13;
                    } else {
                      elements6 = null;
                      this._offset = index13;
                    }
                  } else {
                    elements6 = null;
                    this._offset = index13;
                  }
                  if (elements6 === null) {
                    address1 = FAILURE;
                  } else {
                    address1 = new TreeNode6(this._input.substring(index13, this._offset), index13, elements6);
                    this._offset = this._offset;
                  }
                  if (address1 === FAILURE) {
                    this._offset = index2;
                    var index15 = this._offset, elements7 = new Array(2);
                    var address14 = FAILURE;
                    var index16 = this._offset;
                    address14 = this._read_ws();
                    if (address14 === FAILURE) {
                      address14 = new TreeNode(this._input.substring(index16, index16), index16);
                      this._offset = index16;
                    }
                    if (address14 !== FAILURE) {
                      elements7[0] = address14;
                      var address15 = FAILURE;
                      address15 = this._read_comment1();
                      if (address15 !== FAILURE) {
                        elements7[1] = address15;
                      } else {
                        elements7 = null;
                        this._offset = index15;
                      }
                    } else {
                      elements7 = null;
                      this._offset = index15;
                    }
                    if (elements7 === null) {
                      address1 = FAILURE;
                    } else {
                      address1 = new TreeNode7(this._input.substring(index15, this._offset), index15, elements7);
                      this._offset = this._offset;
                    }
                    if (address1 === FAILURE) {
                      this._offset = index2;
                    }
                  }
                }
              }
            }
          }
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = this._actions.decls(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._decls[index0] = [address0, this._offset];
      return address0;
    },

    _read_comment1: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comment1 = this._cache._comment1 || {};
      var cached = this._cache._comment1[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '//') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"//"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[ a-zA-Z0-9_,.;:+!"#¤%&\/(){}\[\]=\t*]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[ a-zA-Z0-9_,.;:+!"#¤%&/(){}\\[\\]=\\t*]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var remaining1 = 0, index3 = this._offset, elements2 = [], address5 = true;
          while (address5 !== FAILURE) {
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 !== null && /^[\n\r]/.test(chunk2)) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[\\n\\r]');
              }
            }
            if (address5 !== FAILURE) {
              elements2.push(address5);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address4 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._comment1[index0] = [address0, this._offset];
      return address0;
    },

    _read_comment2: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comment2 = this._cache._comment2 || {};
      var cached = this._cache._comment2[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '/*') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"/*"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[ a-zA-Z0-9_,.;:+!"#¤%&(){}\[\]=\n\r\t]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[ a-zA-Z0-9_,.;:+!"#¤%&(){}\\[\\]=\\n\\r\\t]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 2);
          }
          if (chunk2 === '*/') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
            this._offset = this._offset + 2;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"*/"');
            }
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._comment2[index0] = [address0, this._offset];
      return address0;
    },

    _read_constdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._constdecl = this._cache._constdecl || {};
      var cached = this._cache._constdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      address1 = this._read_const();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_decl();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_eq();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index2 = this._offset;
            address4 = this._read_string();
            if (address4 === FAILURE) {
              this._offset = index2;
              address4 = this._read_ident();
              if (address4 === FAILURE) {
                this._offset = index2;
                address4 = this._read_number();
                if (address4 === FAILURE) {
                  this._offset = index2;
                }
              }
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_eol();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.constdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._constdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_typedefstructdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._typedefstructdecl = this._cache._typedefstructdecl || {};
      var cached = this._cache._typedefstructdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(14);
      var address1 = FAILURE;
      address1 = this._read_typedefstruct();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index2 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index2, index2), index2);
            this._offset = index2;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index3, index3), index3);
              this._offset = index3;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '{') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"{"');
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index4 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index4, index4), index4);
                  this._offset = index4;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_structfields();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index5 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index5, index5), index5);
                      this._offset = index5;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                        chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === '}') {
                        address9 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                        this._offset = this._offset + 1;
                      } else {
                        address9 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push('"}"');
                        }
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index6 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index6, index6), index6);
                          this._offset = index6;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          var index7 = this._offset;
                          address11 = this._read_ident();
                          if (address11 === FAILURE) {
                            address11 = new TreeNode(this._input.substring(index7, index7), index7);
                            this._offset = index7;
                          }
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                            var address12 = FAILURE;
                            var index8 = this._offset;
                            address12 = this._read_ws();
                            if (address12 === FAILURE) {
                              address12 = new TreeNode(this._input.substring(index8, index8), index8);
                              this._offset = index8;
                            }
                            if (address12 !== FAILURE) {
                              elements0[11] = address12;
                              var address13 = FAILURE;
                              address13 = this._read_eol();
                              if (address13 !== FAILURE) {
                                elements0[12] = address13;
                                var address14 = FAILURE;
                                var index9 = this._offset;
                                address14 = this._read_ws();
                                if (address14 === FAILURE) {
                                  address14 = new TreeNode(this._input.substring(index9, index9), index9);
                                  this._offset = index9;
                                }
                                if (address14 !== FAILURE) {
                                  elements0[13] = address14;
                                } else {
                                  elements0 = null;
                                  this._offset = index1;
                                }
                              } else {
                                elements0 = null;
                                this._offset = index1;
                              }
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.typedefstructdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._typedefstructdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_structdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structdecl = this._cache._structdecl || {};
      var cached = this._cache._structdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(12);
      var address1 = FAILURE;
      address1 = this._read_struct();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index2 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index2, index2), index2);
              this._offset = index2;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '{') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"{"');
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index3 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index3, index3), index3);
                  this._offset = index3;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_structfields();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index4 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index4, index4), index4);
                      this._offset = index4;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                        chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === '}') {
                        address9 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                        this._offset = this._offset + 1;
                      } else {
                        address9 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push('"}"');
                        }
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index5 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index5, index5), index5);
                          this._offset = index5;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          address11 = this._read_eol();
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                            var address12 = FAILURE;
                            var index6 = this._offset;
                            address12 = this._read_ws();
                            if (address12 === FAILURE) {
                              address12 = new TreeNode(this._input.substring(index6, index6), index6);
                              this._offset = index6;
                            }
                            if (address12 !== FAILURE) {
                              elements0[11] = address12;
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfields: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfields = this._cache._structfields || {};
      var cached = this._cache._structfields[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index3 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index4 = this._offset;
          address3 = this._read_structfield0();
          if (address3 === FAILURE) {
            this._offset = index4;
            address3 = this._read_structfield1();
            if (address3 === FAILURE) {
              this._offset = index4;
              address3 = this._read_structfield2();
              if (address3 === FAILURE) {
                this._offset = index4;
                address3 = this._read_switch();
                if (address3 === FAILURE) {
                  this._offset = index4;
                }
              }
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var index5 = this._offset;
          address4 = this._read_ws();
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index5, index5), index5);
            this._offset = index5;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._structfields[index0] = [address0, this._offset];
      return address0;
    },

    _read__structfield: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache.__structfield = this._cache.__structfield || {};
      var cached = this._cache.__structfield[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(9);
      var address1 = FAILURE;
      address1 = this._read_decl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(5);
        var address3 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '[') {
          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address3 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"["');
          }
        }
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          var index4 = this._offset;
          address4 = this._read_number();
          if (address4 === FAILURE) {
            this._offset = index4;
            address4 = this._read_ident();
            if (address4 === FAILURE) {
              this._offset = index4;
            }
          }
          if (address4 !== FAILURE) {
            elements1[1] = address4;
            var address5 = FAILURE;
            var chunk1 = null;
            if (this._offset < this._inputSize) {
              chunk1 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk1 === ']') {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"]"');
              }
            }
            if (address5 !== FAILURE) {
              elements1[2] = address5;
              var address6 = FAILURE;
              address6 = this._read_ws();
              if (address6 !== FAILURE) {
                elements1[3] = address6;
                var address7 = FAILURE;
                address7 = this._read_ident();
                if (address7 !== FAILURE) {
                  elements1[4] = address7;
                } else {
                  elements1 = null;
                  this._offset = index3;
                }
              } else {
                elements1 = null;
                this._offset = index3;
              }
            } else {
              elements1 = null;
              this._offset = index3;
            }
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode12(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address8 = FAILURE;
          var index5 = this._offset;
          address8 = this._read_ws();
          if (address8 === FAILURE) {
            address8 = new TreeNode(this._input.substring(index5, index5), index5);
            this._offset = index5;
          }
          if (address8 !== FAILURE) {
            elements0[2] = address8;
            var address9 = FAILURE;
            var index6 = this._offset;
            address9 = this._read_default();
            if (address9 === FAILURE) {
              address9 = new TreeNode(this._input.substring(index6, index6), index6);
              this._offset = index6;
            }
            if (address9 !== FAILURE) {
              elements0[3] = address9;
              var address10 = FAILURE;
              var index7 = this._offset;
              address10 = this._read_ws();
              if (address10 === FAILURE) {
                address10 = new TreeNode(this._input.substring(index7, index7), index7);
                this._offset = index7;
              }
              if (address10 !== FAILURE) {
                elements0[4] = address10;
                var address11 = FAILURE;
                address11 = this._read_eol();
                if (address11 !== FAILURE) {
                  elements0[5] = address11;
                  var address12 = FAILURE;
                  var index8 = this._offset;
                  address12 = this._read_ws();
                  if (address12 === FAILURE) {
                    address12 = new TreeNode(this._input.substring(index8, index8), index8);
                    this._offset = index8;
                  }
                  if (address12 !== FAILURE) {
                    elements0[6] = address12;
                    var address13 = FAILURE;
                    var index9 = this._offset;
                    address13 = this._read_comment1();
                    if (address13 === FAILURE) {
                      address13 = new TreeNode(this._input.substring(index9, index9), index9);
                      this._offset = index9;
                    }
                    if (address13 !== FAILURE) {
                      elements0[7] = address13;
                      var address14 = FAILURE;
                      var index10 = this._offset;
                      address14 = this._read_ws();
                      if (address14 === FAILURE) {
                        address14 = new TreeNode(this._input.substring(index10, index10), index10);
                        this._offset = index10;
                      }
                      if (address14 !== FAILURE) {
                        elements0[8] = address14;
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structfield(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache.__structfield[index0] = [address0, this._offset];
      return address0;
    },

    _read___structfield: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache.___structfield = this._cache.___structfield || {};
      var cached = this._cache.___structfield[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(12);
      var address1 = FAILURE;
      address1 = this._read_decl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_length();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_ws();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index4 = this._offset;
            address4 = this._read_ident();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index4, index4), index4);
              this._offset = index4;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index5 = this._offset;
              address5 = this._read_length();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index5, index5), index5);
                this._offset = index5;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index6 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index6, index6), index6);
                  this._offset = index6;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var index7 = this._offset;
                  address7 = this._read_default();
                  if (address7 === FAILURE) {
                    address7 = new TreeNode(this._input.substring(index7, index7), index7);
                    this._offset = index7;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index8 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index8, index8), index8);
                      this._offset = index8;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      address9 = this._read_eol();
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index9 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index9, index9), index9);
                          this._offset = index9;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          var index10 = this._offset;
                          address11 = this._read_comment1();
                          if (address11 === FAILURE) {
                            address11 = new TreeNode(this._input.substring(index10, index10), index10);
                            this._offset = index10;
                          }
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                            var address12 = FAILURE;
                            var index11 = this._offset;
                            address12 = this._read_ws();
                            if (address12 === FAILURE) {
                              address12 = new TreeNode(this._input.substring(index11, index11), index11);
                              this._offset = index11;
                            }
                            if (address12 !== FAILURE) {
                              elements0[11] = address12;
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structfield(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache.___structfield[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfield0: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfield0 = this._cache._structfield0 || {};
      var cached = this._cache._structfield0[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(10);
      var address1 = FAILURE;
      address1 = this._read_decl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index4 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index4, index4), index4);
              this._offset = index4;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index5 = this._offset;
              address5 = this._read_default();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index5, index5), index5);
                this._offset = index5;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index6 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index6, index6), index6);
                  this._offset = index6;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_eol();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index7 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index7, index7), index7);
                      this._offset = index7;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var index8 = this._offset;
                      address9 = this._read_comment1();
                      if (address9 === FAILURE) {
                        address9 = new TreeNode(this._input.substring(index8, index8), index8);
                        this._offset = index8;
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index9 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index9, index9), index9);
                          this._offset = index9;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structfield0(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfield0[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfield1: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfield1 = this._cache._structfield1 || {};
      var cached = this._cache._structfield1[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(11);
      var address1 = FAILURE;
      address1 = this._read_decl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_length();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index4 = this._offset;
              address5 = this._read_ws();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index4, index4), index4);
                this._offset = index4;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index5 = this._offset;
                address6 = this._read_default();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index5, index5), index5);
                  this._offset = index5;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var index6 = this._offset;
                  address7 = this._read_ws();
                  if (address7 === FAILURE) {
                    address7 = new TreeNode(this._input.substring(index6, index6), index6);
                    this._offset = index6;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    address8 = this._read_eol();
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var index7 = this._offset;
                      address9 = this._read_ws();
                      if (address9 === FAILURE) {
                        address9 = new TreeNode(this._input.substring(index7, index7), index7);
                        this._offset = index7;
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index8 = this._offset;
                        address10 = this._read_comment1();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index8, index8), index8);
                          this._offset = index8;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          var index9 = this._offset;
                          address11 = this._read_ws();
                          if (address11 === FAILURE) {
                            address11 = new TreeNode(this._input.substring(index9, index9), index9);
                            this._offset = index9;
                          }
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structfield1(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfield1[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfield2: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfield2 = this._cache._structfield2 || {};
      var cached = this._cache._structfield2[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(9);
      var address1 = FAILURE;
      address1 = this._read_decl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_length();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index2 = this._offset;
          address3 = this._read_ws();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index2, index2), index2);
            this._offset = index2;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_ident();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index3, index3), index3);
              this._offset = index3;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index4 = this._offset;
              address5 = this._read_ws();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index4, index4), index4);
                this._offset = index4;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                address6 = this._read_eol();
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var index5 = this._offset;
                  address7 = this._read_ws();
                  if (address7 === FAILURE) {
                    address7 = new TreeNode(this._input.substring(index5, index5), index5);
                    this._offset = index5;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index6 = this._offset;
                    address8 = this._read_comment1();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index6, index6), index6);
                      this._offset = index6;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var index7 = this._offset;
                      address9 = this._read_ws();
                      if (address9 === FAILURE) {
                        address9 = new TreeNode(this._input.substring(index7, index7), index7);
                        this._offset = index7;
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.structfield2(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfield2[index0] = [address0, this._offset];
      return address0;
    },

    _read_default: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._default = this._cache._default || {};
      var cached = this._cache._default[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '=') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"="');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_string();
          if (address3 === FAILURE) {
            this._offset = index3;
            address3 = this._read_number();
            if (address3 === FAILURE) {
              this._offset = index3;
              address3 = this._read_hex();
              if (address3 === FAILURE) {
                this._offset = index3;
              }
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._default[index0] = [address0, this._offset];
      return address0;
    },

    _read_aliasdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._aliasdecl = this._cache._aliasdecl || {};
      var cached = this._cache._aliasdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(7);
      var address1 = FAILURE;
      address1 = this._read_alias();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index2 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index2, index2), index2);
              this._offset = index2;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_ident();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index3 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index3, index3), index3);
                  this._offset = index3;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_eol();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.aliasdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._aliasdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_typedefenumdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._typedefenumdecl = this._cache._typedefenumdecl || {};
      var cached = this._cache._typedefenumdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(14);
      var address1 = FAILURE;
      address1 = this._read_typedefenum();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index2 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index2, index2), index2);
            this._offset = index2;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index3, index3), index3);
              this._offset = index3;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '{') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"{"');
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index4 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index4, index4), index4);
                  this._offset = index4;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_enumfields();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index5 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index5, index5), index5);
                      this._offset = index5;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                        chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === '}') {
                        address9 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                        this._offset = this._offset + 1;
                      } else {
                        address9 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push('"}"');
                        }
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index6 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index6, index6), index6);
                          this._offset = index6;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          address11 = this._read_ident();
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                            var address12 = FAILURE;
                            var index7 = this._offset;
                            address12 = this._read_ws();
                            if (address12 === FAILURE) {
                              address12 = new TreeNode(this._input.substring(index7, index7), index7);
                              this._offset = index7;
                            }
                            if (address12 !== FAILURE) {
                              elements0[11] = address12;
                              var address13 = FAILURE;
                              address13 = this._read_eol();
                              if (address13 !== FAILURE) {
                                elements0[12] = address13;
                                var address14 = FAILURE;
                                var index8 = this._offset;
                                address14 = this._read_ws();
                                if (address14 === FAILURE) {
                                  address14 = new TreeNode(this._input.substring(index8, index8), index8);
                                  this._offset = index8;
                                }
                                if (address14 !== FAILURE) {
                                  elements0[13] = address14;
                                } else {
                                  elements0 = null;
                                  this._offset = index1;
                                }
                              } else {
                                elements0 = null;
                                this._offset = index1;
                              }
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.typedefenumdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._typedefenumdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_enumdecl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._enumdecl = this._cache._enumdecl || {};
      var cached = this._cache._enumdecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(12);
      var address1 = FAILURE;
      address1 = this._read_enum();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index2 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index2, index2), index2);
            this._offset = index2;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index3, index3), index3);
              this._offset = index3;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '{') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"{"');
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index4 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index4, index4), index4);
                  this._offset = index4;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_enumfields();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index5 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index5, index5), index5);
                      this._offset = index5;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                        chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === '}') {
                        address9 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                        this._offset = this._offset + 1;
                      } else {
                        address9 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push('"}"');
                        }
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index6 = this._offset;
                        address10 = this._read_ws();
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index6, index6), index6);
                          this._offset = index6;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          address11 = this._read_eol();
                          if (address11 !== FAILURE) {
                            elements0[10] = address11;
                            var address12 = FAILURE;
                            var index7 = this._offset;
                            address12 = this._read_ws();
                            if (address12 === FAILURE) {
                              address12 = new TreeNode(this._input.substring(index7, index7), index7);
                              this._offset = index7;
                            }
                            if (address12 !== FAILURE) {
                              elements0[11] = address12;
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.enumdecl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._enumdecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_enumfields: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._enumfields = this._cache._enumfields || {};
      var cached = this._cache._enumfields[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index3 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          address3 = this._read_enumfield();
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var index4 = this._offset;
          address4 = this._read_ws();
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index4, index4), index4);
            this._offset = index4;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._enumfields[index0] = [address0, this._offset];
      return address0;
    },

    _read_enumfield: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._enumfield = this._cache._enumfield || {};
      var cached = this._cache._enumfield[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(8);
      var address1 = FAILURE;
      address1 = this._read_ident();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_eq();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index2 = this._offset;
          address3 = this._read_string();
          if (address3 === FAILURE) {
            this._offset = index2;
            address3 = this._read_number();
            if (address3 === FAILURE) {
              this._offset = index2;
              address3 = this._read_hex();
              if (address3 === FAILURE) {
                this._offset = index2;
              }
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index3, index3), index3);
              this._offset = index3;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index4 = this._offset;
              address5 = this._read_comma();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index4, index4), index4);
                this._offset = index4;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index5 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index5, index5), index5);
                  this._offset = index5;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var index6 = this._offset;
                  address7 = this._read_comment1();
                  if (address7 === FAILURE) {
                    address7 = new TreeNode(this._input.substring(index6, index6), index6);
                    this._offset = index6;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var index7 = this._offset;
                    address8 = this._read_ws();
                    if (address8 === FAILURE) {
                      address8 = new TreeNode(this._input.substring(index7, index7), index7);
                      this._offset = index7;
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.enumfield(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._enumfield[index0] = [address0, this._offset];
      return address0;
    },

    _read_switch: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._switch = this._cache._switch || {};
      var cached = this._cache._switch[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(14);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 6);
        }
        if (chunk0 === 'switch') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
          this._offset = this._offset + 6;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"switch"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_ws();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var chunk1 = null;
            if (this._offset < this._inputSize) {
              chunk1 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk1 === '(') {
              address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address4 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"("');
              }
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_ident();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var chunk2 = null;
                if (this._offset < this._inputSize) {
                  chunk2 = this._input.substring(this._offset, this._offset + 1);
                }
                if (chunk2 === ')') {
                  address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
                } else {
                  address6 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push('")"');
                  }
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var index4 = this._offset;
                  address7 = this._read_ws();
                  if (address7 === FAILURE) {
                    address7 = new TreeNode(this._input.substring(index4, index4), index4);
                    this._offset = index4;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    var chunk3 = null;
                    if (this._offset < this._inputSize) {
                      chunk3 = this._input.substring(this._offset, this._offset + 1);
                    }
                    if (chunk3 === '{') {
                      address8 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                      this._offset = this._offset + 1;
                    } else {
                      address8 = FAILURE;
                      if (this._offset > this._failure) {
                        this._failure = this._offset;
                        this._expected = [];
                      }
                      if (this._offset === this._failure) {
                        this._expected.push('"{"');
                      }
                    }
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var index5 = this._offset;
                      address9 = this._read_ws();
                      if (address9 === FAILURE) {
                        address9 = new TreeNode(this._input.substring(index5, index5), index5);
                        this._offset = index5;
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var remaining0 = 0, index6 = this._offset, elements1 = [], address11 = true;
                        while (address11 !== FAILURE) {
                          address11 = this._read_case();
                          if (address11 !== FAILURE) {
                            elements1.push(address11);
                            --remaining0;
                          }
                        }
                        if (remaining0 <= 0) {
                          address10 = new TreeNode(this._input.substring(index6, this._offset), index6, elements1);
                          this._offset = this._offset;
                        } else {
                          address10 = FAILURE;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address12 = FAILURE;
                          var index7 = this._offset;
                          address12 = this._read_ws();
                          if (address12 === FAILURE) {
                            address12 = new TreeNode(this._input.substring(index7, index7), index7);
                            this._offset = index7;
                          }
                          if (address12 !== FAILURE) {
                            elements0[10] = address12;
                            var address13 = FAILURE;
                            var chunk4 = null;
                            if (this._offset < this._inputSize) {
                              chunk4 = this._input.substring(this._offset, this._offset + 1);
                            }
                            if (chunk4 === '}') {
                              address13 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                              this._offset = this._offset + 1;
                            } else {
                              address13 = FAILURE;
                              if (this._offset > this._failure) {
                                this._failure = this._offset;
                                this._expected = [];
                              }
                              if (this._offset === this._failure) {
                                this._expected.push('"}"');
                              }
                            }
                            if (address13 !== FAILURE) {
                              elements0[11] = address13;
                              var address14 = FAILURE;
                              address14 = this._read_eol();
                              if (address14 !== FAILURE) {
                                elements0[12] = address14;
                                var address15 = FAILURE;
                                var index8 = this._offset;
                                address15 = this._read_ws();
                                if (address15 === FAILURE) {
                                  address15 = new TreeNode(this._input.substring(index8, index8), index8);
                                  this._offset = index8;
                                }
                                if (address15 !== FAILURE) {
                                  elements0[13] = address15;
                                } else {
                                  elements0 = null;
                                  this._offset = index1;
                                }
                              } else {
                                elements0 = null;
                                this._offset = index1;
                              }
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.switch(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._switch[index0] = [address0, this._offset];
      return address0;
    },

    _read_case: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._case = this._cache._case || {};
      var cached = this._cache._case[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(8);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 4);
        }
        if (chunk0 === 'case') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset);
          this._offset = this._offset + 4;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"case"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ws();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_number();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk1 = null;
              if (this._offset < this._inputSize) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 === ':') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('":"');
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var index3 = this._offset;
                address6 = this._read_ws();
                if (address6 === FAILURE) {
                  address6 = new TreeNode(this._input.substring(index3, index3), index3);
                  this._offset = index3;
                }
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var remaining0 = 1, index4 = this._offset, elements1 = [], address8 = true;
                  while (address8 !== FAILURE) {
                    var index5 = this._offset;
                    address8 = this._read_structfields();
                    if (address8 === FAILURE) {
                      this._offset = index5;
                      address8 = this._read_break();
                      if (address8 === FAILURE) {
                        this._offset = index5;
                      }
                    }
                    if (address8 !== FAILURE) {
                      elements1.push(address8);
                      --remaining0;
                    }
                  }
                  if (remaining0 <= 0) {
                    address7 = new TreeNode(this._input.substring(index4, this._offset), index4, elements1);
                    this._offset = this._offset;
                  } else {
                    address7 = FAILURE;
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address9 = FAILURE;
                    var index6 = this._offset;
                    address9 = this._read_ws();
                    if (address9 === FAILURE) {
                      address9 = new TreeNode(this._input.substring(index6, index6), index6);
                      this._offset = index6;
                    }
                    if (address9 !== FAILURE) {
                      elements0[7] = address9;
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.case(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._case[index0] = [address0, this._offset];
      return address0;
    },

    _read_decl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._decl = this._cache._decl || {};
      var cached = this._cache._decl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_list();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.decl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._decl[index0] = [address0, this._offset];
      return address0;
    },

    _read_list: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._list = this._cache._list || {};
      var cached = this._cache._list[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_ident();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_list();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode24(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._list[index0] = [address0, this._offset];
      return address0;
    },

    _read_length: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._length = this._cache._length || {};
      var cached = this._cache._length[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '[') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"["');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset;
        address2 = this._read_number();
        if (address2 === FAILURE) {
          this._offset = index3;
          address2 = this._read_ident();
          if (address2 === FAILURE) {
            this._offset = index3;
          }
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 === ']') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"]"');
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.length(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._length[index0] = [address0, this._offset];
      return address0;
    },

    _read_alias: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._alias = this._cache._alias || {};
      var cached = this._cache._alias[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 5);
      }
      if (chunk0 === 'alias') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 5);
        this._offset = this._offset + 5;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"alias"');
        }
      }
      this._cache._alias[index0] = [address0, this._offset];
      return address0;
    },

    _read_break: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._break = this._cache._break || {};
      var cached = this._cache._break[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 6);
      }
      if (chunk0 === 'break;') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 6);
        this._offset = this._offset + 6;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"break;"');
        }
      }
      this._cache._break[index0] = [address0, this._offset];
      return address0;
    },

    _read_struct: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._struct = this._cache._struct || {};
      var cached = this._cache._struct[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 6);
      }
      if (chunk0 === 'struct') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 6);
        this._offset = this._offset + 6;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"struct"');
        }
      }
      this._cache._struct[index0] = [address0, this._offset];
      return address0;
    },

    _read_typedefstruct: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._typedefstruct = this._cache._typedefstruct || {};
      var cached = this._cache._typedefstruct[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 14);
      }
      if (chunk0 === 'typedef struct') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 14);
        this._offset = this._offset + 14;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"typedef struct"');
        }
      }
      this._cache._typedefstruct[index0] = [address0, this._offset];
      return address0;
    },

    _read_enum: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._enum = this._cache._enum || {};
      var cached = this._cache._enum[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 4);
      }
      if (chunk0 === 'enum') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 4);
        this._offset = this._offset + 4;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"enum"');
        }
      }
      this._cache._enum[index0] = [address0, this._offset];
      return address0;
    },

    _read_typedefenum: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._typedefenum = this._cache._typedefenum || {};
      var cached = this._cache._typedefenum[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 12);
      }
      if (chunk0 === 'typedef enum') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 12);
        this._offset = this._offset + 12;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"typedef enum"');
        }
      }
      this._cache._typedefenum[index0] = [address0, this._offset];
      return address0;
    },

    _read_const: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._const = this._cache._const || {};
      var cached = this._cache._const[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 5);
      }
      if (chunk0 === 'const') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset);
        this._offset = this._offset + 5;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"const"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._const[index0] = [address0, this._offset];
      return address0;
    },

    _read_eq: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._eq = this._cache._eq || {};
      var cached = this._cache._eq[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === '=') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"="');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_ws();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._eq[index0] = [address0, this._offset];
      return address0;
    },

    _read_eol: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._eol = this._cache._eol || {};
      var cached = this._cache._eol[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === ';') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('";"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._eol[index0] = [address0, this._offset];
      return address0;
    },

    _read_comma: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comma = this._cache._comma || {};
      var cached = this._cache._comma[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_ws();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 === ',') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('","');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._comma[index0] = [address0, this._offset];
      return address0;
    },

    _read_ws: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ws = this._cache._ws || {};
      var cached = this._cache._ws[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== FAILURE) {
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 !== null && /^[\n\r\t ]/.test(chunk0)) {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('[\\n\\r\\t ]');
          }
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._ws[index0] = [address0, this._offset];
      return address0;
    },

    _read_ident: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ident = this._cache._ident || {};
      var cached = this._cache._ident[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 !== null && /^[A-Za-z_]/.test(chunk0)) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('[A-Za-z_]');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[A-Za-z0-9_]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[A-Za-z0-9_]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._ident[index0] = [address0, this._offset];
      return address0;
    },

    _read_string: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._string = this._cache._string || {};
      var cached = this._cache._string[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '"') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"\\""');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[^"]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[^"]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk2 === '"') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"\\""');
            }
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.string(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._string[index0] = [address0, this._offset];
      return address0;
    },

    _read_number: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._number = this._cache._number || {};
      var cached = this._cache._number[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_hex();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_num();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._number[index0] = [address0, this._offset];
      return address0;
    },

    _read_num: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._num = this._cache._num || {};
      var cached = this._cache._num[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var remaining0 = 1, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== FAILURE) {
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 !== null && /^[0-9]/.test(chunk0)) {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('[0-9]');
          }
        }
        if (address2 !== FAILURE) {
          elements1.push(address2);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = FAILURE;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address3 = FAILURE;
        var index3 = this._offset;
        var index4 = this._offset, elements2 = new Array(2);
        var address4 = FAILURE;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '.') {
          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address4 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"."');
          }
        }
        if (address4 !== FAILURE) {
          elements2[0] = address4;
          var address5 = FAILURE;
          var remaining1 = 1, index5 = this._offset, elements3 = [], address6 = true;
          while (address6 !== FAILURE) {
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 !== null && /^[0-9]/.test(chunk2)) {
              address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address6 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[0-9]');
              }
            }
            if (address6 !== FAILURE) {
              elements3.push(address6);
              --remaining1;
            }
          }
          if (remaining1 <= 0) {
            address5 = new TreeNode(this._input.substring(index5, this._offset), index5, elements3);
            this._offset = this._offset;
          } else {
            address5 = FAILURE;
          }
          if (address5 !== FAILURE) {
            elements2[1] = address5;
          } else {
            elements2 = null;
            this._offset = index4;
          }
        } else {
          elements2 = null;
          this._offset = index4;
        }
        if (elements2 === null) {
          address3 = FAILURE;
        } else {
          address3 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
          this._offset = this._offset;
        }
        if (address3 === FAILURE) {
          address3 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
        }
        if (address3 !== FAILURE) {
          elements0[1] = address3;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.number(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._num[index0] = [address0, this._offset];
      return address0;
    },

    _read_hex: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._hex = this._cache._hex || {};
      var cached = this._cache._hex[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '0x') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"0x"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 1, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk1 !== null && /^[0-9a-fA-F]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[0-9a-fA-F]');
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
            --remaining0;
          }
        }
        if (remaining0 <= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.number(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._hex[index0] = [address0, this._offset];
      return address0;
    }
  };

  var Parser = function(input, actions, types) {
    this._input = input;
    this._inputSize = input.length;
    this._actions = actions;
    this._types = types;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };

  Parser.prototype.parse = function() {
    var tree = this._read_content();
    if (tree !== FAILURE && this._offset === this._inputSize) {
      return tree;
    }
    if (this._expected.length === 0) {
      this._failure = this._offset;
      this._expected.push('<EOF>');
    }
    this.constructor.lastError = {offset: this._offset, expected: this._expected};
    throw new SyntaxError(formatError(this._input, this._failure, this._expected));
  };

  var parse = function(input, options) {
    options = options || {};
    var parser = new Parser(input, options.actions, options.types);
    return parser.parse();
  };
  extend(Parser.prototype, Grammar);

  var exported = {Grammar: Grammar, Parser: Parser, parse: parse};

  if (typeof require === 'function' && typeof exports === 'object') {
    extend(exports, exported);
  } else {
    var namespace = typeof this !== 'undefined' ? this : window;
    namespace.TEST2 = exported;
  }
})();
