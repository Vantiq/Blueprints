var params = {};
params.locationid = page.data.Locations.id;
params.companyid = page.data.Locations.customerid;
params.customername = page.data.Locations.customername;
params.locationname = page.data.Locations.name;

client.popupPage("contactpagepopup", "Add Contact", params, function(response){
    var params = {
        where: {locationid: page.data.Locations.id},
        sort:{"ars_createdAt":-1}
    };

    select("Contacts", params, client, function(response){
        client.sendClientEvent( "ce_Contacts", response);       
    });
});

