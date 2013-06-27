//= require integration_test_helper

describe("Adding a Contact", function() {
	describe("Given I click on the add contact button", function(){
    beforeEach(function(){
      visit('/').then(function(){
      	click('.btn');
      });
    });

    it("should display the create contact form", function(){
      find('form legend').text().should.equal("Create Contact"); 
    });

	  describe('When I submit valid information', function(){
	  	beforeEach(function(){
	  		server.respondWith(
	    		"POST",
	    		"/contacts",
	        [
	        	201, 
	        	{ "Content-Type": "application/json" },
	        	JSON.stringify({
	        		"contact": {
	        			"id":25,
	        			"first_name":"User",
	        			"last_name":"Example",
	        			"email":"user@example.com",
	        			"notes":null,
	        			"phone_numbers":[]
	        		}
	        	})
	        ]
	      );

        fillIn('#firstName', 'User');
        fillIn('#lastName', 'Example');
        fillIn('#email' ,'user@example.com');
        click('.btn-primary');
	   	});

	    it("should display my name under the all contacts list", function(){
	      find('.sidebar-nav a').text().should.equal("User Example");
	    });

	    describe("And I click my name", function(){
	      beforeEach(function(){
	        click('.sidebar-nav a');
	      });

	      it("should be on my profile page", function(){
	        find('h2').text().should.equal("User Example");
	      });
    });
	  });
  });
});