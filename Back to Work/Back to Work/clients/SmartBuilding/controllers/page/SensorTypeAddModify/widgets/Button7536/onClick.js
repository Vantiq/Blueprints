    client.data.upsert("sensortypes", page.data.sensortype, function(response){
		client.closePopup();
    });