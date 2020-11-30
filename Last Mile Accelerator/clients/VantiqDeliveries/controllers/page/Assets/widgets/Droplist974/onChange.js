    var args ={};
    args.buildingid = page.data.buildingid;
    client.data.execute("cb.getFloorsForBuilding", args, function(response){

        var enumlist = [];
        var selectLabel = client.formatMsg("@droplist.select");
        //enumlist.push({value: "-select-", label:"-select-"});
        enumlist.push({value: "-select-", label:selectLabel});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.name});
        });

        client.getWidget("Droplist975").enumeratedList = enumlist;
        page.data.floorid = null;
        page.data.refreshAssets();
        //console.log(page.data.floorid);


    });