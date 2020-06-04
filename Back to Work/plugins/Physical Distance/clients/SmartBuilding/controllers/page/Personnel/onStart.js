
    var page = this;
    
    page.data.refreshPersonnel = function(){
        client.data.execute("cb.getPersonnel", {}, function(response){
            client.sendClientEvent("ce_personnel_Personnel", response);
        });
    };
    
    page.data.refreshPersonnel();