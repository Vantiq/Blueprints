/* check if the user is one of
	- service desk user
    - supervisor
    - developer
*/


var args = {username: client.getUsername()};
execute("clientLoginValidation", args, client, function(response){
    if (!response){
        client.errorDialog("You are not authorized to access this resource.");
        client.terminate();
    } else {
		//	set the users full name in a client variable
 
        var params = {where:{username:{"$eq":client.getUsername()}}};
        select("Users", params, client, function(response){

            if (response.length === 0){
                //client.infoDialog('You have logged in with DEV only privledges.','Info');
                client.data.userFullName = "DevOnly" + " " + "DevOnly";
            } else {
                client.data.userFullName = response[0].fname + " " + response[0].lname;
            }
        });

    }
        
});

