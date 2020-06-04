//$sensortypes.sensortypeaddmodify.popup.title = Add a sensor type
   var popupTitle = client.formatMsg("$sensortypes.sensortypeaddmodify.popup.title");

    var params = {};

//   client.popupPage("SensorTypeAddModify","Add a sensor type",params,function(returnParameters)
   client.popupPage("SensorTypeAddModify",popupTitle,params,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshSensorTypes();
   });