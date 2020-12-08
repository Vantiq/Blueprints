// add the selected rows data set to a page property for the View Selected Ticket Button
page.data.selectedticket = extra;

// populate the related workorders table
var params = {
	where: {ticketId: extra.id}
};
select("Workorders", params, client, function(response){
	client.sendClientEvent("ce_Workorders", response);    
});
