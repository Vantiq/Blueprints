// ASSETS
var myArray = page.data.Tickets.assets;
for (var i =0; i < myArray.length; i++)
   if (myArray[i].id === extra.id) {
      myArray.splice(i,1);
      break;
   }

page.data.Tickets.assets = myArray;
client.sendClientEvent("ce_tpAssets", page.data.Tickets.assets);