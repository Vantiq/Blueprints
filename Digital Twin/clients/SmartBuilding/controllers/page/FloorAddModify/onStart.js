    var page = this;
    
    page.data.floor.initializeToDefaultValues();
    page.data.floor.buildingid = parameters.buildingid;
    //page.data.floor.copyMatchingData(parameters);

    
    
    //cb.getFloorPlansByBuildingId(buildingid String)
    var args = {};
    args.buildingid = parameters.buildingid;
    client.data.execute("cb.getFloorPlansByBuildingId", args, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.description});
        });

        client.getWidget("Droplist1").enumeratedList = enumlist;


    });
    
    var args2 ={};
    //args2.id = parameters.buildingid;
    args2.id = parameters.id;
    //PROCEDURE cb.getFloorById(id String)
    client.data.execute("cb.getFloorById", args2, function(reponse){
        console.log("page.data.floor");
        console.log(page.data.floor.values);
        
        
        page.data.floor.copyMatchingData(reponse);
        console.log(page.data.floor.hasOwnProperty('id'));
        
        if(page.data.floor.id === null){
            
            page.data.floor.id = client.generateUUID();
        } else {
            
            if (page.data.floor.floorplan !== null){
                // cb.getFloorPlanById(id String)
                var args = {};
                args.id = page.data.floor.floorplan;


                client.data.execute("cb.getFloorPlanById", args, function(response){
                    client.getWidget("StaticImage1").url = client.getDocumentUrl(response.path); 
                });
            } else {
                client.getWidget("StaticImage1").url = client.getDocumentUrl("images/floorplanselect.png"); 
            }
        }
    });


    //console.log(page.data.floor.values);

    
    
    