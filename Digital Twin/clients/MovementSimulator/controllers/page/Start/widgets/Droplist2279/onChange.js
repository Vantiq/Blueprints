    //cb.getFloorsForBuilding(buildingid String)
    var args = {};
    args.buildingid = page.data.building;
    client.data.execute("cb.getFloorsForBuilding", args, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.name});
        });

        client.getWidget("Droplist2280").enumeratedList = enumlist;


    });