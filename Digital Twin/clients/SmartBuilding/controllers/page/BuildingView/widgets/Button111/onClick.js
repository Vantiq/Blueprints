   client.popupPage("BuildingAddModify","Modify a building", page.data.building, function(returnParameters){    
       //page.data.refreshBuildings();
       page.data.building.copyMatchingData(returnParameters);
   });