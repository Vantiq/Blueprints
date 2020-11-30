
    console.log(extra);
    console.log(extra.columnName);
    if (extra.columnName === "ButtonVehicles"){
        client.getWidget("DataTableVE").isVisible = true;
        	page.data.refreshVehiclesinRegion = function(regionName){        
        
                   var args = {};
                   args.organizationid = client.data.organization.id;
                   args.regionName = regionName;
                   client.data.execute("cb.getVehiclesInRegion", args, function(response){
                        console.log(response);

                        client.sendClientEvent("ce_vehicles", response);

                        console.log(response);
                        var latlngbounds = new google.maps.LatLngBounds();

                        // get the map markers and zoom map to markers
                        var mapWidget = client.getWidget("DynamicMapViewerRegions");
                        var map = mapWidget.map;
                        var locationhash = mapWidget.locationHash;
                        console.log(locationhash);

                        for (var key in locationhash) {
                           // console.log(key + " -> " + key);
                            if (locationhash.hasOwnProperty(key)) {
                                //console.log(key + " -> " + p[key]);
                                var marker = locationhash[key].gmMarker;
                                console.log(marker);
                                latlngbounds.extend(marker.position);

                            }
                        }
                    });
                };
        
            page.data.refreshVehiclesinRegion(extra.dataObject.name);
    }

    if (extra.columnName === "AddVehicle"){
       client.popupPage("RegionAddVehicle","Asign Vehicle to Region", extra.dataObject.name,function(returnParameters)
       {    
           console.log("The Return Parameters: " + returnParameters);
           page.data.refreshRegions();
       });
    }
    
    
    if (extra.columnName === "ButtonDelete"){
         
          console.log(extra.dataObject);
        
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");
        var msg = client.formatMsg("@confirm.deleteregion.message");
        
//        client.confirmCustom("Are you sure you want to delete the Vehicle","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){

                client.data.execute("cb.deleteregion", {id: extra.dataObject.id}, function(response){
                   page.data.refreshRegions();
                });
            }

        });	
        
     
    }