    var page = this;
    //client.parameters.push(parameters);
    vehicleId = parameters;
    console.log('parameters: ' + parameters);
    console.log('vehicleId: ' + vehicleId);
    
    page.data.refreshDrivers= function(){
        //cb.getAsasetTypes()
        client.data.execute("cb.getDrivers", {}, function(response){
            client.sendClientEvent("ce_drivers", response);
        });
    };
    
    page.data.refreshDrivers();