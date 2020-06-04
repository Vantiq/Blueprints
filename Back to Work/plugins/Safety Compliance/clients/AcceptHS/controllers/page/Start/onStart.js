var page = this;
    var collab = client.getCollaborationContext();
    client.data.debug({"getCollaborationContext":collab});
    
    // cb.getCollabContext(id String)
    client.data.execute("cb.getCollabContext", {id:collab.collaboration.id}, function(response){
        client.data.debug({"response":response});
        page.data.space = response.space.name;   
        page.data.floor = response.floor.name;
        page.data.building = response.building.name;


        client.getWidget("FloorplanViewer883").url = response.floorplan.path;

        client.sendClientEvent("ce_assets", response.asset);
        
        var g = {};
        g.id = response.sensor.id;
        g.value = response.sensor.data.value;
        client.sendClientEvent("ce_sensorData", g);
        
        
    });
    
    
    
    
    
        
    

   