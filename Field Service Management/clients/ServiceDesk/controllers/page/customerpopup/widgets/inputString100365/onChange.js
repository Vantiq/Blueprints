var match = page.data.searchcustomer;
var params;
if (match){
    params = {
        where: { $or: [
                    {companyname: {$regex: match, $options:"i"}}, 
                    {industry: {$regex: match, $options:"i"}},
                    {address: {$regex: match, $options:"i"}},
                    {website: {$regex: match, $options:"i"}}
            	]}
	};
}

select("Customers", params, client, function(response){
    client.sendClientEvent("ce_Customers",response);
});


