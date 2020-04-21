   client.popupPage("FloorAddModify","Modify floor", page.data.floor.values, function(returnParameters){    
       //page.data.refreshBuildings();
       page.data.floor.copyMatchingData(returnParameters);
   });