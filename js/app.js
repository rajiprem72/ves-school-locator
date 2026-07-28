// Create Map

const map = L.map('map').setView([13.0827, 80.2707], 10);

// OpenStreetMap Tiles

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

    maxZoom:19,

    attribution:'© OpenStreetMap'

}).addTo(map);
