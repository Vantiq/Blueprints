var params;
var match = page.data.skillsearch;
if (match){
    params = {
        where: { $or: [
                    {skill: {$regex: match, $options:"i"}}, 
                    {description: {$regex: match, $options:"i"}}
            	]}
    };    
}

select("Skills", params, client, function(response){
    client.sendClientEvent("ce_Skills",response);
});
