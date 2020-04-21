
var thisCopy = this;

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
    
    /*
    {
   "userId": "msilva.jpg",
   "userName": "Mark Silva",
   "deviceid": "0005418",
   "uuid": "",
   "nationCode": "application/json",
   "actionCode": 1,
   "camType": "GATE",
   "action": "进闸",
   "screenTime": 1586850567,
   "temperature": "36.62",
   "mask": false,
   "openCode": 102,
   "openMsg": "未佩戴口罩",
   "userType": "user",
   "similarity": 95,
   "img": "/9j/4AAQSkZJ...32/rdH//2Q=="
}



{
   "userId": "msilva.jpg",
   "userName": "Mark Silva",
   "deviceid": "0005418",
   "uuid": "",
   "nationCode": "application/json",
   "actionCode": 1,
   "camType": "GATE",
   "action": "进闸",
   "screenTime": 1586850790,
   "temperature": "37.63",
   "mask": false,
   "openCode": 101,
   "openMsg": "体温异常",
   "userType": "user",
   "similarity": 93,
   "img": "/9j/4AAQSkZJR...P/2Q=="
}
    */
    
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
    
    /*
     {
   "Info": {
      "deviceid": "0005418",
      "uuid": "",
      "nationCode": "application/json",
      "temperature": "36.63",
      "mask": false,
      "screenTime": 1586850204,
      "openCode": 102,
      "openMsg": "未佩戴口罩",
      "img": "/9j/4AAQSkZJR9vDt...qSWrS6dP6/ry//Z"
   }
}
    */
    
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
        
    info.deviceid = "0005418";
    info.mask =false;    
    info.screenTime = Math.round(new Date() / 1000);   
    info.img = miniPic;
    info.uuid = "";
	info.nationCode = "application/json";
    
    
    
    var topic;
    if (client.data.user){
        messageObject = info;
        topic = "/camera/thermal/userreading";
    } else {
        messageObject.Info = info;
        topic = "/camera/thermal/reading";
    }
      
    client.data.publish(messageObject, topic, function(response){
		console.log("Message published");
    });


    /*
    client.uploadDataURL(dataURL, FPath,function(status, detail)
                         {
        if (status == "success")
        {
            console.log("File has been uploaded to document '" + detail + "'");
        }
        else
        {
            console.log("Upload failed with error: " + detail);
        }     
    });
    */


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
                    //console.log('TAKING A PICTURE');
                    //console.log($('input[name=camera]:checked').val());
                    // cameraId = $('input[name=camera]:checked').val();
                    // client.infoDialog(thisCopy.data.cameraname,"INFO");
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
    
    
    /*
    var obj ={
    "userId" : "10000001",
    "userName" : "Brett",
    "userType" : "Employee",
    "deviceid": "0000001",
    "actionCode": 1,
    "action" : "open door",
    "temperature" : randomFloat() * (38 - 36.3) + 36.3,
    "Mask" : true,
    "screenTime" : date(now(), "date","epochSeconds" ),
    "similarity" : 80,
    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAA2ElEQVR4nOzRsWkCARhH8Vw4jqQIpEmdLnAhgUCSCQIpxClcQ7FwAjvhcAJbHeJGUMTO6iycQHCGf/U8eL/6/xWPr9zX7V1i+rqJ9rv6N9pXL6dofx+tb5ABNANoBtAMoBlAM4BmAK1ohx/Rwf9hEu0/L+to//e+jfa9/4ABNANoBtAMoBlAM4BmAK38+n6LDgbNQ7Q/j7po/9PNon3vP2AAzQCaATQDaAbQDKAZQCueHo/Rwfh5Fe0X82W0r5oq2vf+AwbQDKAZQDOAZgDNAJoBtGsAAAD//64AFcbNYoA0AAAAAElFTkSuQmCC" 
}
    */

    
     /*
    {
	"Info": {
        "deviceid": "0000001",
        "temperature": randomFloat() * (38 - 36.3) + 36.3,
        "Mask" : true,
        "openCode": 100,
        "openMsg": "successfull",
        "screenTime" : date(now(), "date","epochSeconds" ),//1487295360,
    */
    
    /*
        "userId" : "10000001",
    "userName" : "Brett Rudenstein",
    "userType" : "Employee",
    "deviceid": "0000001",
    "actionCode": 1,
    "action" : "open door",
    "temperature" : randomFloat() * (38 - 36.3) + 36.3,
    "Mask" : true,
    "screenTime" : date(now(), "date","epochSeconds" ),
    "similarity" : 80,
    */