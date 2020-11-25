
this.data.Locations.initializeToDefaultValues();

if (parameters){
    
    client.data.Locations = parameters;
  
	this.data.dbid = parameters._id;  
    this.data.Locations.copyMatchingData(parameters); 
    
    var params = {
        where: {locationid: this.data.Locations.id},
        sort:{"ars_createdAt":-1}
    };

    select("Contacts", params, client, function(response){
        client.sendClientEvent("ce_Contacts", response);
    });
    
    
    
} 