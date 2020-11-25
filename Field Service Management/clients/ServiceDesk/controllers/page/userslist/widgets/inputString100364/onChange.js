var params;
var match = page.data.searchuser;
console.log(match);
if (match){
	params = {
        where: { $or: [
                    {fname: {$regex: match, $options:"i"}}, 
                    {lname: {$regex: match, $options:"i"}},
                    {customer: {$regex: match, $options:"i"}},
                    {status: {$regex: match, $options:"i"}}
            	]}
	};    
}

select("Users",params, client, function(response){
    client.sendClientEvent("ce_Users",response);
});
