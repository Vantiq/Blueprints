       page.data.Status = page.data.Status | 2;
       if (page.data.Status === 3)
           {
               client.getWidget("AddButton").isDisabled = false;
           }