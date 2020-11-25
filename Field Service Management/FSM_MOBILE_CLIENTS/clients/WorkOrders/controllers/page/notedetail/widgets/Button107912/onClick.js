selectOne("Workorders", page.data.dbid, client, function(response) {    
    var data = {};
    data.notes = response.notes;
    data.notes.push({note:page.data.notes.note, time:page.data.notes.time, techId:page.data.notes.techId, techname:page.data.notes.techname});
    
    update("Workorders", data, page.data.dbid, client, function(){
		var params = {};
        params._id = page.data.dbid;
        client.returnToCallingPage(params);
	});
    
});



