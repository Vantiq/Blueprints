//$roles.roleaddmodify.datatable.popup.title = Edit the role
   var popupTitle = client.formatMsg("$roles.roleaddmodify.datatable.popup.title");
    console.log(extra);
    if(extra.columnName === "ButtonEdit"){

        var params = extra.dataObject;

        //client.popupPage("RoleAddModify","Edit the role",params,function(returnParameters)
        client.popupPage("RoleAddModify",popupTitle,params,function(returnParameters)
                         {    
            console.log("The Return Parameters: " + returnParameters);
            page.data.refreshRoles();
        });


    }