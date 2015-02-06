function reloadNewsBySection( section ) {
	//var apiURL = "http://content.guardianapis.com/search?section=" + section + "&api-key=test";
  var apiURL = "http://content.guardianapis.com/search?section=" + section + "&order-by=newest&show-fields=all&api-key=test"
	getResultsJSON( apiURL, section );	
};

function getResultsJSON( apiRequestURL, section ) {
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
              addArticlesToAccordion(data, section);

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

function addArticlesToAccordion(data, section){
  var accordionHtml = [];
  var accordionRoot = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
  data.response.results.map( function( element, index ) {
    var collapsed;
    var expanded;
    if (index === 0) {
      expanded = 'aria-expanded="true"';
      collapsed = '';
    } else {
      expanded = 'aria-expanded="false"';
      collapsed= 'class="collapsed"';
    }
    
    var html = '<div class="panel panel-default">'+
                  '<div class="panel-heading" role="tab" id="' + element.sectionId + 'heading' + index + '">'+
                    '<h4 class="panel-title">'+
                    '<a ' + collapsed + 'data-toggle="collapse" data-parent="#accordion" href="#' +
                     element.sectionId + index + '" ' + expanded + '"aria-controls="' + 
                     element.sectionId + index + '">'+
                     element.webTitle + '</a></h4>'+
                  '</div>'+
                  '<div id="'+ element.sectionId + index +
                     '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="'+ 
                     element.sectionId + 'heading' + index +'">'+
                    '<div class="panel-body">' +
                      '<a href="'+ element.webUrl + '">'+
                      element.fields.main+ '</a>' +                    
                      '<div>' +
                      ' <a href="' + element.webUrl + '">'+
                        element.fields.trailText + '</a>' +
                      '</div>'+
                      
                  '</div>'+
                '</div>'+
              '</div>';

        accordionHtml.push(accordionRoot+html);
  }); 
  var accordionFinished = accordionHtml.join("");

  $('#'+ section + '-accordion').append( accordionFinished );
};







//            "<li><a class='" + element.sectionId + "-article' href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
            


$(document).ready(function(){
	
	$('.a-uknews').click(function(e){		
		$('#uk-news-result').empty();
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
	
	// This call to the Guardian API gets called on initial loading of the webpage in order to populate the active page
	// straisght away.  Only need to populate the active page to save on unneccessary calls to the API
	reloadNewsBySection( 'uk-news');

	
});
