//Field Validation
var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
    // see if a asset already exists
    if (page.data.dbid){
        update("Assets", page.data.Assets, page.data.dbid, client, function(){
            client.goToPage("assetslist");
        });
    } else {       
        insert("Assets", page.data.Assets, client, function(response){
            client.goToPage("assetslist");
        });
              
    }
}
