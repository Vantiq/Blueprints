
    var page = this;	
    console.log(parameters);
    regionName = parameters;
    
    
    page.data.refreshVehicles = function(){
        var args = {};
        args.organizationid = client.data.organization.id;
        
        console.log(client.data.organization.id);
        
        client.data.execute("cb.getVehicles", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_vehicles", response);


 
        });
        



        
    };
    
    
    

    page.data.refreshVehicles();