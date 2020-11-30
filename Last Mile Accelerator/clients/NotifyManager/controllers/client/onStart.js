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