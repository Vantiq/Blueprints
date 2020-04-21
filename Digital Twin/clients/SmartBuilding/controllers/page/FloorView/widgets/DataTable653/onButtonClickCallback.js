	console.log(extra);
    if (extra.columnName === "ButtonView"){
        // get the full record for the asset and pass to asset page
        //cb.getAssetById(id String)
        client.data.execute("cb.getAssetById", {id: extra.dataObject.id}, function(response){
            client.goToPage("AssetView", response);
        });
    }