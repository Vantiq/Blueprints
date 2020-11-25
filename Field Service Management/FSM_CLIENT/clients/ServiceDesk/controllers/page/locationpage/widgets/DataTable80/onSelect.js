var myArray = page.data.locations.contacts;
//var table = client.getWidget("contactsTable");
//selectedrow = table.selectedRowObject;

for (var i =0; i < myArray.length; i++)
   if (myArray[i].lname === extra.lname) {
      myArray.splice(i,1);
      break;
   }

page.data.locations.contacts = myArray;

client.sendClientEvent("ce_customercontacts", page.data.locations.contacts);




