//$sensortypes.datatable.buttondelete.confirm.msg = Are you sure you want to delete this Sensor Type. This operation cannot be undone
//$sensortypes.sensortypeaddmodify.datatable.popup.title = Edit sensor type
    
 	console.log(extra);
    if(extra.columnName === "ButtonEdit"){
	   var popupTitle = client.formatMsg("$sensortypes.sensortypeaddmodify.datatable.popup.title");

        var params = extra.dataObject;

//        client.popupPage("SensorTypeAddModify","Edit sensor type",params,function(returnParameters)
        client.popupPage("SensorTypeAddModify",popupTitle,params,function(returnParameters)
                         {    
            console.log("The Return Parameters: " + returnParameters);
            page.data.refreshSensorTypes();
        });
    }
    
    if(extra.columnName === "ButtonDelete"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");
        var msg = client.formatMsg("$sensortypes.datatable.buttondelete.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete this Senor Type.  This operation cannot bne undone","Yes","No",function(clicked){
//            if (clicked === "Yes"){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
           if (clicked === Client.CONFIRM_YES){

                //cb.deleteSensorType(type String)
                var args = {};
                args.type = extra.dataObject.name;
                client.data.execute("cb.deleteSensorType", args, function(response){
                    page.data.refreshSensorTypes();
                });

            }

        });
    }


