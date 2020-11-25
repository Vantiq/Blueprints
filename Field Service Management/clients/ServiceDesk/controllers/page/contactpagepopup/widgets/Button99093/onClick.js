page.data.Contacts.locationid = $('#locationSelect').val();

console.log(JSON.stringify(page.data.Contacts.locationid));

upsert("Contacts", page.data.Contacts, client, function(response){
    client.closePopup();
});


