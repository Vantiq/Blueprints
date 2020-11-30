
   var  page = this;
    
   var directionsService = new google.maps.DirectionsService();
   var directionsRenderer = new google.maps.DirectionsRenderer();
   var routes ; 
    
    
    var theHandle = client.setInterval(function(a,b)
    {
        client.data.refreshVehicleLocation(); 
        console.log(a);
    },5000,123,456);
    
    
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
    	return vars;
	}
    console.log(getUrlVars()["vehicleId"]);
 
    
    client.data.refreshVehicleLocation = function (){
   
        
        
         var http = new Http();
    
    //
    //  Build the URL needed to do an "execute" of a Procedure
    //
    http.setVantiqUrlForSystemResource("procedures");
    
    //
    //  Add the Authorization header to the request
    //
    http.setVantiqHeaders();
    
    //
    //  Set the Procedure arguments by name. (You may also specify 'args' as an array where the
    //  parameters are given in the same order as in the Procedure definition (e.g. 'args = [10,20];').
    //  'args' must not be null.
    //
    var args = {
        shipmentId:getUrlVars()["shipmentId"]        
    };
    console.log(args);
    
    //
    //  Execute the asynchronous server request. This expects 4 parameters:
    //
    //  procedureArguments: The procedure arguments.
    //  procedureName:      The fully-qualified name of the Procedure.
    //  successCallback:    A callback function that will be driven when the request completes
    //                      successfully (i.e. a status code of 2XX)
    //  failureCallback:    A callback function that will be driven when the request does not complete
    //                      successfully.
    //
      
    http.execute(args,"public.GetShipmentInfo",function(response)
    {
        //
        //  At this point "response" is results of the Procedure call
        //
        console.log("SUCCESS: " + JSON.stringify(response));
        client.sendClientEvent("ce_shipment", response);
    },
    function(errors)
    {
        //
        //  This call will format the error into a popup dialog
        //
        client.showHttpErrors(errors,"Executing 'MyService.MyProcedure'");
    });
     
 };   
    
    
 function initMap() {
       
     
     
     var santana = new google.maps.LatLng(9.929680, -84.178980);
    

          var map = client.getWidget("ShippingPoints").map;
          directionsRenderer.setMap(map);
        }

      function calcRoute() {
          var start = getUrlVars()["origen"];
           console.log("start" + start);
          var end =   getUrlVars()["destination"];
            console.log(end);

          var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
            provideRouteAlternatives:true,
            drivingOptions: {
    				departureTime: new Date(Date.now()),
    				trafficModel: 'pessimistic'
  						}  
              
          };
          routes = directionsService.route(request, function(result, status) {
            if (status == 'OK') {
              directionsRenderer.setDirections(result);
                 console.log(result);
            }
              else{
                  
                    console.log("not good");
              }
          });
          
        }
    
    
    page.data.refreshMap = function(){        
                 
		    
      
		initMap();
        calcRoute();

        
        
        // we do this to empty out the map
		var map = client.getWidget("ShippingPoints").map;
        map.setZoom(15);

    };
    
    
    page.data.refreshMap();
    client.data.refreshVehicleLocation();
    
    