var params = {};
params.customerid = page.data.Customers.id;
extra.companyname = page.data.Customers.companyname;

client.popupPage("locationpagepopup", "Add Location", extra, function(response){
    var params = {
        where: {customerid: page.data.Customers.id},
        sort:{"ars_createdAt":-1}
    };

    select("Locations", params, client, function(response){
        client.sendClientEvent( "ce_customerlocations", response);       
    });
});
