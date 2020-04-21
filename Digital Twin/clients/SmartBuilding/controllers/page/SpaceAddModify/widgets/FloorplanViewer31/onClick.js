	console.log(extra);
    
    var obj = {};
    obj.type = "Point";
    obj.coordinates= [extra.floorPlanUnitsY, extra.floorPlanUnitsX];
    
    page.data.space.floorplanlocation = obj;
    
    client.sendClientEvent("ce_spaces_SpaceAddModify", page.data.space);
    
    
    console.log(page.data.space);
