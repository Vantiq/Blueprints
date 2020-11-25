var thiscopy = this;

select("Technicians", null, client, function(response){
    console.log("Success --- " + JSON.stringify(response));
    var json = response;
    var listItems = [{"value":"-select-", "label":"-select-"}];
    jQuery(json).each(function(index, item) {
        var name = item.fname + " " + item.lname;
        var value = item.username;
        var obj = {"value":value, "label":name};
        listItems.push(obj);
    });
    var techList = client.getWidget("username");
    techList.enumeratedList = listItems;    
});