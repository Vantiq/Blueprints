    // cb.getFloorplanByFloorId(floorid String)
    var args ={};
    args.floorid = page.data.movementsimulations.floorid;
    client.data.execute("cb.getFloorplanByFloorId", args, function(response){
		client.getWidget("FloorplanViewer659").url = response.path;
    });