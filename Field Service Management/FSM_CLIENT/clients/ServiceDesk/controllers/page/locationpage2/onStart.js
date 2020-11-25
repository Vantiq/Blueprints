if (parameters){
  
	this.data.dbid = parameters._id;  
    this.data.locations.copyMatchingData(parameters); 
    
    
    // client.sendClientEvent("ce_customercontacts", parameters.contacts);
} 