//= require spec_helper
//= require models/contact

describe("Models.App.Contact", function() {
  beforeEach(function(done) {
    defaultStore = DS.Store.create();
    done();
  });
  afterEach(function() {
    defaultStore.destroy();
  });

  it("is a DS.Model", function() {
    assert.ok(App.Contact);
    assert.ok(DS.Model.detect(App.Contact));
  });

  describe("fullName", function() {
    it("concatenates 'firstName' and 'lastName'", function() {
      var contact = App.Contact.createRecord({
        firstName: 'Dan',
        lastName: 'Gebhardt'
      });

      assert.equal(contact.get('fullName'), 'Dan Gebhardt');
    });

    it("is '(No Name)' if an existing record has neither firstName nor lastName", function() {
      defaultStore.load(App.Contact, { id: 1 });
      var contact = defaultStore.find(App.Contact, 1);
      assert.equal(contact.get('fullName'), '(No Name)');
    });

    it("is '(New Contact)' if a new record has neither firstName nor lastName", function() {
      var contact = App.Contact.createRecord();
      assert.equal(contact.get('fullName'), '(New Contact)');
    });
  });

  describe("gravatar", function() {
    it("uses the correct gravatar url", function() {
      var emailMd5 = MD5('dan@mailinator.com');
      var contact = App.Contact.createRecord({
        email: 'dan@mailinator.com'
      });
      assert.equal(contact.get('gravatar'), "http://www.gravatar.com/avatar/" + emailMd5);
    });
    it("uses an empty string if no email is provided", function() {
      var emailMd5 = MD5('');
      var contact = App.Contact.createRecord();
      assert.equal(contact.get('gravatar'), "http://www.gravatar.com/avatar/" + emailMd5);
    });
  });
});