if(page.data.selectedcustomer){
    var params = {};
    params.companyname = page.data.selectedcustomer.companyname;
    params.companyid = page.data.selectedcustomer.id;
    client.popupPage("contactpagepopup", "Add Contact", params, function(response){
        var params = {
            where: {companyid: page.data.selectedcustomer.id},
            sort:{"ars_createdAt":-1}
        };

        select("Contacts", params, client, function(response){
            client.sendClientEvent( "ce_Contacts", response);       
        });
    });
}
else {
    client.infoDialog("Select a Customer from the table first", "No Customer Selected");
}