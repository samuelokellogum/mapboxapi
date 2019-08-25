L.mapbox.accessToken = 'pk.eyJ1Ijoic2FtdWVsb2tlbGxvZ3VtIiwiYSI6ImNqemZnYXVzejAyMDQzZ280NGo0aDBsbzgifQ.n3aTh1uXQs8gczGexkbTKA';
var map = L.mapbox.map('map').setView([0.4479, 33.2026], 12).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));
map.scrollWheelZoom.disable();



// Add marker color, symbol, and size to hospital GeoJSON
for (var i = 0; i < hospitals.features.length; i++) {
    hospitals.features[i].properties['marker-color'] = '#00b300';
    hospitals.features[i].properties['marker-symbol'] = 'hospital';
    hospitals.features[i].properties['marker-size'] = 'small';
}

// Add marker color, symbol, and size to restaurants GeoJSON
for (var j = 0; j < restaurants.features.length; j++) {
    restaurants.features[j].properties['marker-color'] = '#ffff1a';
    restaurants.features[j].properties['marker-symbol'] = 'restaurant';
    restaurants.features[j].properties['marker-size'] = 'small';
}


// Add marker color, symbol, and size to schools GeoJSON
for (var j = 0; j < schools.features.length; j++) {
    schools.features[j].properties['marker-color'] = '#99ff99';
    schools.features[j].properties['marker-symbol'] = 'schools';
    schools.features[j].properties['marker-size'] = 'small';
}

// Add marker color, symbol, and size to churches GeoJSON
for (var j = 0; j < churches.features.length; j++) {
    churches.features[j].properties['marker-color'] = '#996600';
    churches.features[j].properties['marker-symbol'] = 'churches';
    churches.features[j].properties['marker-size'] = 'small';
}

// Add marker color, symbol, and size to hotels GeoJSON
for (var j = 0; j < hotels.features.length; j++) {
    hotels.features[j].properties['marker-color'] = '#3399ff';
    hotels.features[j].properties['marker-symbol'] = 'hotels';
    hotels.features[j].properties['marker-size'] = 'small';
}

var map = L.mapbox.map('map')
    .setView([38.05, -84.5], 12)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));
map.scrollWheelZoom.disable();

var hospitalLayer = L.mapbox.featureLayer(hospitals)
    .addTo(map);
var restaurantLayer = L.mapbox.featureLayer(restaurants)
    .addTo(map);
var schoolLayer = L.mapbox.featureLayer(schools)
    .addTo(map);
var churchLayer = L.mapbox.featureLayer(churches)
    .addTo(map);
var hotelLayer = L.mapbox.featureLayer(hotels)
    .addTo(map);

// When map loads, zoom to libraryLayer features
map.fitBounds(hotelLayer.getBounds());

// Bind a popup to each feature in hospitalLayer and libraryLayer
hospitalLayer.eachLayer(function(layer) {
    layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', {
        closeButton: false
    });
}).addTo(map);
restaurantLayer.eachLayer(function(layer) {
    layer.bindPopup(layer.feature.properties.Name, {
        closeButton: false
    });
}).addTo(map);
schoolLayer.eachLayer(function(layer) {
    layer.bindPopup(layer.feature.properties.Name, {
        closeButton: false
    });
}).addTo(map);
churchLayer.eachLayer(function(layer) {
    layer.bindPopup(layer.feature.properties.Name, {
        closeButton: false
    });
}).addTo(map);
hotelLayer.eachLayer(function(layer) {
    layer.bindPopup(layer.feature.properties.Name, {
        closeButton: false
    });
}).addTo(map);


// Open popups on hover
hospitalLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
restaurantLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
schoolLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
churchLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
hotelLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});

hospitalLayer.on('click', function(e) {
    // Get the GeoJSON from libraryFeatures and hospitalFeatures
    var restaurantFeatures = restaurantLayer.getGeoJSON();
    var hospitalFeatures = hospitalLayer.getGeoJSON();

    // Using Turf, find the nearest hospital to restaurant clicked
    var nearestHospital = turf.nearest(e.layer.feature, hospitalFeatures);

    // Change the nearest hospital to a large marker
    nearestHospital.properties['marker-size'] = 'large';

    // Add the new GeoJSON to hospitalLayer
    hospitalLayer.setGeoJSON(hospitalFeatures);
    // Bind popups to new hospitalLayer and open popup
    // for nearest hospital
    hospitalLayer.eachLayer(function(layer) {
        layer.bindPopup('<strong>' + layer.feature.properties.Name + '</strong>', {
            closeButton: false
        });
        if (layer.feature.properties['marker-size'] === 'large') {
            layer.openPopup();
        }
    });
});