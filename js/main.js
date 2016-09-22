function bookSearch(){
	var search = document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
	console.log(search)

	$.ajax({
		url:"https://www.googleapis.com/books/v1/volumes?q=" + search,
		dataType:"json",

		success: function(data) {
			var results = document.getElementById("results")
			for(i = 0; i < data.items.length; i++){

				var jdata = data.items[i].volumeInfo

				results.innerHTML += "<h2>" + jdata.authors[0] + "</h2>" + jdata.publishedDate + "<img src='" +
				jdata.imageLinks.thumbnail + "'>"
			}
		},

		type: 'GET'
	});
}

document.getElementById('button').addEventListener('click', bookSearch, false)



