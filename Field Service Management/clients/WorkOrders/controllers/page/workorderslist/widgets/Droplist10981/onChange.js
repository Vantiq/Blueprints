var params;
var wo_status = page.data.statusworkorders;
var username = client.data.username;
var match = page.data.searchworkorders;

if(page.data.statusworkorders === "All"){
    if (match){
        params = {
            where: { $and: [
                {summary: {$regex: match, $options:"i"}}, 
                {techId: username}
            ] }
        };    
	}

    else {
        params = {
            where: 
                {techId: username}
        };
    }
}

else {
    if (match){
        params = {
            where: { $and: [
                {summary: {$regex: match, $options:"i"}}, 
                {"status": wo_status},
                {techId: username}
            ] }
        };    
	}

    else {
        params = {
            where: { $and: [
                {"status": wo_status},
                {techId: username}
            ] }
        };
    }
    
}

select("Workorders",params, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});
