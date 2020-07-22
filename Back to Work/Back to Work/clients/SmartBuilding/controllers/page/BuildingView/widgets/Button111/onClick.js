//$buildingview.buildingaddmodify.popup.title = Modify a building
   var popupTitle = client.formatMsg("$buildingview.buildingaddmodify.popup.title");
   //client.popupPage("BuildingAddModify","Modify a building", page.data.building, function(returnParameters){    
   client.popupPage("BuildingAddModify",popupTitle, page.data.building, function(returnParameters){    
       //page.data.refreshBuildings();
       console.log("return parameters");
       console.log(returnParameters);
       page.data.building.copyMatchingData(returnParameters);
       page.data.schedule.copyMatchingData(returnParameters.schedule);

   });