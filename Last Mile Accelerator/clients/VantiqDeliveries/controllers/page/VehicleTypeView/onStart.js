    var page = this;
    
    page.data.refreshVehicleTypes = function(){
        //cb.getAsasetTypes()
        client.data.execute("cb.getVehicleTypes", {}, function(response){
            client.sendClientEvent("ce_vehicletypes_VehicleTypeView", response);
        });
    };
    
    page.data.refreshVehicleTypes();
    