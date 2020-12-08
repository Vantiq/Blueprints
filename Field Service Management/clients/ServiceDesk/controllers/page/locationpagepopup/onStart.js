var thisCopy = this;
this.data.Locations.initializeToDefaultValues();

if (parameters.name){
    thisCopy.data.Locations = parameters; 

} else{
    uuid(function(response){
        thisCopy.data.Locations.id = response;
    });
    this.data.Locations.customerid = parameters.companyid;
    this.data.Locations.customername = parameters.companyname;
}
