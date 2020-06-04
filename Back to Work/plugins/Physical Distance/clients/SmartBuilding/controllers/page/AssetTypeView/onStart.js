    var page = this;
    
    page.data.refreshAssetTypes = function(){
        //cb.getAssetTypes()
        client.data.execute("cb.getAssetTypes", {}, function(response){
            client.sendClientEvent("ce_assettypes_AssetTypeView", response);
        });
    };
    
    page.data.refreshAssetTypes();
    
    



    