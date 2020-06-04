//$floorview.datatable.buttondelete.asset.confirm.msg = Are you sure you want to delete this asset. This operation cannot be undone
    
	console.log(extra);
    if (extra.columnName === "ButtonView"){
        // get the full record for the asset and pass to asset page
        //cb.getAssetById(id String)
        client.data.execute("cb.getAssetById", {id: extra.dataObject.id}, function(response){
            client.goToPage("AssetView", response);
        });
    }
    
    if(extra.columnName === "ButtonDelete"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$floorview.datatable.buttondelete.asset.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete this asset.  This operation cannot bne undone","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
//            if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
                client.data.execute("cb.deleteAsset", {assetid: extra.dataObject.id}, function(response){
                    page.data.refreshSpacesAndAssets();
                });
        	}
        });
            
	}

        
    