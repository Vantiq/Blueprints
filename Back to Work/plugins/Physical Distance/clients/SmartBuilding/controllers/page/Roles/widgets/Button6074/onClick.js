//$roles.roleaddmodify.popup.title = Add a role
   var popupTitle = client.formatMsg("$roles.roleaddmodify.popup.title");

//   client.popupPage("RoleAddModify","Add a role",null,function(returnParameters)
   client.popupPage("RoleAddModify",popupTitle,null,function(returnParameters)
   {    
       console.log("The Return Parameters: " + returnParameters);
       page.data.refreshRoles();
   });