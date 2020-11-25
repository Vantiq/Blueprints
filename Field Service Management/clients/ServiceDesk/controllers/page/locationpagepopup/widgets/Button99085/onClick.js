// Check if the location can be GeoCoded
execute("GoogleGeoCode", {address:page.data.Locations.address}, client, function(response){
        
	if (isEmpty(response) ){
		client.errorDialog("The address could not be GeoCoded, Please fix the address and try again.", "Re-enter Address");
	} else { 
        page.data.Locations.geolocation = response;
		upsert("Locations", page.data.Locations, client, function(response){
            client.closePopup();
		});
    }
});
