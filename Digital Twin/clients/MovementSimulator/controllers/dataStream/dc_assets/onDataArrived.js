	var page = client.getCurrentPage();
    if (data.floorid !== page.data.floorid){
        //cb.getFloorplanByFloorId(floorid String)
        client.data.execute("cb.getFloorplanByFloorId", {floorid:data.floorid}, function(response){
    		client.getWidget("FloorplanViewer661").url = response.path;
		});
    }
    
    
    page.data.floorid = data.floorid;