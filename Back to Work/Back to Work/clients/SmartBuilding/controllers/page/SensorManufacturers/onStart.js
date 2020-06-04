	var page = this;

    page.data.refreshSensorManufacturers = function(){
        //cb.getSensorManufacturers()
        client.data.execute("cb.getSensorManufacturers", {}, function(response){
            client.sendClientEvent("ce_sensormanufacturers_SensorManufacturers", response);
        });
    };
    
    
    page.data.refreshSensorManufacturers();