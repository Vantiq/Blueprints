    if (page.data.SelectedShape) {
      page.data.SelectedShape.setMap(null);
    }
    page.data.DrawingManager.setMap(null);
    var ClearButton = client.getWidget("ClearRegionButton");
    ClearButton.isDisabled = true;
    var DRRegionButton = client.getWidget("DrawRegionButton");
    DRRegionButton.isDisabled = false;
    var tb = client.getWidget("CoordinatesTable");
    tb.table.rows().remove();
	tb.table.draw();