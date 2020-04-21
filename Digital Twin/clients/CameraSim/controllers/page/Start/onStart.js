	client.data.facePageLoaded = true;
    
    // sim.getUserRecord(personnel_id String)
    var args = {};
    args.personnel_id = client.getUsername();
    client.data.execute("sim.getUserRecord", args, function(response){
    	client.data.person = response;
	});
    