//$buildings.datatable.buttondelete.confirm.msg = Are you sure you want to delete the Building
     console.log(extra);

    if (extra.columnName === "ButtonDelete"){
        //client.goToPage("AssetView", extra.dataObject);
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("Are you sure you want to delete the Vehicle");
        
//        client.confirmCustom("Are you sure you want to delete the Building","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){

                client.data.execute("cb.deleteVehicle", {vehicleid: extra.dataObject.id}, function(response){
                    page.data.refreshVehicles();
                });
            }

        });
        
        
    }
    
   if (extra.columnName === "AddDriver"){
    
        client.popupPage("DriverAddModify","Asign Driver to Vehicle", extra.dataObject.id,function(returnParameters)
       {    
           console.log("The Return Parameters: " + returnParameters);
           page.data.refreshVehicles();
       });
   }
