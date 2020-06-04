    var page = this;

    page.data.role.initializeToDefaultValues();

    if (parameters){
        page.data.role.copyMatchingData(parameters);
    } else {
        page.data.role.id = client.generateUUID();
    }


