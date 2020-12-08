/*
var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {

    var customervalue = page.data.customeridselect;
    var customervalueSplit = customervalue.split(':');
    page.data.locations.customerid = customervalueSplit[0];
    page.data.locations.customername = customervalueSplit[1];

 
    if (!page.data.dbid){
        insert("locations", page.data.locations, function(response){
        	client.goToPage("locationslist");            
        });
    } else {
    	update("locations", page.data.locations, page.data.dbid, function(){
            client.goToPage("locationslist");
        }); 
    }
}
*/

