//Default list view is all tickets in the Assigned to currently logged in user.
var username = client.data.username;
var	params = {
        where: { $and: [
            {"status": "Assigned"},
            {techId: username}
        ] }
    };    

select("Workorders",params, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});
