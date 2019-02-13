//javascript
//Madison 255214
//St. Louis 308626
//Kirksville 17536
//Estes Park 6339
//Fort Collins 165080

//initialize function called when the script loads //// Removed Initialize from cities, as it was causing a dumb error I didn't find for a while
cities();
////use initialize on function as per instructions
function initialize(){
    debugAjax();
    ////attempt to log response from ajax callback per instructions. Returns with undefined error as it cannot access the callback for response
    console.log(response)
} ;
////function to create a table with cities and their populations, added city & population
function cities(){
    ////define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 255214
        },
        {
            city: 'St. Louis',
            population: 308626
        },
        {
            city: 'Kirksville',
            population: 17536
        },
        {
            city: 'Estes Park',
            population: 6339
        },
        {
	        city: 'Fort Collins',
	        population: 165080
	    }
    ];

    ////append the table element to the div
    $("#mydiv").append("<table>");
    ////append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    ////loop to add a new row for each city, should account for additional city due to using cityPop.length
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop); ////Call functions addColumns and addEvents
    addEvents();
};

function addColumns(cityPop){ ////create and define addColumns function
    $('tr').each(function(i){

    	if (i === 0){ ////Check if citySize exists for city, begin else/if script

    		$(this).append('<th>City Size</th>');
    	} else {

    		var citySize; ////Create variable for use in function

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small'; ////Set variable to value if conditions met for size of city

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium'; ////As above, Medium value defined, set for certain cities

    		} else {
    			citySize = 'Large'; ////Else since it's the last portion of the If/Else script, Large city used as catch-all for any remaining cities
    		};
    		$(this).append('<td>' + citySize + '</td>'); ////Add city size to table
    	};
    });
};

function addEvents(){ ////Create function to add color
	$('table').mouseover(function(){ ////Change the color of the table when mouse is passed over table
		
		var color = "rgb(";

		for (var i=0; i<3; i++){ ////Set variable to run 3 times for r value, g value, b value

			var random = Math.round(Math.random() * 255); ////Multiply by 255 for rgb

			color += random;////make color variable add the random variable to it

			if (i<2){
				color += ","; ////set comma if i<2, to continue from r and g values
			
			} else {
				color += ")"; ////Close parentheses if i=2, the b value
		};
		$(this).css('color', color); ////use jQuery, CSS for color
		}});

	function clickme(){ ////create function, clickme for interaction of table
		alert('Hey, you clicked me!');////Alert popup when user clicks
	};
	$('table').on('click', clickme);////Add click alert to table
};

////Francis (Ajax) debug
 function debugCallback(response){////define function, specify the keyword for use in the stringify
    $("#divjson").append('<br>GeoJSON data:<br>' + JSON.stringify(response)); ////append the JSON data to HTML, obtained from the response in debugAjax.
};

function debugAjax(){ ////define function for using ajax (or his real name, Francis). Debugged so it functions properly
	var mydata = $.ajax("data/MegaCities_GeoJSON.geojson", { ////Set variable equal to geojson data so it can be referenced later
		dataType: "json", ////specify datatype of the file being added
		success: function(response){ ////send response to function if successfull
			console.log(response) ////return result to console per instructions, display that there are 15 features in the geojson data
            debugCallback(response); ////call function from above, supply the response keyword to it so it can turn it into a string on the webpage
		}
})};
//call the initialize function when the document has loaded, ////make everything run. 
$(document).ready(initialize); ////Initialize only starts what has initialize in it, so if multiple functions use the initialize method it seems to pick the last one only to initialize, as I found out