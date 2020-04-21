    client.data.upsert("assets", page.data.asset, function(response){
		client.closePopup(page.data.asset.values);
    });