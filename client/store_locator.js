$( document ).ready(function(){

////////////////////////////////////////KEY VARIABLES///////////////////////////////////////////////////
    var formattedAddressFromGooglePlacesAPI;
    var googleGeocodesApiBaseUri = "https://maps.googleapis.com/maps/api/geocode/json?address=";

////////////////////////////////////////GOOGLE API FUNCTIONS///////////////////////////////////////////////////
    //init a map and tie it autocomplete functionality 
    window.initMap = function() {
        //create new map;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.7749, lng: -122.4194},
          zoom: 13
        });


        //add autocomplete functionality to address-search element and bind it to map, limiting it to addresses
        var input = document.getElementById('address-search');
        
        var options = {
            types: ["address"],
            componentRestrictions: {country: "us"}
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.bindTo('bounds', map);
 
        //create map marker
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        //add a listener for autocomplete
        autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          
          //if invalid submission is given, return error to user
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place is in current viewport, center on location 
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } 
          
          //If place is not in current viewport, then find/center around location
          else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); 
          }

          //place marker on place on map
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          formattedAddressFromGooglePlacesAPI = place.formatted_address;
          handleUserInput(formattedAddressFromGooglePlacesAPI);
        });
      }

/////////////////////////////////////////HELPER FUNCTIONS//////////////////////////////////////////////////    
    function handleUserInput(inputtedAddress) {
       var addressInputField = document.getElementById("address-search");
       var parsedAddressInfo = parseAddress(formattedAddressFromGooglePlacesAPI);
       fetchAddressCoordinates(parsedAddressInfo);
       addressInputField.value = "";
    }
    
    function parseAddress(address) {
       var addressArr = address.split(" ");
       var parsedAddressStr = addressArr.join("+");
       return parsedAddressStr;
    }

    function fetchAddressCoordinates(addressStr) {
        //fetch address coordinates from google 
        $.ajax({
            method: "GET",
            url: googleGeocodesApiBaseUri + addressStr,  
            dataType: 'json',    
            success: function(data) {
                var results = data.results[0];

                var coordinates = {
                    lat: results.geometry.location.lat,
                    lng: results.geometry.location.lng,
                    city: results.address_components[3].long_name,
                    state: results.address_components[5].short_name
                };

                findNearestStore(coordinates);
            },
            error: function(err) {
                console.log("Problem fetching data from Google Geocodes API: ", err)
                window.alert("Uh oh. You might want to double check your address. Try something like:" +
                "2016 California Street, San Francisco, CA, United States")
            }
        });
    }

    function findNearestStore(coordinates) {
        $.ajax({
            method: "POST",
            url: '/',
            data: coordinates,
            dataType: 'json',    

            success: function(nearestStore) {
                console.log("Successfully retrieved closest store ", nearestStore)
            },

            error: function(err) {
                console.log("Problem fetching closest store: ", err)
                window.alert("Hmm. Doesn't look like we can find a match. Maybe try another address?")
            }
        });
    }

////////////////////////////////////////UI CLICK HANDLERS///////////////////////////////////////////////////
     
});