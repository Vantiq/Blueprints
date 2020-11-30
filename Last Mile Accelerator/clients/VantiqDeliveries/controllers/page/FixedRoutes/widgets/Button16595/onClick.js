    
   var popupTitle = client.formatMsg("Add Fixed Route");

   	   client.popupPage("FixedRouteAddModify",popupTitle, null,function(returnParameters){    
       page.data.refreshFixedRoutes();
   });
    
