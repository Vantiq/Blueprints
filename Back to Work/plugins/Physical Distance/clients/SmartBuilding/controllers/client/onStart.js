//$client.data.upsert.error.msg = Doing an upsert of an {0}
//$client.data.select.error.msg = Doing a select on {0}
//$client.data.execute.error.msg = Executing {0}
//$client.data.publish.error.msg = Doing a publish on a topic {0}
//$client.data.insert.error.msg = Doing an insert on  {0}
//$client.data.update.error.msg = Doing an update of {0}
//$client.data.deleteone.error.msg = Doing a delete on a single {0}
//$client.data.defaultsubmit.error.msg = Doing PUBLISH on topic: {0}
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
        var upsertErrorMsg = client.formatMsg("$client.data.upsert.error.msg", resource);
        client.showHttpErrors(errors,upsertErrorMsg);
//        client.showHttpErrors(errors,"Doing an upsert of an " + resource);
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
        var selectErrorMsg = client.formatMsg("$client.data.select.error.msg", resource);
        client.showHttpErrors(errors,selectErrorMsg);
        //client.showHttpErrors(errors,"Doing a select on " + resource);
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
        var executeErrorMsg2 = client.formatMsg("$client.data.execute.error.msg", procedure);
        client.showHttpErrors(errors, executeErrorMsg2);   
        //client.showHttpErrors(errors,"Executing " + procedure );   
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
        var publishErrorMsg = client.formatMsg("$client.data.publish.error.msg", topicName);
        client.showHttpErrors(errors, publishErrorMsg);   
        //client.showHttpErrors(errors,"Doing a publish on a topic");
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
        var insertErrorMsg = client.formatMsg("$client.data.insert.error.msg", resource);
        client.showHttpErrors(errors, insertErrorMsg);   
        //client.showHttpErrors(errors,"Doing an insert on " + resource);
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
        var updateErrorMsg = client.formatMsg("$client.data.update.error.msg", resource);
        client.showHttpErrors(errors, updateErrorMsg);   
        //client.showHttpErrors(errors,"Doing an update of " + resource);
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
        var deleteoneErrorMsg = client.formatMsg("$client.data.deleteone.error.msg", resource);
        client.showHttpErrors(errors, deleteoneErrorMsg);   
        //client.showHttpErrors(errors,"Doing a delete on a single " + resource);
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
            var defaultsubmitErrorMsg = client.formatMsg("$client.data.defaultsubmit.error.msg", responseTopic);
            client.showHttpErrors(errors, defaultsubmitErrorMsg);   
            //client.showHttpErrors(errors,"Doing PUBLISH on topic: " + responseTopic);
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
    