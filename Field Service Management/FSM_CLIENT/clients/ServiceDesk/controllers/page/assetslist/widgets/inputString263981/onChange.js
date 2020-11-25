var params;
var match = page.data.searchassets;
console.log(match);
if (match){
	params = {
        where: { $or: [
                    {name: {$regex: match, $options:"i"}}, 
                    {description: {$regex: match, $options:"i"}},
                    {manufacturer: {$regex: match, $options:"i"}},
                    {category: {$regex: match, $options:"i"}}
            	]}
	};    
}

select("Assets",params, client, function(response){
    client.sendClientEvent("ce_Assets",response);
});
