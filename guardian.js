function reloadNewsBySection( section ) {
	var apiURL = "http://content.guardianapis.com/search?section=" + section + "&api-key=test";
	getResultsJSON( apiURL );	
};

function getResultsJSON( apiRequestURL ) {
    var request;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        request = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open("GET", apiRequestURL, true);
    request.send();

    // callback function that will get called once request ready state changes
    //  or: request.onload = function() {}
    request.onreadystatechange = function() {
		//if (request.status >= 200 && request.status < 400) {
		// we want to process the response once the readyState = 4 e.g.
        if ( request.readyState == 4 ) {
           if( request.status == 200){				          		
          		var data = JSON.parse( request.responseText);
          		data.response.results.map( function( element, index ) {
						var html = "<li><a class='+ element.sectionId + '-article' href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
						$('#'+element.sectionId + '-result').append( html );
			        });               
           }
           else if(  request.status == 400) {
      
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    };

    // another callback which will be triggered if there is an error
    request.onerror = function() {
  		// There was a connection error of some sort
  		console.log( 'ERROR: ' );
	};
};


$(document).ready(function(){
	
	$('.a-uknews').click(function(e){		
		$('#uknews-result').empty();
		reloadNewsBySection( 'uk-news' );	
	}),

	$('.a-football').click(function(e){		
		$('#football-result').empty();
		reloadNewsBySection( 'football' );
	}),

	$('.a-travel').click(function(e){		
		$('#travel-result').empty();
		reloadNewsBySection( 'travel')
	}),
	
	// This call to the Guaradian API gets called on initial loading of the webpage in order to populate the active page
	// straisght away.  Only need to populate the active page to save on unneccessary calls to the API
	reloadNewsBySection( 'uk-news');

	
});
