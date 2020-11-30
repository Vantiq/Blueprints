	console.log(data);
    
    var page = client;
    var directionsService = new google.maps.DirectionsService();
    var map = client.getWidget("MainMap").map;
    var directionsRenderer = new google.maps.DirectionsRenderer();

    
     function initMap() {
           directionsRenderer.map = map;
        }
    
       function calculateRoute(mapOrigin, mapDestination) {
  
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map
            });

            var request = {
              origin: mapOrigin,
              destination: mapDestination,
              travelMode: 'DRIVING'
            };

            directionsService.route(request, function(result, status) {
              if (status == "OK") {
                directionsDisplay.setDirections(result);
              }
            });
      }
  	

      function calcRoute() {
          data.forEach(function(item){
			calculateRoute(item.originalAddress,item.destinationAddress);              
		  });
        }
    
    
    page.data.refreshMap = function(){        
                
        
		initMap();
        calcRoute();
        
        // we do this to empty out the map
		var map = client.getWidget("MainMap").map;
        map.setZoom(10);

    };
    
    page.data.refreshMap();
    