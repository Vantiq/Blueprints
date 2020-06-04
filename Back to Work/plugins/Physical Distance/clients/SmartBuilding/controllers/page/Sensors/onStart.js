    var page = this;

    // populate sensor types cb.getSensorTypes()
    client.data.execute("cb.getSensorTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist2167").enumeratedList = enumlist;


    });
    
    // populate manufacturer types list cb.getSensorManufacturers()
    client.data.execute("cb.getSensorManufacturers", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist2252").enumeratedList = enumlist;


    });
    

    page.data.refreshSensors = function(){
		//cb.getSensors(isOrphaned Boolean, type String, manufacturer String)
        var args = {};
        if (page.data.isOrphaned === true){
            args.isOrphaned = true;
            console.log("it was true");
        } 
        
        if (page.data.type !== "-select-"){
            args.type = page.data.type;
        }
        
        if (page.data.manufacturer !== "-select-"){
            args.manufacturer = page.data.manufacturer;
        }
        
        
        client.data.execute("cb.getSensors", args, function(response){
            client.sendClientEvent("ce_sensors_Sensors", response);
        });
    };
    
    page.data.refreshSensors();
