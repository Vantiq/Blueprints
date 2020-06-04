//$assetview.datatable.buttondelete.confirm.msg = Are you sure you want to delete this sensor. This operation cannot be undone
//$assetview.popup.title = Sensor Info
    
    console.log(extra);
    if(extra.columnName === "ButtonView"){
        var popupTitle = client.formatMsg("$assetview.popup.title");
        if (extra.dataObject.type === "Volume" || extra.dataObject.type === "Temperature"){
            //client.goToPage("SensorViewVolume", extra.dataObject);
            var id = extra.dataObject.id;

            client.data.execute("cb.getSensorById", {id:id}, function(response){
                //client.popupPage("GaugeDisplay","Sensor Info",response,function(returnParameters){
                client.popupPage("GaugeDisplay",popupTitle,response,function(returnParameters){
                                    
                    console.log("The Return Parameters: " + returnParameters);
                });
            });


        }
    }
    
    if(extra.columnName === "ButtonDelete"){
       
       var yesBtn = client.formatMsg("@confirm.btn.yes");
       var noBtn = client.formatMsg("@confirm.btn.no");
       var cancelBtn = client.formatMsg("@confirm.btn.cancel");
       var confirmTitle = client.formatMsg("@confirm.title");

       var msg = client.formatMsg("$assetview.datatable.buttondelete.confirm.msg");
       
       client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
       //client.confirmCustom("Are you sure you want to delete this sensor.  This operation cannot bne undone","Yes","No",function(clicked){
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
                client.data.deleteOne("sensors", extra.dataObject._id, function(response){
                    var newObj = JSON.parse(JSON.stringify(page.data.asset.values));
                page.data.preparePage(newObj);
                });

            } 

        });
    }
    
    
    
   