var params = {where:{workorderid:page.data.Workorders.id}};
select("Signatures", params, client, function(response){
   var url = response[0].url;  
    client.popupPage("viewsignature", "View Signature", url, function(response){

    });
});