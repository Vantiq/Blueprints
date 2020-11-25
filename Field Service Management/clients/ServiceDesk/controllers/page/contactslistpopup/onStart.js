this.data.companyid = parameters.id;

var paramsContacts = {
    where: {companyid:parameters.id}
};

select("Contacts", paramsContacts, client, function(response){
    client.sendClientEvent("ce_contactlistpopup",response);
});

