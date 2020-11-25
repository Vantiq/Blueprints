// determine if the page is opened up new or opened from customer list
if (parameters){
	this.data.dbid = parameters._id;   
    this.data.contacts.copyMatchingData(parameters);   
} 
