/* ---------------------------  initialize the calendar --------------------------- */

this.data.calendar.init = function(){
    $('#calendar').fullCalendar({
        defaultView: 'agendaThreeDay',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaDay,agendaThreeDay'
        },
        views: {
        	agendaThreeDay: {
          		type: 'agenda',
				duration: {
                    days: 3 
                }
        	}
      	},
        height: 450,
        editable: false,
        events : function(start, end, timezone, callback){
            
            console.log(start);
            console.log(end);
			var query = {};
			query.props = ["id", "activitytype", "summary", "description", "customer", "customerId",
							"priority", "skills", "estimatedHours", "status", "techId", "techname",
							"servicedeskowner", "scheduledArrivalDate", "scheduledCompletionDate", 
							"techAssignmentDate", "actualArrivalDate", "actualCompletionDate"];
			query.where = {};
            query.where.scheduledArrivalDate = {$gte:moment(start.format()).toISOString(),
											    $lt:moment(end.format()).toISOString()};
            query.where.techId = client.getUsername() ;
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

                    var obj ={};
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
						// identify if an all-day event or not
						if (wo.scheduledArrivalDate === wo.scheduledCompletionDate) { // all-day event
							obj.editable = true;
							obj.start = $.fullCalendar.moment.utc(wo.scheduledArrivalDate).format("YYYY-MM-DD");
						} else {
							obj.editable = false;
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
				});
				
				callback(events);

            });
        },
        timezone: "local",
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function(date, jsEvent, ui, resourceId) {
			// This callback is not called on the mobile - nothing to drop
			console.log("(Drop event) " + $(this).data('event').title + " was dropped on " + date.format());
			console.log($(this).data('event'));

        },
        eventDrop: function(event, delta, revertFunc){
			// Triggered when dragging stops and the event has moved to a different day/time.

            // watch out for full day events as there is no end and will error
			console.log("(eventDrop event) " + event.title + " will start on " + event.start.format());
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
				
			$('#calendar').fullCalendar('updateEvent', event);
			console.log(event.title + " (eventDrop event) UPDATED");
			console.log(event);
            
			upsert("Workorders", event.workorder, client, function(response){
				console.log("(eventDrop event) - updated database");
			});

        },
		eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
			// Triggered when resizing stops and the event has changed in duration.
			
			console.log(event.title + " start is now " + event.start.format());
			console.log(event.title + " end is now " + event.end.format());
			console.log(event);

			// update the event with the new planned conmpletion date
			var edate = moment(event.end);
			
			// update the estimated hours
			var duration = moment.duration(edate.diff(moment(event.start)));
			event.workorder.estimatedHours = duration.asHours();

			// update the event with updated information
			event.workorder.scheduledCompletionDate = moment(edate.format()).toISOString();
				
			$('#calendar').fullCalendar('updateEvent', event);
			console.log(event.title + " (eventResize event) UPDATED");

			upsert("Workorders", event.workorder, client, function(response){
				console.log("(eventResize event) - updated database, " + response);
            });
		},
        eventReceive: function(event){
            // console.log(event.id);

        },
        eventRender: function(event, el) {
            el.bind('dblclick', function() {
         		client.infoDialog('double click!','info');
      		});
            // render the timezone offset below the event title
            /*
			if (event.start.hasZone()) {
                el.find('.fc-title').after(
                $('<div class="tzo"/>').text(event.start.format('Z'))
              );
            }
			*/
        },
        eventClick: function(calEvent, jsEvent, view) {

            var cview = $('#calendar').fullCalendar('getView');
            // alert("The view's title is " + view.title);

            console.log(view.name);
            //if (cview.name === "agendaThreeDay")
            //    $('#calendar').fullCalendar('changeView', 'agendaDay', calEvent.start);
			//else
            	var wo_param = {};
            	wo_param.where = {};
            	wo_param.where.id = calEvent.workorder.id;
            	select("Workorders", wo_param, client, function(response) {
					if (response) {
                        client.goToPage("workorderpage", response[0]);
                    }                  
                });
        },
        loading: function(isLoading, view) {
            if (isLoading) {
                // client.getWidget("loadingImage").isVisible = true;
            } else {
                // client.getWidget("loadingImage").isVisible = false;
            }
        }

	});                                        
};

