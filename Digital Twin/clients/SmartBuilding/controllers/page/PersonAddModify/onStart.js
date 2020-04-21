    var page = this;
    client.sendClientEvent("ce_assets_PersonAddModify", []);
    
    // populate roles list
    client.data.execute("cb.getRoles", {}, function(response){
        
        page.data.roles = response;

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});

        response.forEach(function (item){
            enumlist.push({value: item.id, label: item.name});
        });

        client.getWidget("Droplist2139").enumeratedList = enumlist;


    });
    
    page.data.refreshFloorPlan = function(){
        // get the asset
        client.data.execute("cb.getAssetById", {id: page.data.person.assetid}, function(response){
            page.data.asset = response;
            console.log("asset");
            console.log(response);
            // get the floor for the asset
            if (response){
                client.data.execute("cb.getFloorById", {id: response.floorid}, function(response){
                    console.log("floor");
                    console.log(response);
                    // get the floorplan for the floor
                    client.data.execute("cb.getFloorPlanById", {id:response.floorplan}, function(response){
                        console.log("floorplan");
                        console.log(response);
                        client.getWidget("FloorplanViewer495").url = response.path;
                        client.sendClientEvent("ce_assets_PersonAddModify", page.data.asset);

                    });

                });
            }
        });
    };


    
    
    
    

    page.data.person.initializeToDefaultValues();
    page.data.initializePropertyToDefaultValue("role");
    
    
    

    if (parameters){
        page.data.person.copyMatchingData(parameters);
        
        if (page.data.person.isCollaborator){
            client.getWidget("InputString7546").isVisible = true;
            client.getWidget("VerticalLayout10991").isVisible = true;


        } else {
            client.getWidget("InputString7546").isVisible = false;
            client.getWidget("VerticalLayout10991").isVisible = false;
        }
        
        console.log(page.data.person);
        
        if(page.data.person.values.hasOwnProperty('photopath')){
            console.log("It had it");
            client.getWidget("StaticImage77").url = page.data.person.photopath;
            
        }
        
        
         var userid = page.data.person.uid;
    	 var url = encodeURI(`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${userid}&choe=UTF-8`); // jshint ignore:line
    client.getWidget("StaticImage44").url = url;
        
        
        
        client.sendClientEvent("ce_roles_PersonAddModify", page.data.person.roles);
        page.data.refreshFloorPlan();
    } else {
        page.data.person.uid = client.generateUUID();
        //StaticImage44  ../../docs/qrdefault.png
        client.getWidget("StaticImage44").url = "../../docs/qrdefault.png";
        //StaticImage77 ../../docs/images/placeholderuser250.jpg
        client.getWidget("StaticImage77").url = "../../docs/images/placeholderuser250.jpg";



        client.getWidget("InputString7546").isVisible = false;
        client.getWidget("VerticalLayout10991").isVisible = false;
        
    }


