//  FIELD VALIDATION
var fieldErrors = checkForRequiredFields(page.children);
if (fieldErrors !== ""){
    client.infoDialog("You need to supply values for: " + fieldErrors);
} else {
    
    //  geocode the address
    // page.data.technician.address GoogleGeoCode procedure
    execute("GoogleGeoCode", {address:page.data.Technicians.address}, client, function(response){
	    page.data.Technicians.geolocation = response;
	    page.data.Technicians.mobilegeolocation = response;
        
		// see if a vantiq user with this name already exists
		if (page.data.dbid){ 
			update("Technicians", page.data.Technicians, page.data.dbid, client, function(){
	                client.goToPage("technicianslist");
	        });
		} else {

			insert("Technicians", page.data.Technicians, client, function(response){
                client.goToPage("technicianslist");
	        });

		}
    });
    
}