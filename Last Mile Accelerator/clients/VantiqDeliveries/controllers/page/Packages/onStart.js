	var page = this;	
    
    page.data.refreshPackages = function(){
        var args = {};
        args.organizationid = client.data.organization.id;
        console.log(args.organizationid);
        client.data.execute("cb.getPackages", args, function(response){
            client.sendClientEvent("ce_packages", response);
            var mapWidget = client.getWidget("MapPackages");
            mapWidget.fixedCenter = true;
    		//mapWidget.map.zoom = 200;	
        	mapWidget.map.setZoom(15);
			/* console.log(response);
            var latlngbounds = new google.maps.LatLngBounds();

            // get the map markers and zoom map to markers
            var mapWidget = client.getWidget("DynamicMapViewerBuildings");
            var map = mapWidget.map;
            var locationhash = mapWidget.locationHash;
            console.log(locationhash);
            
            for (var key in locationhash) {
                console.log(key);
                if (locationhash.hasOwnProperty(key)) {
                    console.log(key + " -> " + p[key]);
                    var marker = locationhash[key].gmMarker;
                    console.log(marker);
                    latlngbounds.extend(marker.position);
                    
                }
            }
            
            map.fitBounds(latlngbounds); */
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

    page.data.refreshPackages();
    

    