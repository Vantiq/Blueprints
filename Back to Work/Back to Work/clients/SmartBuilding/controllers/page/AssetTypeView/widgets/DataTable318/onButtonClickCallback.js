//$assettypeview.datatable.buttonremove.confirm.msg = Are you sure you want to remove this asset type
    

    console.log(extra);

    if (extra.columnName === "ButtonRemove"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$assettypeview.datatable.buttonremove.confirm.msg");

        //client.confirmCustom("Are you sure you want to remove this asset type","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
            console.log(clicked);
            //if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
                
                // TODO:  don't remove asset type if there are assets of this type
                client.data.deleteOne("assettypes", extra.dataObject._id, function(response){
                    page.data.refreshAssetTypes();
                });
            }
        });



        

    }