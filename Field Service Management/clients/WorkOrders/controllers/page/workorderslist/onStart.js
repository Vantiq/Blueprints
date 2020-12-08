//Default list view is all tickets in the Assigned to currently logged in user.
    

var username = client.data.username;
    
var params = {};
    
 
if (this.data.statusworkorders === "All"){
    params = {
        where: { $and: [
            {techId: username}
        ] }
    };   
} else {
    params = {
        where: { $and: [
            {"status": this.data.statusworkorders},
            {techId: username}
        ] }
    };  
}

select("Workorders",params, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});
