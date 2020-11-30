	console.log(parameters);
    
    console.log(parameters.dataObject.currentlocation);
    
	var page = this;
    
    page.data.refreshPackageLocation = function(){
        
        var mapWidget = client.getWidget("currentIssueLocation");
        var map = mapWidget.map;
        var myLatLng = {lat: parameters.dataObject.currentlocation.coordinates[1], lng: parameters.dataObject.currentlocation.coordinates[0]};


      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: parameters.dataObject.description
      });
      marker.addListener('click', toggleBounce);
      marker.setMap(map);  
        console.log(myLatLng);
     // map.fitBounds(myLatLng);
      map.setCenter(myLatLng);
      map.setZoom(20);  
        
      function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
   }  
        
    };
    
    
    
    
    
    
    var pic = client.getWidget("pic");
    pic.url = parameters.dataObject.photo;
    page.data.refreshPackageLocation();