	// RESET FORM
	page.data.Technicians.initializeToDefaultValues();
	page.data.dbid = null;     
    client.sendClientEvent("ce_techskills", page.data.Technicians.skills);
	// END RESET FORM