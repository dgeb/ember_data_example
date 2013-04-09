#= require test_helper

describe("Adding a Contact", function() {
  describe("Given I click on the add contact button", function(){
    beforeEach(function(done){
      Ember.run(function(){
        $('#add-contact.btn').click();
        done();
      });
    });

    it("should display the create contact form", function(){
      assert.equal($('form legend').text(), "Create Contact"); 
    });

    describe('When I submit valid information', function(){
      beforeEach(function(done){
        Ember.run(function(){
          $('#firstName').val('User').focusout();
          $('#lastName').val('Example').focusout();
          $('#email').val('user@example.com').focusout();
          $('form').submit();
          done();
        });
      });

      it("should display my name under the all contacts list", function(){
        assert.equal($('.sidebar-nav').find('a').text(), "User Example");
      });

      describe("And I click my name", function(){
        beforeEach(function(done){
          Ember.run(function(){
            $('.sidebar-nav').find('a').click();
            done();
          });
        });

        it("should be on my profile page", function(){
          assert.equal($('h2').text(), "User Example");
        });
      });
    });
  });
});
