var assert = require('assert');
var request = require('supertest');
var request2 = require('supertest');

request = request("http://team-sord.github.io/SORDGuardiansJ/");
request2 = request2("http://content.guardianapis.com");
// Example of a Basic test using Mocha and Supertest.

describe("When a user goes to the home page", function() {
	it("should return status code 200 OK", function(done) {
		request.get("/")
		.expect(200, done);
	});

	it("should find href link"), function( done ){
		request.get("/#uk-news-accordion")
		.expect(200,done);
	};

	it("should contain the heading 'Guardian News'", function(done) {
    		request.get("/")
    		.expect(/Guardian News/, done);
	});

	it("should contain the three tabs 'UK-News', 'Football', 'Travel'", function(done) {
		console.log( 'log');
    	checkDefaultTabsPresent();
		
		function checkDefaultTabsPresent() {
		    request
		        .get('/')
		        .expect(/UK News/, checkFootballTab);
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



//describe( "Check Guardian API calls returns JSON", function() {	



	it('respond with json from UK News, Football and Travel API Calls', function(done){
		testAPICalls();

		function testAPICalls(){
			request2
		      .get('/search?section=uk-news&api-key=kxna6pxmdg7q35pjvhhkh2m9')
		      //.set('Accept', 'application/json')
		      .expect('Content-Type', /json/)
		      //.expect(200, done );
		      .expect(200, testFootballAPICall());
		}
		function testFootballAPICall() {
			request2
				.get('/search?section=football&order-by=newest&show-fields=all&api-key=test')
				.expect('Content-Type', /json/)
				.expect(200, testTravelAPICall());
				//.expect(200, done);
		}
		function testTravelAPICall(){
			request2
				.get('/search?section=travel&order-by=newest&show-fields=all&api-key=test')
				.expect('Content-Type', /json/)
				.expect(200, done );
		}
		
  	});

  });

 