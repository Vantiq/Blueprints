
   client.popupPage("RoleAddModify","Add a role",null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshRoles();
   });