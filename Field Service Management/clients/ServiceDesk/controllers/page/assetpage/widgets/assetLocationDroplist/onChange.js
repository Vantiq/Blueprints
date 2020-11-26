	// upon changing the location move the pin on the map
    execute("cb.getLocationByLocationId", {id: page.data.Assets.location_ref_locations}, client, function(response){
    	// get the map
        var mapWidget = client.getWidget("AssetMap");
        var map = mapWidget.map;
        
        // set the assets location
        page.data.Assets.location = response.geolocation;
        
        //set the map center
        var lat = response.geolocation.coordinates[1];
        var lng = response.geolocation.coordinates[0];
        map.setCenter({lat: lat, lng: lng});
    
        // zoom the map in close
        map.setZoom(18);

        // clear the previous assett marker if there is one
        console.log(client.data.assetMarker);

        if (!isEmpty(client.data.assetMarker) )
            client.data.assetMarker.setMap(null);

        // add the latest assett marker
        client.data.assetMarker	 = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: 'Pump'
        });
        

	});