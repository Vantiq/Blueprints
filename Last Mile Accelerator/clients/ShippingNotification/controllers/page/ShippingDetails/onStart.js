	var page = this;
	page.data.params = parameters;    

    page.data.refreshPackageInfo = function(){
        var args = {};
        args.packageId = page.data.params.packageid;
        client.data.execute("cb.createHTMLShippingDetails", args, function(response){
            var htmlwidget = client.getWidget("PackageDescription");
            htmlwidget.html = response;            
        });

    };
    
    page.data.refreshPackagePhoto = function(){
        var args = {};
        args.packageId = page.data.params.packageid;
        client.data.execute("cb.getPackagePhoto2", args, function(response){
            var photo = client.getWidget("PackageImage");
            photo.url = response;            
        });

    };

    page.data.refreshPackageInfo();
    page.data.refreshPackagePhoto();
    