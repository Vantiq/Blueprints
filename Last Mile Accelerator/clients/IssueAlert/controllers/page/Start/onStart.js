    var page = this;	
    page.data.collab = client.getCollaborationContext();
    
    	var page = this;
	page.data.params = parameters;    
    var htmlwidget = client.getWidget("PackageDescription");
    htmlwidget.html = page.data.collab.collaboration.results.CreateIssueHTML.result;

