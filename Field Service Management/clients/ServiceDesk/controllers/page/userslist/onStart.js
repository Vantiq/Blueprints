select("Users", null , client, function(response){
    client.sendClientEvent("ce_Users",response);
});
