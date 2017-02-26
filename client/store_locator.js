$( document ).ready(function(){
    //init a map and tie it autocompelte functionality 
    window.initMap = function() {
        //create new map;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.7749, lng: -122.4194},
          zoom: 13
        });

        //add autocomplete functionality to address-search element and bind it to map
        var input = document.getElementById('address-search');
        var autocomplete = new google.maps.places.Autocomplete(input);
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
          
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } 
          
          else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); 
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
        });
      }

    //on submit:
        //ping google geocode api to convert address to lat/long
            //on return, send out an ajax request to server with lat long
});