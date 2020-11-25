// getLocations(client, page.data.searchlocations);
var match = page.data.searchlocations;
var params;

if (match){
    params = {
        where: { "$or":[
            {name: {$regex: match, $options:"i"}},
            {customername: {$regex: match, $options:"i"}}
        	]
		}        
	};
}

select("Locations", params, function(response){
    client.sendClientEvent("ce_Locations",response);
});
