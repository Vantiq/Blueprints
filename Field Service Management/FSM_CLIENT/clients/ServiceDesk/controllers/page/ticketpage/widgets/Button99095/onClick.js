client.popupPage("customerpopup", "Select a Customer for the Ticket", null, function(response){
    if(response){
        page.data.Tickets.customerId = response.id;
        page.data.Tickets.customer = response.companyname;
    }        
});