var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
    // upsert does an insert or update, but we let the user know they might be doing an upsert
    // with a chance to bail
	if (client.getWidget("customerBtn").buttonLabel == "Update Customer"){
    	
        	
        //Perform Update
        // update(resource, data, dbid, client, callback)
        update("Customers", page.data.Customers, client.data.customerdbid, client, function(){
            client.goToPage("customerslist");     	
        });
			
    	
	} else {
		//Perform Insert
		insert("Customers", page.data.Customers, client, function(response){
			client.goToPage("customerslist");            
        });
		
	}
}