var page = this;	
    
    page.data.refreshPackageInfo = function(){
        var args = {};
        args.barcode =  client.getWidget("barcodescan").scannedValue;
        client.data.execute("cb.getPackageByBarcode", args, function(response){
            client.sendClientEvent("ce_package", response);
            client.getWidget("barcode").boundValue = client.getWidget("barcodescan").scannedValue;
            //client.getWidget("PackageImage").url = response.photo;
            //lient.getWidget("Description").text = response.description;
            //page.data.package = response;
            page.data.routeid = parameters;
        });    
    };

