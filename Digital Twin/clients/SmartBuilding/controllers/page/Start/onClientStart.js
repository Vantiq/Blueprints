
    
    //  For dashboard autorefresh
    client.data.refreshDashboard = function(){

        client.data.execute2("cb.getDashboardData", {}, function(response){
            client.sendClientEvent("ce_s_dashboard", response);
        });

        //cb.getOpenIssues()
        client.data.execute2("cb.getOpenIssues", {}, function(response){
            console.log(response.issues);
            client.sendClientEvent("ce_s_issues_Start",response.issues);
            


            var latlngbounds = new google.maps.LatLngBounds();

            // get the map markers and zoom map to markers
            var mapWidget = client.getWidget("DynamicMapViewer58");
            var map = mapWidget.map;
            var locationhash = mapWidget.locationHash;
            console.log(locationhash);

            for (var key in locationhash) {
                if (locationhash.hasOwnProperty(key)) {
                    // console.log(key + " -> " + p[key]);
                    var marker = locationhash[key].gmMarker;
                    console.log(marker);
                    latlngbounds.extend(marker.position);

                }
            }

            map.fitBounds(latlngbounds);

        });

    };

    /*
    var dashboardInterval = client.setInterval(function(){
        var cpage = client.getCurrentPage().name;
        if (cpage === "Start"){
			client.data.refreshDashboard();
        }

    },60000);
    */