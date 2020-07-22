    var page = this;
    console.log(JSON.stringify(parameters));
    //if (parameters.id === 0) {
    if (parameters.iAmNewSensor) {
        client.data.iAmNewSensor = parameters.iAmNewSensor;
        //alert("fell into else clause; could not detect dataObject");
    	//populate the page.data
    	//alert("populating sensor_id with ".concat(parameters));
        page.data.sensorConfigDetail.id = client.generateUUID(); 
        page.data.sensorConfigDetail.sensorId = parameters.sensorId;
        page.data.sensorConfigDetail.threshold = null;
        page.data.sensorConfigDetail.interval = null;
        page.data.sensorConfigDetail.intervalUnit = null;
        page.data.sensorConfigDetail.roles = null;
    } else {
        client.data.iAmNewSensor = false;
         //alert("fell into dataObject side of things");
        page.data.sensorConfigDetail.copyMatchingData(parameters.notification);
    }
    page.data.sensor.copyMatchingData(parameters.sensor);

    var newEnumList = [];
    newEnumList.push({value: "-select-", label:"-select-"});
    newEnumList.push({value: "hours", label:"hours"});
    newEnumList.push({value: "minutes", label:"minutes"});
    newEnumList.push({value: "seconds", label:"seconds"});
    client.getWidget("Droplist2433").enumeratedList = newEnumList;
    var http = new Http();
   	http.setVantiqUrlForResource("roles");
    http.setVantiqHeaders();
    parameters = {};
    http.select(parameters,function(response) {
    var enumlist = [];
    enumlist.push({value: "-select-", label:"-select-"});
	response.forEach(function (item){
    enumlist.push({value: item.id, label: item.name});
    });

    	client.getWidget("Role").enumeratedList = enumlist;
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing a select on 'Business'");
    });