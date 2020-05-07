 

   client.popupPage("SensorManufacturerAddModify","Add a Sensor Manufacturer",null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSensorManufacturers();
   });