	client.data.upsert("package", page.data.package, function(response){
        client.closePopup(page.data.package);
        // client.goToPage("BuildingView", page.data.building);
	});