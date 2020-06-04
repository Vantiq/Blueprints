//$floorview.assetaddmodify.popup.title = Add Asset
   var popupTitle = client.formatMsg("$floorview.assetaddmodify.popup.title");

   var params = {};
   params.floorid = page.data.floor.id;

//   client.popupPage("AssetAddModify","Add Asset",params,function(returnParameters)
   client.popupPage("AssetAddModify",popupTitle,params,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSpacesAndAssets();
   });