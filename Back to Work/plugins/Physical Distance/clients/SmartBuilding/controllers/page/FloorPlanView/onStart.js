	var page = this;   
    page.data.floorplan.initializeToDefaultValues();
    page.data.floorplan.copyMatchingData(parameters);
    
    var fpw = client.getWidget("StaticImage32");
	fpw.url = client.getDocumentUrl(page.data.floorplan.path);
        

    
      
    /*
    var args = {};
    args.buildingid = parameters.buildingid;
    
    //cb.getFloorPlansByBuildingId(buildingid String)
    client.data.execute("cb.getFloorPlansByBuildingId", args, function(response){
        console.log(response);
        page.data.floorplan.copyMatchingData(response);
        // client.sendClientEvent("ce_buildings_FloorView", response);
        
    });
    */
    
