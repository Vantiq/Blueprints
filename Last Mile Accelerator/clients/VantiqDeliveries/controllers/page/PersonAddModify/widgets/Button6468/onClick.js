
    page.data.person.assigned = false;
    client.data.upsert("personnel", page.data.person, function(response){
		client.returnToCallingPage();
    });
