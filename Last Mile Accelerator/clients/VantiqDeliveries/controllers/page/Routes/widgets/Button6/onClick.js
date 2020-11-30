
 	   var popupTitle = client.formatMsg("Add Package");

   	   client.popupPage("PackagesAddModify",popupTitle, null,function(returnParameters){    
       page.data.refreshPackages();
   });