if (extra.key === "Add") {
    var parameters = {};
    parameters.iAmNewSensor = true;
    parameters.sensorId = page.data.sensor.id;
    parameters.sensor = page.data.sensor.values;
    client.goToPage("SensorConfigDetailAddModify", parameters);
    
   //client.popupPage("SensorConfigDetailAddModify","Add Notification",parameters,function(returnParameters)
   //{    
   //    console.log("The Return Parameters: " + returnParameters);
   //    // cb.getSensorsForAsset(assetid String)
   //     //var args ={};
   //     //args.assetid = page.data.asset.id;
   //     //client.data.execute("cb.getSensorsForAsset", args, function(response){
   //     //    client.sendClientEvent("ce_sensors_AssetView", response);
   //     //});
   //});        
}