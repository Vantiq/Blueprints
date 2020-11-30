  if (page.data.timer)
        clearTimeout(page.data.timer);

    page.data.timer = setTimeout(doneTyping, 5000);

    function doneTyping(){
        
        var geocoder = new google.maps.Geocoder();
		console.log(page.data.address);

        
        
        geocoder.geocode( { 'address': page.data.address}, function(results, status) {
            if (status == 'OK') {

                page.data.addressGEO = {
                    type: "Point",
                    coordinates:  [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
                   
                };
                
                var theHub = new google.maps.LatLng({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
          		var map = client.getWidget("RegionMap1").map;
		  		map.setCenter(theHub);	        
			


            } else {
                console.log("problem");
                console.log(status);
                console.log(results);
            }
        });
        
		console.log(JSON.stringify(page.data.addressGEO));
        page.data.refreshMap(page.data.addressGEO);

    }   