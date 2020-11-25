if (client.getWidget("resetassetBtn".buttonLabel === "Reset")){
    page.data.products.initializeToDefaultValues();
    page.data.dbid=null;

    // get a new UUID if reset is pushed
    uuid(function(value){
        thisCopy.data.Assets.id = value;
    });      
} else {
    client.returnToCallingPage();
}
    
    


