//$sensormanufacturers.sensormanufactureraddmodify.popup.title = Add a Sensor Manufacturer
   var popupTitle = client.formatMsg("$sensormanufacturers.sensormanufactureraddmodify.popup.title");

//   client.popupPage("SensorManufacturerAddModify","Add a Sensor Manufacturer",null,function(returnParameters)
   client.popupPage("SensorManufacturerAddModify",popupTitle,null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSensorManufacturers();
   });