// set the dates in the work order
var currentDate = new Date().getTime();
var thisCopy = this;

if (!page.data.Workorders.scheduledArrivalDate){
    client.infoDialog("You must select a date.","INFO");
} else if (Date.parse(page.data.Workorders.scheduledArrivalDate) <= currentDate){
    client.infoDialog("Scheduled Arrival Date must be greater than the current date/time.","INFO");
        
} else if (Date.parse(page.data.Workorders.scheduledCompletionDate) <=  Date.parse(page.data.Workorders.scheduledArrivalDate)){
    client.infoDialog("Estimated Completion Date must be greater than the Scheduled Arrival Date.","INFO");
} else { 
    page.data.Workorders.status = "Assigned";
    page.data.Workorders.techAssignmentDate = new Date().getTime();
    page.data.Workorders.techId = client.getUsername(); // which is really the userid
    page.data.Workorders.techname = client.data.fullname;
    upsert("Workorders", page.data.Workorders, client, function(response){
		var responseObject = client.createResponseObject(thisCopy.submitValue);
        responseObject.username = client.getUsername;
        
        var responseTopic = page.responseTopic;

        var http = new Http();
        http.setVantiqUrlForSystemResource("topics");
        http.setVantiqHeaders();

        http.publish(responseObject,responseTopic,function(response){
            client.terminate();
        },
        function(errors){
            client.showHttpErrors(errors,"Doing PUBLISH on a topic");
        });
    });
}
