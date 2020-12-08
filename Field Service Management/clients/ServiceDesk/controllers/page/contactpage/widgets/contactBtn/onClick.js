var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
    upsert("contacts", page.data.contacts, client, function(){
        client.goToPage("contactslist");
    });
    
}