const API_KEY = "oR9Z0f8TIspMpqnYsWh3mQVyOPm7ytMs";

// Carousels
$(document).ready(function() {
  $('#Carousel').carousel({
      interval: 3000
  })
});

$(document).ready(function() {
  $('#Carousel2').carousel({
      interval: 3000
  })
});

// This will get the GIF searched in the search bar
function getGifs() {
  const gif = document.getElementById("gifs").value;
  const search_endpoint = `https://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${API_KEY}`;

  // This will fetch data from the API
  fetch(search_endpoint)
    .then((api_res) => api_res.json())
    .then((api_output) => {
      const gif_array = api_output.data.map(
        (gif) => gif.images.fixed_width.url
      );

      // This gets the img elment for every GIF retrieved from the API
      const gifs = gif_array
        .map((gif) => `<div class="flex-fill"><img src=${gif}></div>`)
        .join();
      // Finally displays the output
      document.getElementById("display_gif").innerHTML = gifs;
    })
    .catch((err) => console.log(err));
}

// Adds the getGifs functions to the seach button
document.getElementById("search_gif").addEventListener("click", getGifs);

// This will get GIFs that are currently trending
const trending_endpoint = `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=12`;

fetch(trending_endpoint)
  .then((api_res) => api_res.json())
  .then((api_output) => {
    const trending_gifs_array = api_output.data.map(
      (gif) => gif.images.fixed_width.url
    );
    let trending_slides = [];
    for (i = 0; i < 3; i++) {
      let trending_div = document.getElementById(`trending_gifs${i + 1}`);
      trending_slides.push(trending_div);
    }
    console.log(trending_slides)
    for (i=0; i <3; i++) {
      trending_gifs_array.slice((0+(4*i)),(4+(4*i))).forEach((gif) => {
        div = document.createElement("div");
        div.className = "col-md-3";
        div.innerHTML = `<a href="#"><img src=${gif} height='100%' width='100%'></a>`;
        trending_slides[i].appendChild(div);
      });
    }
  })
  .catch((err) => console.log(err));


// Script to run the Artists Sections 
