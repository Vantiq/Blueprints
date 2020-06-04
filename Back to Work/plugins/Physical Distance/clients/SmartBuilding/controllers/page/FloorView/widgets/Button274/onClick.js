//$floorview.flooraddmodify.popup.title = Modify floor
   var popupTitle = client.formatMsg("$floorview.flooraddmodify.popup.title");
//   client.popupPage("FloorAddModify","Modify floor", page.data.floor.values, function(returnParameters){    
   client.popupPage("FloorAddModify",popupTitle, page.data.floor.values, function(returnParameters){    
       //page.data.refreshBuildings();
       page.data.floor.copyMatchingData(returnParameters);
   });