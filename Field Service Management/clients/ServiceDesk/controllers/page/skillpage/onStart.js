if (parameters){
    this.data.dbid = parameters._id;
    this.data.Skills.copyMatchingData(parameters);
} else {
	this.data.Skills.initializeToDefaultValues();
    this.data.dbid = null;
}
