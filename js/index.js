mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsb2tlbGxvZ3VtIiwiYSI6ImNqemZnYXVzejAyMDQzZ280NGo0aDBsbzgifQ.n3aTh1uXQs8gczGexkbTKA';
let map = new mapboxgl.Map({
    container: 'map',
    center: [33.2026, 0.4479], // Coordinates for Jinja City
    zoom: 12,
    style: 'mapbox://styles/mapbox/dark-v10'
});

//map.scrollWheelZoom.disable();


let places = [{
        Name: "Jinja Hospital",
        Type: "Hospital",
        Address: "Rotary Rd",
        Location: [0.4301, 33.2053]

    },
    {
        Name: "Nile International Hospital",
        Type: "Hospital",
        Address: "Walukuba Masese Rd",
        Location: [0.421800, 33.202120]

    },
    {
        Name: "International Medical Centre",
        Type: "Hospital",
        Address: "Kampala Rd",
        Location: [0.441590, 33.213200]

    },
    {
        Name: "Alshafa Medical Center",
        Type: "Hospital",
        Address: "Mpumudde",
        Location: [0.4271, 33.2109]

    },
    {
        Name: "Family Hope Clinic",
        Type: "Hospital",
        Address: "Baxi Road",
        Location: [0.4314402, 33.2030502]
    },
    {
        Name: "All Friends Grill Bar and Restaurant",
        Type: "Restaurants",
        Address: "Rotary Rd",
        Location: [0.435643, 33.199625]

    },
    {
        Name: "Java House - Jinja",
        Type: "Restaurants",
        Address: "Walukuba Masese Rd",
        Location: [0.441590, 33.213200]

    },
    {
        Name: "Igar Cafe",
        Type: "Restaurants",
        Address: "Madhvani Rd, Plot 32",
        Location: [0.441590, 33.213200]

    },
    {
        Name: "Rumours At The Source",
        Type: "Restaurants",
        Address: "Nizam Road, Jinja Town",
        Location: [0.425830, 33.208064]

    },
    {
        Name: "Jinja Sailing Club",
        Type: "Restaurants",
        Address: "Bugembe",
        Location: [0.441590, 33.213200]
    },
    {
        Name: "Horizon International School",
        Type: "School",
        Address: "Walukuba Masese Rd",
        Location: [0.434820, 33.206400]
    },

    {
        Name: "Victoria Nile School",
        Type: "School",
        Address: "Walukuba Masese Rd",
        Location: [0.434820, 33.206402]

    },
    {
        Name: "Main Street Primary School",
        Type: "School",
        Address: "Madhvani Rd, Plot 32",
        Location: [0.429530, 33.209950]

    },
    {
        Name: "Wanyange Girls School",
        Type: "School",
        Address: "Nizam Road, Jinja Town",
        Location: [0.434820, 33.206400]
    },
    {
        Name: "Busoga College Mwiri",
        Type: "School",
        Address: "Bugembe",
        Location: [0.421100, 33.204100]
    },
    {
        Name: "St James Church of Uganda",
        Type: "Church",
        Address: "Nile Ave Rd",
        Location: [0.4333, 33.2085]
    },
    {
        Name: "Worship Harvest Church",
        Type: "Church",
        Address: "Walukuba Masese Rd",
        Location: [0.4267375, 33.2028555]

    },
    {
        Name: "Jinja Full Gospel Church",
        Type: "Church",
        Address: "Madhvani Rd, Plot 32",
        Location: [0.4, 33]

    },
    {
        Name: "Deliverance Church Walukuba",
        Type: "Church",
        Address: "Nizam Road, Jinja Town",
        Location: [0.432700, 33.226040]

    },
    {
        Name: "Pentecostal Church",
        Type: "Church",
        Address: "Bugembe",
        Location: [0.441590, 33.213200]

    },
    {
        Name: "Jinja Christian Center",
        Type: "Church",
        Address: "Bugembe",
        Location: [0.441590, 33.213200]
    },
    {
        Name: "St Andrews Church",
        Type: "Church",
        Address: "Bugembe",
        Location: [0.4195, 33.2065]
    },

    {
        Name: "Nile Village Hotel & Spa",
        Type: "Hotel",
        Address: "Walukuba Masese Rd",
        Location: [0.421800, 33.202120]
    },
    {
        Name: "Jinja Nile Resort",
        Type: "Hotel",
        Address: "Walukuba Masese Rd",
        Location: [0.421800, 33.202120]
    },
    {
        Name: "Speke Courts Hotel",
        Type: "Hotel",
        Address: "Madhvani Rd, Plot 32",
        Location: [0.425270, 33.205580]
    },
    {
        Name: "Pearl On The Nile Hotel",
        Type: "Hotel",
        Address: "Nizam Road, Jinja Town",
        Location: [0.4, 33]
    },
    {
        Name: "Signature Hotel Apartments",
        Type: "Hotel",
        Address: "Bugembe",
        Location: [0.4, 33]
    },
    {
        Name: "Ci'Sand Suites",
        Type: "Hotel",
        Address: "Bugembe",
        Location: [0.446022, 33.197539]
    },
    {
        Name: "Brisk Recreation Hotel Triangle",
        Type: "Hotel",
        Address: "Bugembe",
        Location: [0.4, 33]
    }
];

let markers = [];

places.forEach(
    (place) => {
        let popup = new mapboxgl.Popup({
                offset: 25,
            })
            .setHTML(`<h1>${place.Name}</h1>`)

        let marker = new mapboxgl.Marker()
            .setLngLat([place.Location[0], place.Location[1]])
            .setPopup(popup)
            .addTo(map)
        place.marker = marker
        place.resultElement = document.createElement('div')
        place.resultElement.className = "result-container"
        place.resultElement.innerHTML = `<div class='result'>${place.Name}</div><hr>`
        place.resultElement.id = place.Name
        sidebar.appendChild(place.resultElement)
    }
)

let menu = document.getElementById("sidebar");

function menuBarClick() {
    menu.classList.toggle("hidden")
}

let input = document.getElementById("input");

function onInputChange() {
    let elementsToRender = [];
    places.forEach(place => {
        place.marker.remove()
        let placeElement = document.getElementById(place.Name)
        if (placeElement) placeElement.remove()
    })

    if (input.value.trim() === "") {
        places.forEach(place => {
            place.marker.addTo(map)
            sidebar.appendChild(place.resultElement)
        })
        return
    }

    let regex = new RegExp(`${input.value}`, 'gi')
    places.forEach((place) => {
        if (place.name.search(regex) !== -1) {
            place.marker.addTo(map)
            sidebar.appendChild(place.resultElement)
        }
    })
}