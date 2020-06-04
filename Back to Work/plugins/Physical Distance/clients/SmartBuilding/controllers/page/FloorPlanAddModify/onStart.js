    var page = this;
    
    page.data.floorplan.initializeToDefaultValues();
    page.data.floorplan.copyMatchingData(parameters);
    
    if(!page.data.floorplan.hasOwnProperty('id')){
        page.data.floorplan.id = client.generateUUID();
    }