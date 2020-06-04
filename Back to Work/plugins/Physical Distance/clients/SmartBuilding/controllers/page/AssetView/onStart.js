    /*
    	This page needs an asset object.  
        You must supply parameters to this page with the asset object
        as parameters so that it will populate properly
    */
    
    var page = this;
    
    // clear any floorplan markers
    client.sendClientEvent("ce_spaces_AssetView", []);

    
    
    page.data.preparePage = function(params){
        
        page.data.asset.initializeToDefaultValues();
        page.data.asset.copyMatchingData(params);
        
        // cb.getSensorsForAsset(assetid String)
        var args ={};
        args.assetid = page.data.asset.id;
        client.data.execute("cb.getSensorsForAsset", args, function(response){
            client.sendClientEvent("ce_sensors_AssetView", response);
        });

        console.log(params);
        if (params.hasOwnProperty('floorid') && params.floorid !== null){
            
            //cb.getFloorById(id String)
            client.data.execute("cb.getFloorById", {id: params.floorid}, function(response){
                page.data.floor.copyMatchingData(response);
                console.log("FLOOR");
                console.log(response);
                
                
                //cb.findSpaceForAsset(floorid String, fplocation GeoJSON)
                client.data.execute("cb.findSpaceForAsset", {floorid: response.id, fplocation:page.data.asset.fplocation}, function(response){
                    page.data.space = response.name;
                });
                
                //cb.getFloorPlanById(id String)
                client.data.execute("cb.getFloorPlanById", {id:response.floorplan}, function(response){
                    page.data.floorplan.copyMatchingData(response);
                    console.log("FLOORPLAN");
                    console.log(response);
                    client.getWidget("FloorplanViewer235").url = page.data.floorplan.path;
                    client.sendClientEvent("ce_assets_AssetView", page.data.asset);
                });
                
            });
            
            
            

			/*            
            //cb.getFloorPlanForSpaceBySpaceId(spaceid String)
            client.data.execute("cb.getFloorPlanForSpaceBySpaceId", {spaceid:params.spaceid}, function(response){
                console.log(response);
                client.getWidget("FloorplanViewer235").url = response.path;


                //cb.getSpaceById(id String)
                client.data.execute("cb.getSpaceById", {id:params.spaceid}, function(response){
                    console.log("space");
                    console.log(response);

                    client.sendClientEvent("ce_spaces_AssetView", response);
                });
            });
            */
        } else {
            client.getWidget("FloorplanViewer235").url = "../../docs/images/floorplanselect.png";
        }

    };
    
    page.data.preparePage(parameters);
    