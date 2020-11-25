var customer = page.data.customer;
var priority = page.data.priority;
var status2 = page.data.status2;

var params = genQueryForSummaryReport(customer, priority, status2);
select("Tickets", params, client, function(response){
    client.sendClientEvent("ce_Tickets",response);
});


