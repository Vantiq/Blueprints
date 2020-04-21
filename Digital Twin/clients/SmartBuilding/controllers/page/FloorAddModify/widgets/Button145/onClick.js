	client.data.upsert("floors", page.data.floor, function(response){
        client.closePopup(page.data.floor);
	});