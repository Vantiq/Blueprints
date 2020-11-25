this.data.customerid = parameters.id;

params = {
		where: {customerid: parameters.id}        
};

select("Locations", params , client, function(response){
    client.sendClientEvent("ce_locationlistpopup",response);
});
