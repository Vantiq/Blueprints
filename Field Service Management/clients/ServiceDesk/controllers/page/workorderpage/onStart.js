// copy of this
var thisCopy = this;

//Get list of service desk users for assignment
select("Users", null, client, function(response){
    var json = response;
    var users = [{"value":"-select-", "label":"- select -"}];
    $(json).each(function(index, item) {
        var name = item.fname + " " + item.lname;
        var obj = {value:item.username, label:name};
        users.push(obj);
    });   
    var assignmentList = client.getWidget("servicedeskowner");

    assignmentList.enumeratedList = users;   
});


// get access to butttons
var awb = client.getWidget("addworkBtn");
var rtb = client.getWidget("resetworkBtn");
var tpt = client.getWidget("workorderpagetitle");
var atb = client.getWidget("assignTechBtn");
var aab = client.getWidget("autoAssignBtn");
var atkb =client.getWidget("AssociateTicketBtn");
//var atkl =client.getWidget("atkLayout");
var sad = client.getWidget("SchedArrivalDate");
var scd = client.getWidget("SchedCompDate");
var vsg = client.getWidget("viewSignature");

//var alayout = client.getWidget("assignLayout");


// get a list of tickets that are not closed
var params = {where:{status:{"$ne":"closed"}}};
select("Tickets", params, client, function(response){
    client.sendClientEvent("ce_Tickets",response);
});

//Fill service desk users menu
select("Users", null, client, function(response){
    console.log("Success --- " + JSON.stringify(response));
    var json = response;
    var listItems = [{"value":"-select- ", "label":"- select -"}];
    $(json).each(function(index, item) {
        var name = item.fname + " " + item.lname;
        var value = item.username;
        var obj = {"value":value, "label":name};
        listItems.push(obj);
    });
    var users = client.getWidget("servicedeskowner");
    users.enumeratedList = listItems;
});

function formatDate(dstring) {
    var date = new Date(dstring);
    var options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    var options2 = {hour:'2-digit', minute: '2-digit' };
    var top = date.toLocaleDateString("en-US", options1);
    var bottom = date.toLocaleTimeString("en-US", options2);

    return top + '<br>' + bottom;
}

// code to support the 'pizza flow'status

// Based on the number of images to display - used as an iterator
var imgArr = [];
imgArr.push('list');
imgArr.push('person');
imgArr.push('enroute');
imgArr.push('technician');
imgArr.push('checkbox');

// Gray all status elements by default
imgArr.forEach(function(item){
    $('#' + item + '_gray' ).fadeIn(1);
    $('#' + item + '_image'  ).fadeOut(1);

});


if(parameters){
   
    // get the list of locations for the customer
    var param = {where:{customerid:{"$eq":parameters.customerId}}};
    select("Locations", param, client, function(response){
        console.log("Success --- " + JSON.stringify(response));
        var listItems = [{"value":"-select-", "label":"- select -"}];
        $(response).each(function(index, item) {
            var value = item.id;
            var obj = {"value":value, "label":item.name};
            listItems.push(obj);
        });
        var locationList = client.getWidget("LocationDroplist");
        locationList.enumeratedList = listItems;
    });
    
    
    this.data.dbid = parameters._id;
    this.data.Workorders.copyMatchingData(parameters); 
    
    vsg.isVisible = true;
    rtb.isVisible = false;
    // If the workorder has a technician, then you will not be able to change the tech assignment
    if (this.data.Workorders.techId) {
        $('#autoAssignBtn .vantiqButton').addClass("vantiqButtonDisabled");
        $('#autoAssignBtn .vantiqButton').removeClass("vantiqButton");
        $('#autoAssignBtn .vantiqButtonDisabled').prop('disabled', true);
        $('#assignTechBtn .vantiqButton').addClass("vantiqButtonDisabled");
        $('#assignTechBtn .vantiqButton').removeClass("vantiqButton");
        $('#assignTechBtn .vantiqButtonDisabled').prop('disabled', true);
        $('#AssociateTicketBtn .vantiqButton').addClass("vantiqButtonDisabled");
        $('#AssociateTicketBtn .vantiqButton').removeClass("vantiqButton");
        $('#AssociateTicketBtn .vantiqButtonDisabled').prop('disabled', true);
    } else {
        $('#autoAssignBtn .vantiqButtonDisabled').addClass("vantiqButton");
        $('#autoAssignBtn .vantiqButton').removeClass("vantiqButtonDisabled");
        $('#autoAssignBtn .vantiqButton').prop('disabled', false);
        $('#assignTechBtn .vantiqButtonDisabled').addClass("vantiqButton");
        $('#assignTechBtn .vantiqButton').removeClass("vantiqButtonDisabled");
        $('#assignTechBtn .vantiqButton').prop('disabled', false);
        $('#AssociateTicketBtn .vantiqButtonDisabled').addClass("vantiqButton");
        $('#AssociateTicketBtn .vantiqButton').removeClass("vantiqButtonDisabled");
        $('#AssociateTicketBtn .vantiqButtonDisabled').prop('disabled', false);
    }
    sad.isReadOnly = true;
    scd.isReadOnly = true;
    awb.buttonLabel = "Update Work Order";
    tpt.text = "Update Work Order";
    
   //handle dates coming from listview table 
    if (!parameters.techAssignmentDate) 
       this.data.Workorders.initializePropertyToDefaultValue("techAssignmentDate");
   	if (!parameters.scheduledCompletionDate)
        this.data.Workorders.initializePropertyToDefaultValue("scheduledCompletionDate");
   	if (!parameters.scheduledArrivalDate)
       this.data.Workorders.initializePropertyToDefaultValue("scheduledArrivalDate");
    if (!parameters.closedDate)
        this.data.Workorders.initializePropertyToDefaultValue("closedDate");
    if (!parameters.creationDate)
       this.data.Workorders.initializePropertyToDefaultValue("creationDate");
    if (!parameters.actualArrivalDate)
       this.data.Workorders.initializePropertyToDefaultValue("actualArrivalDate");
    if (!parameters.actualStartDate)
       this.data.Workorders.initializePropertyToDefaultValue("actualStartDate");


	// code to support the 'pizza flow'status
    var state = '';

    // Get the current state of the record, which is used to identify when to stop highlighting images
    if (parameters.status === 'Created')
        state = 'list';
    else if (parameters.status === 'Assigned')
        state = 'person';
    else if (parameters.status === 'En Route')
        state = 'enroute';
    else if (parameters.status === 'On-Site')
        state = 'technician';
    else if (parameters.status === 'Completed')
        state = 'checkbox';

    // There are 3 Divs for each image (highlighted, grayed, and text area for the date)
    // Initialize to show all the grayed images
    imgArr.forEach(function(item){
        $('#' + item + '_gray' ).fadeIn(800);
        $('#' + item + '_image' ).fadeOut(800);
    });

    var offset = 300; // between images
    var stateReached = false;  // when true, all other images will show the grayed version
    imgArr.forEach(function(item){
        setTimeout(function(){

            if (stateReached === false){

                // Display the highlighted version of the image and include the text
                $('#' + item + '_image' ).fadeOut(800, function(){

                    //console.log("After FadeOut");
                    switch (item) {
                        case 'list':
                            console.log(" 	parameters 'list' -> " + parameters.creationDate);
                            $("#list_title").html("Created");
                            if (parameters.creationDate) {
                                var listDate = formatDate(parameters.creationDate);
                                $("#list_txt").html(listDate);
                                // Fade in the highlighted and out the grayed image
                                $('#' + item + '_image' ).fadeIn(800);
                                $('#' + item + '_gray' ).fadeOut(800);
                            } else {
                                // Fade out the highlighted and in the grayed image
                                $('#' + item + '_image' ).fadeOut(800);
                                $('#' + item  + '_gray' ).fadeIn(800);
                            }
                            break;
                        case 'person':
                            console.log(" 	Status 'person' -> " + parameters.techAssignmentDate);
                            $("#person_title").html("Assigned");
                            if (parameters.techAssignmentDate) {
                                var personDate = formatDate(parameters.techAssignmentDate);
                                $("#person_txt").html(personDate);
                                // Fade in the highlighted and out the grayed image
                                $('#' + item + '_image' ).fadeIn(800);
                                $('#' + item + '_gray' ).fadeOut(800);
                            } else {
                                // Fade out the highlighted and in the grayed image
                                $('#' + item + '_image' ).fadeOut(800);
                                $('#' + item  + '_gray' ).fadeIn(800);
                            }
                            break;
                        case 'enroute':
                            console.log(" 	Status 'enroute' -> " + parameters.actualStartDate);
                            $("#enroute_title").html("En Route");
                            if (parameters.actualStartDate) {
                                var enrouteDate = formatDate(parameters.actualStartDate);
                                $("#enroute_txt").html(enrouteDate);
                                // Fade in the highlighted and out the grayed image
                                $('#' + item + '_image' ).fadeIn(800);
                                $('#' + item + '_gray' ).fadeOut(800);
                            } else {
                                // Fade out the highlighted and in the grayed image
                                $('#' + item + '_image' ).fadeOut(800);
                                $('#' + item  + '_gray' ).fadeIn(800);
                            }
                            break;
                        case 'technician':
                            console.log(" 	Status 'technician' -> " + parameters.actualArrivalDate);
                            $("#technician_title").html("On Site");
                            if (parameters.actualArrivalDate) {
                                var technicianDate = formatDate(parameters.actualArrivalDate);
                                $("#technician_txt").html(technicianDate);   
                                // Fade in the highlighted and out the grayed image
                                $('#' + item + '_image' ).fadeIn(800);
                                $('#' + item + '_gray' ).fadeOut(800);
                            } else {
                                // Fade out the highlighted and in the grayed image
                                $('#' + item + '_image' ).fadeOut(800);
                                $('#' + item  + '_gray' ).fadeIn(800);
                            }
                            break;
                        case 'checkbox':
                            console.log(" 	Status 'checkbox' -> " + parameters.actualCompletionDate);
                            $("#checkbox_title").html("Completed");
                            if (parameters.actualCompletionDate) {
                                var checkboxDate = formatDate(parameters.actualCompletionDate);
                                $("#checkbox_txt").html(checkboxDate);
                                // Fade in the highlighted and out the grayed image
                                $('#' + item + '_image' ).fadeIn(800);
                                $('#' + item + '_gray' ).fadeOut(800);
                            } else {
                                // Fade out the highlighted and in the grayed image
                                $('#' + item + '_image' ).fadeOut(800);
                                $('#' + item  + '_gray' ).fadeIn(800);
                            }

                    }

                });

            } else {
                // Fade out the highlighted and in the grayed image
                $('#' + item + '_image' ).fadeOut(800);
                $('#' + item  + '_gray' ).fadeIn(800);

                //console.log('%c TRUE: ' + item, "color: red");
            }

            if (item === state ){
                stateReached = true;
            }
            //console.log('%c Item: ' + item, "color: red");

        }, offset);
        offset += 300;
    });
    
    client.sendClientEvent("ce_woAssets", parameters.assets);
    client.sendClientEvent("ce_Contacts", parameters.contacts);
    client.sendClientEvent("ce_workordernotes", parameters.notes);
    client.sendClientEvent("ce_workorderskills", parameters.skills);
    
   
}  else {
    
    thisCopy.data.dbid = null;
    awb.buttonLabel = "Submit Work Order";
	rtb.isVisible = true;
    tpt.text = "Add Work Order";    
    $('#autoAssignBtn .vantiqButtonDisabled').addClass("vantiqButton");
    $('#autoAssignBtn .vantiqButton').removeClass("vantiqButtonDisabled");
    $('#autoAssignBtn .vantiqButton').prop('disabled', false);
    $('#assignTechBtn .vantiqButtonDisabled').addClass("vantiqButton");
    $('#assignTechBtn .vantiqButton').removeClass("vantiqButtonDisabled");
    $('#assignTechBtn .vantiqButton').prop('disabled', false);
    $('#AssociateTicketBtn .vantiqButtonDisabled').addClass("vantiqButton");
    $('#AssociateTicketBtn .vantiqButton').removeClass("vantiqButtonDisabled");
    $('#AssociateTicketBtn .vantiqButtonDisabled').prop('disabled', false);
    sad.isReadOnly = false;
    scd.isReadOnly = false;
    vsg.isVisible = false;

    client.sendClientEvent("ce_woAssets", []);
    client.sendClientEvent("ce_workordernotes", []);
    client.sendClientEvent("ce_Contacts", []);
    client.sendClientEvent("ce_workorderskills", []);
    
    // RESET FORMS
	thisCopy.data.Workorders.initializeToDefaultValues();
    uuid(function(value){
    	thisCopy.data.Workorders.id = value;
	});
	thisCopy.data.Workorders.status = "Created";
    thisCopy.data.Workorders.creationDate = Date.now();
    
	// END RESET

}