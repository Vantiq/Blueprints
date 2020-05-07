	console.log(extra);
    if(extra.columnName === "ButtonEdit"){
        client.goToPage("PersonAddModify", extra.dataObject);
    }
    
    if(extra.columnName === "ButtonDelete"){
        client.confirmCustom("Are you sure you want to delete this User.  This operation cannot bne undone","Yes","No",function(clicked){
            if (clicked === "Yes"){
                client.data.deleteOne("personnel", extra.dataObject._id, function(response){
                    page.data.refreshPersonnel();
                });

            }

        });
    }