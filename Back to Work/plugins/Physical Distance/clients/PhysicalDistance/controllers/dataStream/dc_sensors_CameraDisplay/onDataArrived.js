
    
    if (data.type === "Camera"){
    

        var imagepath = data.data.value.imagepath;

        

        var design = client.getDocumentUrl(imagepath);
        var canvas = $("#cameracanvas").get(0);
        var img = new Image();
        var ctx = canvas.getContext("2d");
        
        var yoloResults = data.data.value.results;
        
        
        var width = $( "#StaticHtml2578" ).width();
        img.onload = function() {
            
            
            
            //var scaleFactor = width / this.width ;
            var scaleFactor = 1 ;
            
            //canvas.width = this.width / scaleFactor;
            //canvas.height = this.height / scaleFactor;
            //ctx.drawImage(this, 0, 0, this.width / scaleFactor, this.height / scaleFactor);
            ctx.drawImage(img, 0, 0, this.width,    this.height, 0, 0, canvas.width , canvas.height );
            yoloResults.forEach(function(result){
                ctx.lineWidth="3";	
                ctx.strokeStyle=result.distanceColor;
                ctx.strokeRect(result.location.left / scaleFactor, result.location.top / scaleFactor , (result.location.right - result.location.left) / scaleFactor, (result.location.bottom -  result.location.top) / scaleFactor); 

            });
            
        };
        img.src = design;
        
        
      
        
    }
