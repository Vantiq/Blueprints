    var obj = JSON.parse(JSON.stringify(page.data.collabcontext));
    client.closePopup();
    client.goToPage("ContactTrace", obj);