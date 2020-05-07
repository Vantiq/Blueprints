    if(extra.columnName === "ButtonView"){
        client.goToPage("FloorView", extra.dataObject);
    }
    
    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        
        client.confirmCustom("Are you sure you want to delete this floor","Yes","No",function(clicked)
                             {
            if (clicked === "Yes"){
                client.data.execute("cb.deleteFloor", {floorid: extra.dataObject.id}, function(response){
                    page.data.refreshFloors();
                });
            }

        });
        
        
    }