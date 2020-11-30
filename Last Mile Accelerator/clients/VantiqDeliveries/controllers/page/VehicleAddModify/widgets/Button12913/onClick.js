	client.data.upsert("vehicle", page.data.vehicle, function(response){
        client.closePopup(page.data.vehicle);
        // client.goToPage("BuildingView", page.data.building);
	});