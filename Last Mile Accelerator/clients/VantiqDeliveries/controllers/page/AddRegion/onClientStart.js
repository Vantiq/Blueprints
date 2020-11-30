	var currentPage = this;
    var polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            editable: true,
            fillColor: '#FF1493'
        };  

    currentPage.data.DrawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: false,
            markerOptions: {
                draggable: true
            },
            polygonOptions: polyOptions
      });
    
google.maps.event.addListener(currentPage.data.DrawingManager, 'overlaycomplete', function(e) {
    //all_overlays.push(e);
    if (e.type != google.maps.drawing.OverlayType.MARKER) {
        //var b = 0;
        //b = currentPage.Status | 1;
       //currentPage.Status = b;
       currentPage.data.Status = currentPage.data.Status | 1;
       if (currentPage.data.Status === 3)
           {
               client.getWidget("AddButton").isDisabled = false;
           }
      
      // Switch back to non-drawing mode after drawing a shape.
      currentPage.data.DrawingManager.setDrawingMode(null);

      // Add an event listener that selects the newly-drawn shape when the user
      // mouses down on it.
      var newShape = e.overlay;
      newShape.type = e.type;
      google.maps.event.addListener(newShape, 'click', function() {
        setSelection(currentPage,newShape);
      });
      newShape.addListener('rightclick', function(mev){
    	if (mev.vertex !== null && this.getPath().getLength() > 3) {
        	this.getPath().removeAt(mev.vertex);
        	client.sendClientEvent("ce_region", shapeToCoordinates(this));
            currentPage.data.Region.Coordinates = shapeToGeoJSON(newShape);

    	}
	  });
	  newShape.getPaths().forEach(function(path, index){

  		google.maps.event.addListener(path, 'set_at', function(e){
        	client.sendClientEvent("ce_region", shapeToCoordinates(newShape));
            currentPage.data.Region.Coordinates = shapeToGeoJSON(newShape);
  		});
          
       	google.maps.event.addListener(path, 'insert_at', function(e){
        	client.sendClientEvent("ce_region", shapeToCoordinates(newShape));
            currentPage.data.Region.Coordinates = shapeToGeoJSON(newShape);

  		});
       	google.maps.event.addListener(path, 'remove_at', function(e){
        	client.sendClientEvent("ce_region", shapeToCoordinates(newShape));
            currentPage.data.Region.Coordinates = shapeToGeoJSON(newShape);
  		});
	  });        
        
      google.maps.event.addListener(newShape.getPath(), 'dragend', function(e) {
      		//var newShape = e.overlay;
      		//newShape.type = e.type;
            //setSelection(currentPage,newShape);
			alert(stringify(e));
          	//client.sendClientEvent("RegionStream", shapeToCoordinates(newShape));
    	});

      setSelection(currentPage,newShape);
        
    	var ClearButton = client.getWidget("ClearRegionButton");
    	ClearButton.isDisabled = false;
        
        client.sendClientEvent("ce_region", shapeToCoordinates(newShape));
        currentPage.data.region.coordinates = shapeToGeoJSON(newShape);
    }
  });
    
    //var searchInput = document.createElement("INPUT");
	//searchInput.setAttribute("placeholder", "Search Box");
    //var searchBox = new google.maps.places.SearchBox(searchInput);
    
    //client.getWidget("RegionMap").map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    