// The calendar filters technicians based on the required skills - verify it is populated and at least one technician is available before continuing
var skills = page.data.Workorders.skills;
if (skills.length < 1) {
	// array does not exist, is not an array, or is empty
    client.infoDialog("Please select a skill before doing a Manual assignment");
    
} else {  // check for at least one technician
   
    client.popupPage("assignTechnician","Assign Technician",page.data.Workorders,function(returnParameters) {    
        console.log("The Return Parameters: " + returnParameters);
        if (returnParameters)
            page.data.Workorders.copyMatchingData(returnParameters);
	});
}