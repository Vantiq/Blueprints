	
    var page = this;	
    
    
    
    
    client.data.collaborationContext = client.getCollaborationContext();
    
    
    client.getWidget("product").url = client.data.collaborationContext.package.photo;
    
    client.data.execute("cb.getRegions", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("dlRegions").enumeratedList = enumlist;


    }); 
    
    page.data.refreshVehicles = function(){
        var args = {};
        args.organizationid = client.data.collaborationContext.organizationid;
    
        
        client.data.execute("cb.getVehicles_All", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_vehicles", response);


            var latlngbounds = new google.maps.LatLngBounds();

            // get the map markers and zoom map to markers
            var mapWidget = client.getWidget("DynamicMapViewerVehicles");
            var map = mapWidget.map;
            var locationhash = mapWidget.locationHash;
            console.log(locationhash);
            
            for (var key in locationhash) {
                if (locationhash.hasOwnProperty(key)) {
                    console.log(key + " -> " + p[key]);
                    var marker = locationhash[key].gmMarker;
                    console.log(marker);
                    latlngbounds.extend(marker.position);
                    
                }
            }
            
            map.fitBounds(latlngbounds); 
    
            
        });
        
    };
    
     page.data.refreshRegions = function(){
        var args = {};
        args.organizationid = client.data.collaborationContext.organizationid;
        
       // console.log(client.data.organization.id);
        
        client.data.execute("cb.getRegions", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_region", response);

            
        });
         
         
         
    };
    
    

  
	page.data.refreshPackageLocation = function(){
        
        var mapWidget = client.getWidget("DynamicMapViewerVehicles");
        var map = mapWidget.map;
        var myLatLng = {lat: client.data.collaborationContext.package.shippingAddressGEO.coordinates[1], lng: client.data.collaborationContext.package.shippingAddressGEO.coordinates[0]};
        //alert(client.data.collaborationContext.package.shippingAddressGEO.coordinates[0]);
        //alert(client.data.collaborationContext.package.shippingAddressGEO.coordinates[1]);

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: client.data.collaborationContext.package.name
      
      });
      marker.addListener('click', toggleBounce);
      marker.setMap(map);  
      ///map.fitBounds(myLatLng);
      //map.setCenter(myLatLng);
      map.setZoom(12);  
        
      function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
   }  
        
    };
    

    var addListenersOnPolygon = function(polygon) {
      google.maps.event.addListener(polygon, 'click', function (event) {
      	//page.data.CurrentRegion = polygon.RegionData;
    	alert(polygon.RegionData.Name);
        Binding.applyChanges();
 		//setCurrentRegion(client, polygon.RegionData);

      });  
    };
    //***
    //*** The following code fragment demonstrates how to select one or more records of a user Type.
    //*** You must edit it to make it match the detailed situation for your Client.
    //***
    var map = client.getWidget("DynamicMapViewerVehicles").map;
    //
    //  Create an instance of the Http class to execute our server request
    //
    var http = new Http();
    
    //
    //  Build the URL needed to do a "select" on the specified user Type
    //
    http.setVantiqUrlForResource("region");
    
    //
    //  Add the Authorization header to the request
    //
    http.setVantiqHeaders();
    page.data.refreshRegions();
    page.data.refreshPackageLocation();

    
    //
    //  Execute the asynchronous server request. This expects 3 parameters:
    //
    //  parameters: "null" or an object containing the parameters for this request
    //  successCallback: A callback function that will be driven when the request completes
    //                   successfully (i.e. a status code of 2XX)
    //  failureCallback: A callback function that will be driven when the request does not complete
    //                   successfully.
    //
    http.select(null,function(response)
    {
        //
        //  At this point "response" is an array containing the objects returned for the "select".
        //
		page.data.regions = response;
        
        var i;
        var j;
        for (i = 0; i < response.length; i++) {

            var newPath = [];
        	for (j = 0; j < response[i].coordinates.coordinates[0].length; j++) {
                var point = {};
                point.lat = response[i].coordinates.coordinates[0][j][1];
                point.lng = response[i].coordinates.coordinates[0][j][0];
                
    			newPath.push(point);
                console.log(point);
 				map.setCenter(point);
                map.setZoom(12);
              
            }   
            
            var newPoly = new google.maps.Polygon({
    			paths: newPath,
    			strokeColor: '#FF0000',
    			strokeOpacity: 0.8,
    			strokeWeight: 2,
    			fillColor: '#FF0000',
    			fillOpacity: 0.35,
                RegionData : response[i]
  			});
  			newPoly.setMap(map);
			addListenersOnPolygon(newPoly);
     	
        }
   
    },
    function(errors)
    {
        //
        //  This call will format the error into a popup dialog
        //
        client.showHttpErrors(errors,"Doing a select on 'Employee'");
    });
    

    page.data.refreshVehicles();
    