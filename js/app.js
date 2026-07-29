// Create Map

const map=L.map('map').setView([13.0827,80.2707],10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{

    maxZoom:19,

    attribution:'© OpenStreetMap'

}).addTo(map);

let markerList=[];

fetch("data/schools.json")

.then(res=>res.json())

.then(schools=>{

    const schoolList=document.getElementById("schoolList");

    schools.forEach(school=>{

        const marker=L.marker([
            school.latitude,
            school.longitude
        ])

        .addTo(map)

        .bindPopup(

            `<b>${school.name}</b><br>${school.address}`

        );

        markerList.push(marker);

        //--------------------------------------------------

        const card=document.createElement("div");

        card.className="school-card";

        card.innerHTML=`

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

        //--------------------------------------------------

        card.onclick=function(){

            map.flyTo(

                [school.latitude,school.longitude],

                16,

                {

                    animate:true,

                    duration:1.5

                }

            );

            marker.openPopup();

        };

        schoolList.appendChild(card);

    });
        card.onclick = function() {

            map.flyTo(...);
        
            marker.openPopup();
        
        };
        
        schoolList.appendChild(card);
        
        });
});
