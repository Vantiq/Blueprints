var thiscopy = this;

var adduserBtn = client.getWidget("adduserBtn");
var resetuserBtn = client.getWidget("resetuserBtn");
var userpagetitle = client.getWidget("userpagetitle");

// populate the list of supervisors
var params = {where:{issupervisor:true}};
select("Users", params, client, function(response){
    var listItems = [{"value":"- select -", "label":"- select -"},
                     {"value":"None", "label":"None"}];
    
    $(response).each(function(index, item) {
        var id = item.username ;        
        var name = item.fname + " " + item.lname ;
        
        //console.log("ID:" + id);
        //console.log("NAME:" + name);
        var obj = {"value": id, "label": name};
        listItems.push(obj);

    });
    var supervisorwidget = client.getWidget("supervisor");
    supervisorwidget.enumeratedList = listItems;   
    
    // determine if the page is opened up new or opened from the list
    if (parameters){
        resetuserBtn.isVisible = false;
        adduserBtn.buttonLabel = "Update Service Desk User";
        userpagetitle.text = "Update Service Desk User";

        thiscopy.data.dbid = parameters;
        
        selectOne("Users", thiscopy.data.dbid, client, function(response){
            thiscopy.data.Users.copyMatchingData(response);     
        });

        uusername.isReadOnly = true;
        thiscopy.data.newuser = false;

    } else {
        adduserBtn.buttonLabel = "Submit New User";
        resetuserBtn.isVisible = true;
        userpagetitle.text = "Add New User";  

        uusername.isReadOnly = false;
 
        thiscopy.data.Users.initializeToDefaultValues();
        thiscopy.data.dbid = null;

    }
});




