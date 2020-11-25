var params;
var match = page.data.searchworkorders;
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

select("Workorders",params, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});
