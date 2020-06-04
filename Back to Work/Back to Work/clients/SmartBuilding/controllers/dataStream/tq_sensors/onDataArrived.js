	
    var obj ={};
    obj.id = data[0].id;
    obj.volume = data[0].data.value;
    console.log(obj);
    client.sendClientEvent("ce_s_volumesensor_GaugeDisplay", obj);