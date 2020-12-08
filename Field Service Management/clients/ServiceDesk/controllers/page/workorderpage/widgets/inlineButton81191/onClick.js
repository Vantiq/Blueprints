client.popupPage("assetspopup", "Select an Asset for the Work Order", null, function(response){
    if (response){
        // add to the contact array IF not already in the array
        var arr = page.data.Workorders.assets;
        var found = false;
        for (var i =0; i < arr.length; i++)
            if (arr[i].id === response.id) {
                found = true;
                break;
            }
        if (!found) {
            arr.push(response);
            client.sendClientEvent("ce_woAssets", arr);
            page.data.Workorders.assets = arr;
        }
    }
});
