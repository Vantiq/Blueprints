    if(extra.columnName === "ButtonView"){
        var floorplanurl = client.getWidget("FloorplanViewer9").url;
        extra.dataObject.floorplanurl = floorplanurl;
        console.log(extra);
        client.goToPage("SpaceView", extra.dataObject);
    }
    
    if(extra.columnName === "ButtonDelete"){
        client.confirmCustom("Are you sure you want to delete this space.  This operation cannot bne undone","Yes","No",function(clicked){
            if (clicked === "Yes"){
                client.data.deleteOne("spaces", extra.dataObject._id, function(response){
                    page.data.refreshSpacesAndAssets();
                });

            }

        });
    }