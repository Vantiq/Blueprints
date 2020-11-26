select("Assets", null, client, function(response){
    client.sendClientEvent("ce_Assets",response);
});



var mapWidget = client.getWidget("DynamicMapViewer5");
var map = mapWidget.map;
map.setZoom(20);

