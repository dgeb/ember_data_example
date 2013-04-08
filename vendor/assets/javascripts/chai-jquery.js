(function (chaiJquery) {
  // Module systems magic dance.
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = chaiJquery;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return chaiJquery;
    });
  } else {
    // Other environment (usually <script> tag): pass into global chai
    var global = (false || eval)("this");
    global.chai.use(chaiJquery);
  }
}(function (chai) {
  var inspect = chai.inspect;

  jQuery.fn.inspect = function (depth) {
    var el = jQuery('<div />').append(this.clone());
    if (depth) {
      var children = el.children();
      while (depth-- > 0)
        children = children.children();
      children.html('...');
    }
    return el.html();
  };

  chai.Assertion.prototype.attr = function (name, val) {
    var actual = this.obj.attr(name);

    if (!this.negate || undefined === val) {
      this.assert(
          undefined !== actual
        , 'expected ' + this.inspect + ' to have a ' + inspect(name) + ' attribute'
        , 'expected ' + this.inspect + ' not to have a ' + inspect(name) + ' attribute');
    }

    if (undefined !== val) {
      this.assert(
          val === actual
        , 'expected ' + this.inspect + ' to have a ' + inspect(name) + ' attribute with the value ' +
            inspect(val) + ', but the value was ' + inspect(actual)
        , 'expected ' + this.inspect + ' not to have a ' + inspect(name) + ' attribute with the value ' +
            inspect(val));
    }

    this.obj = actual;
    return this;
  };

  chai.Assertion.prototype.data = function (name, val) {
    // Work around a chai bug (https://github.com/logicalparadox/chai/issues/16)
    if (this.negate && undefined !== val && undefined === this.obj.data(name)) {
      return this;
    }

    var assertion = new chai.Assertion(this.obj.data());
    if (this.negate)
      assertion = assertion.not;
    return assertion.property(name, val);
  };

  chai.Assertion.prototype.class = function (className) {
    this.assert(
        this.obj.hasClass(className)
      , 'expected ' + this.inspect + ' to have class ' + inspect(className)
      , 'expected ' + this.inspect + ' not to have class ' + inspect(className));
    return this;
  };

  chai.Assertion.prototype.id = function (id) {
    this.assert(
        this.obj.attr('id') === id
      , 'expected ' + this.inspect + ' to have id ' + inspect(id)
      , 'expected ' + this.inspect + ' not to have id ' + inspect(id));
    return this;
  };

  chai.Assertion.prototype.html = function (html) {
    this.assert(
        this.obj.html() === html
      , 'expected ' + this.inspect + ' to have HTML ' + inspect(html)
      , 'expected ' + this.inspect + ' not to have HTML ' + inspect(html));
    return this;
  };

  chai.Assertion.prototype.text = function (text) {
    this.assert(
        this.obj.text() === text
      , 'expected ' + this.inspect + ' to have text ' + inspect(text)
      , 'expected ' + this.inspect + ' not to have text ' + inspect(text));
    return this;
  };

  chai.Assertion.prototype.value = function (value) {
    this.assert(
        this.obj.val() === value
      , 'expected ' + this.inspect + ' to have value ' + inspect(value)
      , 'expected ' + this.inspect + ' not to have value ' + inspect(value));
    return this;
  };

  jQuery.each(['visible', 'hidden', 'selected', 'checked', 'disabled'], function (i, attr) {
    Object.defineProperty(chai.Assertion.prototype, attr, {
      get: function () {
        this.assert(
            this.obj.is(':' + attr)
          , 'expected ' + this.inspect + ' to be ' + attr
          , 'expected ' + this.inspect + ' not to be ' + attr);
        return this;
      },
      configurable: true
    });
  });

  function override(name, getter) {
    var _super = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, name);
    Object.defineProperty(chai.Assertion.prototype, name, {
      get: getter(_super.get),
      configurable: true
    });
  }

  override('exist', function (_super) {
    return function () {
      if (this.obj instanceof jQuery) {
        this.assert(
            this.obj.length > 0
          , 'expected ' + inspect(this.obj.selector) + ' to exist'
          , 'expected ' + inspect(this.obj.selector) + ' not to exist');
        return this;
      } else {
        return _super.call(this);
      }
    };
  });

  override('be', function (_super) {
    return function () {
      var be = function (selector) {
        if (this.obj instanceof jQuery) {
          this.assert(
              this.obj.is(selector)
            , 'expected ' + this.inspect + ' to be ' + inspect(selector)
            , 'expected ' + this.inspect + ' not to be ' + inspect(selector));
          return this;
        } else {
          return _super.call(this);
        }
      };
      be.__proto__ = this;
      return be;
    }
  });

  var match = chai.Assertion.prototype.match;
  chai.Assertion.prototype.match = function (selector) {
    if (this.obj instanceof jQuery) {
      this.assert(
          this.obj.is(selector)
        , 'expected ' + this.inspect + ' to match ' + inspect(selector)
        , 'expected ' + this.inspect + ' not to match ' + inspect(selector));
      return this;
    } else {
      return match.call(this, selector);
    }
  };

  override('contain', function (_super) {
    return function () {
      _super.call(this);
      var contain = function (selector) {
        if (this.obj instanceof jQuery) {
          this.assert(
              this.obj.find(selector).length > 0
            , 'expected ' + this.inspect + ' to contain ' + inspect(selector)
            , 'expected ' + this.inspect + ' not to contain ' + inspect(selector));
          return this;
        }
      };
      contain.__proto__ = this;
      return contain;
    }
  });
}));

