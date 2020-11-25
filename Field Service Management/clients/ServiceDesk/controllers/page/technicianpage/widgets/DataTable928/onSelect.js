// SKILLS
var myArray = page.data.Technicians.skills;
for (var i =0; i < myArray.length; i++)
   if (myArray[i].skill === extra.skill) {
      myArray.splice(i,1);
      break;
   }

page.data.Technicians.skills = myArray;
client.sendClientEvent("ce_techskills", page.data.Technicians.skills);


// remove the skill selected
/* CONTACTS

console.log("removing skill");
var myArray = page.data.Technicians.skills;

for (var i =0; i < myArray.length; i++)
   if (myArray[i].skill === extra.skill) {
      myArray.splice(i,1);
      break;
   }

setTimeout(function() {
    // whithout this delay it doesn't work right
    // page.data.technician.skills = myArray;
	client.sendClientEvent("ce_techskills", myArray);
}, 100);
*/
