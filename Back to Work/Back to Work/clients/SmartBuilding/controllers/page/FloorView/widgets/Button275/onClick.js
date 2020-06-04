//$floorview.spaceaddmodify.popup.title = Add a space
    var popupTitle = client.formatMsg("$floorview.spaceaddmodify.popup.title");
    
    var params = {};
    params.id = page.data.floor.id;
    params.floorplanurl = client.getWidget("FloorplanViewer9").url;
//    client.popupPage("SpaceAddModify","Add a space", params,function(returnParameters){    
    client.popupPage("SpaceAddModify",popupTitle, params,function(returnParameters){    
        page.data.refreshSpacesAndAssets();
    });