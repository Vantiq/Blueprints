	var page = this;
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    
    client.data.execute("cb.getOrganization", {}, function(response){
    	if(response){
            page.data.package.organizationid = response.id;
            console.log(response);
        } else {
            client.goToPage("Organization");
        }
	});
    
    function initMap() {
       
          var santana = new google.maps.LatLng(9.929680, -84.178980);

          var map = client.getWidget("DynamicMapViewerRoute").map;
          directionsRenderer.setMap(map);
        }

      function calcRoute() {
          var start = page.data.package.originalAddress;
          var end = page.data.package.shippingAddress;
          var request = {
            origin: start,
            destination: end,
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
		var map = client.getWidget("DynamicMapViewerRoute").map;
        map.setZoom(10);

    };
    

    

    console.log(client.data.organization);
    page.data.package.organizationid = client.data.organization.id;
    page.data.package.notes = [];
    page.data.package.orderedDate = Date.now();
    page.data.package.region = "not found"; 
    if (parameters){
        page.data.package.copyMatchingData(parameters);
        page.data.refreshMap();
        
    } else {
        page.data.package.id = client.generateUUID();
        page.data.refreshMap();
    }
    

    client.getWidget("region").isVisible = false;
    client.getWidget("shippingAddressGEO").isVisible = false;
    client.getWidget("originalAddressGEO").isVisible = false;
