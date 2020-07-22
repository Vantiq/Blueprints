if (extra.key == "Remove"){
	page.data.person.photopath = null;
	client.getWidget("StaticImage77").url = "../../docs/images/placeholderuser250.jpg";
    Binding.applyChanges();
}