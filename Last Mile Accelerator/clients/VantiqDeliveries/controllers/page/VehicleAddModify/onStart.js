
    var page = this;
    
        //getting vehicle types
    
    client.data.execute("cb.getVehicleTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("dlVehicleType").enumeratedList = enumlist;


    });   
    
    //function to update the information updated in the address
    
    page.data.refreshMap = function(){        
        
        // we do this to empty out the map
        client.sendClientEvent("ce_vehicles_VehiclesAddModify", page.data.vehicle);

        var map = client.getWidget("DynamicMapViewerAddModifyVehicles").map;
        if (page.data.vehicle.currentlocation){
            var lat = page.data.vehicle.currentlocation.coordinates[1];
            var lng = page.data.vehicle.currentlocation.coordinates[0];
            map.setCenter(new google.maps.LatLng(lat, lng));
            
            var locationhash = client.getWidget("DynamicMapViewerAddModifyVehicles").locationHash;
            console.log(locationhash);
            var marker;
            
     
            if (page.data.vehicle.name !== null){
        		marker = locationhash[page.data.vehicle.name].gmMarker;
            } else {
                marker = locationhash["none"].gmMarker;
            }
            console.log(marker);
            marker.setOptions({draggable: true});
                       
            google.maps.event.addListener(marker,'dragend',function(event) {
                page.data.vehicle.currentlocation = {
                    type: "Point",
                    coordinates:  [this.position.lng(), this.position.lat()]
                };
            });
                    	
        }
        
        map.setZoom(18);

    };
    
    //*********************************************************************

    page.data.vehicle.initializeToDefaultValues();
    page.data.vehicle.organizationid = client.data.organization.id;
    
    console.log(client.data.organization.id);
    
    if (parameters){
        page.data.vehicle.copyMatchingData(parameters);

        
    } else {
        page.data.vehicle.id = client.generateUUID();

    }
    
    