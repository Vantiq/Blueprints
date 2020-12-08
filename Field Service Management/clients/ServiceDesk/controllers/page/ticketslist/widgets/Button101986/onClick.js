select("Tickets",null, client, function(response){
    client.sendClientEvent("ce_Tickets",response);
    client.sendClientEvent("ce_Workorders",[]);
});