var atb = client.getWidget("addtechBtn");
var rtb = client.getWidget("resettechBtn");
var tpt = client.getWidget("techpagetitle");
var t1 = client.getWidget("tusername");

// determine if the page is opened up new or opened from list
if (parameters){
    rtb.isVisible = false;
    atb.buttonLabel = "Update Technician";
    tpt.text = "Update Technician";
    t1.isReadOnly = true;
    
	this.data.dbid = parameters._id;
    this.data.Technicians.copyMatchingData(parameters);
    client.sendClientEvent("ce_techskills", this.data.Technicians.skills);
        
} else {
	rtb.isVisible = true;
    atb.buttonLabel = "Submit Technician";
    tpt.text = "Add Technician";  
    t1.isReadOnly = false;
  
	// RESET FORM
	this.data.dbid = null;
	this.data.Technicians.initializeToDefaultValues();
    //this.data.Technicians.geolocation = null;
    client.sendClientEvent("ce_techskills", []);

}