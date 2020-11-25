var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
   client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
	
	page.data.Tickets.history = client.getWidget("HistoryText").html;
    
    if (!page.data.dbid){
        insert("Tickets", page.data.Tickets, client, function(response){            
        	client.goToPage("ticketslist");            
        });
    } else {
    	update("Tickets", page.data.Tickets, page.data.dbid, client, function(){
            client.goToPage("ticketslist");
        }); 
    }
}