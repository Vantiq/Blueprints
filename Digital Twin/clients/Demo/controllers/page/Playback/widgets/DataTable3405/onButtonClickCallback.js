    if (extra.columnName === "ButtonPlay"){
        // sim.playbackSimulation(name String, skip Integer)
        var args ={};
        args.name = extra.dataObject.name;
        args.skip = 0;
        client.data.execute("sim.playbackSimulation", args, function(response){

        });
    }
