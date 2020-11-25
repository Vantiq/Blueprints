// copy of this
thisCopy = this;

// get the current users Unique ID
//this.data.user = client.getUsername();

// access to buttons
var atb = client.getWidget("addticketBtn");
var rtb = client.getWidget("resetticketBtn");
var tpt = client.getWidget("ticketpagetitle");

//Get list of service desk users for assignment
select("Users", null, client, function(response){
    var json = response;
    var users = [{"value":"-select-", "label":"- select -"}];
    $(json).each(function(index, item) {
        var name = item.fname + " " + item.lname;
        var obj = {value:item.username, label:name};
        users.push(obj);
    });   
    var assignmentList = client.getWidget("assignmentList");
    assignmentList.enumeratedList = users;   
});

// Determine if the page is opened up new or opened from ticket list (has parameters)
if (parameters){
    
    rtb.isVisible = false;
    atb.buttonLabel = "Update Ticket";
    tpt.text = "Update Ticket";
    
    this.data.Tickets.copyMatchingData(parameters);
 
	// populate the history in the html text widget
    if (parameters.history) 
        client.getWidget("HistoryText").html = parameters.history;
    else
        client.getWidget("HistoryText").html = "";
    
    //this.data.customeridselect = parameters.customerid + ":" + parameters.customername;
    this.data.dbid = parameters._id;  
   
    if (!parameters.assignedDate)
        this.data.Tickets.initializePropertyToDefaultValue("assignedDate");
    
    if (!parameters.closedDate)
        this.data.Tickets.initializePropertyToDefaultValue("closedDate");
    
    if (!parameters.firstResponseDate)
        this.data.Tickets.initializePropertyToDefaultValue("firstResponseDate");
    
    // popuate any contacts
    client.sendClientEvent("ce_tpcontactslist", parameters.contacts);
    
    // populate and assets
    client.sendClientEvent("ce_tpAssets", parameters.assets);
    
} else {

    this.data.dbid = null;
    atb.buttonLabel = "Submit Ticket";
    rtb.isVisible = true;
    tpt.text = "Add Ticket";    
    
  
    // RESET FORMS
    this.data.Tickets.initializeToDefaultValues();
    //this.data.initializePropertyToDefaultValue("comments");
    //this.data.initializePropertyToDefaultValue("assetname");
    //this.data.initializePropertyToDefaultValue("contactslist");
	//client.sendClientEvent("ce_Tickets",  []);
    //client.sendClientEvent("ce_customercontacts", []);
    client.sendClientEvent("ce_tpcontactslist", []);
    client.sendClientEvent("ce_tpAssets", []);

    // clear history widget
    client.getWidget("HistoryText").html = "";
	
 	// default to status to open
	this.data.Tickets.status = "Open";

	// default created and assigned to the current user
	this.data.Tickets.createdBy = client.getUsername();
    this.data.Tickets.createdByName = client.data.userFullName;
    this.data.Tickets.assignedTo = this.data.Tickets.createdBy;
    this.data.Tickets.assignedDate = Date.now();
    
    // END RESET
    uuid(function(value){ thisCopy.data.Tickets.id = value; });
}
