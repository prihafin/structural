(function() {
  'use strict';

  var extend = function(destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };

  var formatError = function(input, offset, expected) {
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

  var inherit = function(subclass, parent) {
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
    this['constdecl'] = elements[1];
  };
  inherit(TreeNode1, TreeNode);

  var TreeNode2 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefstructdecl'] = elements[1];
  };
  inherit(TreeNode2, TreeNode);

  var TreeNode3 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['structdecl'] = elements[1];
  };
  inherit(TreeNode3, TreeNode);

  var TreeNode4 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefenumdecl'] = elements[1];
  };
  inherit(TreeNode4, TreeNode);

  var TreeNode5 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['enumdecl'] = elements[1];
  };
  inherit(TreeNode5, TreeNode);

  var TreeNode6 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['comment'] = elements[1];
  };
  inherit(TreeNode6, TreeNode);

  var TreeNode7 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ifndef'] = elements[1];
  };
  inherit(TreeNode7, TreeNode);

  var TreeNode8 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['pragma'] = elements[1];
  };
  inherit(TreeNode8, TreeNode);

  var TreeNode9 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['include'] = elements[1];
  };
  inherit(TreeNode9, TreeNode);

  var TreeNode10 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['sysinclude'] = elements[1];
  };
  inherit(TreeNode10, TreeNode);

  var TreeNode11 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
    this['pragmas'] = elements[2];
  };
  inherit(TreeNode11, TreeNode);

  var TreeNode12 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['space'] = elements[0];
  };
  inherit(TreeNode12, TreeNode);

  var TreeNode13 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['includekw'] = elements[0];
    this['ws'] = elements[1];
    this['dqt'] = elements[4];
    this['filepath'] = elements[3];
  };
  inherit(TreeNode13, TreeNode);

  var TreeNode14 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['includekw'] = elements[0];
    this['ws'] = elements[1];
    this['lt'] = elements[2];
    this['filepath'] = elements[3];
    this['gt'] = elements[4];
  };
  inherit(TreeNode14, TreeNode);

  var TreeNode15 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['const'] = elements[0];
    this['decl'] = elements[1];
    this['eq'] = elements[2];
    this['expression'] = elements[4];
    this['eol'] = elements[5];
  };
  inherit(TreeNode15, TreeNode);

  var TreeNode16 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefstruct'] = elements[0];
    this['ws'] = elements[1];
    this['structfields'] = elements[6];
    this['eol'] = elements[12];
  };
  inherit(TreeNode16, TreeNode);

  var TreeNode17 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['struct'] = elements[0];
    this['ws'] = elements[1];
    this['structfields'] = elements[6];
    this['eol'] = elements[12];
  };
  inherit(TreeNode17, TreeNode);

  var TreeNode18 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
  };
  inherit(TreeNode18, TreeNode);

  var TreeNode19 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[2];
  };
  inherit(TreeNode19, TreeNode);

  var TreeNode20 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['op'] = elements[1];
  };
  inherit(TreeNode20, TreeNode);

  var TreeNode21 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['get'] = elements[0];
    this['lambdaexpr'] = elements[0];
    this['set'] = elements[1];
  };
  inherit(TreeNode21, TreeNode);

  var TreeNode22 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[3];
    this['lambdaexpr'] = elements[7];
  };
  inherit(TreeNode22, TreeNode);

  var TreeNode23 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[2];
    this['ident'] = elements[3];
    this['lambdamath'] = elements[7];
    this['eol'] = elements[9];
  };
  inherit(TreeNode23, TreeNode);

  var TreeNode24 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['structfield_'] = elements[0];
    this['skip'] = elements[1];
  };
  inherit(TreeNode24, TreeNode);

  var TreeNode25 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['type'] = elements[0];
    this['ident'] = elements[2];
    this['default'] = elements[5];
    this['eol'] = elements[7];
  };
  inherit(TreeNode25, TreeNode);

  var TreeNode26 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[3];
  };
  inherit(TreeNode26, TreeNode);

  var TreeNode27 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
  };
  inherit(TreeNode27, TreeNode);

  var TreeNode28 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
  };
  inherit(TreeNode28, TreeNode);

  var TreeNode29 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
  };
  inherit(TreeNode29, TreeNode);

  var TreeNode30 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['eq'] = elements[0];
  };
  inherit(TreeNode30, TreeNode);

  var TreeNode31 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['typedefenum'] = elements[0];
    this['ws'] = elements[1];
    this['enumfields'] = elements[6];
    this['ident'] = elements[10];
    this['eol'] = elements[12];
  };
  inherit(TreeNode31, TreeNode);

  var TreeNode32 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['enum'] = elements[0];
    this['ws'] = elements[1];
    this['enumfields'] = elements[6];
    this['eol'] = elements[10];
  };
  inherit(TreeNode32, TreeNode);

  var TreeNode33 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
    this['eq'] = elements[1];
  };
  inherit(TreeNode33, TreeNode);

  var TreeNode34 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[4];
    this['eol'] = elements[12];
  };
  inherit(TreeNode34, TreeNode);

  var TreeNode35 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[2];
    this['number'] = elements[3];
  };
  inherit(TreeNode35, TreeNode);

  var TreeNode36 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
  };
  inherit(TreeNode36, TreeNode);

  var TreeNode37 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['arithmetic'] = elements[1];
    this['value'] = elements[3];
  };
  inherit(TreeNode37, TreeNode);

  var TreeNode38 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
  };
  inherit(TreeNode38, TreeNode);

  var TreeNode39 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['value'] = elements[0];
  };
  inherit(TreeNode39, TreeNode);

  var TreeNode40 = function(text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['arithmetic'] = elements[1];
    this['value'] = elements[3];
  };
  inherit(TreeNode40, TreeNode);

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
          address3 = this._read_constdecl();
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
            address5 = this._read_typedefstructdecl();
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
              address7 = this._read_structdecl();
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
                address9 = this._read_typedefenumdecl();
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
                  address11 = this._read_enumdecl();
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
                    address13 = this._read_comment();
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
                      address15 = this._read_ifndef();
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
                      var index17 = this._offset, elements8 = new Array(2);
                      var address16 = FAILURE;
                      var index18 = this._offset;
                      address16 = this._read_ws();
                      if (address16 === FAILURE) {
                        address16 = new TreeNode(this._input.substring(index18, index18), index18);
                        this._offset = index18;
                      }
                      if (address16 !== FAILURE) {
                        elements8[0] = address16;
                        var address17 = FAILURE;
                        address17 = this._read_pragma();
                        if (address17 !== FAILURE) {
                          elements8[1] = address17;
                        } else {
                          elements8 = null;
                          this._offset = index17;
                        }
                      } else {
                        elements8 = null;
                        this._offset = index17;
                      }
                      if (elements8 === null) {
                        address1 = FAILURE;
                      } else {
                        address1 = new TreeNode8(this._input.substring(index17, this._offset), index17, elements8);
                        this._offset = this._offset;
                      }
                      if (address1 === FAILURE) {
                        this._offset = index2;
                        var index19 = this._offset, elements9 = new Array(2);
                        var address18 = FAILURE;
                        var index20 = this._offset;
                        address18 = this._read_ws();
                        if (address18 === FAILURE) {
                          address18 = new TreeNode(this._input.substring(index20, index20), index20);
                          this._offset = index20;
                        }
                        if (address18 !== FAILURE) {
                          elements9[0] = address18;
                          var address19 = FAILURE;
                          address19 = this._read_include();
                          if (address19 !== FAILURE) {
                            elements9[1] = address19;
                          } else {
                            elements9 = null;
                            this._offset = index19;
                          }
                        } else {
                          elements9 = null;
                          this._offset = index19;
                        }
                        if (elements9 === null) {
                          address1 = FAILURE;
                        } else {
                          address1 = new TreeNode9(this._input.substring(index19, this._offset), index19, elements9);
                          this._offset = this._offset;
                        }
                        if (address1 === FAILURE) {
                          this._offset = index2;
                          var index21 = this._offset, elements10 = new Array(2);
                          var address20 = FAILURE;
                          var index22 = this._offset;
                          address20 = this._read_ws();
                          if (address20 === FAILURE) {
                            address20 = new TreeNode(this._input.substring(index22, index22), index22);
                            this._offset = index22;
                          }
                          if (address20 !== FAILURE) {
                            elements10[0] = address20;
                            var address21 = FAILURE;
                            address21 = this._read_sysinclude();
                            if (address21 !== FAILURE) {
                              elements10[1] = address21;
                            } else {
                              elements10 = null;
                              this._offset = index21;
                            }
                          } else {
                            elements10 = null;
                            this._offset = index21;
                          }
                          if (elements10 === null) {
                            address1 = FAILURE;
                          } else {
                            address1 = new TreeNode10(this._input.substring(index21, this._offset), index21, elements10);
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

    _read_comment: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comment = this._cache._comment || {};
      var cached = this._cache._comment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_comment1();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_comment2();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._comment[index0] = [address0, this._offset];
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
          if (chunk1 !== null && /^[^\n^\r]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[^\\n^\\r]');
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
          var index3 = this._offset;
          address4 = this._read_ws();
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
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
        address0 = this._actions.comment1(this._input, index1, this._offset, elements0);
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
      var index1 = this._offset, elements0 = new Array(4);
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
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var index4 = this._offset;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 2);
          }
          if (chunk1 === '*/') {
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
          this._offset = index4;
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            if (this._offset < this._inputSize) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('<any char>');
              }
            }
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
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
          var address6 = FAILURE;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 2);
          }
          if (chunk2 === '*/') {
            address6 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
            this._offset = this._offset + 2;
          } else {
            address6 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"*/"');
            }
          }
          if (address6 !== FAILURE) {
            elements0[2] = address6;
            var address7 = FAILURE;
            var index5 = this._offset;
            address7 = this._read_ws();
            if (address7 === FAILURE) {
              address7 = new TreeNode(this._input.substring(index5, index5), index5);
              this._offset = index5;
            }
            if (address7 !== FAILURE) {
              elements0[3] = address7;
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
        address0 = this._actions.comment2(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._comment2[index0] = [address0, this._offset];
      return address0;
    },

    _read_pragma: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._pragma = this._cache._pragma || {};
      var cached = this._cache._pragma[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 7);
      }
      if (chunk0 === '#pragma') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 7), this._offset);
        this._offset = this._offset + 7;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"#pragma"');
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_pragmas();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var remaining0 = 0, index2 = this._offset, elements1 = [], address5 = true;
            while (address5 !== FAILURE) {
              var index3 = this._offset, elements2 = new Array(2);
              var address6 = FAILURE;
              address6 = this._read_space();
              if (address6 !== FAILURE) {
                elements2[0] = address6;
                var address7 = FAILURE;
                var index4 = this._offset;
                address7 = this._read_string();
                if (address7 === FAILURE) {
                  this._offset = index4;
                  address7 = this._read_ident();
                  if (address7 === FAILURE) {
                    this._offset = index4;
                    address7 = this._read_number();
                    if (address7 === FAILURE) {
                      this._offset = index4;
                    }
                  }
                }
                if (address7 !== FAILURE) {
                  elements2[1] = address7;
                } else {
                  elements2 = null;
                  this._offset = index3;
                }
              } else {
                elements2 = null;
                this._offset = index3;
              }
              if (elements2 === null) {
                address5 = FAILURE;
              } else {
                address5 = new TreeNode12(this._input.substring(index3, this._offset), index3, elements2);
                this._offset = this._offset;
              }
              if (address5 !== FAILURE) {
                elements1.push(address5);
                --remaining0;
              }
            }
            if (remaining0 <= 0) {
              address4 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
              this._offset = this._offset;
            } else {
              address4 = FAILURE;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address8 = FAILURE;
              var chunk1 = null;
              if (this._offset < this._inputSize) {
                chunk1 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk1 !== null && /^[\n\r]/.test(chunk1)) {
                address8 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address8 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('[\\n\\r]');
                }
              }
              if (address8 !== FAILURE) {
                elements0[4] = address8;
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
        address0 = this._actions.pragma(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._pragma[index0] = [address0, this._offset];
      return address0;
    },

    _read_pragmas: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._pragmas = this._cache._pragmas || {};
      var cached = this._cache._pragmas[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 12);
      }
      if (chunk0 === 'littleendian') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 12), this._offset);
        this._offset = this._offset + 12;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"littleendian"');
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 9);
        }
        if (chunk1 === 'bigendian') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 9), this._offset);
          this._offset = this._offset + 9;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"bigendian"');
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._pragmas[index0] = [address0, this._offset];
      return address0;
    },

    _read_ifndef: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ifndef = this._cache._ifndef || {};
      var cached = this._cache._ifndef[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 7);
      }
      if (chunk0 === '#ifndef') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 7), this._offset);
        this._offset = this._offset + 7;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"#ifndef"');
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
          if (chunk1 !== null && /^[^\n]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[^\\n]');
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
        address0 = this._actions.null(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._ifndef[index0] = [address0, this._offset];
      return address0;
    },

    _read_filepath: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._filepath = this._cache._filepath || {};
      var cached = this._cache._filepath[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== FAILURE) {
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk0 !== null && /^[\w-.\/]/.test(chunk0)) {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('[\\w-./]');
          }
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._filepath[index0] = [address0, this._offset];
      return address0;
    },

    _read_includekw: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._includekw = this._cache._includekw || {};
      var cached = this._cache._includekw[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 8);
      }
      if (chunk0 === '#include') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 8);
        this._offset = this._offset + 8;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"#include"');
        }
      }
      this._cache._includekw[index0] = [address0, this._offset];
      return address0;
    },

    _read_include: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._include = this._cache._include || {};
      var cached = this._cache._include[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      address1 = this._read_includekw();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_dqt();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_filepath();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_dqt();
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
        address0 = this._actions.include(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._include[index0] = [address0, this._offset];
      return address0;
    },

    _read_sysinclude: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._sysinclude = this._cache._sysinclude || {};
      var cached = this._cache._sysinclude[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      address1 = this._read_includekw();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_lt();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_filepath();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_gt();
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
        address0 = this._actions.sysinclude(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._sysinclude[index0] = [address0, this._offset];
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
      var index1 = this._offset, elements0 = new Array(6);
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
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index2, index2), index2);
              this._offset = index2;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_expression();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                address6 = this._read_eol();
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
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
                          address11 = this._read_idents();
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
      var index1 = this._offset, elements0 = new Array(14);
      var address1 = FAILURE;
      address1 = this._read_struct();
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
                          address11 = this._read_idents();
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
          address3 = this._read_structfield();
          if (address3 === FAILURE) {
            this._offset = index4;
            address3 = this._read_lambdafield();
            if (address3 === FAILURE) {
              this._offset = index4;
              address3 = this._read_switch();
              if (address3 === FAILURE) {
                this._offset = index4;
                address3 = this._read_comment();
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
        address0 = this._actions.structfields(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfields[index0] = [address0, this._offset];
      return address0;
    },

    _read_idents: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._idents = this._cache._idents || {};
      var cached = this._cache._idents[index0];
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
          var remaining0 = 0, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== FAILURE) {
            var index4 = this._offset, elements2 = new Array(3);
            var address5 = FAILURE;
            var chunk0 = null;
            if (this._offset < this._inputSize) {
              chunk0 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk0 === ',') {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('","');
              }
            }
            if (address5 !== FAILURE) {
              elements2[0] = address5;
              var address6 = FAILURE;
              var index5 = this._offset;
              address6 = this._read_ws();
              if (address6 === FAILURE) {
                address6 = new TreeNode(this._input.substring(index5, index5), index5);
                this._offset = index5;
              }
              if (address6 !== FAILURE) {
                elements2[1] = address6;
                var address7 = FAILURE;
                address7 = this._read_ident();
                if (address7 !== FAILURE) {
                  elements2[2] = address7;
                } else {
                  elements2 = null;
                  this._offset = index4;
                }
              } else {
                elements2 = null;
                this._offset = index4;
              }
            } else {
              elements2 = null;
              this._offset = index4;
            }
            if (elements2 === null) {
              address4 = FAILURE;
            } else {
              address4 = new TreeNode19(this._input.substring(index4, this._offset), index4, elements2);
              this._offset = this._offset;
            }
            if (address4 !== FAILURE) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = FAILURE;
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
        address0 = this._actions.idents(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._idents[index0] = [address0, this._offset];
      return address0;
    },

    _read_and: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._and = this._cache._and || {};
      var cached = this._cache._and[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '&') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"&"');
        }
      }
      this._cache._and[index0] = [address0, this._offset];
      return address0;
    },

    _read_shiftl: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._shiftl = this._cache._shiftl || {};
      var cached = this._cache._shiftl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '<<') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"<<"');
        }
      }
      this._cache._shiftl[index0] = [address0, this._offset];
      return address0;
    },

    _read_shiftr: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._shiftr = this._cache._shiftr || {};
      var cached = this._cache._shiftr[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 2);
      }
      if (chunk0 === '>>') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('">>"');
        }
      }
      this._cache._shiftr[index0] = [address0, this._offset];
      return address0;
    },

    _read_logicops: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._logicops = this._cache._logicops || {};
      var cached = this._cache._logicops[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '(') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"("');
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === ')') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('")"');
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk2 === '&') {
            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address0 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"&"');
            }
          }
          if (address0 === FAILURE) {
            this._offset = index1;
            var chunk3 = null;
            if (this._offset < this._inputSize) {
              chunk3 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk3 === '|') {
              address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address0 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"|"');
              }
            }
            if (address0 === FAILURE) {
              this._offset = index1;
              var chunk4 = null;
              if (this._offset < this._inputSize) {
                chunk4 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk4 === '^') {
                address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                this._offset = this._offset + 1;
              } else {
                address0 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"^"');
                }
              }
              if (address0 === FAILURE) {
                this._offset = index1;
                var chunk5 = null;
                if (this._offset < this._inputSize) {
                  chunk5 = this._input.substring(this._offset, this._offset + 1);
                }
                if (chunk5 === '~') {
                  address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
                } else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push('"~"');
                  }
                }
                if (address0 === FAILURE) {
                  this._offset = index1;
                  var chunk6 = null;
                  if (this._offset < this._inputSize) {
                    chunk6 = this._input.substring(this._offset, this._offset + 2);
                  }
                  if (chunk6 === '<<') {
                    address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
                    this._offset = this._offset + 2;
                  } else {
                    address0 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push('"<<"');
                    }
                  }
                  if (address0 === FAILURE) {
                    this._offset = index1;
                    var chunk7 = null;
                    if (this._offset < this._inputSize) {
                      chunk7 = this._input.substring(this._offset, this._offset + 2);
                    }
                    if (chunk7 === '>>') {
                      address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
                      this._offset = this._offset + 2;
                    } else {
                      address0 = FAILURE;
                      if (this._offset > this._failure) {
                        this._failure = this._offset;
                        this._expected = [];
                      }
                      if (this._offset === this._failure) {
                        this._expected.push('">>"');
                      }
                    }
                    if (address0 === FAILURE) {
                      this._offset = index1;
                      var chunk8 = null;
                      if (this._offset < this._inputSize) {
                        chunk8 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk8 === '+') {
                        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                        this._offset = this._offset + 1;
                      } else {
                        address0 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push('"+"');
                        }
                      }
                      if (address0 === FAILURE) {
                        this._offset = index1;
                        var chunk9 = null;
                        if (this._offset < this._inputSize) {
                          chunk9 = this._input.substring(this._offset, this._offset + 1);
                        }
                        if (chunk9 === '-') {
                          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                        } else {
                          address0 = FAILURE;
                          if (this._offset > this._failure) {
                            this._failure = this._offset;
                            this._expected = [];
                          }
                          if (this._offset === this._failure) {
                            this._expected.push('"-"');
                          }
                        }
                        if (address0 === FAILURE) {
                          this._offset = index1;
                          var chunk10 = null;
                          if (this._offset < this._inputSize) {
                            chunk10 = this._input.substring(this._offset, this._offset + 1);
                          }
                          if (chunk10 === '*') {
                            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                            this._offset = this._offset + 1;
                          } else {
                            address0 = FAILURE;
                            if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                            }
                            if (this._offset === this._failure) {
                              this._expected.push('"*"');
                            }
                          }
                          if (address0 === FAILURE) {
                            this._offset = index1;
                            var chunk11 = null;
                            if (this._offset < this._inputSize) {
                              chunk11 = this._input.substring(this._offset, this._offset + 1);
                            }
                            if (chunk11 === '/') {
                              address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                              this._offset = this._offset + 1;
                            } else {
                              address0 = FAILURE;
                              if (this._offset > this._failure) {
                                this._failure = this._offset;
                                this._expected = [];
                              }
                              if (this._offset === this._failure) {
                                this._expected.push('"/"');
                              }
                            }
                            if (address0 === FAILURE) {
                              this._offset = index1;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this._cache._logicops[index0] = [address0, this._offset];
      return address0;
    },

    _read_lambdaexpr: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._lambdaexpr = this._cache._lambdaexpr || {};
      var cached = this._cache._lambdaexpr[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], address1 = true;
      while (address1 !== FAILURE) {
        var index2 = this._offset, elements1 = new Array(3);
        var address2 = FAILURE;
        var index3 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
        }
        if (address2 !== FAILURE) {
          elements1[0] = address2;
          var address3 = FAILURE;
          var index4 = this._offset;
          address3 = this._read_ident();
          if (address3 === FAILURE) {
            this._offset = index4;
            address3 = this._read_number();
            if (address3 === FAILURE) {
              this._offset = index4;
              address3 = this._read_logicops();
              if (address3 === FAILURE) {
                this._offset = index4;
              }
            }
          }
          if (address3 !== FAILURE) {
            elements1[1] = address3;
            var address4 = FAILURE;
            var index5 = this._offset;
            address4 = this._read_ws();
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index5, index5), index5);
              this._offset = index5;
            }
            if (address4 !== FAILURE) {
              elements1[2] = address4;
            } else {
              elements1 = null;
              this._offset = index2;
            }
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1 === null) {
          address1 = FAILURE;
        } else {
          address1 = new TreeNode20(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
          --remaining0;
        }
      }
      if (remaining0 <= 0) {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._lambdaexpr[index0] = [address0, this._offset];
      return address0;
    },

    _read_lambdamath: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._lambdamath = this._cache._lambdamath || {};
      var cached = this._cache._lambdamath[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_lambdaexpr();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(8);
        var address3 = FAILURE;
        var index4 = this._offset;
        address3 = this._read_ws();
        if (address3 === FAILURE) {
          address3 = new TreeNode(this._input.substring(index4, index4), index4);
          this._offset = index4;
        }
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          var chunk0 = null;
          if (this._offset < this._inputSize) {
            chunk0 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk0 === ',') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('","');
            }
          }
          if (address4 !== FAILURE) {
            elements1[1] = address4;
            var address5 = FAILURE;
            var index5 = this._offset;
            address5 = this._read_ws();
            if (address5 === FAILURE) {
              address5 = new TreeNode(this._input.substring(index5, index5), index5);
              this._offset = index5;
            }
            if (address5 !== FAILURE) {
              elements1[2] = address5;
              var address6 = FAILURE;
              address6 = this._read_ident();
              if (address6 !== FAILURE) {
                elements1[3] = address6;
                var address7 = FAILURE;
                var index6 = this._offset;
                address7 = this._read_ws();
                if (address7 === FAILURE) {
                  address7 = new TreeNode(this._input.substring(index6, index6), index6);
                  this._offset = index6;
                }
                if (address7 !== FAILURE) {
                  elements1[4] = address7;
                  var address8 = FAILURE;
                  var chunk1 = null;
                  if (this._offset < this._inputSize) {
                    chunk1 = this._input.substring(this._offset, this._offset + 1);
                  }
                  if (chunk1 === '=') {
                    address8 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                    this._offset = this._offset + 1;
                  } else {
                    address8 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push('"="');
                    }
                  }
                  if (address8 !== FAILURE) {
                    elements1[5] = address8;
                    var address9 = FAILURE;
                    var index7 = this._offset;
                    address9 = this._read_ws();
                    if (address9 === FAILURE) {
                      address9 = new TreeNode(this._input.substring(index7, index7), index7);
                      this._offset = index7;
                    }
                    if (address9 !== FAILURE) {
                      elements1[6] = address9;
                      var address10 = FAILURE;
                      address10 = this._read_lambdaexpr();
                      if (address10 !== FAILURE) {
                        elements1[7] = address10;
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
          address2 = new TreeNode22(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address11 = FAILURE;
          var index8 = this._offset;
          address11 = this._read_ws();
          if (address11 === FAILURE) {
            address11 = new TreeNode(this._input.substring(index8, index8), index8);
            this._offset = index8;
          }
          if (address11 !== FAILURE) {
            elements0[2] = address11;
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
        address0 = new TreeNode21(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._lambdamath[index0] = [address0, this._offset];
      return address0;
    },

    _read_lambdafield: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._lambdafield = this._cache._lambdafield || {};
      var cached = this._cache._lambdafield[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(11);
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
        if (chunk0 === 'lambda') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
          this._offset = this._offset + 6;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"lambda"');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ws();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ident();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var index3 = this._offset;
              address5 = this._read_ws();
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(index3, index3), index3);
                this._offset = index3;
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                var chunk1 = null;
                if (this._offset < this._inputSize) {
                  chunk1 = this._input.substring(this._offset, this._offset + 1);
                }
                if (chunk1 === '=') {
                  address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
                } else {
                  address6 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push('"="');
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
                    address8 = this._read_lambdamath();
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
                        address10 = this._read_eol();
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address11 = FAILURE;
                          var index6 = this._offset;
                          address11 = this._read_ws();
                          if (address11 === FAILURE) {
                            address11 = new TreeNode(this._input.substring(index6, index6), index6);
                            this._offset = index6;
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
        address0 = this._actions.lambdafield(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._lambdafield[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfield: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfield = this._cache._structfield || {};
      var cached = this._cache._structfield[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_structfield_();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_skip();
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
        address0 = this._actions.structfield(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfield[index0] = [address0, this._offset];
      return address0;
    },

    _read_structfield_: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._structfield_ = this._cache._structfield_ || {};
      var cached = this._cache._structfield_[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(11);
      var address1 = FAILURE;
      address1 = this._read_type();
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
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index3 = this._offset;
            address4 = this._read_length();
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
        address0 = this._actions.flatten(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._structfield_[index0] = [address0, this._offset];
      return address0;
    },

    _read_type: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._type = this._cache._type || {};
      var cached = this._cache._type[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_string_type();
      if (address1 === FAILURE) {
        this._offset = index2;
        address1 = this._read_other_type();
        if (address1 === FAILURE) {
          this._offset = index2;
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index3 = this._offset;
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
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
        address0 = this._actions.type(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._type[index0] = [address0, this._offset];
      return address0;
    },

    _read_other_type: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._other_type = this._cache._other_type || {};
      var cached = this._cache._other_type[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(4);
      var address1 = FAILURE;
      var index2 = this._offset;
      address1 = this._read_modifier();
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index3 = this._offset;
        address2 = this._read_modifier();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index3, index3), index3);
          this._offset = index3;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index4 = this._offset;
          address3 = this._read_modifier();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index4, index4), index4);
            this._offset = index4;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ident();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
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
        address0 = this._actions.other_type(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._other_type[index0] = [address0, this._offset];
      return address0;
    },

    _read_modifier: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._modifier = this._cache._modifier || {};
      var cached = this._cache._modifier[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 8);
      }
      if (chunk0 === 'unsigned') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 8), this._offset);
        this._offset = this._offset + 8;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"unsigned"');
        }
      }
      if (address1 === FAILURE) {
        this._offset = index2;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 8);
        }
        if (chunk1 === 'reversed') {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 8), this._offset);
          this._offset = this._offset + 8;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"reversed"');
          }
        }
        if (address1 === FAILURE) {
          this._offset = index2;
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
        address0 = this._actions.modifier(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._modifier[index0] = [address0, this._offset];
      return address0;
    },

    _read_string_type: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._string_type = this._cache._string_type || {};
      var cached = this._cache._string_type[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      var index3 = this._offset, elements1 = new Array(2);
      var address2 = FAILURE;
      var index4 = this._offset;
      address2 = this._read_encoding();
      if (address2 === FAILURE) {
        address2 = new TreeNode(this._input.substring(index4, index4), index4);
        this._offset = index4;
      }
      if (address2 !== FAILURE) {
        elements1[0] = address2;
        var address3 = FAILURE;
        var chunk0 = null;
        if (this._offset < this._inputSize) {
          chunk0 = this._input.substring(this._offset, this._offset + 6);
        }
        if (chunk0 === 'string') {
          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
          this._offset = this._offset + 6;
        } else {
          address3 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"string"');
          }
        }
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
        address1 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
        this._offset = this._offset;
      }
      if (address1 === FAILURE) {
        this._offset = index2;
        var index5 = this._offset, elements2 = new Array(2);
        var address4 = FAILURE;
        var index6 = this._offset;
        address4 = this._read_encoding();
        if (address4 === FAILURE) {
          address4 = new TreeNode(this._input.substring(index6, index6), index6);
          this._offset = index6;
        }
        if (address4 !== FAILURE) {
          elements2[0] = address4;
          var address5 = FAILURE;
          var chunk1 = null;
          if (this._offset < this._inputSize) {
            chunk1 = this._input.substring(this._offset, this._offset + 7);
          }
          if (chunk1 === 'cstring') {
            address5 = new TreeNode(this._input.substring(this._offset, this._offset + 7), this._offset);
            this._offset = this._offset + 7;
          } else {
            address5 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"cstring"');
            }
          }
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
          address1 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
          this._offset = this._offset;
        }
        if (address1 === FAILURE) {
          this._offset = index2;
          var index7 = this._offset, elements3 = new Array(2);
          var address6 = FAILURE;
          var index8 = this._offset;
          address6 = this._read_encoding();
          if (address6 === FAILURE) {
            address6 = new TreeNode(this._input.substring(index8, index8), index8);
            this._offset = index8;
          }
          if (address6 !== FAILURE) {
            elements3[0] = address6;
            var address7 = FAILURE;
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 4);
            }
            if (chunk2 === 'char') {
              address7 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset);
              this._offset = this._offset + 4;
            } else {
              address7 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"char"');
              }
            }
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
            address1 = new TreeNode(this._input.substring(index7, this._offset), index7, elements3);
            this._offset = this._offset;
          }
          if (address1 === FAILURE) {
            this._offset = index2;
          }
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address8 = FAILURE;
        address8 = this._read_ws();
        if (address8 !== FAILURE) {
          elements0[1] = address8;
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
        address0 = this._actions.string_type(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._string_type[index0] = [address0, this._offset];
      return address0;
    },

    _read_encoding: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._encoding = this._cache._encoding || {};
      var cached = this._cache._encoding[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 4);
      }
      if (chunk0 === 'utf8') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset);
        this._offset = this._offset + 4;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"utf8"');
        }
      }
      if (address1 === FAILURE) {
        this._offset = index2;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 5);
        }
        if (chunk1 === 'ascii') {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset);
          this._offset = this._offset + 5;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"ascii"');
          }
        }
        if (address1 === FAILURE) {
          this._offset = index2;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 7);
          }
          if (chunk2 === 'utf16le') {
            address1 = new TreeNode(this._input.substring(this._offset, this._offset + 7), this._offset);
            this._offset = this._offset + 7;
          } else {
            address1 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"utf16le"');
            }
          }
          if (address1 === FAILURE) {
            this._offset = index2;
            var chunk3 = null;
            if (this._offset < this._inputSize) {
              chunk3 = this._input.substring(this._offset, this._offset + 4);
            }
            if (chunk3 === 'ucs2') {
              address1 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset);
              this._offset = this._offset + 4;
            } else {
              address1 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"ucs2"');
              }
            }
            if (address1 === FAILURE) {
              this._offset = index2;
              var chunk4 = null;
              if (this._offset < this._inputSize) {
                chunk4 = this._input.substring(this._offset, this._offset + 6);
              }
              if (chunk4 === 'base64') {
                address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
                this._offset = this._offset + 6;
              } else {
                address1 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push('"base64"');
                }
              }
              if (address1 === FAILURE) {
                this._offset = index2;
                var chunk5 = null;
                if (this._offset < this._inputSize) {
                  chunk5 = this._input.substring(this._offset, this._offset + 6);
                }
                if (chunk5 === 'latin1') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
                  this._offset = this._offset + 6;
                } else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push('"latin1"');
                  }
                }
                if (address1 === FAILURE) {
                  this._offset = index2;
                  var chunk6 = null;
                  if (this._offset < this._inputSize) {
                    chunk6 = this._input.substring(this._offset, this._offset + 6);
                  }
                  if (chunk6 === 'binary') {
                    address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset);
                    this._offset = this._offset + 6;
                  } else {
                    address1 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push('"binary"');
                    }
                  }
                  if (address1 === FAILURE) {
                    this._offset = index2;
                    var chunk7 = null;
                    if (this._offset < this._inputSize) {
                      chunk7 = this._input.substring(this._offset, this._offset + 3);
                    }
                    if (chunk7 === 'hex') {
                      address1 = new TreeNode(this._input.substring(this._offset, this._offset + 3), this._offset);
                      this._offset = this._offset + 3;
                    } else {
                      address1 = FAILURE;
                      if (this._offset > this._failure) {
                        this._failure = this._offset;
                        this._expected = [];
                      }
                      if (this._offset === this._failure) {
                        this._expected.push('"hex"');
                      }
                    }
                    if (address1 === FAILURE) {
                      this._offset = index2;
                      address1 = this._read_value();
                      if (address1 === FAILURE) {
                        this._offset = index2;
                      }
                    }
                  }
                }
              }
            }
          }
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
        address0 = this._actions.encoding(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._encoding[index0] = [address0, this._offset];
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
      address1 = this._read_eq();
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
                address3 = this._read_ident();
                if (address3 === FAILURE) {
                  this._offset = index3;
                }
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
        address0 = this._actions.default(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._default[index0] = [address0, this._offset];
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
      var remaining0 = 1, index2 = this._offset, elements1 = [], address2 = true;
      while (address2 !== FAILURE) {
        address2 = this._read_maybearray();
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
        address3 = this._read_ws();
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
        address0 = this._actions.decl(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._decl[index0] = [address0, this._offset];
      return address0;
    },

    _read_maybearray: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._maybearray = this._cache._maybearray || {};
      var cached = this._cache._maybearray[index0];
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
        address0 = this._actions.maybearray(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._maybearray[index0] = [address0, this._offset];
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
      var index1 = this._offset, elements0 = new Array(6);
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
        address2 = this._read_ws();
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var index3 = this._offset;
          address3 = this._read_value();
          if (address3 === FAILURE) {
            address3 = new TreeNode(this._input.substring(index3, index3), index3);
            this._offset = index3;
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index4 = this._offset;
            var index5 = this._offset, elements1 = new Array(4);
            var address5 = FAILURE;
            var index6 = this._offset;
            address5 = this._read_ws();
            if (address5 === FAILURE) {
              address5 = new TreeNode(this._input.substring(index6, index6), index6);
              this._offset = index6;
            }
            if (address5 !== FAILURE) {
              elements1[0] = address5;
              var address6 = FAILURE;
              address6 = this._read_arithmetic();
              if (address6 !== FAILURE) {
                elements1[1] = address6;
                var address7 = FAILURE;
                var index7 = this._offset;
                address7 = this._read_ws();
                if (address7 === FAILURE) {
                  address7 = new TreeNode(this._input.substring(index7, index7), index7);
                  this._offset = index7;
                }
                if (address7 !== FAILURE) {
                  elements1[2] = address7;
                  var address8 = FAILURE;
                  address8 = this._read_value();
                  if (address8 !== FAILURE) {
                    elements1[3] = address8;
                  } else {
                    elements1 = null;
                    this._offset = index5;
                  }
                } else {
                  elements1 = null;
                  this._offset = index5;
                }
              } else {
                elements1 = null;
                this._offset = index5;
              }
            } else {
              elements1 = null;
              this._offset = index5;
            }
            if (elements1 === null) {
              address4 = FAILURE;
            } else {
              address4 = new TreeNode37(this._input.substring(index5, this._offset), index5, elements1);
              this._offset = this._offset;
            }
            if (address4 === FAILURE) {
              address4 = new TreeNode(this._input.substring(index4, index4), index4);
              this._offset = index4;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address9 = FAILURE;
              var index8 = this._offset;
              address9 = this._read_ws();
              if (address9 === FAILURE) {
                address9 = new TreeNode(this._input.substring(index8, index8), index8);
                this._offset = index8;
              }
              if (address9 !== FAILURE) {
                elements0[4] = address9;
                var address10 = FAILURE;
                var chunk1 = null;
                if (this._offset < this._inputSize) {
                  chunk1 = this._input.substring(this._offset, this._offset + 1);
                }
                if (chunk1 === ']') {
                  address10 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
                } else {
                  address10 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push('"]"');
                  }
                }
                if (address10 !== FAILURE) {
                  elements0[5] = address10;
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
        address0 = this._actions.length(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._length[index0] = [address0, this._offset];
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
        address0 = this._actions.typestr(this._input, this._offset, this._offset + 6);
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
        address0 = this._actions.typestr(this._input, this._offset, this._offset + 14);
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
        address0 = this._actions.eq(this._input, index1, this._offset, elements0);
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
        address0 = this._actions.eol(this._input, index1, this._offset, elements0);
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
        address0 = this._actions.comma(this._input, index1, this._offset, elements0);
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

    _read_space: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._space = this._cache._space || {};
      var cached = this._cache._space[index0];
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
        if (chunk0 !== null && /^[\t ]/.test(chunk0)) {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('[\\t ]');
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
      this._cache._space[index0] = [address0, this._offset];
      return address0;
    },

    _read_qt: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._qt = this._cache._qt || {};
      var cached = this._cache._qt[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '\'') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 1);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"\'"');
        }
      }
      this._cache._qt[index0] = [address0, this._offset];
      return address0;
    },

    _read_dqt: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._dqt = this._cache._dqt || {};
      var cached = this._cache._dqt[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '"') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 1);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('\'"\'');
        }
      }
      this._cache._dqt[index0] = [address0, this._offset];
      return address0;
    },

    _read_lt: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._lt = this._cache._lt || {};
      var cached = this._cache._lt[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '<') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 1);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('\'<\'');
        }
      }
      this._cache._lt[index0] = [address0, this._offset];
      return address0;
    },

    _read_gt: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._gt = this._cache._gt || {};
      var cached = this._cache._gt[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '>') {
        address0 = this._actions.null(this._input, this._offset, this._offset + 1);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('\'>\'');
        }
      }
      this._cache._gt[index0] = [address0, this._offset];
      return address0;
    },

    _read_skip: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._skip = this._cache._skip || {};
      var cached = this._cache._skip[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 0);
      }
      if (chunk0 === '') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 0), this._offset);
        this._offset = this._offset + 0;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('\'\'');
        }
      }
      this._cache._skip[index0] = [address0, this._offset];
      return address0;
    },

    _read_value: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._value = this._cache._value || {};
      var cached = this._cache._value[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_string();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_ident();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_number();
          if (address0 === FAILURE) {
            this._offset = index1;
          }
        }
      }
      this._cache._value[index0] = [address0, this._offset];
      return address0;
    },

    _read_arithmetic: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._arithmetic = this._cache._arithmetic || {};
      var cached = this._cache._arithmetic[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '+') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"+"');
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 === '-') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('"-"');
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          var chunk2 = null;
          if (this._offset < this._inputSize) {
            chunk2 = this._input.substring(this._offset, this._offset + 1);
          }
          if (chunk2 === '*') {
            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address0 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('"*"');
            }
          }
          if (address0 === FAILURE) {
            this._offset = index1;
            var chunk3 = null;
            if (this._offset < this._inputSize) {
              chunk3 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk3 === '/') {
              address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address0 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('"/"');
              }
            }
            if (address0 === FAILURE) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._arithmetic[index0] = [address0, this._offset];
      return address0;
    },

    _read_expression: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._expression = this._cache._expression || {};
      var cached = this._cache._expression[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_value();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
        while (address3 !== FAILURE) {
          var index3 = this._offset, elements2 = new Array(4);
          var address4 = FAILURE;
          var index4 = this._offset;
          address4 = this._read_ws();
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index4, index4), index4);
            this._offset = index4;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_arithmetic();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
              var address6 = FAILURE;
              var index5 = this._offset;
              address6 = this._read_ws();
              if (address6 === FAILURE) {
                address6 = new TreeNode(this._input.substring(index5, index5), index5);
                this._offset = index5;
              }
              if (address6 !== FAILURE) {
                elements2[2] = address6;
                var address7 = FAILURE;
                address7 = this._read_value();
                if (address7 !== FAILURE) {
                  elements2[3] = address7;
                } else {
                  elements2 = null;
                  this._offset = index3;
                }
              } else {
                elements2 = null;
                this._offset = index3;
              }
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode40(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
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
        address0 = new TreeNode39(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._expression[index0] = [address0, this._offset];
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
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      var chunk0 = null;
      if (this._offset < this._inputSize) {
        chunk0 = this._input.substring(this._offset, this._offset + 1);
      }
      if (chunk0 === '*') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"*"');
        }
      }
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk1 = null;
        if (this._offset < this._inputSize) {
          chunk1 = this._input.substring(this._offset, this._offset + 1);
        }
        if (chunk1 !== null && /^[A-Za-z_]/.test(chunk1)) {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push('[A-Za-z_]');
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var remaining0 = 0, index3 = this._offset, elements1 = [], address4 = true;
          while (address4 !== FAILURE) {
            var chunk2 = null;
            if (this._offset < this._inputSize) {
              chunk2 = this._input.substring(this._offset, this._offset + 1);
            }
            if (chunk2 !== null && /^[A-Za-z0-9_]/.test(chunk2)) {
              address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
              this._offset = this._offset + 1;
            } else {
              address4 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push('[A-Za-z0-9_]');
              }
            }
            if (address4 !== FAILURE) {
              elements1.push(address4);
              --remaining0;
            }
          }
          if (remaining0 <= 0) {
            address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
            this._offset = this._offset;
          } else {
            address3 = FAILURE;
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
        address0 = this._actions.ident(this._input, index1, this._offset, elements0);
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
      address0 = this._read_bin();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_hex();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_num();
          if (address0 === FAILURE) {
            this._offset = index1;
          }
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
    },

    _read_bin: function() {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._bin = this._cache._bin || {};
      var cached = this._cache._bin[index0];
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
      if (chunk0 === '0b') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset);
        this._offset = this._offset + 2;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push('"0b"');
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
          if (chunk1 !== null && /^[01]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push('[01]');
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
      this._cache._bin[index0] = [address0, this._offset];
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
