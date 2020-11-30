	var page = this;	
    
    page.data.refreshVehicles = function(){
        var args = {};
        args.organizationid = client.data.organization.id;
        
        console.log(client.data.organization.id);
        
        client.data.execute("cb.getVehicles", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_vehicles", response);


            var latlngbounds = new google.maps.LatLngBounds();

            // get the map markers and zoom map to markers
            var mapWidget = client.getWidget("DynamicMapViewerVehicles");
            var map = mapWidget.map;
            var locationhash = mapWidget.locationHash;
            console.log(locationhash);
            
            for (var key in locationhash) {
                if (locationhash.hasOwnProperty(key)) {
                    //console.log(key + " -> " + p[key]);
                    var marker = locationhash[key].gmMarker;
                    console.log(marker);
                    latlngbounds.extend(marker.position);
                    
                }
            }
            
            map.fitBounds(latlngbounds); 
            map.setZoom(100);
            /*
            locationhash.forEach(function(item){
                var marker = item.gmMarker;
                // var pos = new google.maps.LatLng(item.location.coordinates[1], item.location.coordinates[0]);
                console.log(marker);
            });
            
            latlngbounds.extend(pos);
            */

            
        });
        
        
         client.data.execute("cb.getIddleVehicles", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_iddlevehicles", response);


            var latlngbounds = new google.maps.LatLngBounds();

            // get the map markers and zoom map to markers
            var mapWidget = client.getWidget("DynamicMapViewerVehicles");
            var map = mapWidget.map;
            var locationhash = mapWidget.locationHash;
            console.log(locationhash);
            
            for (var key in locationhash) {
                if (locationhash.hasOwnProperty(key)) {
                   // console.log(key + " -> " + p[key]);
                    var marker = locationhash[key].gmMarker;
                    console.log(marker);
                    latlngbounds.extend(marker.position);
                    
                }
            }
            
            map.fitBounds(latlngbounds); 
            map.setZoom(100);
            /*
            locationhash.forEach(function(item){
                var marker = item.gmMarker;
                // var pos = new google.maps.LatLng(item.location.coordinates[1], item.location.coordinates[0]);
                console.log(marker);
            });
            
            latlngbounds.extend(pos);
            */

            
        });


        
    };
    
    
    

    page.data.refreshVehicles();