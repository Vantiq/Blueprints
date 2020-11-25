var params = {};
params.companyid = page.data.Customers.id;
extra.companyname = page.data.Customers.companyname;

client.popupPage("contactpagepopup", "Add Contacts", extra, function(response){
    var params = {
        where: {companyid: page.data.Customers.id},
        sort:{"ars_createdAt":-1}
    };

    select("Contacts", params, client, function(response){
        client.sendClientEvent( "ce_Contacts", response);       
    });
});
