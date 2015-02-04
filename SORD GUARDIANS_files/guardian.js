
$(document).ready(function(){
			
	
	$.getJSON("http://content.guardianapis.com/search?section=uk-news&api-key=test", function(data, status){
	    $.each( data.response.results, function( index, element ) {
				var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
				$('#uknews-result').append( html );
	        });
    });

	$.getJSON("http://content.guardianapis.com/search?section=football&api-key=test", function(data, status){
        $.each( data.response.results, function( index, element ) {
			var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
			$('#football-result').append( html );
        });
    });
	
	$.getJSON("http://content.guardianapis.com/search?section=travel&api-key=test", function(data, status){
        $.each( data.response.results, function( index, element ) {
			var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
			$('#travel-result').append( html );
        });
    });
   
});
/*
$(document).ready(function(){
	
	$('#sections #uknews').click(function(e){		
		var $root = $('#uknews-result')
		$.getJSON("http://content.guardianapis.com/search?api-key=kxna6pxmdg7q35pjvhhkh2m9", function(data, status){
	        $.each( data.response.results, function( index, element ) {
				var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
				$root.append( html );
	        })
        });
	}),
	$('#sections #football').click(function(e){
		$('.nav-tabs li').removeClass('active'); // remove active class from tabs
    	$(this).addClass('active');
    	//$('.tab-content div').removeClass('active');
		//$('.tab-pane #football').addClass( 'active');
	    $('.tab-content div').hide(); // hide all tab content
    	$('.tab-content #football').show(); // show the tab content with matching id
		var $root = $('#football-result')
		$.getJSON("http://content.guardianapis.com/search?api-key=kxna6pxmdg7q35pjvhhkh2m9&ion=football", function(data, status){
		//$.getJSON("http://content.guardianapis.com/search?api-key=kxna6pxmdg7q35pjvhhkh2m9&ion=football", function(data, status){
            $.each( data.response.results, function( index, element ) {
				var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
				$root.append( html );
            })
        });
	});
	
	$('#sections #travel').click(function(e){
		var $root = $('#travel-result')
		$.getJSON("http://content.guardianapis.com/search?api-key=kxna6pxmdg7q35pjvhhkh2m9&ion=travel", function(data, status){
		//$.getJSON("http://content.guardianapis.com/search?api-key=kxna6pxmdg7q35pjvhhkh2m9&ion=football", function(data, status){
            $.each( data.response.results, function( index, element ) {
				var html = "<li><a href='"+ element.webUrl +  "'>" +element.webTitle + '</a></li>';
				$root.append( html );
            })
        });
    });

})
*/