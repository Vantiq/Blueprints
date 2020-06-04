   var params = {};
    params.assetid = page.data.asset.id;
    
    client.goToPage("SensorAddModify",params);

    /*
   client.popupPage("SensorAddModify","Add Sensor",params,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       // cb.getSensorsForAsset(assetid String)
        var args ={};
        args.assetid = page.data.asset.id;
        client.data.execute("cb.getSensorsForAsset", args, function(response){
            client.sendClientEvent("ce_sensors_AssetView", response);
        });
   });
   */