//= require test_helper

describe("Handlebars", function() {
  var view;

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