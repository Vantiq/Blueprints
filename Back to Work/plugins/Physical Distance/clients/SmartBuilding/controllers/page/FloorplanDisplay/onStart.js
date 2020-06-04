    var page = this;
    
    // unpause the datastream dc_sensors
    var ds = client.getDataStreamByName("dc_assets");
    ds.isPaused = false;
    
    console.log(parameters);
      
    page.data.sensor.initializeToDefaultValues();
    page.data.asset.initializeToDefaultValues();
    page.data.floor.initializeToDefaultValues();
    page.data.floorplan.initializeToDefaultValues();

	page.data.sensor.copyMatchingData(parameters);

    client.data.execute("cb.getAssetById", {id:page.data.sensor.assetid}, function(response){
        page.data.asset.copyMatchingData(response);
        client.sendClientEvent("ce_dc_assets", response);
        client.data.execute("cb.getFloorById", {id: page.data.asset.floorid}, function(response){
            page.data.floor.copyMatchingData(response);
            client.data.execute("cb.getFloorPlanById", {id: page.data.floor.floorplan}, function(response){
				page.data.floorplan.copyMatchingData(response);
                client.getWidget("FloorplanViewer756").url = page.data.floorplan.path;
            });
        });
    });

    // get the asset
    