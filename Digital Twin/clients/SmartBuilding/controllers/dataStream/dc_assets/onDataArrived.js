    var page = client.aps.currentPopup.page;
    console.log(page);

    if (page.name === "FloorplanDisplay"){
        if (data.floorid !== page.data.dcfloorid){
            //cb.getFloorplanByFloorId(floorid String)
            client.data.execute("cb.getFloorplanByFloorId", {floorid:data.floorid}, function(response){
                client.getWidget("FloorplanViewer756").url = response.path;
            });
        }


        page.data.dcfloorid = data.floorid;
    }
    
    client.sendClientEvent("ce_dc_assets", data);