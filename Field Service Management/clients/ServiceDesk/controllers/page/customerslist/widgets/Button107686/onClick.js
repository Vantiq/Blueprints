if(page.data.selectedcustomer){
    var params = {};
    params.companyname = page.data.selectedcustomer.companyname;
    params.companyid = page.data.selectedcustomer.id;
    client.popupPage("locationpagepopup", "Add Location", params, function(response){
        var params = {
            where: {customerid: page.data.selectedcustomer.id},
            sort:{"ars_createdAt":-1}
        };

        select("Locations", params, client, function(response){
            client.sendClientEvent( "ce_Locations", response);       
        });
    });
}

else{
    client.infoDialog("Select a Customer from the table first", "No Customer Selected");
}
