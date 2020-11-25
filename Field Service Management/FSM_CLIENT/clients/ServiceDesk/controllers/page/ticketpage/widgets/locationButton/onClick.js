// can't select location unless customer has been selected
if (page.data.Tickets.customerId){
	var params = {};
	params.id = page.data.Tickets.customerId;
    client.popupPage("locationlistpopup", "Select a Customer Location for the Ticket", params, function(response){
        if (response){
            page.data.Tickets.locationid = response.id;
            page.data.Tickets.locationname = response.name;
        }
    });
} else {
    client.infoDialog("Select a Customer before selecting a Customer Location", "No Customer Selected");
}