    // clear previous timer if there is one   
    if (page.data.timer)
        clearTimeout(page.data.timer);

    page.data.timer = setTimeout(doneTyping, 500);

    function doneTyping(){
        
        var geocoder = new google.maps.Geocoder();
		console.log(page.data.package.originalAddress);
        console.log(page.data.package.shippingAddress);
        
        
        geocoder.geocode( { 'address': page.data.package.shippingAddress}, function(results, status) {
            if (status == 'OK') {

                page.data.package.shippingAddressGEO = {
                    type: "Point",
                    coordinates:  [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
                   
                };
				 console.log( [results[0].geometry.location.lng(), results[0].geometry.location.lat()]);
   

            } else {
                console.log("problem");
                console.log(status);
                console.log(results);
            }
        });
        
         geocoder.geocode( { 'address': page.data.package.originalAddress}, function(results, status) {
            if (status == 'OK') {

                page.data.package.originalAddressGEO = {
                    type: "Point",
                    coordinates:  [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
                };
					 console.log( [results[0].geometry.location.lng(), results[0].geometry.location.lat()]);
             

            } else {
                console.log("problem");
                console.log(status);
                console.log(results);
            }
        });
        page.data.refreshMap();

    }   