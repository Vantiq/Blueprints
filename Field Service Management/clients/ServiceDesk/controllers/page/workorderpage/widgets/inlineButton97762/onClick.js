// can't select contact unless customer has been selected
if (page.data.Workorders.customerId){
    var params = {};
	params.id = page.data.Workorders.customerId;
    client.popupPage("contactslistpopup", "Select a Customer Contact for the Work Order", params, function(response){
        if (response){
            // add to the contact array IF not already in the array
            var arr = page.data.Workorders.contacts;
            var found = false;
            for (var i =0; i < arr.length; i++)
                if (arr[i].id === response.id) {
                    found = true;
                    break;
                }
            if (!found) {
                arr.push(response);
                client.sendClientEvent("ce_Contacts", arr);
                page.data.Workorders.contacts = arr;
            }
        }
    });
} else {
    client.infoDialog("Select a Customer before selecting a Customer Contact", "No Customer Selected");
}
