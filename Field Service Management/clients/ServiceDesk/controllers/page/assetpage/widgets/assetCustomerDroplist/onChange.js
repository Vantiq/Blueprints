//cb.getLocationById(id String)
    
// get all locations for customer dropdown
execute("cb.getLocationsByCustomerId", {id: page.data.Assets.customer_ref_customers}, client, function(response){
    
    var enumlist = [];
    enumlist.push({value: "-select-", label:"-select-"});
    
    response.forEach(function (item){
       enumlist.push({value: item.id, label: item.name});
    });
    
    client.getWidget("assetLocationDroplist").enumeratedList = enumlist;

});
    
// get all contacts for customer dropdown
execute("cb.getContactsByCustomerId", {id: page.data.Assets.customer_ref_customers}, client, function(response){
    
    var enumlist = [];
    enumlist.push({value: "-select-", label:"-select-"});
    
    response.forEach(function (item){
       enumlist.push({value: item.id, label: item.firstname + " " + item.lastname});
    });
    
    client.getWidget("assetContactDroplist").enumeratedList = enumlist;

});