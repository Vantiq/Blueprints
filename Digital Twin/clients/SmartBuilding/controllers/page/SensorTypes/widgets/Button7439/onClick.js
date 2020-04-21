   var params = {};

   client.popupPage("SensorTypeAddModify","Add a sensor type",params,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSensorTypes();
   });