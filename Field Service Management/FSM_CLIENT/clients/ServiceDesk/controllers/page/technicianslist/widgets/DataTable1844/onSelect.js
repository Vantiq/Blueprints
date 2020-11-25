/*client.popupPage("skillpage", "Choose a skill to add.", extra, function(response){    
    if (response){
        client.infoDialog("Skill " + response.skill + " has been updated.");
        select("Skills", null, client, function(response){
			client.sendClientEvent("ce_Skills", response);
		});
    }
});
*/