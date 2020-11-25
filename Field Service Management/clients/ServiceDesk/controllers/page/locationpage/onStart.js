// var thisCopy = this;



this.data.locations.id = "brett was here";

// determine if the page is opened up new or opened from customer list

console.log("Brett was here:\n" + JSON.stringify(parameters,null, 2));
if (parameters){
  
	// this.data.dbid = parameters._id;  
    this.data.locations.copyMatchingData(parameters); 
    
    
    // client.sendClientEvent("ce_customercontacts", parameters.contacts);
} 

/*
select("customer", {}, function(response){
	console.log(JSON.stringify(response));
    var json = response;
    var listItems = [{"value":"- select -", "label":"- select -"}];
	$(json).each(function(index, item) {
        var obj = {"value":item.id + ":" + item.companyname, "label":item.companyname};
        listItems.push(obj);
    });
	var customerList = client.getWidget("customers2");
	customerList.enumeratedList = listItems;    
});
*/

//Pull the list of Contacts from that type field and populate the contactslist dropdown widget
/*
select("contacts", {}, function(response){
	console.log(JSON.stringify(response));
    var json = response;
    var listItems = [{"value":"- select -", "label":"- select -"}];
    $(json).each(function(index, item) {      
    	var name = item.fname + " " + item.lname;
        var obj = {"value":item.id, "label":name};
        listItems.push(obj);
        
    });
    var contactList = client.getWidget('contactslist2');
    contactList.enumeratedList = listItems;    
});
*/
