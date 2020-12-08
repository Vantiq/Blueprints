var thisCopy = this;

// get the buttons
var cb = client.getWidget("customerBtn");
var rb = client.getWidget("resetBtn");
var cpt = client.getWidget("customerpagetitle");

// determine if the page is opened up new or opened from customer list
if (parameters){
    // so you can repopulate from location page
    client.data.Customers = parameters;
    
    // reset button not present for exsiting record
    rb.isVisible = false;   
    cb.buttonLabel = "Update Customer";
    cpt.text = "Update Customer";
    
    // get the dbid for update
	this.data.dbid = client.data.customerdbid;  
    
    // populate any mathching data
    this.data.Customers.copyMatchingData(parameters); 
    
    var paramsLocation = {
        where: {customerid: this.data.Customers.id},
        sort:{"ars_createdAt":-1}
    };
    
	var paramsContacts = {
        where: {companyid	: this.data.Customers.id},
        sort:{"ars_createdAt":-1}
    };


    select("Locations", paramsLocation, client, function(response){
        client.sendClientEvent( "ce_customerlocations", response);       
    });
    
    select("Contacts", paramsContacts, client, function(response){
        client.sendClientEvent( "ce_Contacts", response);       
    });
    
} else {
    cpt.text = "Create Customer";
    cb.buttonLabel = "Submit Customer";
    
    // reset button should be seen
	rb.isVisible = true;   
    
    this.data.Customers.initializeToDefaultValues();
	client.sendClientEvent("ce_customerlocations",  []);  
    client.sendClientEvent("ce_Contacts",  []);  

    // since this is a new record generate a UUID
    uuid(function(value){
    	thisCopy.data.Customers.id = value;
	});
    
}
