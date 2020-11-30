    
    
    if (extra.columnName === "ButtonSelect"){
        //client.goToPage("AssetView", extra.dataObject);
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("Are you sure you want to add the Driver");
        
//        client.confirmCustom("Are you sure you want to delete the Building","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
			
           
 				var args = {'vehicleId':vehicleId,'driverId':extra.dataObject.id};
                
                console.log(args);
                
                client.data.execute("cb.updateVehicleDriver",args, function(response){
                    //page.data.refreshVehicles();
                    vehicleId ='';
                    client.closePopup();
                });
            }

        });
        
        
    }