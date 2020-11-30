

   client.popupPage("VehicleTypeAddModify","Add an vehicle type", null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshVehicleTypes();
   });