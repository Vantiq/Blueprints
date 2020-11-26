thisCopy = this;

//Load the button widget properties into a variable
var btn = client.getWidget("addassetBtn");
var rab = client.getWidget("resetassetBtn");
var assetfield = client.getWidget("assetname");
    
// get the map
var mapWidget = client.getWidget("AssetMap");
var map = mapWidget.map;

// reset all values
this.data.Assets.initializeToDefaultValues();
    


if (parameters){
    
    //If there are parameters present we know this is an Edit, change the button text to Update
    btn.buttonLabel = "Update Record";
    rab.buttonLabel = "Cancel";
    assetfield.isReadOnly = true;
    
    //this.data.assets = parameters;
    thisCopy.data.Assets.copyMatchingData(parameters); 
    thisCopy.data.dbid = parameters._id;
    
    // get all customers for customer dropdown
    execute("cb.getAllCustomers", {}, client, function(response){
        
        console.log(response);

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});
		console.log("before loop");
        response.forEach(function (item){
           enumlist.push({value: item.id, label: item.companyname});
        });
		console.log("afterloop");
        client.getWidget("assetCustomerDroplist").enumeratedList = enumlist;
        
        // now populate the location dropdown      
        execute("cb.getLocationsByCustomerId", {id: thisCopy.data.Assets.customer_ref_customers}, client, function(response){

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
               enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("assetLocationDroplist").enumeratedList = enumlist;
            
        });

        // now populate the contact dropdown      
        execute("cb.getContactsByCustomerId", {id: thisCopy.data.Assets.customer_ref_customers}, client, function(response){

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
               enumlist.push({value: item.id, label: item.firstname + " " + item.lastname});
            });

            client.getWidget("assetContactDroplist").enumeratedList = enumlist;
            
        });

    });
    
    // set the location
    
    //set the map center
    var lat = thisCopy.data.Assets.location.coordinates[1];
    var lng = thisCopy.data.Assets.location.coordinates[0];
    map.setCenter({lat: lat, lng: lng});
    
    // zoom the map in close
    map.setZoom(18);
    
    // clear the previous assett marker if there is one
    console.log(client.data.assetMarker);
    
    if (!isEmpty(client.data.assetMarker) )
    	client.data.assetMarker.setMap(null);
    
    // add the latest assett marker
    client.data.assetMarker	 = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: 'Pump'
    });
    
    // adjust the assethistory to just this asset
	var ds = client.getDataStreamByName("tq_assetHistory");
    var p = new TimedQueryParameters();

    p.whereClause = {
        id:   parameters.id
    };

    client.modifyTimedQuery(ds,p);
	client.getWidget("LineChart1").reset();
	client.getWidget("LineChart2").reset();

} else {
    this.data.Assets.initializeToDefaultValues();
    
    
    // get all customers for customer dropdown
    execute("cb.getAllCustomers", {}, client, function(response){
        
        console.log(response);

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});
		console.log("before loop");
        response.forEach(function (item){
           enumlist.push({value: item.id, label: item.companyname});
        });
		console.log("afterloop");
        client.getWidget("assetCustomerDroplist").enumeratedList = enumlist;

    });
    
    //If there are no parameters we know this is an Add so change the button label to Submit
    btn.buttonLabel = "Submit";  
    rab.buttonLabel = "Reset";
    assetfield.isReadOnly = false;
    uuid(function(value){
    	thisCopy.data.Assets.id = value;
	});  
    thisCopy.data.dbid = null;
}



   