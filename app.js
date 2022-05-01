 const key = 'at_1mdHJlTD3nld8r3lcRAQx3niVEfyH';
 const apiUrl = 'https://geo.ipify.org/api/';
 const ipify = 'https://api.ipify.org?format=json';
 // Card elements to be updated
 let card = document.querySelector('.card');
 let address = document.querySelector('.first');
 let city = document.querySelector('.second');
 let timeZone = document.querySelector('.third');
 let isp = document.querySelector('.fourth');

let map
 //form elements
 const input = document.querySelector('input');
 const form = document.querySelector('#form');
 
//here i get the users ip address on loading the window
window.addEventListener('load',()=>{
    // I fetch my Ipify Url for generating user Ip
    fetch(ipify)
    .then(resp=> {
        if(!resp.ok) {
            // throw an error if the user IP couldn't be fetched
            throw Error('Error while fetching your IP');
        } else{
        // if everything goes well
            return resp.json();
            
        }
    })
    // here i log the ip address fetched to the user input
    .then(data=>{
        fetchIpDetails(data.ip);
    })
    .catch(err => console.log(err));
   

})

// here i created the function to search and then get your IP details logged
form.addEventListener('submit', (e)=>{
    map.remove();
    e.preventDefault();
    fetchIpDetails(input.value);
    input.value = '';
    
})
// here i created the function to render my map using leaflet and cloud maptiler
const renderMap = (lat,lng)=>{
     map = L.map('map', {
        center: [lat,lng],
        zoom: 6
    },   
    ); 
    L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=jaK6aMo8eZNK6qsw9XQq',{
        license: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 25,
        enableHighAccuracy: true,
        
    }).addTo(map);
    L.marker([lat,lng]).addTo(map);
}

//here i fetch the ip details of the user 
const fetchIpDetails = (e)=>{
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_1mdHJlTD3nld8r3lcRAQx3niVEfyH&ipAddress=${e}`)
    .then(resp=> resp.json())
    .then(data =>{
        renderMap(data.location?.lat,data.location?.lng);
        renderDetails(data);
    });
  
}


//here i render my card details
const renderDetails =(details)=>{
    
    address.innerHTML = details.ip;
    city.innerHTML = `${details.location.city}, ${details.location.region}, ${details.location.postalCode}`;
    timeZone.innerHTML = details.location.timezone;
    isp.innerHTML= details.isp;
}



