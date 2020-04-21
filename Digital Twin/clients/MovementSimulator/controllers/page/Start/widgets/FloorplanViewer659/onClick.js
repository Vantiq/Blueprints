    if (page.validate()){

		page.data.movementsimulations.id = client.generateUUID();
        var date = Date(); 
        page.data.movementsimulations.timestamp = date;

        console.log(extra);

        var loc = {};
        loc.type = "Point";
        loc.coordinates = [extra.floorPlanUnitsY, extra.floorPlanUnitsX];

        page.data.movementsimulations.location = loc;
        
        client.data.insert("movementsimulations",  page.data.movementsimulations.values, function(response){
			// refresh the map
        });

    }