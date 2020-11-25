// ASSETS
var myArray = page.data.Workorders.assets;
for (var i =0; i < myArray.length; i++)
   if (myArray[i].name === extra.name) {
      myArray.splice(i,1);
      break;
   }

page.data.Workorders.assets = myArray;
client.sendClientEvent("ce_woAssets", page.data.Workorders.assets);
