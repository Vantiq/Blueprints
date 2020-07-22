	client.data.upsert("sensors", page.data.sensor, function(response){
        
        //cb.getAssetForSensor(id String)
        client.data.execute("cb.getAssetForSensor", {id: page.data.sensor.id, type: page.data.sensor.type}, function(response){
            //client.returnToCallingPage(response);
            client.goToPage("Sensors",response);
        });
        
    	
	});