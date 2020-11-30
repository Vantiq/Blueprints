    var page = this;
    
    page.data.refreshAssetTypes = function(){
        //cb.getAsasetTypes()
        client.data.execute("cb.getAsasetTypes", {}, function(response){
            client.sendClientEvent("ce_assettypes_AssetTypeView", response);
        });
    };
    
    page.data.refreshAssetTypes();
    
    



    