var params = {};
params.companyname = page.data.Customers.companyname;
params.companyid = page.data.Customers.id;
client.popupPage("locationpagepopup", "Add Location", params, function(response){
    var params = {
        where: {customerid: page.data.Customers.id},
        sort:{"ars_createdAt":-1}
    };

    select("Locations", params, client, function(response){
        client.sendClientEvent( "ce_customerlocations", response);       
    });
});
