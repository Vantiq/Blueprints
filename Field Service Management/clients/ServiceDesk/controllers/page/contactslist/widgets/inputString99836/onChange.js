var match=page.data.searchcontacts;
var params;
if (match){
    params = {
        where: { $or: [
            {fname: {$regex: match, $options:"i"}}, 
            {lname: {$regex: match, $options:"i"}}
        ] }
    };
} 

select("contacts", params, client, function(response){
    client.sendClientEvent("ce_Contacts",response);
});

