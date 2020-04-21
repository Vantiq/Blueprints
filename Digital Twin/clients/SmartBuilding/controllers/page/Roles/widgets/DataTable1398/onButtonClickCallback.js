    console.log(extra);
    if(extra.columnName === "ButtonEdit"){

        var params = extra.dataObject;

        client.popupPage("RoleAddModify","Edit the role",params,function(returnParameters)
                         {    
            console.log("The Return Parameters: " + returnParameters);
            page.data.refreshRoles();
        });


    }