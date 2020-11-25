function update(resource, data, dbid, client, callback){
    
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();

    http.update(data,dbid,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback();
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing an update of an existing: " + resource);
        console.log(errors,"Doing an update of an existing: " + resource);
    });    
}

function select(resource, params, client, callback){   
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();

    // if no params then limit to 50 sort by create date, newest first
    if (!params){
        params = {
            sort:{"ars_createdAt":-1},
            limit:50
        };
    }

    http.select(params,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback(response);   
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing a select on: " + resource);
        
    });
}


//Upsert function
function upsert(resource, data, client, callback){
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();
    http.upsert(data,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if(callback){
            callback();
        }
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing an upsert of " + resource);
    });
}
