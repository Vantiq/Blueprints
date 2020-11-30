	// cb.getFloorPlanById(id String)
    var args = {};
    args.id = page.data.floor.floorplan;
    client.data.execute("cb.getFloorPlanById", args, function(response){
       client.getWidget("StaticImage1").url = client.getDocumentUrl(response.path); 
    });