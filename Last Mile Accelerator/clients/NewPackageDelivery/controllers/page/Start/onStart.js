    var page = this;	
    page.data.collab = client.getCollaborationContext();
    
     page.data.refreshTemporders = function(){
        var args = {};

        
        client.data.execute("cb.getTempOrders", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_temporders", response);

            
        });
         
     var mapWidget = client.getWidget("NewPackageMap");
     //mapWidget.fixedCenter = true;
     mapWidget.map.setZoom(15); 
         
         
         
    };
    
    page.data.refreshTemporders();