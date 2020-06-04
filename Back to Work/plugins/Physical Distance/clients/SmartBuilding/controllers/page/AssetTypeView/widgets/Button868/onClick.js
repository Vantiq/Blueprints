

   client.popupPage("AssetTypeAddModify","Add an asset type", null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshAssetTypes();
   });