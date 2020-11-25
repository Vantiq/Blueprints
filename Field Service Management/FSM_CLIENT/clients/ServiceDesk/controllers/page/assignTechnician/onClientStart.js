// For callback scoping
var thisCopy = this;

/* initialize the calendar
-----------------------------------------------------------------*/
this.data.calendar.init = function(){
	$('#assignCalendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
        
        height: 500,
	
		editable: true,
		
		// Call back to get the events based on start/end time of the calendar
		events : function(start, end, timezone, callback){

			var query = {};
			query.props = ["id", "activitytype", "summary", "description", "customer", "customerId",
							"priority", "skills", "estimatedHours", "status", "techId", "techname",
							"servicedeskowner", "scheduledArrivalDate", "scheduledCompletionDate", 
							"techAssignmentDate", "actualArrivalDate", "actualCompletionDate"];
			query.where = {};
            query.where.scheduledArrivalDate = {$gte:moment(start.format()).toISOString(),
											    $lt:moment(end.format()).toISOString()};

            // If there is a selected list of technicians, include limit
			if (thisCopy.data.selectedTechs && thisCopy.data.selectedTechs.length > 0)
				query.where.techId = {$in: thisCopy.data.selectedTechs };
			else  // otherwise, it must at least be assigned to a technician to be displayed
				query.where.techname = {$exists: true};
            console.log (">>> query ->" + JSON.stringify(query, null, 2));
            
			var events = [];
			select("Workorders", query, client, function(response){
		
				response.forEach(function (item){
					var wo = {};
					wo.id = item.id;
					wo.activitytype = item.activitytype;
					wo.summary = item.summary;
					wo.description = item.description;
					wo.customer = item.customer;
					wo.customerId = item.customerId;
					wo.priority = item.priority;
					wo.skills = item.skills;
					wo.estimatedHours = item.estimatedHours;
					wo.status = item.status;
					wo.techId = item.techId;
					wo.techname = item.techname;
					wo.servicedeskowner = item.servicedeskowner;
					wo.scheduledArrivalDate = item.scheduledArrivalDate;
					wo.scheduledCompletionDate = item.scheduledCompletionDate;
					wo.techAssignmentDate = item.techAssignmentDate;
					wo.actualArrivalDate = item.actualArrivalDate;
					wo.actualCompletionDate = item.actualCompletionDate;

					
					// event object
					var obj = {};
					// Determine if the wo can be editable
					if (wo.actualArrivalDate) {  // not editable if started
						obj.editable = false;
						if (wo.actualCompletionDate) { // wo is done
							if (wo.actualArrivalDate === wo.actualCompletionDate) { // all-day event
								// UTC format
								obj.start = $.fullCalendar.moment.utc(wo.actualArrivalDate).format("YYYY-MM-DD");
							} else {
								obj.start = wo.actualArrivalDate;
								obj.end = wo.actualCompletionDate;
							}
						} else {  // wo is in progress, use scheduled dates for the calendar
							if (wo.scheduledArrivalDate === wo.scheduledCompletionDate) { // all-day event
								obj.start = $.fullCalendar.moment.utc(wo.scheduledArrivalDate).format("YYYY-MM-DD");
							} else {
								obj.start = wo.scheduledArrivalDate;
								obj.end = wo.scheduledCompletionDate;
							}
						}		
					} else {
						obj.editable = true;
						// identify if an all-day event or not
						if (wo.scheduledArrivalDate === wo.scheduledCompletionDate) { // all-day event
							obj.start = $.fullCalendar.moment.utc(wo.scheduledArrivalDate).format("YYYY-MM-DD");
						} else {
							obj.start = wo.scheduledArrivalDate;
							obj.end = wo.scheduledCompletionDate;
						}
					}

					// Colors for the selectable technicians based on their ID
		            var colors = getColors(wo.techId);

                    // Set the other data for the event
					obj.title = wo.summary;
					obj.id = uuidv4();
					obj.textColor = colors.text;
					obj.backgroundColor = colors.background;
					obj.borderColor = colors.background;
					obj.assigned = wo.techId ? true : false;
					obj.techId = wo.techId;
					obj.newEvent = null;
					obj.workorder = wo;  // limited properties (see above)
					events.push(obj);
					console.log(" calendar init event added -->" + JSON.stringify(obj));
				});
				
				callback(events);

			});
		},
		timezone: "local",
		droppable: true, // this allows things to be dropped onto the calendar
        eventDragStop: function (event, jsEvent, ui, view ) { 
            /*
            This callback is guaranteed to be triggered after the user drags an event, even if the event 
            doesn’t change date/time. It is triggered before the event’s information has been modified 
            (if moved to a new date/time) and before the eventDrop callback is triggered.
            */
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventDragStop): " + event.title);
			
			// Dragging calendar event to the trash can for removal...
            var trashEl = jQuery('#assignCalendarTrash');
            var ofs = trashEl.offset();

            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);

            if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
			
                // remove the event
                $('#assignCalendar').fullCalendar('removeEvents', event.id);
                console.log(event.title + " (eventDragStop event) REMOVED");

                // Reset work order operation to default (created/NEW), keep planned start and completion
				var emptyMoment = moment("".format()).toISOString();
				event.workorder.actualArrivalDate = emptyMoment;
				event.workorder.actualCompletionDate = emptyMoment;
				//event.workorder.fab_enroute = emptyMoment;
				event.workorder.techAssignmentDate = emptyMoment;
				event.workorder.techId = '';
				event.workorder.techname = '';
				event.workorder.status = 'Created';
				event.workorder.creationDate = Date.now();
				
				if (event.newEvent === null) {
					upsert("Workorders", event.workorder, client, function(response){
						console.log("(eventDragStop event) - updated database");
						console.log(event);
					});
				} else thisCopy.data.workorder.copyMatchingData(event.workorder);
            }
           
        },
		drop: function(date, jsEvent, ui, resourceId) {
			// NOTE: While the app allows you to drop the same event multiple times on the calendar,
			//       the last drop wins (the same record is being updated for each drop or change to
			//       the event moving forward).
			//       Ideally, we would create a NEW record and event for each drop, though complexity
			//       arises because event.id would need to be generated again and not sure if fullCalendar
			//       allows you to 'clone' and event.
			
			// Get the event from the DOM
			var event = $(this).data('event');
			
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (event drop): " + event.title + " was dropped on " + date.format());
			console.log(event);

            var sdate, edate;

			sdate = moment(event.start);
			// For all day events, you don't want to have an event.end
			if (event.end){
				edate = moment(event.end);
			} else {
				edate = sdate;  
			}

			// Get the vantiqUserId
			var params = {};
			params.where = {"username": event.techId};
			select("Technicians", params, client, function(response){
				if (response.length > 0) {  // verify we found one
					console.log ("found username -> " + response[0].username);
					event.workorder.techId = response[0].username;
					event.workorder.techname = response[0].fname + " " + response[0].lname;
					event.techId = response[0].username;
				}
				
				console.log ("vantiqUserId = " + event.workorder.techId);

				if (event.newEvent === null) {
					upsert("Workorders", event.workorder, client, function(response){
						console.log("(Drop event) - updated database");
						$('#assignCalendar').fullCalendar('updateEvent', event);
						console.log(event.title + " (Drop event) UPDATED event");
						console.log(event);
						thisCopy.data.lastAddedEvent = thisCopy.data.workorder;
					});
				} else 
                    thisCopy.data.workorder.copyMatchingData(event.workorder);

			});
			
			
		},
		eventDrop: function(event, delta, revertFunc){
			// Triggered when dragging stops and the event has moved to a different day/time.
			
			// watch out for full day events as there is no end and will error
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventDrop): " + event.title + " will start on " + event.start.format());
			console.log(event);

            var sdate, edate;

			sdate = moment(event.start);

			// For all day events, you don't want to have an event.end
			if (event.end){
				edate = moment(event.end);
			} else {
				edate = sdate;  
			}

			// update the event with updated information
			event.workorder.scheduledArrivalDate = moment(sdate.format()).toISOString();
			event.workorder.scheduledCompletionDate = moment(edate.format()).toISOString();
				
			$('#assignCalendar').fullCalendar('updateEvent', event);
			console.log(event.title + " (eventDrop event) UPDATED");
			console.log(event);
            
			if (event.newEvent === null) {
				upsert("Workorders", event.workorder, client, function(response){
					console.log("(eventDrop event) - updated database");
				});
			} else thisCopy.data.workorder.copyMatchingData(event.workorder);
		},
		eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
			// Triggered when resizing stops and the event has changed in duration.
			
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventResize): " + event.title);
			console.log(" --> start is now " + event.start.format());
			console.log(" --> end is now " + event.end.format());
			console.log(event);

			// update the event with the new planned conmpletion date
			var edate = moment(event.end);
			
			// update the estimated hours
			var duration = moment.duration(edate.diff(moment(event.start)));
			event.workorder.estimatedHours = duration.asHours();

			// update the event with updated information
			event.workorder.scheduledCompletionDate = moment(edate.format()).toISOString();
				
			$('#assignCalendar').fullCalendar('updateEvent', event);
			console.log(event.title + " (eventResize event) UPDATED");

			if (event.newEvent === null) {
				upsert("Workorders", event.workorder, client, function(response){
					console.log("(eventResize event) - updated database, " + response);
				});
			} else thisCopy.data.workorder.copyMatchingData(event.workorder);
		},
		eventReceive: function(event){
			// Called when a valid external jQuery UI draggable, containing event data, has been dropped onto
			// the calendar. This function is triggered after the drop callback has been called and after  
			// the new event has already beenrendered on the calendar. event is the Event Object associated 
            // with the dropped element.
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventReceive): " + event.title);
			console.log(event);
			
		},
		eventRender: function(event, element) {
			// Triggered while an event is being rendered. A hook for modifying its DOM.
			//     element.qtip({
			//			content: event.description
			//		});
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventRender): " + event.title);
			console.log(event);

			// If you want to modify the event that is rendered on the calendar, do the work
			// here and update the event - only way it seems to add an 'end' to the event, 
			// seems to start off 'null' for everything that is dropped on the calendar.
			// ** eventRender is called before the drop event **
			if (event.newEvent) {
                var sdate, edate;
		
                sdate = moment(event.start);          
                var estHours = event.workorder.estimatedHours;
                if (sdate.hasTime()){  // schedule time based on estimated hours
                    console.log("IN THE DAY - " + sdate.format());  
                    if (!event.end) {
                        console.log("No end date, creating end date");  
                        if (estHours === 0.0)
                            estHours = 2.0;
						// Note: moment is mutable, so clone first
                        edate = moment(event.start).clone().add(estHours, 'hours');
                        console.log ("(eventRender) - new end date - " + edate.format());
                        event.end = edate;
                    } else {  // Already has end date, don't change
                        edate = event.end;
                    }
                } else  // all day event
                    edate = sdate;
                
                event.start = sdate;
                event.id = uuidv4();   // create a new id - this allows multiple events to be unique
				event.workorder.scheduledArrivalDate = moment(sdate.format()).toISOString();
                event.workorder.scheduledCompletionDate = moment(edate.format()).toISOString();
                event.workorder.estimatedHours = estHours;
                event.workorder.techId = event.techId;
                event.workorder.actualStartDate = moment("".format()).toISOString();
                event.workorder.status = "Assigned";
                event.workorder.techAssignmentDate = Date.now();
				
				// NOTE: Keep the setting of this newEvent flag to false here - tried to move to drop event and 
				//       it doesn't work - probably and asynchronous issue. 
                event.newEvent = false;
				
				$('#assignCalendar').fullCalendar('updateEvent', event);
				console.log(event.title + " (eventRender) UPDATED");
				console.log(event);

            }
		},
		   
		eventClick: function(calEvent, jsEvent, view) {
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            " --> (eventClick): " + event.title);
			  
			var cview = $('#assignCalendar').fullCalendar('getView');
			// alert("The view's title is " + view.title);

			console.log(view.name);
			if (cview.name === "month")
				$('#assignCalendar').fullCalendar('changeView', 'agendaWeek', calEvent.start);
			else if (cview.name === "agendaWeek")
				$('#assignCalendar').fullCalendar('changeView', 'agendaDay', calEvent.start);
		  },
		  
		loading: function(isLoading, view) {
			// Callback when calendar is loading
			console.log("%c%s", "color: red; background: yellow; font-size: 12px;",
			            "** Calendar loading callback -> isLoading=" + isLoading);
			if (isLoading) {
				client.getWidget("loadingImage").isVisible = true;
			} else {
				client.getWidget("loadingImage").isVisible = false;
			}
		}
    });
                                      
};
