
    var page = this;
    
    // make sure data stream is active when on the Start page
    client.getDataStreamByName("dc_system_collaborations").isPaused = false;
    
    
    // determine if there is an organization
	client.data.execute("cb.getOrganization", {}, function(response){
    	if(response){
            client.data.organization = response;
        } else {
            client.goToPage("Organization");
        }
	});
    
    client.data.refreshDashboard();
    
    
    // _SrollingFrame_ for Start page no Y scrolling
    //$("#_ScrollingFrame_").removeAttr( "overflow" );
    //$("#_ScrollingFrame_").css({"overflow": "hidden"});
    
   	
    
    