//$building.buildingaddmodify.popup.title = Add a building
   var popupTitle = client.formatMsg("$building.buildingaddmodify.popup.title");
//   client.popupPage("BuildingAddModify","Add a building", null,function(returnParameters){    
   client.popupPage("VehicleAddModify","Add Vehicle", null,function(returnParameters){    
       page.data.refreshVehicles();
   });