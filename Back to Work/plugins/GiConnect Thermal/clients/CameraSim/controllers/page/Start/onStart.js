    var page = this;
    client.data.facePageLoaded = true;

    // sim.getUserRecord(personnel_id String)
    var args = {};
    args.personnel_id = client.getUsername();
    client.data.execute("sim.getUserRecord", args, function(response){
        client.data.person = response;
    });


    //cb.getCameraForGiConnectSim()
    client.data.execute("cb.getCameraForGiConnectSim", {}, function(response){

        client.data.camlist = response;

        var enumlist = [];
        enumlist.push({value: "-select-", label:"-select-"});
        //enumlist.push({value: "1005418".toString(), label:"Bld1"});
        //enumlist.push({value: "1005419".toString(), label:"Bld2"});
        // item.cameraid.toString()
        var index = 0;
        response.forEach(function (item){

            // value as index becasue of string issue
            enumlist.push({
                value: index, 
                label:item.asset + " " + item.floor + " " + item.building
            });
            index++;

        });

        client.getWidget("Droplist2684").enumeratedList = enumlist;
    });







    page.data.startCamera = function(){

        var thisCopy = client;

        // add the footer
        var html = '<div id="footer">VANTIQ</div>';
        $('body').append(html);

        // canvase to image
        function canvasToImg(video, cameraId) {


            console.log('SAVING');
            var can2, ctx2, can3, ctx3;
            can2 = document.getElementById("can2");
            ctx2 = can2.getContext('2d');
            ctx2.drawImage(video, 0,0, can2.width, can2.height);

            var multipart = new FormData();
            var FName = generateUUID();
            var FPath = "cameras-thermal-" + client.generateUUID() +".png";
            console.log(FPath);


            var dataURL = can2.toDataURL();



            can3 = document.getElementById("can3");
            ctx3 = can3.getContext('2d');
            ctx3.drawImage(
                video, 		// the source image
                220, 100,  	// Start at x/y pixels from the left and the top of the image (crop),
                350, 350,  	// "Get" a x * y` (w * h) area from the source image (crop),
                0, 0,    	// Place the result at 0, 0 in the canvas,
                100, 100  	// With as width / height: 100 * 100 (scale)
            ); 

            function generateRandomNumber(min, max) {
                var num = Math.random() * (max - min) + min;
                return num;
            }

            var miniPic = can3.toDataURL('image/jpeg', 0.5);

            var messageObject ={};
            var info = {};


            if (client.data.user){
                //info.userId = "10000001";
                //info.userId = client.getUsername();

                var fname = client.data.person.firstname;
                var lname = client.data.person.lastname;

                var userId = (fname.charAt(0) + lname + ".jpg").toLowerCase();
                info.userId = userId;

                info.userName = fname + " " + lname;
                info.userType = "user";

                info.actionCode= 1;
                info.camType =  "GATE";
                info.action = "进闸";


                info.similarity = 83;
            } else {

                info.openMsg = "successfull";
            }



            if (client.data.ht){
                info.temperature = generateRandomNumber(38,39); 
                info.openMsg = "体温异常";
                info.openCode= 101;
                client.getWidget("StaticText29886").text = info.temperature;
                client.getWidget("StaticText29886").fontColor = "#ff0000";

                $("#StatusIndicator").css({"background-color":"red"});

                client.getWidget("StaticTextStatus").text = "Status: HIGH TEMP";
                $( "#StaticTextStatus" ).fadeIn( "fast", function(){

                    setTimeout(function(){ $( "#StaticTextStatus" ).fadeOut( "slow"); }, 2000);

                });    

            } else {
                info.temperature = generateRandomNumber(36.9,37.1); 
                info.openMsg= "未佩戴口罩";
                info.openCode= 102;
                client.getWidget("StaticText29886").text = info.temperature;
                client.getWidget("StaticText29886").fontColor = "#00f7ff";
                $("#StatusIndicator").css({"background-color":"blue"});

                client.getWidget("StaticTextStatus").text = "Status: NORMAL";
                $( "#StaticTextStatus" ).fadeIn( "fast", function(){
                    setTimeout(function(){ $( "#StaticTextStatus" ).fadeOut( "slow"); }, 2000);
                });
            }


            console.log("client.data.camlist[client.data.camera]");
            console.log(client.data.camlist[client.data.camera]);
            info.deviceid = client.data.camlist[client.data.camera].cameraid;
            info.mask =false;    
            info.screenTime = Math.round(new Date() / 1000);   
            info.img = miniPic;
            info.uuid = "";
            info.nationCode = "application/json";


            console.log("client.data.user");
            console.log(client.data.user);

            var topic;
            if (client.data.user === true){
                messageObject = info;
                topic = "/camera/thermal/userreading";
            } else {
                messageObject.Info = info;
                topic = "/camera/thermal/reading";
            }

            client.data.publish(messageObject, topic, function(response){
                console.log("Message published");
            });





        }


        // start the face detection
        // cameras-BuildingABasementLeftStairwell_00b467bb-d117-4487-83ea-ee4c3e5b9c49.png

        var cameraId = 'a12345';
        var foundFace = false;
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var timer;

        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        tracking.track('#video', tracker, { camera: true });
        tracker.on('track', function(event) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            event.data.forEach(function(rect) {


                if (rect.y > 100 && rect.y < 300 && rect.x > 170 && rect.x < 400  && rect.width > 150){
                    context.strokeStyle = '#32CD32';    
                    if (!foundFace){
                        console.log(client.data.cameraname);
                        canvasToImg(video, client.data.cameraname);
                    }


                    foundFace = true;
                    if (timer){
                        clearTimeout(timer);                    
                    } 

                    timer = setTimeout(function (){
                        console.log('lost face');
                        foundFace = false;
                    }, 2000);

                } else{
                    context.strokeStyle = '#a64ceb';
                }

                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            });
        });


    };


