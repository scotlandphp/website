$(document).ready(function(){
    const map = L.map('map', {'scrollWheelZoom': false}).setView([56.8491047,-4.2255712], 6);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.arcgis.com">ArcGIS</a>',
        maxZoom: 18
    }).addTo(map);
    const markerEd = L.marker([55.977244,-3.173203]).addTo(map);
    const markerGl = L.marker([55.8569319,-4.2856947]).addTo(map);

    markerEd.bindPopup("<h3>Edinburgh PHP (formerly EdPUG)</h3>");
    markerGl.bindPopup("<h3>Glasgow PHP</h3>");
});
