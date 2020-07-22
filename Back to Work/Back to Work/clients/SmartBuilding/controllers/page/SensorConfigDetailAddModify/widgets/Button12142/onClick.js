       //if (client.data.iAmNewSensor) {
       //   page.data.sensorConfigDetail.id = client.data.id;
       //   page.data.sensorConfigDetail.sensorId = client.data.sensorId;
       //}
        //
        //
        //
        //console.log("using uuid: ".concat(page.data.sensorConfigDetail.id));
        //var http = new Http();
        //http.setVantiqUrlForResource("sensorConfigDetail");
        //http.setVantiqHeaders();
        client.data.upsert("sensorConfigDetail",page.data.sensorConfigDetail, function(response) {
           // client.infoDialog("sensorConfigDetail " + page.data.sensorConfigDetail.id + " submitted."); 
            console.log("sensorConfigDetail " + page.data.sensorConfigDetail.id + " submitted. sensorId="+page.data.sensorConfigDetail.sensorId);
            //var parameters = {};
            //parameters.id = page.data.sensorConfigDetail.sensorId;
            //client.goToPage("SensorConfigDetail", parameters);

            client.goToPage("SensorAddModify",page.data.sensor.values);            
        }, function(errors) {
            client.errorDialog("Upsert failed: " + JSON.stringify(errors));
        });
    
        //var args = {};
        //args.SensorId = client.data.sensorId;
        //client.returnToCallingPage();
        //client.data.execute("cb.getSensorConfigDetail", args, function(response){
        //client.sendClientEvent("ce_sensorConfigDetail", response);
        //});

        //client.goToPage("SensorConfigDetail", client.data.sensorId);