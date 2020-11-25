var customer = page.data.wocustomer;
var priority = page.data.wopriority;
var status2 = page.data.wostatus2;

var params = genQueryForSummaryReport(customer, priority, status2);
select("Workorders", params, client, function(response){
    client.sendClientEvent("ce_Workorders",response);
});


