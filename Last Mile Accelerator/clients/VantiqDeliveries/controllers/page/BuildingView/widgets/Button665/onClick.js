//$buildingview.floorplanaddmodify.popup.title = Add a floorplan
    var popupTitle = client.formatMsg("$buildingview.floorplanaddmodify.popup.title");
	var params = {};
    params.buildingid = page.data.building.id;
    //client.popupPage("FloorPlanAddModify","Add a floorplan", params,function(returnParameters){    
    client.popupPage("FloorPlanAddModify",popupTitle, params,function(returnParameters){    
        page.data.refreshFloorPlans();
    });