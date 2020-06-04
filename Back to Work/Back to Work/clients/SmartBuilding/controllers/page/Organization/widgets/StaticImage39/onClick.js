	// don't populate until image loaded
    $('#StaticImage39 img').on('load', function() {
        page.data.logoheight = client.getWidget("StaticImage39").h; 
        page.data.logowidth = client.getWidget("StaticImage39").w;
        Binding.applyChanges();
    });
    
    var useOriginalFileName = true; // alter filename and or path
    var forceOverwrite = true;  //  prompt for overwrite
    var prefix = "public/navbarlogo/" ;
    
    client.uploadDocument(function(status, detail)
    {
        //
        //  "status" contains either "success" or "error".
        //  "detail" contains either the name of the saved document (if "status" == "success") or an
        //  error message (if "status" == "error").
        //

        if (status == "success")
        {
            console.log("File has been uploaded to document '" + detail + "'");
            
            page.data.logopath = detail;
            
          
            
            
            client.getWidget("StaticImage39").url = client.getDocumentUrl(detail);
            
            
           
           
            
            
            
            Binding.applyChanges();
            
            console.log("WIDGET");
            console.log(client.getWidget("StaticImage39"));
            console.log(client.getWidget("StaticImage39").w);
            console.log(client.getWidget("StaticImage39").h);
            
            /*
            setTimeout(function(){ 
                console.log(client.getWidget("StaticImage39").w);
                console.log(client.getWidget("StaticImage39").h);
                page.data.logoheight = client.getWidget("StaticImage39").h; 
                page.data.logowidth = client.getWidget("StaticImage39").w;
                Binding.applyChanges();
            }, 2000);
			*/

    
            // if the doc is uploaded succesfully add an entry for in floorplans
            
           
            //var fp = client.getWidget("FloorplanViewer1");
            
        }
        else
        {
            console.log("Upload failed with error: " + detail);
        }
    }, useOriginalFileName, forceOverwrite, prefix);