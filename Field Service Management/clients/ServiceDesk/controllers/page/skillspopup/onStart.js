select("Skills", null, client, function(response){
    client.sendClientEvent("ce_Skills", response);
});
