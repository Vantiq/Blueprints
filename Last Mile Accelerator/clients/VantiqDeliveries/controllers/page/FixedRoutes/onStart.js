
    
    var page = this;
    page.data.refreshFixedRoutes = function(){
        var args = {};
        args.organizationid = client.data.organization.id;        
        console.log(client.data.organization.id);
        client.data.execute("cb.getFixedRoutes", args, function(response){
            client.sendClientEvent("ce_fixedroutes", response);
        });

        
    };

    page.data.refreshFixedRoutes();