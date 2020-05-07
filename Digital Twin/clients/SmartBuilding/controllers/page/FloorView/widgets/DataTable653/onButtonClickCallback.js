	console.log(extra);
    if (extra.columnName === "ButtonView"){
        // get the full record for the asset and pass to asset page
        //cb.getAssetById(id String)
        client.data.execute("cb.getAssetById", {id: extra.dataObject.id}, function(response){
            client.goToPage("AssetView", response);
        });
    }
    
    if(extra.columnName === "ButtonDelete"){
        client.confirmCustom("Are you sure you want to delete this asset.  This operation cannot bne undone","Yes","No",function(clicked){
            if (clicked === "Yes"){
                client.data.execute("cb.deleteAsset", {assetid: extra.dataObject.id}, function(response){
                    page.data.refreshSpacesAndAssets();
                });
        	}
        });
            
	}

        
    