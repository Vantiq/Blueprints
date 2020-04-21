	var page = this;
    
    var collab = client.getCollaborationContext();
    client.data.debug(collab);
    page.data.patient = collab.patient.name;
    page.data.transport = collab.collaboration.results.Initiate.event.assettype;
    
    // cb.getTransportInfo(obj Object)
    
    client.data.execute("cb.getTransportInfo", {obj:collab.collaboration.results.Initiate.event}, function(response){
        page.data.dbuilding = response.dbuilding;
        page.data.dfloor = response.dfloor;
        page.data.dspace = response.dspace;
        page.data.obuilding = response.obuilding;
        page.data.ofloor = response.ofloor;
        page.data.ospace = response.ospace;
        
    });
    