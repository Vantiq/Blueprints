selectOne("Workorders", page.data.dbid, client, function(response) {       
    //var value = page.data.Contacts;        
    var data = {};
    data.contacts = response.contacts;
    data.contacts.push(page.data.contact);
    console.log("This is the final array entry after the push - " + JSON.stringify(data));
    update("Workorders", data, page.data.dbid, client, function(){
		var params = {};
        params._id = page.data.dbid;
        client.returnToCallingPage(params);
	});
    
});



