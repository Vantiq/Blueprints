thisCopy = this;

//Load the button widget properties into a variable
var btn = client.getWidget("addassetBtn");
var rab = client.getWidget("resetassetBtn");
var assetfield = client.getWidget("assetname");

if (parameters){
    
    //If there are parameters present we know this is an Edit, change the button text to Update
    btn.buttonLabel = "Update Record";
    rab.buttonLabel = "Cancel";
    assetfield.isReadOnly = true;
    
    //this.data.assets = parameters;
    thisCopy.data.Assets.copyMatchingData(parameters); 
    thisCopy.data.dbid = parameters._id;

} else {
    this.data.Assets.initializeToDefaultValues();
    
    //If there are no parameters we know this is an Add so change the button label to Submit
    btn.buttonLabel = "Submit";  
    rab.buttonLabel = "Reset";
    assetfield.isReadOnly = false;
    uuid(function(value){
    	thisCopy.data.Assets.id = value;
	});  
    thisCopy.data.dbid = null;
}
   