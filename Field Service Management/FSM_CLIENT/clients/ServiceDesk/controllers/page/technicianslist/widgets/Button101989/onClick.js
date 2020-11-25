select("Technicians", null, client, function(response){
	client.sendClientEvent("ce_Technicians", response);
	client.sendClientEvent("ce_Skills", []);
});

