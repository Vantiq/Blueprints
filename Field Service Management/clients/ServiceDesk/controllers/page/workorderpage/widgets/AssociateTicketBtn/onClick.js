client.popupPage("ticketlistpopup", "Select a Ticket to associate to the Work Order", null, function(response){   
    if (response){
        
		console.log("The Response is: " + response);
        
        page.data.Workorders.customer = response.customer;
        page.data.Workorders.customerId = response.customerId;
        page.data.Workorders.priority = response.priority;
        page.data.Workorders.impact = response.impact;
        page.data.Workorders.ticketId = response.id;
        page.data.Workorders.type = response.type;


		page.data.Workorders.initializePropertyToDefaultValue("address");
		page.data.Workorders.initializePropertyToDefaultValue("location");


		// get the customer support status
		var cparams = {where:{id:page.data.Workorders.customerId}};

        select("Customers", cparams, client, function(response){
            response = response[0];
            var fDate,lDate,cDate;
            fDate = Date.parse(response.supportStart);
            lDate = Date.parse(response.supportEnd);

            var d = new Date();
            cDate = d.getTime();

            if((cDate <= lDate && cDate >= fDate)){
                page.data.supportstatus = "UNDER SUPPORT";
            } else {
                page.data.supportstatus = "OUT OF SUPPORT";
            }    
        });


		if(response.assignedTo) 
            page.data.Workorders.servicedeskowner = response.assignedTo;
        
		var cid = response.customerId;

		// get the list of locations for the customer
		var param = {where:{customerid:{"$eq":cid}}};

        select("Locations", param, client, function(response){
            console.log("Success --- " + JSON.stringify(response));
            var listItems = [{"value":"- select -", "label":"- select -"}];
            $(response).each(function(index, item) {
                var value = item.id;
                var obj = {"value":value, "label":item.name};
                listItems.push(obj);
            });
            var locationList = client.getWidget("LocationDroplist");
            locationList.enumeratedList = listItems;
        });

        // lookup warranty
        var params = {where:{id:page.data.customerId}};
        select("Customers", params, function(response){
                console.log("SUCCESS: " + JSON.stringify(response));
                // check warranty
                var fDate,lDate,cDate;
            try {
                fDate = Date.parse(response[0].supportStart);
                lDate = Date.parse(response[0].supportEnd);

                page.data.supportStart = response[0].supportStart;
                page.data.supportEnd = response[0].supportEnd;
        	}
            catch (e)
                {
				log.info("Catch of sporadical runtime exception https://github.com/Vantiq/Blueprints/issues/28");
				log.info("TypeError: Error in 'select' success callback: Cannot read property 'supportStart' of undefined");
				log.info(e.name);
                log.info(e.message);
                }
                var d = new Date();
                cDate = d.getTime();

                if((cDate <= lDate && cDate >= fDate)){
                    page.data.supportstatus = "UNDER SUPPORT";
                } else {
                    page.data.supportstatus = "OUT OF SUPPORT";
                }	
        });
    }
});
