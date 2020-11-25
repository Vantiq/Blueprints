if(page.data.selectedcustomer){
    client.goToPage("customerpage", page.data.selectedcustomer);
}
else{
    client.infoDialog("Select a Customer from the table first", "No Customer Selected");
}