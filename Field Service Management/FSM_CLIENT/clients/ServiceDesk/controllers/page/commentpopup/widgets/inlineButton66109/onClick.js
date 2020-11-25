var now = new Date().toDateString();
comment = "<p>" + now + " - (" + client.data.userFullName + "): "+ page.data.comments + "</p>";

client.closePopup(comment);
