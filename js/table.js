// var tabulate = function (data,columns) {
//     var table = d3.select('#test').append('table').attr('class','table')
// 	var thead = table.append('thead')
// 	var tbody = table.append('tbody')

// 	thead.append('tr')
// 	  .selectAll('th')
// 	    .data(columns)
// 	    .enter()
// 	  .append('th')
// 	    .text(function (d) { return d })

// 	var rows = tbody.selectAll('tr')
// 	    .data(data)
// 	    .enter()
// 	  .append('tr')

// 	var cells = rows.selectAll('td')
// 	    .data(function(row) {
// 	    	return columns.map(function (column) {
// 	    		return { column: column, value: row[column] }
// 	      })
//       })
//       .enter()
//     .append('td')
//       .text(function (d) { return d.value })

//   return table;
// }

// d3.csv('data.csv',function (data) {
// 	var columns = ['Contract ID','Contract Grp','Country Law','Start Year','Expiry Year']
//   tabulate(data,columns)
// })

var keys, 
    allData, 
    currentData,
    startPos = 0,
    increment = 10;

var scrollEvent = d3.behavior.zoom()
                    .on('zoom', function (e) { 
                      var scrollDirection = (d3.event.sourceEvent.deltaY > 0) ? 1 : -1;
                      startPos += (scrollDirection > 0 && startPos + increment < allData.length) ? scrollDirection 
                                  : (scrollDirection < 0 && startPos + increment > increment) ? scrollDirection
                                  : 0;
                      updateTable();
                    });

var table = d3.select("#test").append("table")
    thead = table.append("thead"),
    tbody = table.append("tbody").call(scrollEvent);

d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  keys     = Object.keys(data[0]),
  allData  = data;
  
  thead.append('tr')
    .selectAll('th')
    .data(keys).enter()
    .append('th')
    .text(function (d) {
    return d;
  });

  updateTable();
});

function updateTable() {
  // Set new data based on startPos and increment.
  currentData = allData.slice(startPos, startPos + increment);
  
  // Delete previous rows.
  tbody.selectAll('tr').remove();
  
  // Create new rows.
  var tr = tbody.selectAll("tr")
                .data(currentData).enter()
                .append("tr")
                .classed("even", function(d, i) {
                  return i % 2 == 1; 
                });
      
      tr.selectAll('td')
        .data(function (d) { 
          return keys.map(function (e) {
            return { 
              key: e,
              value: d[e]
            }
          });
        }).enter()
        .append('td')
        .text(function (d) { 
          return d.value; 
        });
}