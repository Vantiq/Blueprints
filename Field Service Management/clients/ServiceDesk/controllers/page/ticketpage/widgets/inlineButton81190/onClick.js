client.popupPage("assetspopup", "Select an Asset for the Ticket", null, function(response){
    
    // add to the array ONLY IF not already in the array
    var arr = page.data.Tickets.assets;
    var found = false;
    for (var i =0; i < arr.length; i++)
        if (arr[i].id === response.id) {
            found = true;
            break;
        }
    if (!found) {
        arr.push(response);
        client.sendClientEvent("ce_tpAssets", arr);
        page.data.Tickets.assets = arr;
    }
});
