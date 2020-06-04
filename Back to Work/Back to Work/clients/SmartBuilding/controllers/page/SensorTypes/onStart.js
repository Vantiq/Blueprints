    
    var page = this;
    
    page.data.refreshSensorTypes = function(){


        client.data.execute("cb.getSensorTypes", {}, function(response){
            client.sendClientEvent("ce_sensortypes_SensorTypes", response);

        });
    };
    
    page.data.refreshSensorTypes();