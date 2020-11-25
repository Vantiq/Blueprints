console.log("page.data.companyid" + page.data.companyid );
var params;
var match = page.data.search;
if (match){
    params = {
		where: { 
            $and: [
            	{companyid: page.data.companyid },        
            	{ $or: [
                	{firstname: {$regex: match, $options:"i"}},
                	{lastname: {$regex: match, $options:"i"}},
                	{department: {$regex: match, $options:"i"}}
                
            	]}
        	]}        
		};
} else {
    params = {
		where: {companyid: page.data.companyid }   
        
	};
}


select("Contacts", params, client, function(response){
    client.sendClientEvent("ce_contactlistpopup",response);
});




