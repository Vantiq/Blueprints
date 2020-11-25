var params = {where:{id:page.data.Workorders.location}};

select("Locations", params, client, function(response){
    
    page.data.Workorders.address = response[0].address;
});