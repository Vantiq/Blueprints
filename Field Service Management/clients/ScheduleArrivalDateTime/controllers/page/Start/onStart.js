this.data.username = client.getUsername();
var thisCopy = this;

var udata = {};
udata.where = {username : this.data.username};
// get the users full name
select("Technicians", udata, client, function(response){
    client.data.fullname = response[0].fname + " " + response[0].lname;
});

client.getWidget("username").isVisible = false;

var thiscopy = this;
var cid = client.getStateObject().collaborationId;

var params = {where: {id: cid}};
select("system.collaborations", params, client, function(response){
    console.log(JSON.stringify(response));
    thiscopy.data.Workorders = response[0].results.Initiate.event;    
    client.sendClientEvent("ce_contacts", response[0].results.Initiate.event.contacts);
    
    thiscopy.data.address = response[0].results.Initiate.event.address; 
    thiscopy.data.description = response[0].results.Initiate.event.description; 
    
});