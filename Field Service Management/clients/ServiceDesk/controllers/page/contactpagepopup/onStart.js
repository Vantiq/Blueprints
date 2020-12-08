var thisCopy = this;

/* 
var params = {where:{customerid:parameters.companyid}};
select("Locations", params, client, function(response){
	var json = response;
	var locations = [{"value":"-select-", "label":"- select -"}];
	$(json).each(function(index, item) {
		$('#locationSelect').append($('<option>', { 
			value: item.id,
            text : item.name 
         }));
    });  
});	
*/

this.data.Contacts.initializeToDefaultValues(); 
this.data.Contacts.companyid = parameters.companyid;
this.data.companyname = parameters.companyname;

//If opening to Edit
if (parameters.id){
    this.data.Contacts.copyMatchingData(parameters); 
} 
//Else opening to Add
else {
    uuid(function(response){
        thisCopy.data.Contacts.id = response;
    });
}