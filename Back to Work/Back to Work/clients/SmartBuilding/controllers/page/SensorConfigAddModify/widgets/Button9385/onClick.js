client.data.upsert("sensorconfigs", page.data.sensorconfig, function(response){
    client.returnToCallingPage();
});