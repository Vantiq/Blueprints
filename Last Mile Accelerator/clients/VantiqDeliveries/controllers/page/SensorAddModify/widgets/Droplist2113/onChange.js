	
    if (page.data.sensorconfig !== "-select-"){
        //cb.getSensorConfigById(id String)
        var args ={};
        args.id = page.data.sensorconfig;
        client.data.execute("cb.getSensorConfigById", args, function(response){
            page.data.sensor.config = response.config;
        });
    }