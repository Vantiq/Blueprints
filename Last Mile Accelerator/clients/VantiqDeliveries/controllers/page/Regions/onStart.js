	var page = this;	
 
    client.getWidget("DataTableVE").isVisible = false;
    
    page.data.refreshRegions = function(){
        var args = {};
        args.organizationid = client.data.organization.id;
        
        console.log(client.data.organization.id);
        
        client.data.execute("cb.getRegions", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_region", response);

            
        });
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
    var map = client.getWidget("DynamicMapViewerRegions").map;
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
    //*** End of fragment
    

    