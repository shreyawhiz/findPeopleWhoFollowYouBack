// var list=$('.d-table.col-12.width-full.py-4.border-bottom.border-gray-light > .pr-3 > .mb-1 ');

// list.append('<span> [Follows You]</span>');
/**
 * Get the current URL.
 */
function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];
		var url = tab.url;
		console.assert(typeof url == 'string', 'tab.url should be a string');
		callback(url);
	});
}

//step 1
document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {
		if(url.includes("github.com")){
			var startIdx = url.lastIndexOf("/");
			if(url.includes("?")){
				var endIdx = url.lastIndexOf("?");
			}
			else{
				var endIdx = url.length;
			}
			var username = url.substring(startIdx+1, endIdx);
			var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() {
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		        	var response = JSON.parse(xmlHttp.responseText);
		        	var followers = response.map(function(obj){
		        		return obj.id;
		        	});
		        	var xmlHttp2 = new XMLHttpRequest();
				    xmlHttp2.onreadystatechange = function() {
				        if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
				        	var response = JSON.parse(xmlHttp2.responseText);
				        	var common = [];
				        	var following = response.map(function(obj){
				        		if(followers.indexOf(obj.id)>-1){
				        			common.push(obj.id);
				        			return obj.id;
				        		}else {
				        			return obj.id;
				        		}
				        	});
				        	document.getElementById('result').innerHTML = following;
				        }
				    }
				    var theUrl = "https://api.github.com/users/" + username + "/following";
				    xmlHttp2.open("GET", theUrl, true); // true for asynchronous
				    xmlHttp2.send(null);
		        }
		    }
		    var theUrl = "https://api.github.com/users/" + username + "/followers";
		    xmlHttp.open("GET", theUrl, true); // true for asynchronous
		    xmlHttp.send(null);
		}else{
			document.getElementById('result').innerHTML = "Not a github page";
		}
	});
});

function getImageUrl(searchTerm, callback, errorCallback) {
	var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
		'?v=1.0&q=' + encodeURIComponent(searchTerm);
	var x = new XMLHttpRequest();
	x.open('GET', searchUrl);
	x.responseType = 'json';
	x.onload = function() {
		var response = x.response;
		if (!response || !response.responseData || !response.responseData.results ||
				response.responseData.results.length === 0) {
			errorCallback('No response from Google Image search!');
			return;
		}
		var firstResult = response.responseData.results[0];
		// Take the thumbnail instead of the full image to get an approximately
		// consistent image size.
		var imageUrl = firstResult.tbUrl;
		var width = parseInt(firstResult.tbWidth);
		var height = parseInt(firstResult.tbHeight);
		console.assert(
				typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
				'Unexpected respose from the Google Image Search API!');
		callback(imageUrl, width, height);
	};
	x.onerror = function() {
		errorCallback('Network error.');
	};
	x.send();
}

function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

function getCommonUsers(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, false); // true for asynchronous

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        	var response = JSON.parse(xmlHttp.responseText);
        	var followers = response.map(function(obj){
        		return obj.id;
        	});
        	callback(followers);
        }
    }
};




