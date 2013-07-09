//= require test_helper

describe("Models: App.Contact", function() {
  var store, contact;

  beforeEach(function() {
    store = lookupStore();
  });

  it("is a DS.Model", function() {
    assert.ok(App.Contact);
    assert.ok(DS.Model.detect(App.Contact));
  });

  describe("fullName", function() {
    it("concatenates 'firstName' and 'lastName'", function() {
      Ember.run(function() {
        contact = App.Contact.createRecord({
          firstName: 'Joe',
          lastName: 'Blow'
        });
      })
      assert.equal(contact.get('fullName'), 'Joe Blow');
    });

    it("is '(No Name)' if an existing record has neither firstName nor lastName", function() {
      Ember.run(function() {
        store.load(App.Contact, {id: 1});
        contact = App.Contact.find(1);
      });
      assert.equal(contact.get('fullName'), '(No Name)');
    });

    it("is '(New Contact)' if a new record has neither firstName nor lastName", function() {
      Ember.run(function() {
        contact = App.Contact.createRecord();
      });
      assert.equal(contact.get('fullName'), '(New Contact)');
    });
  });

  describe("gravatar", function() {
    it("uses the correct gravatar url", function() {
      Ember.run(function() {
        contact = App.Contact.createRecord({
          email: 'joe.blow@example.com'
        });
      });
      var emailMd5 = MD5('joe.blow@example.com');
      assert.equal(contact.get('gravatar'), "http://www.gravatar.com/avatar/" + emailMd5);
    });

    it("uses an empty string if no email is provided", function() {
      Ember.run(function() {
        contact = App.Contact.createRecord();
      });
      var emailMd5 = MD5('');
      assert.equal(contact.get('gravatar'), "http://www.gravatar.com/avatar/" + emailMd5);
    });
  });
});