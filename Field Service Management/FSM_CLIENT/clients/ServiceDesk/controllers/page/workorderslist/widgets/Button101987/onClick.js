select("Workorders", null, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});