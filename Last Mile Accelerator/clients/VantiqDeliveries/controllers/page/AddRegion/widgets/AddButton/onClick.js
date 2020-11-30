	//for (let point of polygon.getPath().getArray()) {
    //                GeoJSON.geometry.coordinates.push([point.lng(), point.lat()]);
    //}
    
        //***
    //*** This code fragment demonstrates how to insert a record of a user Type.
    //*** You must edit it to make it match the detailed situation for your Client.
    //***
    
    //
    //  Create an instance of the Http class to execute our server request
    //
    var http = new Http();
    
    //
    //  Build the URL needed to do an "insert" on our Type
    //
    http.setVantiqUrlForResource("region");
    
    //
    //  Add the Authorization header to the request
    //
    http.setVantiqHeaders();
        
    var aNewRegion = {};
    aNewRegion.name = page.data.region.name;
    aNewRegion.description = page.data.region.description;
    aNewRegion.coordinates = page.data.region.coordinates;
    //
    //  Execute the asynchronous server request. This expects 4 parameters:
    //
    //  data:            The object being inserted.
    //  parameters:      "null" or an object containing the parameters for this request
    //  successCallback: A callback function that will be driven when the request completes
    //                   successfully (i.e. a status code of 2XX)
    //  failureCallback: A callback function that will be driven when the request does not complete
    //                   successfully.
    //
    http.insert(page.data.region,null,function(response)
    {
        //
        //  At this point "response" is the inserted object
        //
        console.log("SUCCESS: " + JSON.stringify(response));
    },
    function(errors)
    {
        //
        //  This call will format the error into a popup dialog
        //
        client.showHttpErrors(errors,"Doing an insert of a new Region");
    });
    //*** End of fragment
