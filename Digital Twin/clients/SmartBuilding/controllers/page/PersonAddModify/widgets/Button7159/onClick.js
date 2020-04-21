    //see if the table already has the item
    var foundroleInPerson = page.data.person.roles.find(function(obj){
        return obj.id === page.data.role;
    });
    
    if (!foundroleInPerson){


        // search the list of roles for a match in the drop down
        var foundObj = page.data.roles.find(function(obj){
            return obj.id === page.data.role;
        });

        if (foundObj)
            page.data.person.roles.push(foundObj);


        client.sendClientEvent("ce_roles_PersonAddModify", page.data.person.roles);
    }
