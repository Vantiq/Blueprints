if(page.data.selectedtechnician){
    client.goToPage("technicianpage", page.data.selectedtechnician);
}
else{
    client.infoDialog("Select a Technician from the table first", "No Technician Selected");
}