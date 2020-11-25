select("Contacts", null, client, function(response){
    client.sendClientEvent("ce_Contacts",response);
});
