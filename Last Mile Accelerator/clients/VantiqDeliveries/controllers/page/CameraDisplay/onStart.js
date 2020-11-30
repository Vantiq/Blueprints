	var ds = client.getDataStreamByName("dc_sensors_CameraDisplay");
    ds.isPaused = false;
     
    var imagepath = parameters.data.value.imagepath;

    var scaleFactor = 1;

    var design = client.getDocumentUrl(imagepath);
    var canvas = $("#cameracanvas").get(0);
    var img = new Image();
    var ctx = canvas.getContext("2d");



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




    