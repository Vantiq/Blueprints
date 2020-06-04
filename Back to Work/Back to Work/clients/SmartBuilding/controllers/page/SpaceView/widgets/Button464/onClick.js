//$spaceview.spaceaddmodify.popup.title = Modify space
    var popupTitle = client.formatMsg("$spaceview.spaceaddmodify.popup.title");

    var floorplanurl = client.getWidget("FloorplanViewer16").url;
    page.data.space.floorplanurl = floorplanurl;
//    client.popupPage("SpaceAddModify","Modify space", page.data.space, function(returnParameters){    
    client.popupPage("SpaceAddModify",popupTitle, page.data.space, function(returnParameters){    
        //page.data.refreshBuildings();
        page.data.space.copyMatchingData(returnParameters);
    });