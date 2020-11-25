upsert("Locations", page.data.Locations, client, function(response){
    client.returnToCallingPage(client.data.Customers);
});