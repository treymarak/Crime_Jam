function initMap() {
    // settings
    var center = new google.maps.LatLng(eventLat, eventLong);
    var radius_circle = 300; // 30km

    var markers = [];
    var markerPositions = [];
    // draw map
    var mapOptions = {
        center: center,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var circle = drawCircle(mapOptions.center, radius_circle);

    var geocoder = new google.maps.Geocoder();

    function geocodeAddress(geocoder, resultsMap, index) {
        var address = crimeAddressList[index] + ',' + zipCodeList[index];
        geocoder.geocode({ 'address': address}, function (results, status) {
            if (status === 'OK') {
                markerPositions.push(results[0].geometry.location);
                markers.push(
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: resultsMap,
                        draggable: false
                    })
                );
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    

    $("#map-trigger").on("click", function (event) {
        console.log(eventLat);
        console.log(eventZip);
        console.log(eventLong);

        event.preventDefault();
        mapOptions.center = new google.maps.LatLng(eventLat, eventLong);
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        circle = drawCircle(mapOptions.center, radius_circle);

        for (var i = 0; i < 8; i++) {

            geocodeAddress(geocoder, map, i);
            console.log(crimeAddressList[i]);
        }

        console.log(crimeAddressList[1]);

    });


    // client clicks on button, we will check for the markers within the circle
    google.maps.event.addDomListener(document.getElementById('assault'), 'click', function () {
        for (var i = 0; i < markerPositions.length; i++) {
            var distance = calculateDistance(
                markers[i].getPosition().lat(),
                markers[i].getPosition().lng(),
                circle.getCenter().lat(),
                circle.getCenter().lng(),
                "K"
            );
            if (distance * 1000 < radius_circle) {  // radius is in meter; distance in km
                markers[i].setIcon('http://maps.gstatic.com/mapfiles/icon_green.png');      // make or find a better icon
            }
            else {
                markers[i].setIcon('http://maps.gstatic.com/mapfiles/icon.png');            // make or find a better icon
            }
        }
    });

    function drawCircle(center, radius) {
        return new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: '#0000FF',
            fillOpacity: 0.15,
            draggable: true,
            map: map,
            center: center,
            radius: radius
        });
    }

    function calculateDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var radlon1 = Math.PI * lon1 / 180;
        var radlon2 = Math.PI * lon2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344; }
        if (unit == "N") { dist = dist * 0.8684; }
        return dist;
    }

}

google.maps.event.addDomListener(window, 'load', initMap);