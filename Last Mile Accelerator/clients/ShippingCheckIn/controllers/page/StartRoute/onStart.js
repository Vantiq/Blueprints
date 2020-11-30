    var page = this;	
    page.data.collab = client.getCollaborationContext();
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var routes ;
     page.data.refreshShipments = function(){
        var args = {};
		var args2 = {};
         
        page.data.clientId = client.getUsername();
        args.driverId = client.getUsername();
        //console.log(client.data.organization.id);
        
        client.data.execute("cb.getShipments", args, function(response){
            console.log(response);
        	client.data.responseshippings = response;
            client.sendClientEvent("ce_shipments", response);

            
        });
         
         
         
    };
    
     page.data.refreshRoutes = function(){
        var args = {};
		var args2 = {};
         
         page.data.clientId = client.getUsername();
         args.driverId = client.getUsername();
        //console.log(client.data.organization.id);
        
        client.data.execute("cb.getRoutes", args, function(response){
            console.log(response);
  		
            client.sendClientEvent("ce_routes", response);
            
            page.data.responseroute = response[0];
            page.data.origen = page.data.responseroute.origen;
            page.data.destination = page.data.responseroute.destination;
            page.data.waypoints = page.data.responseroute.waypoints;
            console.log(routes);

        }); 
          
    };
 	
     
    
     function initMap() {
       
     var santana = new google.maps.LatLng(9.929680, -84.178980);
    

          var map = client.getWidget("ShippingPoints").map;
          directionsRenderer.setMap(map);
        }

      function calcRoute() {
          var start =  page.data.origen;
           console.log("start" + start);
          var end =  page.data.destination;
            console.log(end);
          var waypoints =  page.data.waypoints  ;
            console.log(waypoints);
          var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
            waypoints: waypoints,
            optimizeWaypoints:true,
            provideRouteAlternatives:true,
            drivingOptions: {
    				departureTime: new Date(Date.now()),
    				trafficModel: 'pessimistic'
  						}  
              
          };
          routes = directionsService.route(request, function(result, status) {
            if (status == 'OK') {
              directionsRenderer.setDirections(result);
                 console.log(result);
  						var args = {};
                		args.id = page.data.responseroute.id;
                        args.legs = result.routes[0].legs;
                		args.waypointorder = result.routes[0].waypoint_order;
                        client.data.execute("cb.updateRouteLegs", args, function(response){
            				console.log(response);
        					//client.data.responseshippings = response;
           					 //client.sendClientEvent("ce_shipments", response);
        				});
         
            
            }
              else{
                  
                    console.log("not good");
              }
          });
          
        }
    
    
    page.data.refreshMap = function(){        
                 
		    
      
		initMap();
        calcRoute();

        
        
        // we do this to empty out the map
		var map = client.getWidget("ShippingPoints").map;
        map.setZoom(15);

    };
    
    
    page.data.refreshShipments();
    page.data.refreshRoutes();
    page.data.refreshMap();
    
    
    