 	console.log(extra);
    //alert("look in the console to see what's in extra");
    if(extra.columnName === "ButtonEdit"){
        var params = {};
        params.notification = extra.dataObject;
        params.sensor = page.data.sensor.values;
        client.goToPage("SensorConfigDetailAddModify", params);
    }

    if(extra.columnName === "ButtonRemove"){

        client.confirmCustom("Are you sure you want to delete?","Yes","No",function(clicked){
            if (clicked === "Yes"){
                client.data.deleteOne("sensorConfigDetail", extra.dataObject._id, function(response){
                    page.data.refreshSensorConfigDetail();
                });
            }

        });
    }