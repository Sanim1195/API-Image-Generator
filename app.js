const input = document.getElementById('input-element');
const grid = document.getElementsByClassName('grid')[0];

let currentPage = 1;
const imagesPerPage = 9;
// getting users geo locaqtion:
     navigator.geolocation.getCurrentPosition(function (position) {
       console.log( "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude);
     });
// Calling the dayNightMode function on load
window.addEventListener('load', dayNightMode);
// // Setting up the event listener on the enter key and displaying the input

// adding a event listener to the input field
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter')
        loadImg();
});

// adding a event listener to the / button
document.addEventListener(
    "keypress",
    function (event) {
        if (event.key === "/") {
            
            input.focus();
            
            // clearing the input field
            

        }
    }
)

// function that loads the image:
function loadImg() {
    removeImg();
    //  URL with api key and the input value
    const URL = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=12&page=${currentPage}&client_id=5YQrIq2hhHldjqauwCyGFI-iTSqsPidoDS9tHeJ3mmc`;

    // fetching the data from the URL
    fetch(URL)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Error: ' + response.status);
                }
            })

        .then(data => {
            console.log(data);
            
            // looping through the data and displaying the images
            for (let i = 0; i < data.results.length; i++) {
                const img = document.createElement('img');
                img.src = data.results[i].urls.regular;
                img.addEventListener('click', function () {
                    window.open(data.results[i].links.download, '_blank');
                })
                grid.appendChild(img);
            }
            // adding a button to load more images
            const container = document.createElement('div');
            container.classList.add('container');
            const button = document.createElement('button');
            button.innerText = 'Load More';
            button.addEventListener('click', nextPage);
            grid.append(container, button);

        })
       
}

function removeImg() {
    //  its set to '' because we want to remove all the images
    grid.innerHTML = '';
}

function nextPage() {
    currentPage++;
    loadImg();
}


// function that checks if its day or night for dark mode
function dayNightMode() {
    const date = new Date();
    const hour = date.getHours();
    // checking if time is between 7 m to 7pm show day mode else night mode
    if (hour >= 7 && hour <= 17) {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';

    } else {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'whitesmoke';
    }
}
