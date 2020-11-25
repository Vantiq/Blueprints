var date = new Date();
var obj = {};
obj.username=[page.data.Workorders.techId];
obj.lastActive = date;
obj.timestamp = date;
obj.location = page.data.Workorders.geolocation;

var http = new Http();
    http.setVantiqUrlForSystemResource("topics");
    http.setVantiqHeaders();
    var topicName = "/ars_collaboration/location/mc";
    http.publish(obj,topicName,function(response)
    {
		client.goToPage("workorderslist");
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing a publish on a topic");
    });