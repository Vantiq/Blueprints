
    if (extra.columnName === "ButtonVehicles"){
            page.data.refreshVehiclesinRegion(extra.dataObject.name);
    }

    if (extra.columnName === "AddVehicle"){
       client.popupPage("FixedRouteAddVehicle","Asign Vehicle to Route", extra.dataObject.name,function(returnParameters)
       {    
           console.log("The Return Parameters: " + returnParameters);
          // page.data.refreshRegions();
       });
    }
    
    
    if (extra.columnName === "ButtonDelete"){
         
          console.log(extra.dataObject);
     
    }