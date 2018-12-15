//  Welcome message
$(window).on('load',function(){
    $('#myModal').modal('show');
});

function bookSearch(){
	$('.loading').show();
	document.getElementById('results').innerHTML = "";
	var search = document.getElementById("search").value.replace(/\s/g, '%20');
	var results = document.getElementById("results");

	console.log(search)

	$.ajax({
		type: 'GET',
		url:"https://www.googleapis.com/books/v1/volumes?q=" + search,
		dataType:"json",

		success: function(data) {

			for ( i = 0; i < data.items.length; i++ ){

				var jdata = data.items[i].volumeInfo;

				var newDiv = document.createElement('div');
				newDiv.className = "col-md-4 product_result animated fadeIn";

				var newTitle = document.createElement('h4');				
				var bookTitle = jdata.title;
				var newAuthor = document.createElement('h4');
				newAuthor.innerHTML = "<b>Author: </b>" + jdata.authors[0];
				var newLink = document.createElement('a');
				var newImage = document.createElement('img');

				// Truncate title
				var truncatedTitle = bookTitle.toString().substring(0, 40);
				if (truncatedTitle.length == 40 ) {
					newTitle.innerHTML = "<b>Title: </b>" + truncatedTitle + "...";
				} else {
					newTitle.innerHTML = "<b>Title: </b>" + truncatedTitle;
				}

				newImage.setAttribute('src', jdata.imageLinks.thumbnail);
				newLink.setAttribute('href', jdata.infoLink);
				newLink.setAttribute('target', '_blank');
				newImage.className = "animated fadeIn";
				newDiv.appendChild(newTitle);
				newDiv.appendChild(newAuthor);
				newLink.appendChild(newImage);
				newDiv.appendChild(newLink);
				results.appendChild(newDiv);

				$('.loading').hide();

				console.log("https://www.googleapis.com/books/v1/volumes?q=" + search);
			}
		},
		error: function(){
			results.innerHTML = "<h3>Sorry! We couldn't find that. Please try another search.</h3>";
			$('.loading').hide();
		}
	});
}

// Runs function on enter key input
$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#button").click();
    }
});

document.getElementById('button').addEventListener('click', bookSearch, false)

