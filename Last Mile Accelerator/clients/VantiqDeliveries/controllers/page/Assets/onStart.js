	
    var page = this;
    page.data.refreshAssets = function(){
        //cb.getAssets()
        //cb.getAssetsForFloor(floorid String, type String)
        console.log("BuildingID");
        console.log(page.data.buildingid);
        console.log("FloorId");
        console.log(page.data.floorid);
        console.log("Type");
        console.log(page.data.assettype);
        
        
        var args = {};
        
        if (page.data.buildingid !== "-select-")
            args.buildingid = page.data.buildingid;
        if (page.data.floorid !==null &&  page.data.floorid !== "-select-")
            args.floorid = page.data.floorid;
        if (page.data.assettype !== null && page.data.assettype !== "-select-")
            args.type = page.data.assettype;
        client.data.execute("cb.getAssetsForFloor", args, function(response){
            client.sendClientEvent("ce_assets_Assets", response);
        });
    };
    
    // populate building dropdown
    var args = {};
    args.organizationid = client.data.organization.id;
    client.data.execute("cb.getBuildings", args, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.name});
        });

        client.getWidget("Droplist974").enumeratedList = enumlist;


    });
    
    //populate assets dropdown
    client.data.execute("cb.getAssetTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist1939").enumeratedList = enumlist;


    });   
    
    
    page.data.refreshAssets();
    console.log(page.data.floorid);
    
    