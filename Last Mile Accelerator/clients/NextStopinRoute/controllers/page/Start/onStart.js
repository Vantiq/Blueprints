    var page = this;	
    page.data.collab = client.getCollaborationContext();
    client.data.collabid= page.data.collab.collaboration.id;
    page.data.link = page.data.collab.collaboration.results.CreateLink.result;
    var htmlcontrol = client.getWidget("HTML");
    htmlcontrol.html = "<a href=" + page.data.link + "> Click Here for the next shipping route! </a>" ;
    
  	page.data.refreshPackageImage= function(){
        var args = {};
        args.lastIndexDestination = page.data.collab.route.lastIndexDestination;
        args.step = page.data.collab.route.steps;
        args.waypointOrder = page.data.collab.route.waypointOrder;
       // console.log(client.data.organization.id);
        
        client.data.execute("cb.getPackageInfo", args, function(response){
            console.log(response);
        
       		
			client.getWidget("PackagePhoto").url = response.photo;
            
        });
         
         
         
    };
    
     page.data.refreshPackageImage();
  
    