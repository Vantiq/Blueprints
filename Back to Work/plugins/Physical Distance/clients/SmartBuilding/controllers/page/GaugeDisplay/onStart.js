    var page = this;
    

    console.log("parameters");
    console.log(parameters);
    
    // change the guage config
    var gauge = client.getWidget("Gauge1");
    gauge.maximum = parameters.config.display.config.maximum;
    gauge.minimum = parameters.config.display.config.minimum;
    gauge.lowColor = parameters.config.display.config.lowColor;
    gauge.lowZones = parameters.config.display.config.lowZones;
    gauge.mediumColor = parameters.config.display.config.mediumColor;
    gauge.mediumZones = parameters.config.display.config.mediumZones;
    gauge.highColor = parameters.config.display.config.highColor;
    gauge.highZones = parameters.config.display.config.highZones;
    gauge.title = parameters.config.display.config.title;
    

    page.data.sensor.initializeToDefaultValues();
	page.data.sensor.copyMatchingData(parameters);
    console.log(page.data.sensor);
        // unpause the sensor datastream
    var ds = client.getDataStreamByName("tq_sensors");
    var p = new TimedQueryParameters();
	console.log("page.data.sensor.id");
    console.log(page.data.sensor.id);
    p.whereClause = {
        id: page.data.sensor.id,
        type: "Volume"
    };

    client.modifyTimedQuery(ds,p);
    ds.isPaused = false;
    ds.restart();

    
    page.data.s_volumesenor.id = page.data.sensor.id;
    page.data.s_volumesenor.volume = page.data.sensor.data.value;
    console.log(page.data.s_volumesenor);
    client.sendClientEvent("ce_s_volumesensor_GaugeDisplay", page.data.s_volumesenor);
    
    
    
