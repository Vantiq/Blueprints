//$buildingview.flooraddmodify.popup.title = Add a floor
    var popupTitle = client.formatMsg("$buildingview.flooraddmodify.popup.title");
    var params = {};
    params.buildingid = page.data.building.id;
    //client.popupPage("FloorAddModify","Add a floor", params,function(returnParameters){    
    client.popupPage("FloorAddModify",popupTitle, params,function(returnParameters){    
        page.data.refreshFloors();
    });