//Field Validation
var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
    // see if a vantiq user with this name already exists
    if (page.data.dbid){
        update("Users", page.data.Users, page.data.dbid, client, function(){
            client.goToPage("userslist");
        });
    } else {       
        insert("Users", page.data.Users, client, function(response){
            client.goToPage("userslist");
        });
              
    }
}
