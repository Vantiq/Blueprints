    console.log("parameters");
    console.log(parameters);
    
    client.getWidget("StaticText54940").text = parameters.person.assetid; //parameters.person.firstname + " " + parameters.person.lastname;
    // cb.getSensorForAssetByType(assetid String, type String)
    client.data.execute("cb.getSensorForAssetByType", {assetid:parameters.person.assetid, type:"IndoorLocation"}, function(response){
		// lookup trace
        console.log(response);
        
        //cb.contactTraceBySensorId(id String, interval String)
        var args = {};
        args.id = response.id;
        args.interval = "2 days";
        console.log(args);
        client.data.execute("cb.contactTraceBySensorId", args, function(response){
    		console.log(response);
            client.sendClientEvent("ce_s_traceresults_ContactTracing", response);

            /*
            var table = $('#DataTable3896 table').DataTable( {
                dom: 'Bfrtip',
                buttons: ['csv', 'excel', 'print'],
                searching: false,
                destroy: true
            } );
            */
			//client.sendClientEvent("ce_s_traceresults_ContactTracing", response);
            
            
		});
    });
    
    
    

  