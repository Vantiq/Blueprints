    console.log(extra);
    if(extra.columnName === "ButtonView"){
        if (extra.dataObject.type === "Volume" || extra.dataObject.type === "Temperature"){
            //client.goToPage("SensorViewVolume", extra.dataObject);
            var id = extra.dataObject.id;

            client.data.execute("cb.getSensorById", {id:id}, function(response){
                client.popupPage("GuageDisplay","Sensor Info",response,function(returnParameters){
                                    
                    console.log("The Return Parameters: " + returnParameters);
                });
            });


        }
    }