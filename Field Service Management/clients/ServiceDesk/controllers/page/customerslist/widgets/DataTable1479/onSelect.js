var params = {};
params.companyname = page.data.selectedcustomer.companyname;
params.companyid = page.data.selectedcustomer.id;
extra.companyname = page.data.selectedcustomer.companyname;

client.popupPage("contactpagepopup", "Edit Contact", extra, function(response){
    var params = {
        where: {companyid: page.data.selectedcustomer.id},
        sort:{"ars_createdAt":-1}
    };

    select("Contacts", params, client, function(response){
        client.sendClientEvent( "ce_Contacts", response);       
    });
});

