var params;
var match = page.data.searchtickets;
console.log(match);
if (match){
	params = {
        where: { $or: [
                    {summary: {$regex: match, $options:"i"}}, 
                    {description: {$regex: match, $options:"i"}},
                    {customer: {$regex: match, $options:"i"}},
                    {status: {$regex: match, $options:"i"}}
            	]}
	};    
}

select("Tickets",params, client, function(response){
    client.sendClientEvent("ce_Tickets",response);
    client.sendClientEvent("ce_Workorders",[]);
});
