var assert = require('assert');
var request= require('supertest');

request = request("http://team-sord.github.io/SORDGuardiansJ/");

// Example of a Basic test using Mocha and Supertest.
describe("When a user goes to the home page", function() {
	it("should return status code 200 OK", function(done) {
		request.get("/")
		.expect(200, done);
	});

	it("should contain the text 'Guardian News.'", function(done) {
    		request.get("/")
    		.expect(/Guardian News/, done);
	});

});
