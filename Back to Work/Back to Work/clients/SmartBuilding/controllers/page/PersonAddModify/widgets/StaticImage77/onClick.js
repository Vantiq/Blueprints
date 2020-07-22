	var useOriginalFileName = true; // alter filename and or path
    var forceOverwrite = false;  //  prompt for overwrite
    var prefix = "public/images/personnel/" + page.data.person.uid + "/" ;
    
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
            
            var url = client.getDocumentUrl(detail);
            page.data.person.photopath = url;
           
            client.getWidget("StaticImage77").url = url;
            Binding.applyChanges();
            
            // if the doc is uploaded succesfully add an entry for in floorplans
            
           
            //var fp = client.getWidget("FloorplanViewer1");
            
        }
        else
        {
            console.log("Upload failed with error: " + detail);
        }
    }, useOriginalFileName, forceOverwrite, prefix);