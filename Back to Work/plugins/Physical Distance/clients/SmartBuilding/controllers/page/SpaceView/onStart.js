	var page = this;
    
  
    
    page.data.space.initializeToDefaultValues();
    page.data.space.copyMatchingData(parameters);
    
    client.getWidget("FloorplanViewer16").url = parameters.floorplanurl;
    
    client.sendClientEvent("ce_spaces_SpaceAddModify", parameters);
    
    // client.sendClientEvent("ce_buildings_FloorView", parameters);
   