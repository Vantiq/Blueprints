var params = {};
params._id = page.data.dbid;
params.techId = page.data.Workorders.techId;
params.techname = page.data.Workorders.techname;
params.time = Date.now();
client.goToPage("notedetail", params);