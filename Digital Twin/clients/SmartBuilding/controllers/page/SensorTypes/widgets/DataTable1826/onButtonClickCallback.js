	console.log(extra);
    if(extra.columnName === "ButtonEdit"){

        var params = extra.dataObject;

        client.popupPage("SensorTypeAddModify","Edit sensor type",params,function(returnParameters)
                         {    
            console.log("The Return Parameters: " + returnParameters);
            page.data.refreshSensorTypes();
        });
    }
    
    if(extra.columnName === "ButtonDelete"){
        client.confirmCustom("Are you sure you want to delete this Senor Type.  This operation cannot bne undone","Yes","No",function(clicked){
            if (clicked === "Yes"){
                //cb.deleteSensorType(type String)
                var args = {};
                args.type = extra.dataObject.name;
                client.data.execute("cb.deleteSensorType", args, function(response){
                    page.data.refreshSensorTypes();
                });

            }

        });
    }


