	console.log(extra);
    
    var loc = {};
    loc.type = "Point";
    loc.coordinates = [extra.floorPlanUnitsY, extra.floorPlanUnitsX];
    page.data.asset.fplocation = loc;
    
    // update the widget
    client.sendClientEvent("ce_assets_AssetAddModify", page.data.asset);
    
    var args = {floorid: page.data.floor, fplocation:page.data.asset.fplocation};
    console.log("args");
    console.log(args);
    client.data.execute("cb.findSpaceForAsset", args, function(response){
        console.log(response);
        page.data.space = response.name;

        //if (typeof data !== 'undefined')
        //	page.data.asset.spaceid = data.space.id;
    });