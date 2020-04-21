
    var page = this;
    
    page.data.refreshRoles = function(){
        client.data.execute("cb.getRoles", {}, function(response){
            client.sendClientEvent("ce_roles_Roles", response);
        });
    };
    
    page.data.refreshRoles();

    