select("Assets", null, client, function(response){
    client.sendClientEvent("ce_Assets",response);
});