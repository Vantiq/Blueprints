    console.log(extra);
    if(extra.columnName === "ButtonRemove"){
        // search the object
        var foundIndex = page.data.person.roles.findIndex(function(obj){

            // return the index of the  object if obj.id matches someotherid 
            return obj.id === extra.dataObject.id;
        });

        // do something if the object is found
        if (foundIndex > -1){
			//console.log(foundIndex);
            page.data.person.roles.splice(foundIndex,1);
            client.sendClientEvent("ce_roles_PersonAddModify", page.data.person.roles);
            
        }
    }