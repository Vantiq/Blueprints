// getLocations(client, this.data.searchlocations);

select("locations", null, client, function(response){
    client.sendClientEvent("ce_locations",response);
});

