var thiscopy = this;
var cid = client.getStateObject().collaborationId;

var params = {where: {id: cid}};
select("system.collaborations", params, client, function(response){
    thiscopy.data.Workorders.id = response[0].results.Initiate.event.id;
    client.sendClientEvent("ce_assets", response[0].results.Initiate.event.assets);
    client.sendClientEvent("ce_contacts", response[0].results.Initiate.event.contacts);
    client.sendClientEvent("ce_skills", response[0].results.Initiate.event.skills);
});