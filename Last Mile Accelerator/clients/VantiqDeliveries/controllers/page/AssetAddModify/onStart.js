
    var page = this;
    
    var data; // hold onto the response from the heirchy call
    console.log(data);
    console.log('data');
    
    // visiblity of patient dropdown
    //var patientWidget = client.getWidget("DroplistAssetAddModifyPatient");
    //patientWidget.isVisible = false;

    //cb.getAssetTypes()
    client.data.execute("cb.getAssetTypes", {}, function(response){

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.name, label: item.name});
        });

        client.getWidget("Droplist30").enumeratedList = enumlist;


    });    
    
    
    page.data.populateSpaceDropDown = function(){


        // cb.getFloorPlanById(id String)
        // client.data.execute("cb.getFloorPlanById", {id: response.});

        // find the floor plan id of the chosen drop down
        console.log('floors in populateSpaceDropDown');
        console.log(page.data.floors);
        var foundObj = page.data.floors.find(function(obj){
            return obj.id === page.data.floor;
        });
        
        console.log('foundObj');
        console.log(foundObj);
        
        if (typeof foundObj !== 'undefined'){



            //cb.getFloorPlanById(id String)
            client.data.execute("cb.getFloorPlanById", {id:foundObj.floorplan}, function(response){
                console.log("floorplan");
                console.log(response);
                client.getWidget("FloorplanViewer138").url = response.path;
            });

        }


        //cb.getSpacesForFloor(floorid String)
        client.data.execute("cb.getSpacesForFloor", {floorid:page.data.floor}, function(response){

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
                enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("Droplist43").enumeratedList = enumlist;
            
            //cb.findSpaceForAsset(floorid String, fplocation GeoJSON)
            console.log("page.data.asset.fplocation");
            console.log(page.data.asset.fplocation);
            if (page.data.asset.fplocation){
                client.data.execute("cb.findSpaceForAsset", {floorid: page.data.floor, fplocation:page.data.asset.fplocation}, function(response){
                    page.data.space = response.name;

                    //if (typeof data !== 'undefined')
                    //	page.data.asset.spaceid = data.space.id;
                });
            }
            
            
            
            


        });
    };
    
    page.data.populateFloorDropown = function(){


        //cb.getFloorsForBuilding(buildingid String)
        client.data.execute("cb.getFloorsForBuilding", {buildingid:page.data.building}, function(response){

            page.data.floors = response;
            console.log('floor from get floors for buildinf' );
            console.log(page.data.floors);

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
                enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("Droplist42").enumeratedList = enumlist;
            
            console.log('data in popfloordropown');
            console.log(data);
            if (typeof data !== 'undefined'){
                page.data.floor = data.floor.id;
                
                // get the floorplan  cb.getFloorPlanById(id String)
                client.data.execute("cb.getFloorPlanById", {id: data.floor.floorplan}, function(response){
                    console.log("cb.getFloorPlanById");
                    console.log(response);
                    // set the floorplan widget
                    client.getWidget("FloorplanViewer138").url = response.path;
                    
                });
                
                if (page.data.asset.fplocation){
                    client.data.execute("cb.findSpaceForAsset", {floorid: page.data.floor, fplocation:page.data.asset.fplocation}, function(response){
                        page.data.space = response.name;

                        //if (typeof data !== 'undefined')
                        //	page.data.asset.spaceid = data.space.id;
                    });
                }
            }
            
            // populate the space drop down and set
			// page.data.populateSpaceDropDown();
			


        });
    };    
    //cb.getBuildings(organizationid String)
    page.data.populateBuildingsDropDown = function(hasParams){
        client.data.execute("cb.getBuildings", {organizationid:client.data.organization.id}, function(response){

            var enumlist = [];
            enumlist.push({value: "-select-", label:"-select-"});

            response.forEach(function (item){
                enumlist.push({value: item.id, label: item.name});
            });

            client.getWidget("Droplist41").enumeratedList = enumlist;
            
            if(hasParams){

                //cb.getHierarchyForAssetBySpaceId(spaceid String)
                // cb.getHierarchyForAssetByFloorId(floorid String)
                client.data.execute("cb.getHierarchyForAssetByFloorId", {floorid:parameters.floorid}, function(response){
					data = response;

                    // set the building
                    page.data.building = response.building.id;

                    // populate the floor drop down and set
                    page.data.populateFloorDropown();
                    

                    

                    
                });
            }


        });
    };
    


    page.data.asset.initializeToDefaultValues();
    page.data.initializePropertyToDefaultValue("space");

    console.log('AssetAddModify');
    
    if (parameters){
        page.data.asset.copyMatchingData(parameters);
        console.log('parameters');
        console.log(parameters);
        
        if(!parameters.hasOwnProperty("id"))
            page.data.asset.id = client.generateUUID();
        
        
        
        if (parameters.spaceid !== null){
            page.data.populateBuildingsDropDown(true);
        } else {
            page.data.populateBuildingsDropDown(false);
        }
        
        
        
        
    } else {
        page.data.asset.id = client.generateUUID();
        page.data.populateBuildingsDropDown(false);
    }



    
    
    
    
    




