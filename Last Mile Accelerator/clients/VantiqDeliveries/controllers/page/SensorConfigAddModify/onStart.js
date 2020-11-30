    var page = this;

    page.data.sensorconfig.initializeToDefaultValues();

    // get all the sensor types fro dropdown - cb.getSensorTypes()
    client.data.execute("cb.getSensorTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist1986").enumeratedList = enumlist;


    });

    if (parameters){
        page.data.sensorconfig.copyMatchingData(parameters);
    } else {
        page.data.sensorconfig.id = client.generateUUID();
    }
    
    
