   
    var params = {};
    params.buildingid = page.data.building.id;
    client.popupPage("FloorAddModify","Add a floor", params,function(returnParameters){    
        page.data.refreshFloors();
    });