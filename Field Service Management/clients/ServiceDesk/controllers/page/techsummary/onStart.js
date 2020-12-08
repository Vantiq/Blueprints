// var map;
select("technician", null, client, function(response){
    client.sendClientEvent("ce_technicians", response);
    var map = client.getWidget("DynamicMapViewer4").platformWidget._map;

	// we'll use this to adjust the map around the markers
	var bounds = new google.maps.LatLngBounds();
    
    response.forEach(function(item){
        var newCoord = {lat: item.geolocation.coordinates[1], lng: item.geolocation.coordinates[0]};
        bounds.extend(newCoord);
        
        var marker = new google.maps.Marker({
            position: newCoord,
            map: map,
            title: item.fname + " " + item.lname
  		});
    });

    map.fitBounds(bounds);   
});

select("work_order", null, client, function(response){
	client.sendClientEvent("ce_workorders", response);
});