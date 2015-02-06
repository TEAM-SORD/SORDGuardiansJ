var assert = require('assert');
var request= require('supertest');

request = request("http://team-sord.github.io/SORDGuardiansJ/");

// Example of a Basic test using Mocha and Supertest.
describe("When a user goes to the home page", function() {
	it("should return status code 200 OK", function(done) {
		request.get("/")
		.expect(200, done);
	});

	it("should contain the heading 'Guardian News.'", function(done) {
    		request.get("/")
    		.expect(/Guardian News/, done);
	});

	it("should contain the three tabs 'UK-News', 'Football', 'Travel'", function(done) {
    		checkDefaultTabsPresent();
    		
    		
	});




	function checkDefaultTabsPresent() {
	    request
	        .get('/')
	        .expect(/UK-News/, checkFootballTab);
	}

	function checkFootballTab(err) {
	    if (err) done(err);
	    request
	        .get('/')
	        .expect(/Football/, checkTravelTab);
	}

	function checkTravelTab(err) {
	    if (err) done(err);
	    request
	        .get('/')
	        .expect(/Travel/, done);
	}

});