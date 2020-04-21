
    var page = this;

    //cb.getOrganization()
    client.data.execute("cb.getOrganization", {}, function(response){
        console.log(response);
        client.data.organization = response;
        var args ={};   
        args.organizationid = client.data.organization.id;

        console.log(args);


        // cb.getBuildings(organizationid String)
        client.data.execute("cb.getBuildings", args, function(response){
            console.log(response);
            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
                enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("Droplist2279").enumeratedList = enumlist;


        });
    });
    
    //get sensors
    client.data.execute("cb.getSensors", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.id + " | " + item.type});
        });

        client.getWidget("Droplist2397").enumeratedList = enumlist;


    });

