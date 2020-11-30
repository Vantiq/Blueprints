//$dashboard.datatable.buttonclose.confirm.msg = Are you sure you want to close this collaboration. This operation cannot be undone
    console.log(extra);
    
    if(extra.columnName === "ButtonView"){
	   client.popupPage("IssueDetails","View Issue Details", extra,function(returnParameters)
       {    
           console.log("The Return Parameters: " + returnParameters);

       });
    }
    
    
        
       