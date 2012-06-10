function DistrictGetter(d) {
	// Builds a Fusion Tables SQL query and hands the result to dataHandler()
	var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
	var queryUrlTail = '&jsonCallback=?'; // ? could be a function name
	
	var query = "SELECT name, URL FROM 1ClPKZRFh0vwwPQz-CK2QHP9mQy4Stax1mTxDpD8 ORDER BY seat";
	var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);
	var jqxhr = $.get(queryurl, candidateLister, "jsonp");
}

function candidateLister(d) {
	var data = d.table.rows;
	var photo;
	var facebook;
	var facebookID;
	var twitter;
	var urlFront;
	var urlBack;
	var seat;
	for (i=0;i<data.length;i++){
		photo = '';
		facebook = '';
		twitter = '';
		urlFront = '';
		urlBack = '';
		seat = data[i][0];

		if (data[i][1] !== "") {
			urlFront = '<a class="url" target="_blank" href="http://' + data[i][1] + '">';
			urlBack = '</a>';
			$('.cards').append(urlFront + data[i][0].toLowerCase() + urlBack + '<br />');
		}
		
	}
	FB.XFBML.parse();
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}