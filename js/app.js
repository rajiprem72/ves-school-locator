// VES School Locator - Version 2.1
// NOTE: This file assumes your existing index.html, style.css and schools.json.

const map = L.map('map').setView([13.0827,80.2707],10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,
    attribution:'&copy; OpenStreetMap'
}).addTo(map);

let schoolsData=[];
let markers=[];

fetch("data/schools.json")
.then(r=>r.json())
.then(data=>{
    schoolsData=data;
    renderSchools(data);
})
.catch(console.error);

function zoomToSchool(school,marker){
    map.flyTo([school.latitude,school.longitude],16,{
        animate:true,
        duration:1.4
    });
    marker.openPopup();
}

function renderSchools(schools){

    const schoolList=document.getElementById("schoolList");
    schoolList.innerHTML="";

    markers.forEach(m=>map.removeLayer(m));
    markers=[];

    schools.forEach(school=>{

        const marker=L.marker([school.latitude,school.longitude])
        .addTo(map)
        .bindPopup(`<b>${school.name}</b><br>${school.address}`);

        markers.push(marker);

        const card=document.createElement("div");
        card.className="school-card";

        let html="";

        html+=`<div class="school-name clickable">🏫 ${school.name}</div>`;
        html+=`<div class="school-address clickable">📍 ${school.address}</div>`;

        if(Array.isArray(school.phone)){
            school.phone.forEach(phone=>{
                html+=`
                <div class="school-contact">
                    <a href="tel:${phone.replace(/[^0-9+]/g,'')}">📞 ${phone}</a>
                </div>`;
            });
        }

        if(school.email && school.email.trim()!==""){
            html+=`
            <div class="school-contact">
                <a href="mailto:${school.email}">✉ ${school.email}</a>
            </div>`;
        }

        if(school.website && school.website.trim()!==""){
            html+=`
            <div class="school-contact">
                <a href="${school.website}" target="_blank" rel="noopener noreferrer">
                🌐 Visit Website
                </a>
            </div>`;
        }

        html+=`
        <div class="school-contact">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${school.latitude},${school.longitude}"
            target="_blank">
            🧭 Directions
            </a>
        </div>`;

        card.innerHTML=html;

        card.querySelector(".school-name").addEventListener("click",()=>zoomToSchool(school,marker));
        card.querySelector(".school-address").addEventListener("click",()=>zoomToSchool(school,marker));

        schoolList.appendChild(card);
    });
}

const searchBox=document.getElementById("searchBox");

searchBox.addEventListener("input",function(){

    const keyword=this.value.toLowerCase().trim();

    if(keyword===""){
        renderSchools(schoolsData);
        return;
    }

    const filtered=schoolsData.filter(s=>
        s.name.toLowerCase().includes(keyword) ||
        s.address.toLowerCase().includes(keyword) ||
        (s.city||"").toLowerCase().includes(keyword) ||
        (s.district||"").toLowerCase().includes(keyword)
    );

    renderSchools(filtered);
});
