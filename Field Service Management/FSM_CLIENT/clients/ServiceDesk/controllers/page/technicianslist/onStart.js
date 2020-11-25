// getTechnicians(client, this.data.technicansearch);
/*
select("technician", null, client, function(response){
    client.sendClientEvent("ce_technicians",response);
});
*/

// var map;

this.data.selectedtechnician = null;
select("Technicians", null, client, function(response){
    client.sendClientEvent("ce_Technicians", response);
	client.sendClientEvent("ce_Skills", []);
    
    /*
    var map = client.getWidget("DynamicMapViewer1").platformWidget._map;

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
    */
});

