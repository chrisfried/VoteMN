function DistrictGetter(d) {
	// Builds a Fusion Tables SQL query and hands the result to dataHandler()
	var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
	var queryUrlTail = '&jsonCallback=?'; // ? could be a function name
	
	var query = "SELECT seat, name, party, URL, Twitter, 'Facebook Page', 'Facebook Profile' FROM 1ClPKZRFh0vwwPQz-CK2QHP9mQy4Stax1mTxDpD8 ORDER BY seat";
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
		if (seat.indexOf("District") > 0) {
			seat = seat.substring(0,seat.indexOf("District")) + '<br />' + seat.substring(seat.indexOf("District"));
		}
		if (data[i][5] !== "") {
			facebook = '<div class="facebook"><a class="fb-icon" href="http://facebook.com/' + data[i][5] + '" target="_blank">Facebook</a></div>';
			if (data[i][5].indexOf("/") > 0) {
				facebookID = data[i][5].substring(data[i][5].lastIndexOf("/"));
				portrait = 'https://graph.facebook.com/' + facebookID + '/picture?type=large';
			} else {
				portrait = 'https://graph.facebook.com/' + data[i][5] + '/picture?type=large';
			}
			photo = '<div style="background-image:url(\'' + portrait + '\');" class="photo">Candidate Portrait</div>'
		} else if (data[i][6] !== "") {
			portrait = 'https://graph.facebook.com/' + data[i][6] + '/picture?type=large';
			photo = '<div style="background-image:url(\'' + portrait + '\');" class="photo">Candidate Portrait</div>'
		}
		if (data[i][4] !== "") {
			twitter = '<div class="twitter"><a class="twitter-icon" href="http://twitter.com/' + data[i][4] + '" target="_blank">Twitter</a></div>';
		}
		if (data[i][3] !== "") {
			urlFront = '<a class="url" target="_blank" href="http://' + data[i][3] + '">';
			urlBack = '</a>';
		}
		if (!(data[i][2] === "DFL" && data[i][3] === 'johnsonforstatehouse.com') && !(data[i][2] === "R" && data[i][3] === 'johnsonformn.com')) {
			$('.cards').append('<div class="candidate-wrap"><div class="panel candidate ' + data[i][2] + '">' + photo + '<div class="name">' + urlFront + data[i][1].toLowerCase() + urlBack + '</div><div class="seat">' + seat + '</div><div class="social">' + facebook + twitter + '</div></div></div>');
		}
	}
}