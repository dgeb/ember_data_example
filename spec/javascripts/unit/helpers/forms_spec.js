//= require spec_helper
//= require helpers/forms

describe("Handlerbars", function() {
  var view;
  var appendView = function(view) {
    Ember.run(function() {
      view.append('#konacha');
    });
  };

  describe("submitButton", function() {
    it("is registered as helper", function() {
      assert.ok(Handlebars.helpers.submitButton);
    });
    it("renders a <button>", function() {
      view = Ember.View.create({
        template: Ember.Handlebars.compile('{{submitButton "hello"}}')
      });
      appendView(view);

      assert.equal( view.$().html(), '<button type="submit" class="btn btn-primary">hello</button>' );
    });
  });
});