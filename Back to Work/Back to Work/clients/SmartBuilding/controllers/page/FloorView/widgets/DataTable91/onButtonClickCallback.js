//$floorview.datatable.buttondelete.space.confirm.msg = Are you sure you want to delete this space. This operation cannot be undone
    if(extra.columnName === "ButtonView"){
        var floorplanurl = client.getWidget("FloorplanViewer9").url;
        extra.dataObject.floorplanurl = floorplanurl;
        console.log(extra);
        client.goToPage("SpaceView", extra.dataObject);
    }
    
    if(extra.columnName === "ButtonDelete"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$floorview.datatable.buttondelete.space.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete this space.  This operation cannot bne undone","Yes","No",function(clicked){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
//            if (clicked === "Yes"){
            if (clicked === Client.CONFIRM_YES){
                client.data.deleteOne("spaces", extra.dataObject._id, function(response){
                    page.data.refreshSpacesAndAssets();
                });

            }

        });
    }