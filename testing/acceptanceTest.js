var assert = require('assert');
//var shoul//d = require
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

	it("should contain the heading 'Guardian'", function(done) {
    		request.get("/")
    		.expect(/Guardian/, done);
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

});

// USER STORY: I WOULD LIKE TO SEE THE MOST RECENT ARTICLES ON THE 3 SECTIONS
describe( "Check Guardian API calls returns JSON", function() {	

	it('respond with json from UK News, Football and Travel API Calls', function(done){
		testAPICalls();

		function testAPICalls(){
			request2
		      .get('/search?section=uk-news&order-by=newest&api-key=test')
		      //.set('Accept', 'application/json')
		      .expect('Content-Type', /json/)
		      //.expect(200, done );
		      .expect(200, testFootballAPICall());
		}
		function testFootballAPICall() {
			request2
				.get('/search?section=football&order-by=newest&api-key=test')
				.expect('Content-Type', /json/)
				.expect(200, testTravelAPICall());
				//.expect(200, done);
		}
		function testTravelAPICall(){
			request2
				.get('/search?section=travel&order-by=newest&api-key=test')
				.expect('Content-Type', /json/)
				.expect(200, done );
		}		
  	});


	//  USER STORY: AS A USER I WOULD LIKE TO SEE AT LEAST 5 ARTICLES PER SECTION

	it("UK News should have at least 5 articles", function(done) {
      	request2
      		.get('/search?section=uk-news&order-by=newest&api-key=test')
          	.expect(function(res){
            	assert.equal(res.body.response.status, 'ok');
          	})
          	.expect(function(res){
            	assert.equal(res.body.response.pageSize >= 5, true);
          	})
          .end(done);
  	});

  	it("Football should have at least 5 articles", function(done) {
      	request2
      		.get('/search?section=football&order-by=newest&api-key=test')
          	.expect(function(res){
            	assert.equal(res.body.response.status, 'ok');
          	})
          	.expect(function(res){
            	assert.equal(res.body.response.pageSize >= 5, true);
          	})
          .end(done);
  	});

  	it("travel should have at least 5 articles", function(done) {
      	request2
      		.get('/search?section=travel&order-by=newest&api-key=test')
          	.expect(function(res){
            	assert.equal(res.body.response.status, 'ok');
          	})
          	.expect(function(res){
            	assert.equal(res.body.response.pageSize >= 5, true);
          	})
          .end(done);
  	});
  	

});

 