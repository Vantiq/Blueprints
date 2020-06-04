	data.forEach(function(item){
        var html = ""; 
        item.places.forEach(function(item){
            html += item + "<br>";
        });
        item.places = html;
    });
    
    
  