	data.forEach(function(item){
        console.log(item);

        item.description = generateResource(client, item.template, item.docprops);
    });
    