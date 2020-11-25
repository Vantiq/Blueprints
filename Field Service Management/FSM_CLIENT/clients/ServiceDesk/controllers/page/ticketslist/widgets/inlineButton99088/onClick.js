if(page.data.selectedticket){
	client.goToPage("ticketpage", page.data.selectedticket);
}
else{
    client.infoDialog("Select a Ticket from the table", "No ticket selected");
}
