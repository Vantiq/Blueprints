	var params = {};
    params.buildingid = page.data.building.id;
    client.popupPage("FloorPlanAddModify","Add a floorplan", params,function(returnParameters){    
        page.data.refreshFloorPlans();
    });