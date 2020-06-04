	var page = this;
    var collab = client.getCollaborationContext();
    
    
    var img = collab.collaboration.results.Initiate.event.img;
    var temp = collab.collaboration.results.Initiate.event.temperature;
        
    var StaticHtml92 = client.getWidget("StaticHtml92");
    var html92 = StaticHtml92.html;
    html92 += temp ;
    StaticHtml92.html = html92;
    
    var widget = client.getWidget("StaticHtml82");
    html = `<img src="${img}" alt="Person With High Body Temp" width="100" height="100" />`; // jshint ignore:line
    widget.html = html;
    
    page.data.space = collab.space.name;
    
    page.data.floor = collab.floor.name;
    
    page.data.building = collab.building.name;
    
    
    client.getWidget("FloorplanViewer837").url = collab.floorplan.path;
    
    client.sendClientEvent("ce_assets", collab.asset);
    
    
    //alert(JSON.stringify(collab));
    //client.data.selectOne(resource, dbid, function(response){
    
	//});

    
    
    
    