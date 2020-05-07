    console.log(extra);
    if(extra.columnName === "ButtonView"){
        client.goToPage("BuildingView", extra.dataObject);
    }
    
    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        
        client.confirmCustom("Are you sure you want to delete the Building","Yes","No",function(clicked)
                             {
            if (clicked === "Yes"){
                client.data.execute("cb.deleteBuilding", {buildingid: extra.dataObject.id}, function(response){
                    page.data.refreshBuildings();
                });
            }

        });
        
        
    }