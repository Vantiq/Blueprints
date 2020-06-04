function spinnerStart(){
    // blur the screen
    $("#_ScrollingFrame_").addClass('blur');
    // show spinner
    $("#loader").css("display","block");
}

function spinnerStop(){
    // remove the blur
    $("#_ScrollingFrame_").removeClass('blur');
    // hide the spinner
    $("#loader").css("display","none");
}

function generateResource(client, template, docprops){
    template = template.replace(/\${[^{}]+}/g, function(key){
        if (key.startsWith("${image") ){            
            var img = docprops[key.replace(/[\${}]+/g, "")] || "";
            return client.getDocumentUrl(img);
        } else {
            return docprops[key.replace(/[\${}]+/g, "")] || "";
        }       
    });    
    return template;
}  