//Add Contact to the locations contact field which is an array of objects
var myArray = page.data.locations.contacts;

var contactName = $("#contactslist2 :selected").text();
var splitName = contactName.split(' ');

//Add the JSON string into a variable
//var contactitems = {"contactname":contactName, "contactemail":contactEmail, "contactid":page.data.contactslist};
var contactitems = {"id":page.data.contactslist2, "fname":splitName[0], "lname":splitName[1]};

//Push that JSON variable into an Array
myArray.push(contactitems);

//Update the original object.array value with the new JSON entry (see format below)
page.data.locations.contacts = myArray;

//Update table view to show user what products are listed
client.sendClientEvent("ce_customercontacts", page.data.locations.contacts);

