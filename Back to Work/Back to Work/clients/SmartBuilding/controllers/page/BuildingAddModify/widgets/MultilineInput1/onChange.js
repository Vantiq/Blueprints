    // clear previous timer if there is one   
    if (page.data.timer)
        clearTimeout(page.data.timer);

    page.data.timer = setTimeout(doneTyping, 500);

    function doneTyping(){
        
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': page.data.building.address}, function(results, status) {
            if (status == 'OK') {

                page.data.building.geo = {
                    type: "Point",
                    coordinates:  [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
                };

                page.data.refreshMap();

            } else {
                console.log("problem");
                console.log(status);
                console.log(results);
            }
        });

    }   