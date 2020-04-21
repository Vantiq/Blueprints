	var page = this;
    
    page.data.refreshSensorConfigs = function(response){
        client.data.execute("cb.getSensorConfigs", {}, function(response){
			client.sendClientEvent("ce_sensorconfigs_SensorConfigs", response);
        });
    };

    page.data.refreshSensorConfigs();