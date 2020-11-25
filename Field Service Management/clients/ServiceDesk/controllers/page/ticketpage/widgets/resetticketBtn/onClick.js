	// RESET FORM
	page.data.Tickets.initializeToDefaultValues();
    client.sendClientEvent("ce_tpcontactslist", []);
    client.sendClientEvent("ce_tpAssets", []);

	// clear history widget
	client.getWidget("HistoryText").html = "";
	
	// default to status to open
	page.data.Tickets.status = "Open";

	// default created and assigned to the current user
	page.data.Tickets.createdBy = client.getUsername();
    page.data.Tickets.createdByName = client.data.userFullName;
    page.data.Tickets.assignedTo = page.data.Tickets.createdBy;
    page.data.Tickets.assignedDate = Date.now();
	uuid(function(value){ thisCopy.data.Tickets.id = value; });

