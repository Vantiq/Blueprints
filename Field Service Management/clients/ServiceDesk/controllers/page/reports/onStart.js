select("Tickets", null, client, function(response){
    client.sendClientEvent("ce_Tickets", response);
});

select("Workorders", null, client, function(response){
    client.sendClientEvent("ce_Workorders", response);
});



