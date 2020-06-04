

    // check if we are on a pop up page
    if (client.aps.currentPopup !== null){

        var poppage = client.aps.currentPopup.page;
        

        if (poppage.name === "FloorplanDisplay"){
            if (data.floorid !== poppage.data.dcfloorid){
                //cb.getFloorplanByFloorId(floorid String)
                client.data.execute("cb.getFloorplanByFloorId", {floorid:data.floorid}, function(response){
                    client.getWidget("FloorplanViewer756").url = response.path;
                });
            }


            poppage.data.dcfloorid = data.floorid;

            client.sendClientEvent("ce_dc_assets", data);
        }
    }


    var page = client.getCurrentPage();
    if (page.name === "FloorView"){
        console.log(data);
        console.log(page.data.floorid);
        if (data.floorid === page.data.floor.id){
            client.sendClientEvent("ce_assets_FloorView", data);
        }
    
    }
    
    
    
    
    