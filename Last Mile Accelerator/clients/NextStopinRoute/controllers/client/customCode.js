
var vehicleId;
var regionId;


function spinnerStart(){
    // blur the screen
    $("#_ScrollingFrame_").addClass('blur');
    // show spinner
    $("#loader").css("display","block");
}

function spinnerStop(){
    // remove the blur
    $("#_ScrollingFrame_").removeClass('blur');
    // hide the spinner
    $("#loader").css("display","none");
}

function generateResource(client, template, docprops){
    template = template.replace(/\${[^{}]+}/g, function(key){
        if (key.startsWith("${image") ){            
            var img = docprops[key.replace(/[\${}]+/g, "")] || "";
            return client.getDocumentUrl(img);
        } else {
            return docprops[key.replace(/[\${}]+/g, "")] || "";
        }       
    });    
    return template;
}  


function setCurrentRegion(client, RegionData)
{
    client.getCurrentPage().data.CurrentRegion = RegionData;
}

function clearSelection(page)
{
    if (page.data.selectedShape) 
    {
          page.data.SelectedShape.setEditable(false);
          page.data.SelectedShape = null;
    }
}


function setSelection(page, shape) 
{
    clearSelection(page);
    page.data.SelectedShape = shape;
    page.data.SelectedShape.setEditable(true);
}

function shapeToCoordinates(shape)
{
    var coords = [];
    var path = shape.getPath().getArray();
    for (i = 0; i < path.length; i++)
        {
            var coord = {};
            coord.longitude = path[i].lng();
            coord.latitude = path[i].lat();
			coords.push(coord);
        }
    
    
    
    return coords;
}

function shapeToGeoJSON(shape)
{
    var GeoJSONPolygon = {};
    GeoJSONPolygon.type = "Polygon";
    GeoJSONPolygon.coordinates = [];
    var path = shape.getPath().getArray();
    var innerArray = [];
    for (i = 0; i < path.length; i++)
        {
            var coord = [];
			coord.push(path[i].lng());
			coord.push(path[i].lat());
            innerArray.push(coord);
        }
    // Close the loop
     innerArray.push(JSON.parse(JSON.stringify(innerArray[0])));

     GeoJSONPolygon.coordinates.push(innerArray);

    return GeoJSONPolygon;
}

function polyLineToGeoJSON(path)
{
    var GeoJSONPolygon = {};
    GeoJSONPolygon.type = "LineString";
    GeoJSONPolygon.coordinates = [];
    var pathArray = path.getArray();
    for (i = 0; i < pathArray.length; i++)
        {
            var coord = [];
			coord.push(pathArray[i].lng());
			coord.push(pathArray[i].lat());
            GeoJSONPolygon.coordinates.push(coord);
        }

    return GeoJSONPolygon;
}

function polyLineToCoordinates(path)
{
    var coords = [];
    var pathArray = path.getArray();
    for (i = 0; i < pathArray.length; i++)
        {
            var coord = {};
            coord.longitude = pathArray[i].lng();
            coord.latitude = pathArray[i].lat();
			coords.push(coord);
        }
    return coords;
}

function GEOJsonToPolygon(GEOJson)
{
    var polygon = new google.maps.Polygon();
    var i;
    var path = [];
    for (i = 0; i < GEOJson.coordinates[0].length; i++)
        {
            var newEntry = {};
            newEntry.lat = GEOJson.coordinates[0][i][1];
            newEntry.lng = GEOJson.coordinates[0][i][0];
            path.push(newEntry);
        }
    polygon.setPaths(path);
    return polygon;
}

