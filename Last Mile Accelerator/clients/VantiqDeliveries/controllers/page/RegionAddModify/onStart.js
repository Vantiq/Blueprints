
    var page = this;
    
    if (this.data.SelectedShape instanceof google.maps.Polygon) {
      this.data.SelectedShape.setMap(null);
    }
    this.data.DrawingManager.setMap(null);
    this.data.region.initializeToDefaultValues();
    this.data.status = 0;
    
	client.getWidget("ClearRegionButton").isDisabled = true;
    client.getWidget("DrawRegionButton").isDisabled = false;

    //var DT = client.getWidget("CoordinatesTable");
    //DT.table.rows().remove();
	//DT.table.draw();
    
    function initMap(param) {       
          console.log('address: ' + JSON.stringify(page.data.addressGEO));
          var theHub = new google.maps.LatLng(param);
          var map = client.getWidget("RegionMap1").map;
		  map.setCenter(theHub);	         
   }
    
    
    page.data.refreshMap = function(obj){        
          console.log('address: ' + JSON.stringify(obj));       
		initMap(null);
        
        // we do this to empty out the map
		var map = client.getWidget("RegionMap1").map;
        map.setZoom(10);

    };
    

