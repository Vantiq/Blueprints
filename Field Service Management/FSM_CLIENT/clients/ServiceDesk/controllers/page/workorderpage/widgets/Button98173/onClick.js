client.popupPage("skillspopup", "Select a Required Skill for the Technician", null, function(response){
    if (response){
        // add to the contact array IF not already in the array
        var arr = page.data.Workorders.skills;
        var found = false;
        for (var i =0; i < arr.length; i++)
            if (arr[i].skill === response.skill) {
                found = true;
                break;
            }
        if (!found) {
            arr.push(response);
            client.sendClientEvent("ce_workorderskills", arr);
            page.data.Workorders.skills = arr;
        }
    }
});
