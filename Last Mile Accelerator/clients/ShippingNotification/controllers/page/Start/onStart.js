    var page = this;	
    page.data.collab = client.getCollaborationContext();
    
     page.data.refreshShipments = function(){
        var args = {};
        args.vehicleId = page.data.collab.shipment.vehicleid;
        page.data.vehicleId = page.data.collab.shipment.vehicleid;
       // console.log(client.data.organization.id);
        
        client.data.execute("cb.getShipments2", args, function(response){
            console.log(response);
        
            client.sendClientEvent("ce_shipments", response);

            
        });
         
         
         
    };
    
    page.data.refreshShipments();
    
    client.getWidget("InputObject130").visible = false;
    client.getWidget("InputObject136").visible = false;