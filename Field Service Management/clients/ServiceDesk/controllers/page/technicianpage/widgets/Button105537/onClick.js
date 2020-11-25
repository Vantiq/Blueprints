client.popupPage("skillpage", "Add a New Skill for the Technician", null, function(response){    
    if (response){
        // add to the array IF not already in the array
        var arr = page.data.Technicians.skills;
        var found = false;
        for (var i =0; i < arr.length; i++)
            if (arr[i].skill === response.skill) {
                found = true;
                break;
            }
        if (!found) {
            arr.push({"skill":response.skill, "description":response.description});
            client.sendClientEvent("ce_techskills", arr);
            page.data.Technicians.skills = arr;
        }
    }
});
