	client.data.upsert("buildings", page.data.building, function(response){
        client.closePopup(page.data.building);
        // client.goToPage("BuildingView", page.data.building);
	});