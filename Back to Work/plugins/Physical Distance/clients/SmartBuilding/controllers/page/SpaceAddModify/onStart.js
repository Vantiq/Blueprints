    var page = this;
    
    page.data.space.initializeToDefaultValues();
    
    /*
    // this isn't working to clear markers
    var fpWidget = client.getWidget("FloorplanViewer31");
    fpWidget.clearMarkers();
    */    
    client.sendClientEvent("ce_spaces_SpaceAddModify", []);
    
    console.log(parameters);
    
    if (parameters.hasOwnProperty('floorplanurl')){
		client.getWidget("FloorplanViewer31").url = parameters.floorplanurl;
	}
    
    page.data.space.floorid = parameters.id;
    
    //cb.getSpaceById(id String)
    client.data.execute("cb.getSpaceById", {id: parameters.id}, function(response){
        page.data.space.copyMatchingData(response);

        
        
        if(!response){
            page.data.space.id = client.generateUUID();
        } else {
            if (response.hasOwnProperty('floorplanurl')){
                client.getWidget("FloorplanViewer31").url = response.floorplanurl;
            } 
        }
    });
    
    
    
    
    
    
    
