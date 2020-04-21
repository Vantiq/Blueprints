	console.log(extra);
    
    if (extra.columnName === "ButtonDelete"){
        var args ={};
        args.name = extra.dataObject.name;
        client.data.execute("sim.deleteMovementSimulation", args, function(response){
			page.data.refreshSimulations();
        });
    }
        
    if (extra.columnName === "ButtonPlay"){
        // sim.playbackSimulation(name String, skip Integer)
        var args ={};
        args.name = extra.dataObject.name;
        args.skip = 0;
        client.data.execute("sim.playbackSimulation", args, function(response){

        });
    }
