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
