    console.log(extra);
    if(extra.columnName === "ButtonView"){
        if (extra.dataObject.type === "Volume" || extra.dataObject.type === "Temperature"){
            //client.goToPage("SensorViewVolume", extra.dataObject);
            var id = extra.dataObject.id;

            client.data.execute("cb.getSensorById", {id:id}, function(response){
                client.popupPage("GuageDisplay","Sensor Info",response,function(returnParameters){
                                    
                    console.log("The Return Parameters: " + returnParameters);
                });
            });


        }
    }
    
    if(extra.columnName === "ButtonDelete"){
        
       client.confirmCustom("Are you sure you want to delete this sensor.  This operation cannot bne undone","Yes","No",function(clicked){
            if (clicked === "Yes"){
                client.data.deleteOne("sensors", extra.dataObject._id, function(response){
                    var newObj = JSON.parse(JSON.stringify(page.data.asset.values));
                page.data.preparePage(newObj);
                });

            } 

        });
    }
    
    
    
   