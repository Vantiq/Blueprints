    var page = this;

    page.data.refreshSensors = function(){

        client.data.execute("cb.getSensors", {}, function(response){
            client.sendClientEvent("ce_sensors_Sensors", response);
        });
    };
    
    page.data.refreshSensors();
