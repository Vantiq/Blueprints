// CONTACTS
var myArray = page.data.Tickets.contacts;
for (var i =0; i < myArray.length; i++)
   if (myArray[i].id === extra.id) {
      myArray.splice(i,1);
      break;
   }

page.data.Tickets.contacts = myArray;
client.sendClientEvent("ce_tpcontactslist", page.data.Tickets.contacts);