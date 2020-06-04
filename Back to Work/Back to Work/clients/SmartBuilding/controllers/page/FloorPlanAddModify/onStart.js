    var page = this;
    
    // on page load always make sure default background is set.
    client.getWidget("StaticImage17").url = "../../docs/images/floorplanselect.png";  
    
    page.data.floorplan.initializeToDefaultValues();
    page.data.floorplan.copyMatchingData(parameters);
    
    if(!page.data.floorplan.hasOwnProperty('id')){
        page.data.floorplan.id = client.generateUUID();
    }