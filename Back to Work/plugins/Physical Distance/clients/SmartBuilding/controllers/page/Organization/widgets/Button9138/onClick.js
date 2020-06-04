	//cb.adjustTheme(foregroundColor String, buttonBackgroundColor String, navbarBackgroundColor String, logopath String, logowidth String, logoheight String)
    var args ={};
    args.foregroundColor = page.data.foregroundColor;
    args.buttonBackgroundColor = page.data.buttonBackgroundColor;
    args.navbarBackgroundColor = page.data.navbarBackgrounColor;
    args.logopath = page.data.logopath;
    args.logowidth = page.data.logowidth;
    args.logoheight = page.data.logoheight;
    client.data.execute("cb.adjustTheme", args, function(response){
        client.infoDialog("Youll need to restart the client for the change to take effect","RESTART");
    });