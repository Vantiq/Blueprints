var params;
var match = page.data.search;
if (match){
    params = {
		where: { $and: [
            {customerid: page.data.customerid },
            {name: {$regex: match, $options:"i"}}
        ]}        
	};
} else {
    params = {
		where: {customerid: page.data.customerid }        
	};
}


select("Locations", params , client, function(response){
    client.sendClientEvent("ce_locationlistpopup",response);
});
