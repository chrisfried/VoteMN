function shuffle(sourceArray) {
	for (var n = 0; n < sourceArray.length - 1; n++) {
		var k = n + Math.floor(Math.random() * (sourceArray.length - n));
		var temp = sourceArray[k];
		sourceArray[k] = sourceArray[n];
		sourceArray[n] = temp;
	}
}

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
	shuffle(data);
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
		name = data[i][1].toLowerCase();
		seat = data[i][0];
		if (data[i][3] !== "") {
			urlFront = '<a class="url" target="_blank" href="http://' + data[i][3] + '">';
			urlBack = '</a>';
		} else if (data[i][5]) {
			urlFront = '<a class="url" target="_blank" href="http://facebook.com/' + data[i][5] + '">';
			urlBack = '</a>';
		} else if (data[i][4]) {
			urlFront = '<a class="url" target="_blank" href="http://twitter.com/' + data[i][4] + '">';
			urlBack = '</a>';
		} else {
			urlFront = '<a class="url" href="#">';
			urlBack = '</a>';
		}
		if (data[i][5] !== "") {
			if (data[i][5].indexOf("/") > 0) {
				facebookID = data[i][5].substring(data[i][5].lastIndexOf("/"));
				portrait = 'https://graph.facebook.com/' + facebookID + '/picture?type=large';
			} else {
				portrait = 'https://graph.facebook.com/' + data[i][5] + '/picture?type=large';
			}
			photo = '<div style="background-image:url(\'' + portrait + '\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		} else if (data[i][4] !== "") {
			portrait = 'https://api.twitter.com/1/users/profile_image?screen_name=' + data[i][4] + '&size=bigger';
			photo = '<div style="background-image:url(\'' + portrait + '\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		} else if (data[i][6] !== "") {
			portrait = 'https://graph.facebook.com/' + data[i][6] + '/picture?type=large';
			photo = '<div style="background-image:url(\'' + portrait + '\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		} else if (data[i][2] === "R") {
			photo = '<div style="background-image:url(\'images/mngop.png\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		} else if (data[i][2] === "DFL") {
			photo = '<div style="background-image:url(\'images/dfl.png\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		} else if (data[i][2] === "IP") {
			photo = '<div style="background-image:url(\'images/ip.png\');" title="' + name + ' | ' + seat + '" class="photo ' + data[i][2] + '">' + urlFront + '<div class="name">' + name + '</div>' + urlBack + '</div>';
		}
		if (photo != '' && !(data[i][2] === "DFL" && data[i][3] === 'johnsonforstatehouse.com') && !(data[i][2] === "R" && data[i][3] === 'johnsonformn.com')) {
			$('.cards').append(photo);
		}
	}
}