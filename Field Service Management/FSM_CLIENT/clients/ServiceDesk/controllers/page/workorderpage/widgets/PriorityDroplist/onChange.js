var techId = page.data.Workorders.techId;
if(page.data.Workorders.priority == "1" && !techId) {
    page.data.Workorders.techId = "-AutoAssign-";
    page.data.Workorders.techname = "";
}
