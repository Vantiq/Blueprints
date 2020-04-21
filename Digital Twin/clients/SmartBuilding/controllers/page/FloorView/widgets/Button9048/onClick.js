   var params = {};
   params.floorid = page.data.floor.id;

   client.popupPage("AssetAddModify","Add Asset",params,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSpacesAndAssets();
   });