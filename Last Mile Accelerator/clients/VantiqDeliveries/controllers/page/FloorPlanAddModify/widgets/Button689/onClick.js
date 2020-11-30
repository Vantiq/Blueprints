    client.data.upsert("floorplans", page.data.floorplan, function(response){
        // now add it to the list of floorplans in the drop down and make it selected
        client.closePopup();
    });