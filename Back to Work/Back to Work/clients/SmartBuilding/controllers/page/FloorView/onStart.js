	var page = this;
    
    // clear markers
    client.getWidget("FloorplanViewer456").clearData();
    
    // clear table
    client.getWidget("DataTable653").clearData();
    
    
        
    // unpause the datastream 
    var ds = client.getDataStreamByName("dc_assets");
    ds.isPaused = false;
    
    page.data.refreshSpacesAndAssets = function(){
        //cb.getSpacesForFloor(floorid String)
        if (page.data.planFilter === "spaces"){
            client.getWidget("FloorplanViewer9").isVisible = true;
            client.getWidget("FloorplanViewer456").isVisible = false;
        } else {
            client.getWidget("FloorplanViewer9").isVisible = false;
            client.getWidget("FloorplanViewer456").isVisible = true;
        }
        
        
        var args ={};
        args.floorid = page.data.floor.id;
        
        
        client.data.execute("cb.getAssetsForFloor", args, function(response){
            console.log(response);
            client.getWidget("FloorplanViewer456").clearData();
            client.sendClientEvent("ce_assets_FloorView", response);
            client.sendClientEvent("ce_assets_FloorView_table", response);

        });
        
        client.data.execute("cb.getSpacesForFloor", args, function(response){
            client.sendClientEvent("ce_spaces_FloorView", response);             
        });
        
        
        
    };
    
    
    page.data.floor.initializeToDefaultValues();
       
    
    var args = {};
    args.id = parameters.id;
    
    client.getWidget("FloorplanViewer9").isVisible = false;
	client.getWidget("FloorplanViewer456").isVisible = true;
    
    client.data.execute("cb.getFloorById", args, function(response){
        page.data.floor.copyMatchingData(response);
        
        // get floor plan by id
        //cb.getFloorPlanById(id String)
        var args ={};
        args.id = response.floorplan;
        client.data.execute("cb.getFloorPlanById", args, function(response){
            console.log(response);
            var fpw = client.getWidget("FloorplanViewer9");
            var fpw2 = client.getWidget("FloorplanViewer456");
            if(response){
            	fpw.url = client.getDocumentUrl(response.path);
            	fpw2.url = client.getDocumentUrl(response.path);
            }
            else {
                fpw.url = client.getDocumentUrl('images/floorplanselect.png');
            	fpw2.url = client.getDocumentUrl('images/floorplanselect.png');
            }
        });
                  
    	page.data.refreshSpacesAndAssets();
        
    });
    
 
    
