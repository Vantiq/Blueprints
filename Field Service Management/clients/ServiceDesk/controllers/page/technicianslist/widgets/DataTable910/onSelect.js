//client.data.techniciandbid = extra._id;
//client.goToPage("technicianpage", extra);

// add the selected rows data set to a page property for the Edit Selected Technician Button
page.data.selectedtechnician = extra;

// populate the related skills table
var params = {
	where: {username: extra.username}
};
select("Technicians", params, client, function(response){
	client.sendClientEvent("ce_Skills", response[0].skills);    
});

