    if(page.validate()){

        client.data.upsert("spaces", page.data.space, function(response){
            client.closePopup(page.data.space);
        });
    }