	var page = this;
    
    page.data.refreshMap = function(){        
        
        // we do this to empty out the map
        client.sendClientEvent("ce_buildings_BuildingAddModify", page.data.building);

        var map = client.getWidget("DynamicMapViewerBuilding").map;
        if (page.data.building.geo){
            var lat = page.data.building.geo.coordinates[1];
            var lng = page.data.building.geo.coordinates[0];
            map.setCenter(new google.maps.LatLng(lat, lng));
            
            var locationhash = client.getWidget("DynamicMapViewerBuilding").locationHash;
            console.log(locationhash);
            var marker;
            
     
            if (page.data.building.name !== null){
        		marker = locationhash[page.data.building.name].gmMarker;
            } else {
                marker = locationhash["none"].gmMarker;
            }
            console.log(marker);
            marker.setOptions({draggable: true});
                       
            google.maps.event.addListener(marker,'dragend',function(event) {
                page.data.building.geo = {
                    type: "Point",
                    coordinates:  [this.position.lng(), this.position.lat()]
                };
            });
                    	
        }
        
        map.setZoom(18);

    };
    
    page.data.building.initializeToDefaultValues();
    page.data.building.organizationid = client.data.organization.id;
    
    if (parameters){
        page.data.building.copyMatchingData(parameters);
        page.data.refreshMap();
        
    } else {
        page.data.building.id = client.generateUUID();
        page.data.refreshMap();
    }
