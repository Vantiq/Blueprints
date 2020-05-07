	// console.log(extra);
    if (extra.columnName === "ButtonView"){
        client.goToPage("AssetView", extra.dataObject);
    }
    
    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        
        client.confirmCustom("Are you sure you want to delete the Asset","Yes","No",function(clicked)
                             {
            if (clicked === "Yes"){
                client.data.execute("cb.deleteAsset", {assetid: extra.dataObject.id}, function(response){
                    page.data.refreshAssets();
                });
            }

        });
        
        
    }