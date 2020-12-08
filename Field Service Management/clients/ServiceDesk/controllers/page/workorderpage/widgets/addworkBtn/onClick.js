var thisCopy = page;

var fieldErrors = checkForRequiredFields(page.children);
console.log("  skills ->" + JSON.stringify(page.data.Workorders.skills));
if (!page.data.Workorders.skills) {
	fieldErrors = fieldErrors + " | Work Order Skills";
}
if (fieldErrors !== "") {
   client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
	// page.data.work_order.techname = $("#technicians :selected").text();
    execute("GoogleGeoCode", {address:page.data.Workorders.address}, client, function(response){
        
        if (isEmpty(response) ){
            client.infoDialog("The address could not be GeoCoded, Please fix the address and try again.", "Re-enter Address");
        	

        } else { 
            thisCopy.data.Workorders.geolocation = response;

            if (!thisCopy.data.dbid){
                insert("Workorders", thisCopy.data.Workorders, client, function(response){
                    client.goToPage("workorderslist");            
                });
            } else {
                update("Workorders", thisCopy.data.Workorders, thisCopy.data.dbid, client, function(){
                    //client.goToPage("workorderslist");
                    client.returnToCallingPage();
                }); 
            }
		}
    });
}