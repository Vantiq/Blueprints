select("Customers", null, client, function(response){
    client.sendClientEvent("ce_Customers",response);
});

this.data.selectedcustomer = null;
