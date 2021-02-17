const API_KEY = 'oR9Z0f8TIspMpqnYsWh3mQVyOPm7ytMs';

// This will get the GIF searched in the search bar 
function getGifs(){
  const gif = document.getElementById('gifs').value;
  const search_endpoint = `https://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${API_KEY}`;

  // This will fetch data from the API 
  fetch(search_endpoint)
    .then(api_res => api_res.json())
    .then(api_output => {
      const gif_array = api_output.data.map(gif => gif.images.fixed_width.url);

      // This gets the img elment for every GIF retrieved from the API 
      const gifs = gif_array.map(gif => `<div class="flex-fill"><img src=${gif}></div>`).join();
      // Finally displays the output 
      document.getElementById('display_gif').innerHTML= gifs;
    })
    .catch(err => console.log(err)); 
}

// Adds the getGifs functions to the seach button
document.getElementById('search_gif').addEventListener('click', getGifs); 

// This will get GIFs that are currently trending 
const trending_endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=6`;

fetch(trending_endpoint)
  .then(api_res => api_res.json())
  .then(api_output => {
    const trending_gifs_array = api_output.data.map(
      gif => gif.images.fixed_width.url
    );
    const trending_gifs = trending_gifs_array.map(gif => `<img src=${gif}>`).join();
    document.getElementById('trending_gifs').innerHTML = trending_gifs;
  })
  .catch(err => console.log(err))