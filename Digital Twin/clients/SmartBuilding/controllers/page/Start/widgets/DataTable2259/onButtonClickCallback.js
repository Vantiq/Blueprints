    if(extra.columnName === "ButtonView"){
		console.log(extra.dataObject);
        var collaborationid = extra.dataObject.collaborationid;
        console.log("collaborationid");
        console.log(collaborationid);
        var id = extra.dataObject.sensorId;
        var type = extra.dataObject.sensortype;
        console.log("id:" + id);
        console.log("type:" + type);
        
        client.data.execute("cb.getSensorByIdAndType", {id:id, type:type}, function(response){
            response.collaborationid = collaborationid;
            console.log("response");
            console.log(response);
            client.popupPage(extra.dataObject.sensorconfig.display.page,"Sensor Info",response,function(returnParameters){

                console.log("The Return Parameters: " + returnParameters);
            });
        });
    }
    
    /*
    if(extra.columnName === "ButtonView"){
        if (extra.dataObject.sensortype === "Volume" || extra.dataObject.sensortype === "Temperature"){
            //client.goToPage("SensorViewVolume", extra.dataObject);
            var id = extra.dataObject.sensorId;
            var type = extra.dataObject.sensortype;


            //extra.dataObject.config.display.page
            client.data.execute("cb.getSensorByIdAndType", {id:id, type:type}, function(response){
                client.popupPage(extra.dataObject.sensorconfig.display.page,"Sensor Info",response,function(returnParameters){

                    console.log("The Return Parameters: " + returnParameters);
                });
            });


        }
    }
    */