//set map options
var myLatLng = { lat: 51.453123, lng: -0.979394 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// Create a DirectionService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to our map
directionsDisplay.setMap(map);


// Calculates a rote between 2 cities
function calcRoute() {
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;

    var request = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    // Pass the request to the route method
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Get distance and time
            var routeDistance = result.routes[0].legs[0].distance.text;
            var routeTime = result.routes[0].legs[0].duration.text;

            var msg = "From: " + from + "<br>To: " + to + "<br> Travelling distance: " + routeDistance + ".<br>" +
                " Duration: " + routeTime + ".";
            $("#output").html("<div class='alert-info'>" + msg + "</div>");

            // Display route
            directionsDisplay.setDirections(result);
        } else {
            // Delete route from map
            directionsDisplay.setDirections({ routes: [] });

            // Center map in Reading
            map.setCenter(myLatLng);

            // Error message
            var msg = "Could not retrieve driving distance.";
            $("#output").html("<div class='alert-danger'>" + msg + "</div>");
        }

        // Create autocomplete object
        var options = {
            types: ['(cities)']
        };

        // From
        var input1 = document.getElementById('from');
        var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

        // To
        var input2 = document.getElementById('to');
        var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


    });
}