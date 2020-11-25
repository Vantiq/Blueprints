// get a list of tickets that are not closed
var params = {where:{status:{"$ne":"closed"}}};

select("Tickets", params, client, function(response){
    client.sendClientEvent("ce_Tickets",response);
});