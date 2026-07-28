// Create Map
//alert("app.js loaded");
const map = L.map('map').setView([13.0827, 80.2707], 10);

// OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Load JSON
fetch("data/schools.json")
    .then(response => response.json())
    .then(schools => {

        schools.forEach(school => {

            L.marker([school.latitude, school.longitude])
                .addTo(map)
                .bindPopup(`
                    <b>${school.name}</b><br>
                    ${school.address}
                `);

        });

    })
    .catch(error => console.error(error));
