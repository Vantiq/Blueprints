	console.log(extra);
    if(extra.columnName === "ButtonEdit"){

        var params = extra.dataObject;

        client.popupPage("SensorTypeAddModify","Edit sensor type",params,function(returnParameters)
                         {    
            console.log("The Return Parameters: " + returnParameters);
            page.data.refreshSensorTypes();
        });
    }