client.popupPage("commentpopup", "Enter a Comment for the Ticket.", null, function(response){
    if (response) {
		// add comment to the end of the history
        var comment = response + client.getWidget("HistoryText").html;
        client.getWidget("HistoryText").html = comment;
    }
});
