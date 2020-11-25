this.data.customerid = parameters.customerId;
this.data.customer = parameters.customer;
this.data.dbid = parameters._id;


var paramsContacts = {
    where: {companyid:parameters.customerId}
};

select("Contacts", paramsContacts, client, function(response){
    client.sendClientEvent("ce_Contacts",response);
});

