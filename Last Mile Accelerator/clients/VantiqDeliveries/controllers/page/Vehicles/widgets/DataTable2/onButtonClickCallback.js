//$buildings.datatable.buttondelete.confirm.msg = Are you sure you want to delete the Building

    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("Are you sure you want to delete the Vehicle");
        
//        client.confirmCustom("Are you sure you want to delete the Vehicle","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){

                client.data.execute("cb.deleteVehicle", {vehicleid: extra.dataObject.id}, function(response){
                    page.data.refreshVehicles();
                });
            }

        });
        
        
    }
    
   if (extra.columnName === "DeleteDriver"){
    
 		var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("Are you sure you want to delete the Driver");
        
//        client.confirmCustom("Are you sure you want to delete the Driver","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
				console.log(extra);
                client.data.execute("cb.deleteVehicleDriver", {vehicleid: extra.dataObject.id,driverid:extra.dataObject.driver}, function(response){
                    page.data.refreshVehicles();
                });
            }

        });
   }
