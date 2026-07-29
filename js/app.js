// =====================================================
// VES School Locator
// Version 2.0
// app.js
// =====================================================

// -----------------------------------------------------
// Create Map
// -----------------------------------------------------

const map = L.map('map').setView([13.0827, 80.2707], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// -----------------------------------------------------
// Variables
// -----------------------------------------------------

let schoolsData = [];
let markers = [];

// -----------------------------------------------------
// Load Schools
// -----------------------------------------------------

fetch("data/schools.json")
    .then(response => response.json())
    .then(schools => {

        schoolsData = schools;

        loadSchools(schools);

    })
    .catch(error => console.error(error));


// =====================================================
// Display Schools
// =====================================================

function loadSchools(schools) {

    const schoolList = document.getElementById("schoolList");

    schoolList.innerHTML = "";

    markers.forEach(marker => map.removeLayer(marker));

    markers = [];

    schools.forEach((school) => {

        //------------------------------------------------
        // Marker
        //------------------------------------------------

        const marker = L.marker([
            school.latitude,
            school.longitude
        ])
        .addTo(map)
        .bindPopup(`
            <b>${school.name}</b><br>
            ${school.address}
        `);

        markers.push(marker);

        //------------------------------------------------
        // Card
        //------------------------------------------------

        const card = document.createElement("div");

        card.className = "school-card";

        card.innerHTML = `

            <div class="school-name">

                ${school.name}

            </div>

            <div class="school-address">

                ${school.address}

            </div>

            <div class="school-contact">

                ☎ ${school.phone.join("<br>☎ ")}

            </div>

        `;

        //------------------------------------------------
        // Card Click
        //------------------------------------------------

        card.addEventListener("click", function () {

            map.flyTo(
                [school.latitude, school.longitude],
                16,
                {
                    animate: true,
                    duration: 1.5
                }
            );

            marker.openPopup();

        });

        schoolList.appendChild(card);

    });

}

// =====================================================
// Live Search
// =====================================================

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase().trim();

    if (keyword === "") {

        loadSchools(schoolsData);

        return;

    }

    const filtered = schoolsData.filter(school => {

        return (
            school.name.toLowerCase().includes(keyword) ||
            school.address.toLowerCase().includes(keyword)
        );

    });

    loadSchools(filtered);

});
