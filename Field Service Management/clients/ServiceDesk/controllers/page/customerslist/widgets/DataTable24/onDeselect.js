	page.data.selectedcustomer = null;
    
    // Blank out the Locations and Contacts
    client.sendClientEvent( "ce_Locations", []);       
	client.sendClientEvent( "ce_Contacts", []);
    