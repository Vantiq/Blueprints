    var page = this;
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.2, maximum-scale=1.2";
    document.getElementsByTagName('head')[0].appendChild(meta);
    page.data.id = client.generateUUID();