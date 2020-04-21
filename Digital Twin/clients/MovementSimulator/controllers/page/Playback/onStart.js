	var page = this;

    page.data.refreshSimulations = function(){
        //sim.getSimulations()
        client.data.execute("sim.getSimulations", {}, function(response){
            client.sendClientEvent("ce_s_simulations", response);
        });
    };
    
    page.data.refreshSimulations();

