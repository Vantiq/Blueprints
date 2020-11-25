client.popupPage("locationpagepopup", "Edit Location", extra, function(response){
    var params = {
        where: {customerid: page.data.selectedcustomer.id},
        sort:{"ars_createdAt":-1}
    };

    select("Locations", params, client, function(response){
        client.sendClientEvent( "ce_Locations", response);       
    });
});
