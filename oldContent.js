// debugger;
var list=$('.d-table.col-12.width-full.py-4.border-bottom.border-gray-light > .pr-3 > .mb-1 ');

list.append('<span> [Follows You]</span>');

function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];
		var url = tab.url;
		callback(url);
	});
}

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
			// document.getElementById('result').innerHTML = res;
// ---------------------------------------------------------------------------
			var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() {
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		        	var following = JSON.parse(xmlHttp.responseText);
		        	var followingIds = following.map(function(obj){
		        		return obj.id;
		        	});
		   //      	var list=$('.d-table.col-12.width-full.py-4.border-bottom.border-gray-light > .pr-3 > .mb-1 ');

		   //      	var parentDiv = $('.js-repo-filter .position-relative');
		   //      	parentDiv.find('div').each(function(){
					//     var innerDivId = $(thisparentDiv).attr('id');
					// });
		        	// -----
		        	// var arr = [];
					// list.each(function(){ arr.push($(this));});
					// $.each(arr,function(key,val){ val.append('<span> [Follows You]</span>');});
		        	// arr.forEach( function(element, index) {
		        	// 	element.append('<span> [Follows You]</span>');
		        	// });
		   //      	list.each(function(index, obj){
		   //      		obj.append('<span> [Follows You]</span>');
		   //      		// if(conditionSatisfied){
		   //      		// 	obj.append('<span> [Follows You]</span>');
		   //      		// }
					// });
		        }
		    }
		    var theUrl = "https://api.github.com/users/" + username + "/following";
		    xmlHttp.open("GET", theUrl, true); // true for asynchronous
		    xmlHttp.send(null);
// --------------------------------------------------------------------------
		}else{
			document.getElementById('result').innerHTML = "Not a github page";
		}
	});
});

