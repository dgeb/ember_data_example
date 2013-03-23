// set the Mocha test interface
// see http://visionmedia.github.com/mocha/#interfaces
mocha.ui('bdd');

// ignore the following globals during leak detection
mocha.globals(['Ember', 'DS', 'App', 'MD5']);

// set slow test timeout in ms
mocha.timeout(5);

// Show stack trace on failing assertion.
chai.Assertion.includeStack = true;

ENV = {
  TESTING: true
};
