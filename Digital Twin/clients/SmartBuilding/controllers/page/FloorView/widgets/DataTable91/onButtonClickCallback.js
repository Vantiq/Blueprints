    if(extra.columnName === "ButtonView"){
        var floorplanurl = client.getWidget("FloorplanViewer9").url;
        extra.dataObject.floorplanurl = floorplanurl;
        console.log(extra);
        client.goToPage("SpaceView", extra.dataObject);
    }