/*jshint esversion: 6 */
// function uuidv4 required the above line to pass the lint syntax checker

//Upsert function
function upsert(resource, data, client, callback){
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();
    http.upsert(data,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if(callback){
            callback();
        }
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing an upsert of " + resource);
    });
}


function select(resource, params, client, callback){   
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();

    // if no params then limit to 50 sort by create date, newest first
	if (!params){
        params = {
            sort:{"ars_createdAt":-1},
            limit:50
        };
    }

    http.select(params,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback(response);   
    },
    function(errors)
    {
        // client.showHttpErrors(errors,"Doing a select on: " + resource);
        console.log(errors,"Doing a select on: " + resource);
    });
}

function update(resource, data, dbid, client, callback){
    
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();

    http.update(data,dbid,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback();
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing an update of an existing: " + resource);
        console.log(errors,"Doing an update of an existing: " + resource);
    });    
}

function selectOne(resource, dbid, client, callback){
    var http = new Http();
    http.setVantiqUrlForResource(resource);
    http.setVantiqHeaders();


    http.selectOne(dbid,null,function(response)
    {
        console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback(response); 
    },
    function(errors)
    {
        client.showHttpErrors(errors,"Doing a select on a single '" + resource + "'");
    });    
    
}

// Functions to generate colors based on hashcode of a string (both fore/background)
function convertColor(color) {
  /* Check for # infront of the value, if it's there, strip it */

  if(color.substring(0,1) == '#') {
     color = color.substring(1);
   }

  var rgbColor = [];

  /* Grab each pair (channel) of hex values and parse them to ints using hexadecimal decoding */
  rgbColor[0] = parseInt(color.substring(0,2),16);
  rgbColor[1] = parseInt(color.substring(2,4),16);
  rgbColor[2] = parseInt(color.substring(4),16);

  return rgbColor;
 }

function LightenDarkenColor(col,amt) {
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function getColors(str){
    var color = intToRGB("#0080ff"); // Default if str is empty
    if (str) {
        color = intToRGB(hashCode(str));
    }
    var rgbcolor = convertColor(color);
    var o = Math.round(((parseInt(rgbcolor[0]) * 299) +
                        (parseInt(rgbcolor[1]) * 587) +
                        (parseInt(rgbcolor[2]) * 114)) / 1000);
    var fore = (o > 125) ? '#000000' : '#FFFFFF';  // black=000000, white=FFFFFF
  	var back = '#'+color;
    //console.log ("getColors -> " + fore + " / " + back + " (" + color + ")");
    return {text: fore, background: back};
}


//Function to generate UUID for unique record ID in data objects
function uuid(callback){
    var http = new Http();
    http.setVantiqUrlForSystemResource("procedures");
    http.setVantiqHeaders();
    var args = {};
    http.execute(args,"generateUUID",function(response)
    {
        //console.log("SUCCESS: " + JSON.stringify(response));
        if (callback)
            callback(response);
    },
    function(errors)
    {
        // client.showHttpErrors(errors,"generateUUID");
    });
}

// Function to get uuid - client side processing 
// (https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
// This function requires the first line of the file to contain "/*jshint esversion: 6 */"  
// Without it, the syntax checker reports and error. (See above)
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

