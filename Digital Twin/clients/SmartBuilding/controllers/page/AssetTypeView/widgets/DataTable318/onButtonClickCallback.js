    console.log(extra);

    if (extra.columnName === "ButtonRemove"){

        client.confirmCustom("Are you sure you want to remove this asset type","Yes","No",function(clicked){
            console.log(clicked);
            if (clicked === "Yes"){
                
                // TODO:  don't remove asset type if there are assets of this type
                client.data.deleteOne("assettypes", extra.dataObject._id, function(response){
                    page.data.refreshAssetTypes();
                });
            }
        });



        

    }