$(document).ready(function(){
    var map = L.map('map').setView([56.8491047,-4.2255712], 6);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.arcgis.com">ArcGIS</a>',
        maxZoom: 18
    }).addTo(map);
    var markerEd = L.marker([55.977244,-3.173203]).addTo(map);
    var markerGl = L.marker([55.8569319,-4.2856947]).addTo(map);
    var markerDu = L.marker([56.4561461,-2.9833701]).addTo(map);
    var markerAb = L.marker([57.145627,-2.108084]).addTo(map);

    markerEd.bindPopup("<h3>EdPUG</h3><strong>Blonde Digital Ltd</strong><br>86 Commercial Quay<br>Edinburgh EH6 6LX");
    markerGl.bindPopup("<h3>Glasgow PHP</h3><strong>STV Group plc</strong><br>Govan Rd<br>Pacific Quay<br>Glasgow, Lanarkshire G51 1PQ");
    markerDu.bindPopup("<h3>Dundee PHP</h3><strong>Drouthy's</strong><br>142 -146 Perth Rd<br>Dundee, Angus DD1 4JW");
    markerAb.bindPopup("<h3>Aberdeen PHP</h3><strong>Fifth Ring Ltd</strong><br>St Marys Court<br> 47-49 Huntly St<br> Aberdeen AB10 1TH");

    var groups = ['272', '296', '17', '203'];
    groups.forEach(function(groupId) {
        $.ajax({
            type: 'GET',
            url: 'https://opentechcalendar.co.uk/api1/group/'+groupId+'/events.jsonp?callback=?',
            async: false,
            jsonpCallback: 'func'+groupId,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(response) {
                if (response.data.length < 1) {
                    return 'continue';
                }
                var event = response.data[0];
                if (event.deleted || event.cancelled) {
                    return 'continue';
                }
                $('#eventslist').append("\
                        <article class='item'>\
                            <div class=\"row\">\
                                <div class=\"4u 12u$(mobile)\">\
                                    <h3>"+event.areas[0].title+"</h3>\
                                </div>\
                                <div class=\"8u 0u$(mobile)\">\
                                </div>\
                            </div>\
                            <div class=\"row\">\
                                <div class=\"4u 12u$(mobile)\">\
                                    <p>"+event['start'].displaylocal+"</p>\
                                    <a href=\""+event.siteurl+"\" target=\"_blank\">View on Open Tech Calendar</a>\
                                </div>\
                                <div class=\"8u 12u$(mobile)\">\
                                    <p>"+event.description+"</p>\
                                </div>\
                            </div>\
                        </article>\
                    ");
            }
        });
    });
});