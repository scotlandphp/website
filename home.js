$(document).ready(function(){
    var map = L.map('map', {'scrollWheelZoom': false}).setView([56.8491047,-4.2255712], 6);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.arcgis.com">ArcGIS</a>',
        maxZoom: 18
    }).addTo(map);
    var markerEd = L.marker([55.977244,-3.173203]).addTo(map);
    var markerGl = L.marker([55.8569319,-4.2856947]).addTo(map);
    var markerDu = L.marker([56.4561461,-2.9833701]).addTo(map);
    var markerAb = L.marker([57.145627,-2.108084]).addTo(map);

    markerEd.bindPopup("<h3>EdPUG</h3><strong>CivTech, CodeBase</strong><br>Level L<br>38 Castle Terrace<br>Edinburgh EH3 9DZ");
    markerGl.bindPopup("<h3>Glasgow PHP</h3><strong>Inviqa</strong><br>Forsyth House<br>111 Union Street<br>Glasgow G1 3TA");
    markerDu.bindPopup("<h3>Dundee PHP</h3><strong>Solarwinds MSP</strong><br>The Big Ideas Room<br>The Vision Building<br>20 Greenmarket<br>Dundee DD1 4QB");
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


function escapeHTML(str, maxLength, newLine) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    var out =  div.innerHTML;
    if (maxLength > 0 && out.length > maxLength) {
        out = out.substr(0,maxLength)+" ...";
    }
    return newLine ? out.replace(/\n/g,'<br>') : out;
}

function TechInScotlandCompanies(data) {
    var html = '';

    for(i in data.data) {
        html += '<div class="company">';
        html += '<div class="title">'+escapeHTML(data.data[i]['title'],0,false)+'</div>';
        if (data.data[i]['description']) {
            html += '<div class="description-less">';
            html += escapeHTML(data.data[i]['description'], 200, false);
            html += '<a href="#" onclick="$(this).parents(\'.company\').children(\'.description-less\').hide(); $(this).parents(\'.company\').children(\'.description-more\').show(); return false;"> (more)</a>'
            html += '</div>';
            html += '<div class="description-more">';
            html += escapeHTML(data.data[i]['description'], 0, true);
            html += '<a href="#" onclick="$(this).parents(\'.company\').children(\'.description-less\').show(); $(this).parents(\'.company\').children(\'.description-more\').hide(); return false;"> (less)</a>'
            html += '</div>';
        }
        if (data.data[i]['address']) {
            html += '<div class="address">'+escapeHTML(data.data[i]['address'],0,false)+'</div>';
        }
        if (data.data[i]['webpage']) {
            html += '<div class="webpage">Find out more: <a href="'+escapeHTML(data.data[i]['webpage'],0,false)+'">'+escapeHTML(data.data[i]['webpage'])+'</a></div>';
        }
        if (data.data[i]['jobs_webpage']) {
            html += '<div class="jobs_webpage">Look for jobs: <a href="'+escapeHTML(data.data[i]['jobs_webpage'],0,false)+'">'+escapeHTML(data.data[i]['jobs_webpage'])+'</a></div>';
        }
        html += '</div>';
    }

    $('#companieslistdata').html(html);
}
