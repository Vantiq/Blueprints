page.data.selectedcustomer = extra;
client.data.customerdbid = extra._id;

var paramsLocations = {
    where: {customerid:extra.id}
};

var paramsContacts = {
    where: {companyid:extra.id}
};

select("Locations", paramsLocations, client, function(response){
    client.sendClientEvent("ce_Locations",response);
});

select("Contacts", paramsContacts, client, function(response){
    client.sendClientEvent("ce_Contacts",response);
});

