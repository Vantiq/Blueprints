    var page = this;
    var org = client.data.organization;

    if (client.data.organization.id === null)
        client.data.organization.id = client.generateUUID();


	// attach the color pallete to each input
    
    var ws ={control: 'wheel'};
    $('#InputString8599 input').minicolors(ws);
    $('#InputString8536 input').minicolors(ws);
    $('#InputString8537 input').minicolors(ws);
    
    // get the existing theme option cb.getTheme()
    client.data.execute("cb.getTheme", {}, function(response){
        console.log(response);
        
        // this must be first because of on change code
        page.data.navbarBackgrounColor = response.navbarBackgrounColor;
        $('#InputString8599 input').minicolors('value',page.data.navbarBackgrounColor);
        
        page.data.foregroundColor = response.foregroundColor;
        $('#InputString8536 input').minicolors('value',page.data.foregroundColor);
        
        page.data.buttonBackgroundColor = response.buttonBackgroundColor;
        $('#InputString8537 input').minicolors('value',page.data.buttonBackgroundColor);
        
        
        
        
        
        page.data.logopath = response.logopath;
        page.data.logowidth = response.logowidth;
        page.data.logoheight = response.logoheight;
        
        client.getWidget("StaticImage39").url = page.data.logopath;
    });
    


    
    
    
    
    
    
    
    /*
    $('#InputString8599').minicolors({

        // animation speed
        animationSpeed: 50,

        // easing function
        animationEasing:'swing',

        // defers the change event from firing while the user makes a selection
        changeDelay: 0,

        // hue, brightness, saturation, or wheel
        control:'hue',

        // default color

        defaultValue:'',

        // hex or rgb

        format:'hex',

        // show/hide speed

        showSpeed: 100,

        hideSpeed: 100,

        // is inline mode?

        inline:false,

        

        // uppercase or lowercase

        letterCase:'lowercase',

        // enables opacity slider

        opacity:false,

        // custom position
        position:'bottom left',

        // additional theme class

        theme:'default',

        // an array of colors that will show up under the main color <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>

        swatches: []

    });
*/
