mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsb2tlbGxvZ3VtIiwiYSI6ImNqemZnYXVzejAyMDQzZ280NGo0aDBsbzgifQ.n3aTh1uXQs8gczGexkbTKA';
let map = new mapboxgl.Map({
    container: 'map',
    center: [33.2026, 0.4479], // Coordinates for Jinja City
    zoom: 13,
    style: 'mapbox://styles/mapbox/dark-v10'
});

let places = [{
        Name: "Jinja Hospital",
        Type: "Hospital",
        Address: "Rotary Rd",
        Location: [0.430089, 33.205280]

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
        Location: [0.432213, 33.208347]

    },
    {
        Name: "Alshafa Medical Center",
        Type: "Hospital",
        Address: "Mpumudde, Miro Mbili",
        Location: [0.458519, 33.217664]

    },
    {
        Name: "All Friends Grill Bar and Restaurant",
        Type: "Restaurants",
        Address: "Plot 6 Jackson Ave,",
        Location: [0.435643, 33.199625]

    },
    {
        Name: "Java House - Jinja",
        Type: "Restaurants",
        Address: "Shell Service Station Jinja-Kampala Highway,",
        Location: [0.444675, 33.198979]

    },
    {
        Name: "Igar Cafe",
        Type: "Restaurants",
        Address: "Main St, Jinja",
        Location: [0.445319, 33.196919]

    },
    {
        Name: "Rumours At The Source",
        Type: "Restaurants",
        Address: "The Jinja Club, Nile Cres, Jinja",
        Location: [0.32358400000000004, 32.5935104]

    },
    {
        Name: "Jinja Sailing Club",
        Type: "Restaurants",
        Address: "Jinja Sailing Club",
        Location: [0.41507974999999997, 33.20475585151227]
    },
    {
        Name: "Horizon International School",
        Type: "School",
        Address: "Walukuba Masese Rd",
        Location: [0.439554, 33.219560]
    },

    {
        Name: "Victoria Nile School",
        Type: "School",
        Address: "Nile Avenue, P.O.Box 501, Jinja, Uganda",
        Location: [0.427621, 33.201745]

    },
    {
        Name: "Main Street Primary School",
        Type: "School",
        Address: "Queen Elizabeth Way, Jinja",
        Location: [0.429530, 33.209950]

    },
    {
        Name: "Wanyange Girls School",
        Type: "School",
        Address: "Nyange hill",
        Location: [0.483302, 33.245062]
    },
    {
        Name: "Busoga College Mwiri",
        Type: "School",
        Address: "Kakira Town Council, Uganda",
        Location: [0.498532, 33.264036]
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
        Address: "Jinja - Iganga Highway",
        Location: [0.446527, 33.217853]

    },
    {
        Name: "Deliverance Church Walukuba",
        Type: "Church",
        Address: "Walukuba, Jinja",
        Location: [0.432700, 33.226040]

    },
    {
        Name: "Jinja Pentecostal Church",
        Type: "Church",
        Address: "Jinja - Iganga Highway",
        Location: [0.446012, 33.217692]

    },
    {
        Name: "Jinja Christian Center",
        Type: "Church",
        Address: " Miiro Road, Jinja",
        Location: [0.437937, 33.217176]
    },
    {
        Name: "St Andrews Church",
        Type: "Church",
        Address: "Plot10 Circular Road, P.O.Box 70",
        Location: [0.4195, 33.2065]
    },

    {
        Name: "Nile Village Hotel & Spa",
        Type: "Hotel",
        Address: "48/49 Kiira Road, Jinja",
        Location: [0.421800, 33.202120]
    },
    {
        Name: "Jinja Nile Resort",
        Type: "Hotel",
        Address: "Kimaka Road",
        Location: [0.449829, 33.188438]
    },
    {
        Name: "Speke Courts Hotel",
        Type: "Hotel",
        Address: "Plot 4 Speke Ave, Jinja",
        Location: [0.425270, 33.205580]
    },
    {
        Name: "Pearl On The Nile Hotel",
        Type: "Hotel",
        Address: "Plot 12A Kiira Road ",
        Location: [0.429998, 33.197141]
    },
    {
        Name: "Signature Hotel Apartments",
        Type: "Hotel",
        Address: "12 Nalufenya Rd, Jinja",
        Location: [0.441807, 33.199786]
    },
    {
        Name: "Ci' Sand Suites",
        Type: "Hotel",
        Address: "Plot 15, 19 Spire Rd, Jinja",
        Location: [0.425364, 33.212242]
    },
    {
        Name: "Brisk Recreation Hotel Triangle",
        Type: "Hotel",
        Address: "Plot 26 D-K Nile Crescent, Jinja",
        Location: [0.417038, 33.202675]
    }

];

let markers = [];

places.forEach(
    (place) => {
        let popup = new mapboxgl.Popup({
                offset: 25,
            })
            .setHTML(`<h3>${place.Name}</h3><h4>${place.Type}</h4><h5>${place.Address}</h5>`)

        let marker = new mapboxgl.Marker()
            .setLngLat([place.Location[1], place.Location[0]])
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
        if (place.Name.search(regex) !== -1) {
            place.marker.addTo(map)
            sidebar.appendChild(place.resultElement)
        }
    })
}