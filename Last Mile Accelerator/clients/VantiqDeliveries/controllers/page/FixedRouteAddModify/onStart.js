	var page = this;
    var directionsService = new google.maps.DirectionsService();
    var map = client.getWidget("RouteMap").map;
    var directionsRenderer = new google.maps.DirectionsRenderer();
    page.data.fixedroutes.waypoints = [];
    
     function initMap() {
       	directionsRenderer.draggable = true;
        directionsRenderer.map = map;
          var santana = new google.maps.LatLng(9.929680, -84.178980);
          directionsRenderer.setMap(map);
        }
    
    

      function calcRoute() {
          directionsRenderer.draggable = true;
          directionsRenderer.map = map;
          var start = page.data.fixedroutes.originalAddress;
          var end = page.data.fixedroutes.destinationAddress;
          var waypoints = page.data.fixedroutes.waypoints;
          var request = {
            origin: start,
            destination: end,
            waypoints: waypoints,
            travelMode: 'DRIVING'
          };
          directionsService.route(request, function(result, status) {
            if (status == 'OK') {
              directionsRenderer.setDirections(result);
            }
          });
        }
    
    
    page.data.refreshMap = function(){        
                
        
		initMap();
        calcRoute();
        
        // we do this to empty out the map
		var map = client.getWidget("RouteMap").map;
        map.setZoom(10);

    };
    
    page.data.fixedroutes.initializeToDefaultValues();
    page.data.fixedroutes.organizationid = client.data.organization.id;

    if (parameters){
        page.data.fixedroutes.copyMatchingData(parameters);
        page.data.refreshMap();
        
    } else {
        page.data.fixedroutes.id = client.generateUUID();
        page.data.refreshMap();
    }
