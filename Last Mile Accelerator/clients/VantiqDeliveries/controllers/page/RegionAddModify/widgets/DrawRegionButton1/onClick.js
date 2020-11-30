	var map = client.getWidget("RegionMap1").map;
    page.data.DrawingManager.setMap(map);
    page.data.DrawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	var DRButton = client.getWidget("DrawRegionButton");
    DRButton.isDisabled = true;