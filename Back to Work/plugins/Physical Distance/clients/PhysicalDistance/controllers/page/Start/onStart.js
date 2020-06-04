 
    $("#cameracanvas").css( {
        padding: "0",
        margin: "auto",
        display: "block",
        width: "370px",
        height: "300px",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0"
    });

    var page = this;

    var collab = client.getCollaborationContext();



    page.data.space = collab.space.name;   
    page.data.floor = collab.floor.name;    
    page.data.building = collab.building.name;


    client.getWidget("FloorplanViewer837").url = collab.floorplan.path;    
    client.sendClientEvent("ce_assets", collab.asset);

    client.data.debug(collab);
    var imagepath = collab.collaboration.results.Initiate.event.data.value.imagepath;
    //client.data.debug({"image":imagepath});
    //console.log({"image":imagepath});
    //console.log(client.getDocumentUrl(imagepath));

    // get the width of the div
    var width = $( "#StaticHtml2578" ).width();
    var scaleFactor = 1;

    var design = client.getDocumentUrl(imagepath);
    console.log(design);
    var canvas = $("#cameracanvas").get(0);
    var ctx = canvas.getContext("2d");
    var img = new Image();


    //client.getWidget("StaticTextPersonCount").text = objCount;
    img.onload = function() {
        console.log("loaded");

        canvas.width = this.width / scaleFactor;
        canvas.height = this.height / scaleFactor;
        //ctx.drawImage(this, 0, 0, this.width / scaleFactor, this.height / scaleFactor);

        ctx.drawImage(img, 0, 0, this.width,    this.height, 0, 0, canvas.width , canvas.height );







    };
    img.src = design;






    /*








    var yoloResults = parameters.data.value.results;
    var objCount = parameters.data.value.personcount;

    client.getWidget("StaticTextPersonCount").text = objCount;

    img.onload = function() {

        canvas.width = this.width / scaleFactor;
        canvas.height = this.height / scaleFactor;
        ctx.drawImage(this, 0, 0, this.width / scaleFactor, this.height / scaleFactor);ctx.beginPath();
        yoloResults.forEach(function(result){
            ctx.lineWidth="2";	
            ctx.strokeStyle="white";	
            ctx.rect(result.location.left / scaleFactor, result.location.top / scaleFactor , (result.location.right - result.location.left) / scaleFactor, (result.location.bottom -  result.location.top) / scaleFactor); 
            ctx.stroke();

        });

        // center it
        $("#cameracanvas").css( {
            padding: "0",
            margin: "auto",
            display: "block",
            width: "800px",
            height: "600px",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        });
    };
    img.src = design;

*/


    /*
    {
   "sensor": {
      "id": "LobbyCam1",
      "ars_namespace": "DTBP",
      "ars_modifiedBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "_id": "5eb584bc6725384aa1a8a333",
      "type": "Camera",
      "data": {
         "type": "object",
         "value": {
            "personcount": 10,
            "results": [
               {
                  "label": "person",
                  "location": {
                     "bottom": 264.70447,
                     "top": 101.05884,
                     "right": 427.57556,
                     "left": 363.9758
                  },
                  "confidence": 0.89645326
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 464.2767,
                     "top": 185.66132,
                     "right": 399.29846,
                     "left": 295.54898
                  },
                  "confidence": 0.88350666
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 442.81,
                     "top": 142.57585,
                     "right": 601.4618,
                     "left": 468.55154
                  },
                  "confidence": 0.8789392
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 194.08478,
                     "top": 72.20932,
                     "right": 135.5586,
                     "left": 88.88773
                  },
                  "confidence": 0.85217524
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 229.01831,
                     "top": 86.380684,
                     "right": 356.12387,
                     "left": 301.21362
                  },
                  "confidence": 0.8426116
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 190.88976,
                     "top": 81.88234,
                     "right": 518.78015,
                     "left": 465.90118
                  },
                  "confidence": 0.7467552
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 132.14258,
                     "top": 55.6238,
                     "right": 548.1051,
                     "left": 503.4366
                  },
                  "confidence": 0.6521624
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 86.54876,
                     "top": 38.44613,
                     "right": 343.59497,
                     "left": 327.66406
                  },
                  "confidence": 0.49840724
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 173.74945,
                     "top": 115.0909,
                     "right": 574.68787,
                     "left": 525.3585
                  },
                  "confidence": 0.4331641
               },
               {
                  "label": "person",
                  "location": {
                     "bottom": 141.5842,
                     "top": 50.92826,
                     "right": 309.7819,
                     "left": 282.9042
                  },
                  "confidence": 0.4004555
               }
            ],
            "imagepath": "objectRecognition/LobbyCam1/2020-05-12--17-04-40.jpg"
         }
      },
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "ars_createdAt": "2020-05-08T16:11:40.771Z",
      "assetid": "14f5e603-ff3b-4fa1-8ffc-a384adef4d42",
      "ars_modifiedAt": "2020-05-12T21:04:40.869Z",
      "config": {
         "display": {
            "config": {},
            "page": "CameraDisplay"
         },
         "rules": {
            "high": {
               "lte": 15
            }
         }
      },
      "ars_version": 677,
      "manufacturer": "Generic"
   },
   "floor": {
      "_id": "5e9b0fcd87a72f786b7f1a2d",
      "floorplan": "a24cde47-21bf-4787-8347-75e691f62c63",
      "location": null,
      "id": "16a8375c-361f-4671-91f9-259f1c06801f",
      "buildingid": "b68232cb-efdd-4bfb-8162-6e8dfbeba671",
      "ars_namespace": "DTBP",
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "ars_version": 1,
      "name": "1st Floor",
      "ars_createdAt": "2020-04-18T14:33:49.455Z"
   },
   "floorplan": {
      "_id": "5e9b0f9d7f79961bb97f6a7f",
      "ars_namespace": "DTBP",
      "id": "a24cde47-21bf-4787-8347-75e691f62c63",
      "buildingid": "b68232cb-efdd-4bfb-8162-6e8dfbeba671",
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "description": "1st Floor",
      "path": "public/images/floorplans/b68232cb-efdd-4bfb-8162-6e8dfbeba671/hospital-floor-plan.png",
      "ars_version": 1,
      "ars_createdAt": "2020-04-18T14:33:01.784Z"
   },
   "building": {
      "id": "b68232cb-efdd-4bfb-8162-6e8dfbeba671",
      "ars_namespace": "DTBP",
      "ars_modifiedBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "_id": "5e9b0cb287a72f786b7f14c2",
      "geo": {
         "type": "Point",
         "coordinates": [
            -71.17625026322936,
            42.12792055210925
         ]
      },
      "address": "100 main street sharon ma 02067",
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "ars_createdAt": "2020-04-18T14:20:34.374Z",
      "ars_modifiedAt": "2020-04-21T13:53:17.626Z",
      "ars_version": 2,
      "name": "Building 1",
      "organizationid": "803a978d-dd15-4fea-8273-f32e9430d523"
   },
   "space": {
      "_id": "5e9b694884c40840d02e5b05",
      "ars_namespace": "DTBP",
      "floorid": "16a8375c-361f-4671-91f9-259f1c06801f",
      "id": "659a0a69-ec7e-4ebe-84f6-9649565a1b1d",
      "restricted": false,
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "floorplanlocation": {
         "type": "Point",
         "coordinates": [
            20.1875,
            17.4
         ]
      },
      "ars_version": 1,
      "name": "Outpatient Hall",
      "ars_createdAt": "2020-04-18T20:55:35.948Z"
   },
   "collaboration": {
      "id": "2f730840-9494-11ea-83d9-0e0f4e95ed1a",
      "collaborators": {},
      "collaborationType": "PhysicalDistance",
      "keys": [
         {
            "resourceId": "5eb584bc6725384aa1a8a333",
            "resource": "sensors"
         },
         {
            "resourceId": "2f730840-9494-11ea-83d9-0e0f4e95ed1a",
            "resource": "collaborations"
         }
      ],
      "situations": [
         "2f4fefe0-9494-11ea-9c7b-f26410b52ddc"
      ],
      "ars_namespace": "DTBP",
      "_id": "5ebb0f646725384aa1b80f31",
      "results": {
         "Delay": {
            "state": "expired",
            "updateTime": "2020-05-12T21:04:42.136Z"
         },
         "Initiate": {
            "event": {
               "id": "LobbyCam1",
               "type": "Camera",
               "data": {
                  "type": "object",
                  "value": {
                     "personcount": 9,
                     "results": [
                        {
                           "label": "person",
                           "location": {
                              "bottom": 492.05957,
                              "top": 232.9486,
                              "right": 635.7213,
                              "left": 538.93744
                           },
                           "confidence": 0.9255062
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 488.48035,
                              "top": 308.00613,
                              "right": 399.133,
                              "left": 245.30287
                           },
                           "confidence": 0.9036292
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 194.16512,
                              "top": 74.25318,
                              "right": 134.41495,
                              "left": 88.25832
                           },
                           "confidence": 0.81342363
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 254.69293,
                              "top": 80.45205,
                              "right": 432.8898,
                              "left": 362.83224
                           },
                           "confidence": 0.7978005
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 230.58499,
                              "top": 88.2306,
                              "right": 355.817,
                              "left": 301.6559
                           },
                           "confidence": 0.7908567
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 237.38147,
                              "top": 80.78579,
                              "right": 529.1041,
                              "left": 459.93573
                           },
                           "confidence": 0.7885196
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 483.30643,
                              "top": 217.91437,
                              "right": 545.722,
                              "left": 418.64102
                           },
                           "confidence": 0.6262916
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 150.3726,
                              "top": 62.04727,
                              "right": 300.61618,
                              "left": 273.3727
                           },
                           "confidence": 0.4510581
                        },
                        {
                           "label": "person",
                           "location": {
                              "bottom": 91.212494,
                              "top": 40.55209,
                              "right": 344.008,
                              "left": 325.28345
                           },
                           "confidence": 0.42058367
                        }
                     ],
                     "imagepath": "objectRecognition/LobbyCam1/2020-05-12--17-04-35.jpg"
                  }
               }
            }
         }
      },
      "ars_modifiedBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "ars_createdAt": "2020-05-12T21:04:36.053Z",
      "entities": {
         "asset": "/assets/5eb587d56725384aa1a8a899",
         "floorplan": "/floorplans/5e9b0f9d7f79961bb97f6a7f",
         "space": "/spaces/5e9b694884c40840d02e5b05",
         "building": "/buildings/5e9b0cb287a72f786b7f14c2",
         "sensor": "/sensors/5eb584bc6725384aa1a8a333",
         "floor": "/floors/5e9b0fcd87a72f786b7f1a2d"
      },
      "ars_modifiedAt": "2020-05-12T21:04:42.140Z",
      "ars_version": 4,
      "status": "active",
      "name": "PhysicalDistance"
   },
   "asset": {
      "_id": "5eb587d56725384aa1a8a899",
      "fplocation": {
         "type": "Point",
         "coordinates": [
            18,
            17.25
         ]
      },
      "ars_namespace": "DTBP",
      "floorid": "16a8375c-361f-4671-91f9-259f1c06801f",
      "id": "14f5e603-ff3b-4fa1-8ffc-a384adef4d42",
      "ars_createdBy": "3482a1c4-bfb1-4dec-acf0-163e29b4f4a3",
      "referencetotype": null,
      "type": "Camera",
      "ars_version": 1,
      "name": "LobbyCam1",
      "ars_createdAt": "2020-05-08T16:24:53.860Z"
   }
}
    */












