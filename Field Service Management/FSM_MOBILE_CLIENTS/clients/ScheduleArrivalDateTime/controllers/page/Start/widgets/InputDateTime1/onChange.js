var esthours = page.data.Workorders.estimatedHours; 

if(esthours){
    var completiondate = new Date(page.data.Workorders.scheduledArrivalDate); 

    //Add estimatedHours to scheduledCompletionDate
    completiondate.setHours(completiondate.getHours() + esthours);
    page.data.Workorders.scheduledCompletionDate = completiondate;

}