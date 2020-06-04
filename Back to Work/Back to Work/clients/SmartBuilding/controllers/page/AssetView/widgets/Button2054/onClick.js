    client.popupPage("AssetAddModify","Edit an asset",page.data.asset.values ,function(returnParameters){    
        
        console.log("returnParameters");
        console.log(returnParameters);
        if (returnParameters !== "CANCEL")
            page.data.preparePage(returnParameters);
    });
