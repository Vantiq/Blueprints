    client.data.upsert = function(resource, object, callback){
        spinnerStart();
        var http = new Http();
        http.setVantiqUrlForResource(resource);
        http.setVantiqHeaders();

        http.upsert(object,function(response)
        {
            spinnerStop();
            if (callback)
                callback(response);
        },
        function(errors)
        {
            spinnerStop();
            var upsertErrorMsg = client.formatMsg("$client.data.upsert.error.msg", resource);
            client.showHttpErrors(errors,upsertErrorMsg);
    //        client.showHttpErrors(errors,"Doing an upsert of an " + resource);
        });    
    };
    
    client.data.execute = function(procedure, args, callback){

    
    spinnerStart();
    var http = new Http();
    http.setVantiqUrlForSystemResource("procedures");
    http.setVantiqHeaders();
    
    http.execute(args, procedure, function(response)
    {
        spinnerStop();
        if (callback)
            callback(response);
    },
    function(errors)
    {
        spinnerStop();
        var executeErrorMsg = client.formatMsg("$client.data.execute.error.msg", procedure);
        client.showHttpErrors(errors, executeErrorMsg);   
        //client.showHttpErrors(errors,"Executing " + procedure );   
    });
    
};