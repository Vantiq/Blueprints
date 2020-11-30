	var waypoint = {};
    var waypoints = [];
    waypoint.location = client.getWidget("waypoint").boundValue;
    
    page.data.fixedroutes.waypoints.push(waypoint);
    

    console.log(waypoint);