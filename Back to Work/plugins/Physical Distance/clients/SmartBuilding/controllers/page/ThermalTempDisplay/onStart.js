	var page = this;
    //cb.getCollabContext(id String)
    console.log("parameters");
    console.log(parameters);
    console.log("parameters");
    client.data.execute("cb.getCollabContext", {id:parameters.collaborationid}, function(response){
        page.data.collabcontext = response;
    	client.getWidget("FloorplanViewer864").url = response.floorplan.path;
        client.sendClientEvent("ce_assets_ThermalTempDisplay", response.asset);
        
        // var image = response.cameraevent.img;
        var image = response.collaboration.results.Initiate.event.img;
        var html = `<img src="${image}" alt="Person with high body temp" width="100" height="100"/>`;  // jshint ignore:line
        client.getWidget("StaticHtml172").html = html;
        
        
        //response.cameraevent.img
        //<img src="${image}" alt="Person with high body temp"/>
	});
    