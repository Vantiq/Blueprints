    select("Customers", null, client, function(response){
        client.sendClientEvent("ce_Customers",response);
    });

    this.data.selectedcustomer = null;

    // Blank out the Locations and Contacts (from previous selection)
    client.sendClientEvent( "ce_Locations", []);       
	client.sendClientEvent( "ce_Contacts", []);
