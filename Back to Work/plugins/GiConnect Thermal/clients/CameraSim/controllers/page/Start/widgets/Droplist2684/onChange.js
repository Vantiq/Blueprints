	
    if(page.data.camstarted === false){
        console.log("cam started");
    	page.data.startCamera();
        page.data.camstarted = true;
    }