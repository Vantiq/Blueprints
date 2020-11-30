 client.data.publishNewOrder = function (){
           
        
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
            origin: client.getWidget("origin").boundValue,
            destination: client.getWidget("destination").boundValue,
            description: client.getWidget("description").boundValue,
            id:client.getWidget("id").boundValue
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

        http.execute(args,"public.PublishOrder",function(response)
        {
            //
            //  At this point "response" is results of the Procedure call
            //
            console.log("SUCCESS: " + JSON.stringify(response));
            //client.sendClientEvent("ce_packageinfo", response);
        },
        function(errors)
        {
            //
            //  This call will format the error into a popup dialog
            //
            client.showHttpErrors(errors,"Executing 'MyService.MyProcedure'");
        });
     
 };   
    
     client.data.publishNewOrder();