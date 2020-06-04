	var page = this;
    
    page.data.refreshFloors = function(){
        var args ={};
        args.buildingid = page.data.building.id;
        client.data.execute("cb.getFloorsForBuilding", args, function(response){
            client.sendClientEvent("ce_floors_BuildingView", response);
        });
    };

    page.data.refreshFloorPlans = function(){
        // cb.getFloorPlansByBuildingId(buildingid String) 
        var args ={};
        args.buildingid = page.data.building.id;
        client.data.execute("cb.getFloorPlansByBuildingId", args, function(response){
            client.sendClientEvent("ce_floorplans_BuildingView", response);
        });
    };

    page.data.building.initializeToDefaultValues();
    
    var args = {};
    args.id = parameters.id;
    
    client.data.execute("cb.getBuildingById", args, function(response){
        page.data.building.copyMatchingData(response);
        client.sendClientEvent("ce_buildings_BuildingView", response);
        page.data.refreshFloors();
        page.data.refreshFloorPlans();
    });
    
    
    
    