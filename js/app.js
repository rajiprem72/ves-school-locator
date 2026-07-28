// Create Map
alert("app.js loaded");
const map = L.map('map').setView([13.0827, 80.2707], 10);

// OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Load JSON
fetch("data/schools.json")
    .then(response => {
        console.log("Status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Schools Loaded:", data.length);
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
