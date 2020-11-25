// SKILLS
var myArray = page.data.Workorders.skills;
for (var i =0; i < myArray.length; i++)
   if (myArray[i].id === extra.id) {
      myArray.splice(i,1);
      break;
   }

page.data.Workorders.skills = myArray;
client.sendClientEvent("ce_workorderskills", page.data.Workorders.skills);