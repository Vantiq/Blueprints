    var params = {};
    params.id = page.data.floor.id;
    params.floorplanurl = client.getWidget("FloorplanViewer9").url;
    client.popupPage("SpaceAddModify","Add a space", params,function(returnParameters){    
        page.data.refreshSpacesAndAssets();
    });