 	console.log(data);
    
    var page = client.getCurrentPage();
    
    if (page.name === "PersonAddModify"){
        if (page.data.person.id === data.id){
           client.getWidget("StaticImage77").url = data.photopath;
        }
    }
    
    

    
   