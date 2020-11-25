page.data.Customers.initializeToDefaultValues();
page.data.initializePropertyToDefaultValue("contactslist");
page.data.initializePropertyToDefaultValue("locationslist");
client.sendClientEvent("ce_customercontacts",  []);
client.sendClientEvent("ce_customerlocations",  []);
