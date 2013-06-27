(function() {
  var done, doneTimeout, countAsync, emberBdd;

  done = null;
  doneTimeout = null;
  isAsync = false;

  Ember.Test.MochaAdapter = Ember.Test.Adapter.extend({
    init: function() {
      this._super();
      window.Mocha.interfaces['ember-bdd'] = emberBdd;
      window.mocha.ui('ember-bdd');
    },
    asyncStart: function() {
      isAsync = true;
      clearTimeout(doneTimeout);
    },
    asyncEnd: function() {
      isAsync = false;
      if (done) {
        doneTimeout = setTimeout(function() {
          var d = done;
          done = null;
          d();
        });
      }
    },
    exception: function(reason) {
      var error, d;

      error = new Error(reason);
      if (done) {
        d = done;
        done = null;
        d(error);
      } else {
        setTimeout(function() {
          throw error;
        });
      }
    }
  });


  function fixAsync(suites, methodName) {
    return function(fn) {
      if (fn.length === 1) {
        suites[0][methodName](fn);
      } else {
        suites[0][methodName](function(d) {
          invoke(this, fn, d);
        });
      }
    };
  }

  function invoke(context, fn, d) {
    done = d;
    fn.call(context);
    if (!isAsync) {
      done = null;
      d();
    }
  }


  /**
    ember-bdd mocha interface.
    This interface allows
    the Ember.js tester
    to forget about sync / async
    and treat all tests the same.

    This interface, along with the adapter
    will take care of handling sync vs async
  */

  emberBdd = function(suite) {
    var suites = [suite];

    suite.on('pre-require', function(context, file, mocha) {

      context.before = fixAsync(suites, 'beforeAll');

      context.after = fixAsync(suites, 'afterAll');

      context.beforeEach = fixAsync(suites, 'beforeEach');

      context.afterEach = fixAsync(suites, 'afterEach');


      context.it = context.specify = function(title, fn){
        var suite = suites[0], test;
        if (suite.pending) {
          fn = null;
        }
        if (!fn || fn.length === 1) {
          test = new Mocha.Test(title, fn);
        } else {
          var method = function(d) {
            invoke(this, fn, d);
          };
          method.toString = function() {
            return fn.toString();
          }
          test = new Mocha.Test(title, method);
        }
        suite.addTest(test);
        return test;
      };

      context.describe = context.context = function(title, fn){
        var suite = Mocha.Suite.create(suites[0], title);
        suites.unshift(suite);
        fn.call(suite);
        suites.shift();
        return suite;
      };

      context.xdescribe =
      context.xcontext =
      context.describe.skip = function(title, fn){
        var suite = Mocha.Suite.create(suites[0], title);
        suite.pending = true;
        suites.unshift(suite);
        fn.call(suite);
        suites.shift();
      };

      context.describe.only = function(title, fn){
        var suite = context.describe(title, fn);
        mocha.grep(suite.fullTitle());
      };


      context.it.only = function(title, fn){
        var test = context.it(title, fn);
        mocha.grep(test.fullTitle());
      };


      context.xit =
      context.xspecify =
      context.it.skip = function(title){
        context.it(title);
      };


    });

  };


}());
