//$assetts.datatable.buttondelete.confirm.msg = Are you sure you want to delete the Asset
    
	// console.log(extra);
    if (extra.columnName === "ButtonView"){
        client.goToPage("AssetView", extra.dataObject);
    }
    
    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$assetts.datatable.buttondelete.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete the Asset","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
//            if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
                client.data.execute("cb.deleteAsset", {assetid: extra.dataObject.id}, function(response){
                    page.data.refreshAssets();
                });
            }

        });
        
   
    }
    
    if (extra.columnName === "ButtonEdit"){

        client.popupPage("AssetAddModify","Edit an asset", extra.dataObject ,function(returnParameters){    
				page.data.refreshAssets();
        });


    }
    
            
        
        