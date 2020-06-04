//$personnel.datatable.buttondelete.confirm.msg = Are you sure you want to delete this User. This operation cannot be undone
	console.log(extra);
    if(extra.columnName === "ButtonEdit"){
        client.goToPage("PersonAddModify", extra.dataObject);
    }
    
    if(extra.columnName === "ButtonDelete"){
        var yesBtn = client.formatMsg("@confirm.btn.yes");
        var noBtn = client.formatMsg("@confirm.btn.no");
        var cancelBtn = client.formatMsg("@confirm.btn.cancel");
        var confirmTitle = client.formatMsg("@confirm.title");

        var msg = client.formatMsg("$personnel.datatable.buttondelete.confirm.msg");

//        client.confirmCustom("Are you sure you want to delete this User.  This operation cannot bne undone","Yes","No",function(clicked){
//            if (clicked === "Yes"){
        client.confirmCustomEx(confirmTitle, msg, cancelBtn, yesBtn, noBtn,function(clicked){
           if (clicked === Client.CONFIRM_YES){
                client.data.deleteOne("personnel", extra.dataObject._id, function(response){
                    page.data.refreshPersonnel();
                });

            }

        });
    }