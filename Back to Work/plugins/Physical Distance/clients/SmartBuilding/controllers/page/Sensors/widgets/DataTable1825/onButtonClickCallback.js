//$sensors.datatable.buttondelete.confirm.msg = Are you sure you want to delete this sensor. This operation cannot be undone
    
    console.log(extra);
    if(extra.columnName === "ButtonDelete"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$sensors.datatable.buttondelete.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete this sensor.  This operation cannot bne undone","Yes","No",function(clicked){
//            if (clicked === "Yes"){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
           if (clicked === Client.CONFIRM_YES){
                client.data.deleteOne("sensors", extra.dataObject._id, function(response){
                    page.data.refreshSensors();
                });

            }

        });
    }
    
    if(extra.columnName === "ButtonEdit"){
        client.goToPage("SensorAddModify", extra.dataObject);
    }
    
    if(extra.columnName === "ButtonView"){

        var id = extra.dataObject.id;
        var type = extra.dataObject.type;
        client.data.execute("cb.getSensorByIdAndType", {id:id, type:type}, function(response){
            client.popupPage(extra.dataObject.config.display.page,"Sensor Info",response,function(returnParameters){

                console.log("The Return Parameters: " + returnParameters);
            });
        });
    }
    
    /*
    if(extra.columnName === "ButtonView"){
        if (extra.dataObject.type === "Volume" || extra.dataObject.type === "Temperature"){
            //client.goToPage("SensorViewVolume", extra.dataObject);
            var id = extra.dataObject.id;
            var type = extra.dataObject.type;

            
            //extra.dataObject.config.display.page
            client.data.execute("cb.getSensorByIdAndType", {id:id, type:type}, function(response){
                client.popupPage(extra.dataObject.config.display.page,"Sensor Info",response,function(returnParameters){
                                    
                    console.log("The Return Parameters: " + returnParameters);
                });
            });


        } else if (extra.dataObject.type === "IndoorLocation"){
            //extra.dataObject.config.display.page
            client.data.execute("cb.getSensorByIdAndType", {id:id, type:type}, function(response){
                client.popupPage(extra.dataObject.config.display.page,"Sensor Info",response,function(returnParameters){
                                    
                    console.log("The Return Parameters: " + returnParameters);
                });
            });
        }
    }
    */