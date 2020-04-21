	var useOriginalFileName = true; // alter filename and or path
    var forceOverwrite = false;  //  prompt for overwrite
    var prefix = "public/images/floorplans/" + page.data.floorplan.buildingid + "/" ;
    
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
            
            page.data.floorplan.path = detail;
            
            client.getWidget("StaticImage17").url = client.getDocumentUrl(detail);
            Binding.applyChanges();
            
            // if the doc is uploaded succesfully add an entry for in floorplans
            
           
            //var fp = client.getWidget("FloorplanViewer1");
            
        }
        else
        {
            console.log("Upload failed with error: " + detail);
        }
    }, useOriginalFileName, forceOverwrite, prefix);