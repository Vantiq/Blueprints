// For callback scoping
var thisCopy = this;

// Destroy the resource selector (remove previous settings)
if (!isEmpty(this.data.calendarSelect))
    this.data.calendarSelect.destroy();

// Empty out any selected technicians used to query events
this.data.selectedTechs = [];

thisCopy.data.workorder.copyMatchingData(parameters);

var options = [];
var params = {};
// Create the Technician List based on the required skills of the work order
var elems = [];
thisCopy.data.skills = "";
thisCopy.data.workorder.skills.forEach(function (skill) {
    var elem = {"$elemMatch": {"skill": skill.skill}};
    elems.push(elem);
    thisCopy.data.skills += skill.skill + ", ";
});
thisCopy.data.skills = thisCopy.data.skills.substring(0, thisCopy.data.skills.length-2);

if (elems) {  // may not have any skills
    params.where = {"skills": {"$all": elems }};
}
params.sort = {"lname":1, "fname":1};  // Ascending sort of Last+First name
console.log (" Params -> " + JSON.stringify(params));
select("Technicians", params, client, function(response){
    response.forEach(function (item){
        var optText = item.lname + ", " + item.fname;

        var obj = {};
        var colors = getColors(item.username);

        var option = { 
            value		: item.username,
            text 		: optText,
            innerHTML	: '<span style="color:'+colors.text+'; background:'+colors.background + '">&nbsp;&nbsp;</span>&nbsp;' + optText,
            data		: {textColor: colors.text, background: colors.background}
        };
        options.push(option);

        // We are going to default the list of events to all technicians making the cut
        thisCopy.data.selectedTechs.push(item.username);
    });

    // Create the combo-select widget for the resources
    thisCopy.data.calendarSelect = new SlimSelect({
        select: '#assignSelection',  // this is the tag in the DOM
        valuesUseText: false, // Use text instead of innerHTML for selected values - default false
        placeholder: 'Select Technician to add',
		onChange: function(info) {
            // This is called whenever a new item is added or removed from the combo-selector list
            // NOTE: The list will be returned in alphabetical order.

            // Create the object of data to be sent along with the event
            var wo = {};
            wo.id = thisCopy.data.workorder.id;
            wo.activitytype = thisCopy.data.workorder.activitytype;
            wo.summary = thisCopy.data.workorder.summary;
            wo.description = thisCopy.data.workorder.description;
            wo.customer = thisCopy.data.workorder.customer;
            wo.customerId = thisCopy.data.workorder.customerId;
            wo.priority = thisCopy.data.workorder.priority;
            wo.skills = thisCopy.data.workorder.skills;
            wo.estimatedHours = thisCopy.data.workorder.estimatedHours;
            wo.status = thisCopy.data.workorder.status;
            wo.techId = thisCopy.data.workorder.techId;
            wo.techname = thisCopy.data.workorder.techname;
            wo.servicedeskowner = thisCopy.data.workorder.servicedeskowner;
            wo.scheduledArrivalDate = thisCopy.data.workorder.scheduledArrivalDate;
            wo.scheduledCompletionDate = thisCopy.data.workorder.scheduledCompletionDate;
            wo.techAssignmentDate = thisCopy.data.workorder.techAssignmentDate;
            wo.actualArrivalDate = thisCopy.data.workorder.actualArrivalDate;
            wo.actualCompletionDate = thisCopy.data.workorder.actualCompletionDate;

            // Get the complete list of currently selected technicians (their username
            thisCopy.data.selectedTechs = thisCopy.data.calendarSelect.selected();
			console.log(" calendarSelect ONCHANGE: ");
            console.log(thisCopy.data.calendarSelect.selected());

            addDraggableEventsForSelection(thisCopy.data.selectedTechs, thisCopy.data.workorder);
            
            // Refresh the calendar with new list
            $('#assignCalendar').fullCalendar('refetchEvents');
        }
    });

    // Add options to select widget
    if(options) {
        console.log("GOT OPTIONS");
        thisCopy.data.calendarSelect.setData(options);
    }

	// Initialize the calendar and remove any existing calendar events from a previous display
	thisCopy.data.calendar.init();
	$('#assignCalendar').fullCalendar('removeEvents');

    // Set the selected default technicians
    if (thisCopy.data.selectedTechs) {
        console.log(" SELECTED TECHS ->" + thisCopy.data.selectedTechs);
        //thisCopy.data.calendarSelect.set (thisCopy.data.selectedTechs);
        
    }
    client.getWidget("loadingImage").isVisible = false;

});

function addDraggableEventsForSelection(selectedList, current_wo, callback) {

    // Create the object of data to be sent along with the event
    var wo = {};
    wo.id = current_wo.id;
    wo.activitytype = current_wo.activitytype;
    wo.summary = current_wo.summary;
    wo.description = current_wo.description;
    wo.customer = current_wo.customer;
    wo.customerId = current_wo.customerId;
    wo.priority = current_wo.priority;
    wo.skills = current_wo.skills;
    wo.estimatedHours = current_wo.estimatedHours;
    wo.status = current_wo.status;
    wo.techId = current_wo.techId;
    wo.techname = current_wo.techname;
    wo.servicedeskowner = current_wo.servicedeskowner;
    wo.scheduledArrivalDate = current_wo.scheduledArrivalDate;
    wo.scheduledCompletionDate = current_wo.scheduledCompletionDate;
    wo.techAssignmentDate = current_wo.techAssignmentDate;
    wo.actualArrivalDate = current_wo.actualArrivalDate;
    wo.actualCompletionDate = current_wo.actualCompletionDate;

    var index = 0;
    // Slim Select has a specific DOM section for each selected item in the combo box, we'll traverse them all and 
    // when one WITHOUT an event is identified, add a draggable event
    $('.ss-values .ss-value').each(function() {
        if (!$(this).data('event')) {
            // Through testing we found the array of the selected is in sync with .ss-values
            // (Both the selected technicians returned and order displayed are alphabetical and using an
            //  incremental 'index' works fine.)
            console.log("Adding NEW event for "+ selectedList[index]);

            // We store data so the calendar knows to render an event upon drop
            var colors = getColors(selectedList[index]);

            // Let the eventRender figure out start/end dates - default to all-day event
            var utc = $.fullCalendar.moment.utc(wo.scheduledArrivalDate).format("YYYY-MM-DD");
            $(this).data('event', {
                title: 			wo.summary,
                id: 			uuidv4(),
                start: 			utc,
                textColor: 		colors.text,
                backgroundColor: colors.background,
                borderColor: 	colors.background,
                techId:			selectedList[index],
                assigned:		false,
                workorder: 		wo,
                newEvent:		true,
                stick:  		true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

            console.log("ADDED event for selection: ");
            console.log($(this));
        }
        index++;
    });

    if (callback)
        callback();
}
