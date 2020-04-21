    var page = this;

    page.data.sensor.initializeToDefaultValues();
    page.data.initializePropertyToDefaultValue("sensorconfig");
    
    // populate drop down. - cb.getSensorTypes()
    client.data.execute("cb.getSensorTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist1435").enumeratedList = enumlist;


	});
    
    
    page.data.refreshSensorConfigs = function(){
        // populate drop down for sensor configs - cb.getSensorConfigs()
        var args = {};
        if (page.data.sensor.type !== "-select-")
            args.sensortypename = page.data.sensor.type;
            
        
        client.data.execute("cb.getSensorConfigs", args, function(response){

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
                enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("Droplist2113").enumeratedList = enumlist;


        });
    };
    
    page.data.refreshSensorConfigs();

    if (parameters){
        page.data.sensor.copyMatchingData(parameters);
        page.data.assetid = parameters.id;
    } else {
        //page.data.sensor.id = client.generateUUID();
    }
    
    
