if(page.data.dbid){
    update("Skills", page.data.Skills, page.data.dbid, client, function(response){
        client.closePopup(page.data.Skills);
    });
} else {
	upsert("Skills", page.data.Skills, client, function(response){
    	client.closePopup(page.data.Skills);    
	});
}