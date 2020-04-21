// for spinner
$("#_OuterVerticalFrame_").append('<div id="loader"></div>');
// hide spinner on intitial load
$("#loader").css("display","none");
    
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
        client.showHttpErrors(errors,"Doing an upsert of an " + resource);
    });    
};

client.data.select = function(resource, params, callback){
	spinnerStart();
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();
 
    if (!params){
        params = {
            sort:{"ars_createdAt":-1},
            limit:50
        };
    }

    http.select(params,function(response)
    {
        spinnerStop();
		if(callback)
            callback(response);
    },
    function(errors)
    {  
        spinnerStop();
        client.showHttpErrors(errors,"Doing a select on " + resource);
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
        client.showHttpErrors(errors,"Executing " + procedure );   
    });
    
};
    
client.data.execute2 = function(procedure, args, callback){

    
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
        client.showHttpErrors(errors,"Executing " + procedure );   
    });
    
};

client.data.publish = function(messageObject, topicName, callback){
    spinnerStart();
    var http = new Http();
    http.setVantiqUrlForSystemResource("topics");
    http.setVantiqHeaders();
        
    http.publish(messageObject,topicName,function(response)
    {
        spinnerStop();
        //  "response" is meaningless for a "publish"
        if(callback)
            callback(response);
    },
    function(errors)
    {
        spinnerStop();
        client.showHttpErrors(errors,"Doing a publish on a topic");
    });
    
};
    
client.data.insert = function(resource, dataObj, callback){
	spinnerStart();
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();
        
    http.insert(dataObj,null,function(response)
    {
        spinnerStop();
		if (callback)
            callback(response);
    },
    function(errors)
    {
        spinnerStop();
        client.showHttpErrors(errors,"Doing an insert on " + resource);
    });

};
    
client.data.update = function(resource, dataObj, dbid, callback){
	spinnerStart();
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();

    http.update(dataObj,dbid,function(response)
    {
        spinnerStop();
		if(callback)
            callback(response);
    },
    function(errors)
    {
        spinnerStop();
        client.showHttpErrors(errors,"Doing an update of " + resource);
    });
    
};
    
client.data.deleteOne = function(resource, dbid, callback){
	spinnerStart();
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();


    http.deleteOne(dbid,null,function(response)
    {
        spinnerStop();
 		if(callback)
            callback(response);
    },
    function(errors)
    {
        spinnerStop();
        client.showHttpErrors(errors,"Doing a delete on a single " + resource);
    });

};

client.data.defaultSubmit = function(page, submitValue, values, callback){
    spinnerStart();
    var responseObject = client.createResponseObject(submitValue);

    if (responseObject) {
        var responseTopic = page.responseTopic;
        
        // combine values with responseObject.values
        if(values){
            for (var key in values) {
                if(values.hasOwnProperty(key)){
                    responseObject.values[key] = values[key];
                }
            }
        }

        var http = new Http();
        http.setVantiqUrlForSystemResource("topics");
        http.setVantiqHeaders();

        http.publish(responseObject,responseTopic,function(response)
        {
            spinnerStop();
            if(callback)
                callback(response);
            else
            	client.terminate();
        },
        function(errors)
        {
            spinnerStop();
            client.showHttpErrors(errors,"Doing PUBLISH on topic: " + responseTopic);
        });
    }    
};

// user of this requires setting up a client data variable called isDebug
// setting it to true will send messages in the vantiq backend to /mobile/debug
// setting it to false sends nothing
client.data.debug = function(messageObject){
     
    if (client.data.isDebug)
		client.data.publish(messageObject, "/mobile/debug", null);
   
};
    