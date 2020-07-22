    var page = this;
    var hasConfig = false;
    page.data.sensor.initializeToDefaultValues();
    console.log("SensorAddModify");
  	console.log(parameters);
    if (parameters){
        page.data.sensor.copyMatchingData(parameters);
        if (parameters.config) {
            hasConfig = true;
        }
        page.data.assetid = parameters.id;
    } else {
        //page.data.sensor.id = client.generateUUID();
    }
    
    // populate drop down. - cb.getSensorTypes()
    client.data.execute("cb.getSensorTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist1435").enumeratedList = enumlist;


	});
    
    
    
    //cb.getSensorManufacturers()
    client.data.execute("cb.getSensorManufacturers", {}, function(response){
        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist2181").enumeratedList = enumlist;
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
    
    //function for show config
    page.data.showConfig = function () {
        if (page.data.sensor.sensorconfig !== "-select-" && page.data.sensor.sensorconfig !== null){
            //cb.getSensorConfigById(id String)
            var args ={};
            args.id = page.data.sensor.sensorconfig;
            client.data.execute("cb.getSensorConfigById", args, function(response){
                if (!hasConfig){
                  //load default config
                  page.data.sensor.config = response.config;  
                }
                //
                //TODO: load specific config page
                if(page.data.sensor.type == "Camera") {
                    page.data.loadCameraConfig();
                    client.getWidget("vlCameraConfig").isVisible = true;
                    client.getWidget("vlUnderConstruction").isVisible = false;                
                } else {
                    client.getWidget("vlUnderConstruction").isVisible = true;
                    client.getWidget("vlCameraConfig").isVisible = false;            
                }
                client.getWidget("AccordionDetails").isVisible = true;
            });
        } else {
            client.getWidget("AccordionDetails").isVisible = false;        
        }       

    };
    
    //copied from Evan's page
    page.data.loadCameraConfig = function() {
        var parameters = page.data.sensor.values;
        if (parameters) {
            //client.data.sensors = parameters;
            console.log("parameters are detected, to follow in log");
            console.log(JSON.stringify(parameters));
        } else {
            console.log("parameters are not detected");
        }

            var ws ={control: 'wheel'};
            $('#InputString13841 input').minicolors(ws);
            $('#InputString14339 input').minicolors(ws);
            $('#InputString14340 input').minicolors(ws);

            page.data.sensors = parameters;

            var config = page.data.sensors.config;
            if (config.display === null || config.display) {
               //Try to populate with existing values
                console.log("config object detected..here is what we saw");
                console.log(JSON.stringify(page.data.sensors.config));
                $('#InputString13841 input').minicolors('value',page.data.sensors.config.display.config.safeColor);
                $('#InputString14339 input').minicolors('value',page.data.sensors.config.display.config.questionableColor);
                $('#InputString14340 input').minicolors('value',page.data.sensors.config.display.config.unsafeColor);

            } else {
                 //This is the case of an empty config, create empty values
                console.log("no conifg found so setting up the object");
                page.data.sensors.config.display = {};
                page.data.sensors.config.display.config = {};
                page.data.sensors.config.display.config.safeColor = "";
                page.data.sensors.config.display.config.questionableColor = "";
                page.data.sensors.config.display.config.unsafeColor = "";
                page.data.sensors.config.display.page = "CameraDisplay";
            }

            //rules
            if (config.rules) {
               //Try to populate with existing values
                console.log("config object detected..here is what we saw");
                console.log(JSON.stringify(page.data.sensors.config));
            } else {
                 //This is the case of an empty config, create empty values
                console.log("no config found so setting up the object");
                page.data.sensors.config.rules = {};
                page.data.sensors.config.rules.safe = {};
                page.data.sensors.config.rules.safe.gte = "";
                page.data.sensors.config.rules.questionable = {};
                page.data.sensors.config.rules.questionable.lt = "";
                page.data.sensors.config.rules.questionable.gte = "";
                page.data.sensors.config.rules.unsafe = {};
                page.data.sensors.config.rules.unsafe.lt = "";
                page.data.sensors.config.rules.dwell = "";
            }        
    };


    page.data.refreshSensorConfigs();
    
    //make AccordionDetails hide accordingly    
    page.data.showConfig();
    
    page.data.refreshSensorConfigDetail = function(){
        var args = {};
        args.SensorId = page.data.sensor.id;
        console.log("sensorId="+args.SensorId);
        //alert("got for parameters ".concat(parameters));
        if (args.SensorId !== null) {
            console.log("Refreshing data");
            client.data.execute("cb.getSensorConfigDetail", args, function(response){
                client.sendClientEvent("ce_sensorConfigDetail", response);
            });
        }
    };
    
	page.data.refreshSensorConfigDetail();
    

    
