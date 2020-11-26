var thisCopy = this;
this.data.Workorders.initializeToDefaultValues();
this.data.dbid = parameters._id;

if(parameters){
    var params = {where:{_id:parameters._id}};
    loadparameters(params, function(wo) {              
        var workorders = wo[0];
        thisCopy.data.Workorders = workorders;      
        client.sendClientEvent("ce_Materials", workorders.assets);
        client.sendClientEvent("ce_Contacts", workorders.contacts);
        client.sendClientEvent("ce_workordernotes", workorders.notes);

        //Fill service desk users menu
        var paramUser = {
            where: {username:workorders.servicedeskowner}
        };

        select("Users", paramUser, client, function(response){
            console.log("Success Users --- " + JSON.stringify(response));
            
            if (response.length > 0){
                fullname = response[0].fname + " " + response[0].lname;  
                thisCopy.data.fullname = fullname;
            }
        });

        //Get Location name
        var paramLocation = {
            where: {id:workorders.location}
        };

        select("Locations", paramLocation, client, function(response){
            console.log("Success Location --- " + JSON.stringify(response));
            thisCopy.data.location = response[0].name;
        });

        /*
        // get the list of locations for the customer
        var paramLoc = {
            where: {customerid:{"$eq":workorders.customerId}}
        };

        select("Locations", paramLoc, client, function(response){
            console.log("Success Locations --- " + JSON.stringify(response));
            var listItems = [{"value":"-select-", "label":"- select -"}];
            $(response).each(function(index, item) {
                var value = item.id;
                var obj = {"value":value, "label":item.name};
                listItems.push(obj);
            });
            var locationList = client.getWidget("locations1");
            locationList.enumeratedList = listItems;
        });
		*/			
    });
}
else {
     client.infoDialog("No Workorder selected");
}

function loadparameters(params, callback){
    select("Workorders", params , client, function(response){
        return callback(response);

	});
}