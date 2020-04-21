   	var floorplanurl = client.getWidget("FloorplanViewer16").url;
    page.data.space.floorplanurl = floorplanurl;
    client.popupPage("SpaceAddModify","Modify space", page.data.space, function(returnParameters){    
        //page.data.refreshBuildings();
        page.data.space.copyMatchingData(returnParameters);
    });