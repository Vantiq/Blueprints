console.log("DB_id " + page.data.dbid);

var params = {};
params._id = page.data.dbid;
client.returnToCallingPage(params);