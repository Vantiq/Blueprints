    // unpause the datastream dc_personnel
    var ds = client.getDataStreamByName("dc_personnel");
    ds.isPaused = true;