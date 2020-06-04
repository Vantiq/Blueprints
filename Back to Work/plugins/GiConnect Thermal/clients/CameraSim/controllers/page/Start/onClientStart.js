client.data.publish = function(messageObject, topicName, callback){
    
    var http = new Http();
    http.setVantiqUrlForSystemResource("topics");
    http.setVantiqHeaders();
        
    http.publish(messageObject,topicName,function(response)
    {
        //  "response" is meaningless for a "publish"
        if(callback)
            callback(response);
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing a publish on a topic");
    });
    
};
    
client.data.execute = function(procedure, args, callback){
    var http = new Http();
    http.setVantiqUrlForSystemResource("procedures");
    http.setVantiqHeaders();
    
    http.execute(args, procedure, function(response)
    {
        if (callback)
            callback(response);
    },
    function(errors)
    {                   
        // client.errorDialog(errors.data[0].message); 
        client.showHttpErrors(errors,"Executing " + procedure );   
    });
    
};