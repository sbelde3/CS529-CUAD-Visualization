"use strict";


/* Get or create the application global variable */
var App = App || {};

/* topojson Urls for loading up with world map*/
const jsonUrl = "https://unpkg.com/world-atlas@1.1.4/world/50m.json"
const tsvUrl = "https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"

// Creating d3 pathgenerators to draw countries outline
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const graticule = d3.geoGraticule().step([10, 10]);;

const plot_By_Country = function(contractsByCountryCsv) {

  const self = this;

  Promise.all([d3.json(jsonUrl),d3.tsv(tsvUrl)]).then(([jsonData,tsvData]) => {

    const countryName = tsvData.reduce((accumulator,d)=>{
      accumulator[d.iso_n3] = d.name;
      return accumulator
    });
    const countries = topojson.feature(jsonData,jsonData.objects.countries)
    self.data = jsonData;
    const map = d3.select('svg')

    // Groping the elements of the map, it makes elements coupled for zooming functionality
    const mapG = map.append('g');

    // Globe background
    mapG.append('path')
        .attr('class','globe')
        .attr('d',pathGenerator({type:'Sphere'}));


    // For Zooming
    map.call(d3.zoom().on('zoom', (event,d) => {
          mapG.attr('transform', event.transform);
        })); 

    // Drawing the countries on globe
    mapG.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class','country')
        .attr('d',d=>pathGenerator(d))
        .append('title').text(d => countryName[d.id])


    // Loading the contracts on the world map as circles

    //console.log(data)

    d3.csv(contractsByCountryCsv).then ((data) =>{
      function contractCircles(data){
        var tooltip = d3.select('#mapdiv')
                        .append('div')
                        .style('position', 'absolute')
                        .style('padding', '0 10px')
                        .style('background', 'white')
                        .style('opacity', 0);

        mapG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle").on('click',d=>updateWordcloud(d.target.__data__.Filename))
        .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function(d) {
          return projection([d.lng, d.lat])[1];
        })
        .attr("r", function(d) {
          return 6;
        }).attr("class", "circles")
        .attr("fill",function(d){return d.isMissing==="False"? "#3c813c":"#ff6161"})
        .on('mouseover', function(event,d) {
            const [x, y] = d3.pointer(event);
            tooltip.transition().duration(200)
              .style('opacity', .9)
            tooltip.html(
              '<div style="font-size: 1rem; font-weight: bold">' +
                d.Filename + '&deg;</div>'
            )
            .style('left', (x-50) + 'px')
            .style('top', (y-50) + 'px')
          tempColor = this.style.fill;
          d3.select(this)
            .style('fill', 'yellow')
        })
  
        .on('mouseout', function(d) {
          tooltip.html('')
          d3.select(this)
            .style('fill', tempColor)
        })
        //.style("display",function(d){return d.isMissing==="True"? "inline":"none"})
        //.append('title').text(d=>d.Filename)

      }
      contractCircles(data)



      // ###### Adding Contract Counts BarPlot #######
      var contractCounts = {}, //year Wise Counts
          dates = [],      margin = { top: 0, right: 0, bottom: 30, left: 20 },
          height = 150 - margin.top - margin.bottom,
          width = 960 - margin.left - margin.right;

      var xScale,yScale,xAxisTicks,xAxisValues,extent,
          yAxisTicks,yAxisValues,xGuide,yGuide,tempColor,
          countsChart,tooltip,yearWiseCounts,allYears;
          

      for (var i = 0; i<data.length; i++) {
        var new_date = new Date(data[i].AgreementDate)
        dates.push(new_date);
        contractCounts[new_date.getFullYear()] = 0;
      }

      dates = dates.sort((a,b)=>a.getTime()-b.getTime());

      for (var i=0;i<dates.length;i++){
        contractCounts[dates[i].getFullYear()] = contractCounts[dates[i].getFullYear()]+1
      }


      yearWiseCounts = Object.values(contractCounts)
      allYears = Object.keys(contractCounts)

      xScale = d3.scaleBand()
      .domain(yearWiseCounts)
      .paddingInner(.1)
      .paddingOuter(.1)
      .range([0, width])

      xAxisValues = d3.scaleTime()
      .domain([dates[0],dates[(dates.length-1)]])
      .range([0, width])

      xAxisTicks = d3.axisBottom(xAxisValues)
      .ticks(d3.timeDay.every(1))


      yScale = d3.scaleLinear()
      .domain([0, d3.max(yearWiseCounts.map(function(d){return parseInt(d)}))])
      .range([0,height]);

      yAxisValues = d3.scaleLinear()
      .domain([0,d3.max(yearWiseCounts.map(function(d){return parseInt(d)}))])
      .range([height,0]);
  
      yAxisTicks = d3.axisLeft(yAxisValues)
      .ticks(10)

      const barChart = d3.select("#bar_viz")
      countsChart = barChart.append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + (10) + ')')
      .selectAll('rect').data(yearWiseCounts)
      .enter().append('rect')
        .attr("class","year-wise-counts")
        //.attr('fill', '#2D8BCF')
        .attr('width', function(d) {
          return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function(d) {
          return xScale(d);
        })
        .attr('y', height);

        

      yGuide = barChart.append('g')
        .attr('transform', 'translate(20,'+(10)+')')
        .call(yAxisTicks)

      xGuide = barChart.append('g')
        .attr('transform', 'translate(20,'+ (height+10) + ')')
        .call(xAxisTicks.ticks(25))

      countsChart.transition()
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('y', function(d) {
        return height - yScale(d);
      })
      .delay(function(d, i) {
        return i * 5;
      })
      .duration(500)
      .ease(d3.easeBounceOut);

      barChart.call(d3.brushX()
                  .extent([ [20,10], [960,10+height] ])
                  .on("start end", updateMap))
      
      function updateMap(extent){
        const x =Math.floor(((extent.selection[0]-20)*allYears.length)/960);
        const y =Math.floor(((extent.selection[1]-1)*allYears.length)/960);
        document.getElementById("mapHeading").innerHTML = "Displaying all the Contracts with start year between "+allYears[x]+"-"+allYears[y];
        mapG.selectAll("circle").remove();
        var filteredData = data.filter(function(d){
          var cur_year = (new Date(d.AgreementDate)).getFullYear();
          return  cur_year>=allYears[x] && cur_year<allYears[y]
        });
        contractCircles(filteredData)
      }


      function wordCloud(terms){

        // set the dimensions and margins of the graph
        var margin = {top: 0, right: 10, bottom: 10, left: 10},
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#wordcloud_viz").append("svg").attr("id","wordcloud")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
          svg.append("g").selectAll("text")
          .data(terms)
          .enter().append("text")
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .style("fill", function(d) { return d.color; })
          .attr("transform", function(d) {
            return "translate(" + [d.posX, d.posY] + ")";
          })
          .text(function(d) { return d.text; });
        return svg;
      }
      let terms = [{text: "ExpirationDate", size: "15",color:"#ff6161",posX:300,posY:110}, 
                  {text: "RenewalTerm", size: "15",color:"#3c813c",posX:100,posY:110}, 
                  {text: "NoticePeriod", size: "15",color:"#ff6161",posX:300,posY:140}, 
                  {text: "TOC", size: "15",color:"#3c813c",posX:100,posY:140},
                  {text:"FileName",posX:"200",posY:"20",color:"rgb(0 111 247)"},
                  {text:"DocumentName",posX:"200",posY:"40",color:"#7288a3"},
                  {text:"Party1",posX:"200",posY:"60",color:"rgb(165 151 73 / 66%)"},
                   {text:"Party2",posX:"200",posY:"80",color:"rgb(165 151 73 / 66%)"}]

      wordCloud(terms)

      function updateWordcloud(Filename){
        let contractData = data.filter(function(d){
          return d.Filename == Filename;
        })
        let d = contractData[0];
        d3.select("#wordcloud").remove(); 
        terms = {"ExpirationDate":d.isExpDateMissing,"RenewalTerm":d.isRenewalTermMissing,
                          "NoticePeriod":d.isNoticePeriodMissing,"TOC":d.isTOC}
        var cloud_terms = [{text:d.Filename,posX:"200",posY:"20",color:"rgb(0 111 247)"},
                             {text:d.documentName,posX:"200",posY:"40",color:"#7288a3"},
                              {text:d.party1,posX:"200",posY:"60",color:"rgb(165 151 73 / 66%)"},
                              {text:d.party2,posX:"200",posY:"80",color:"rgb(165 151 73 / 66%)"},]
        let posY_missing = 110
        let posY_non_missing = 110
        Object.keys(terms).forEach(function(key) {
          if (terms[key] === "False"){
            cloud_terms.push({text:key,size:"15",color:"#3c813c",posX:100,posY:posY_non_missing});
            posY_non_missing = posY_non_missing+30;
          }
          else{
            cloud_terms.push({text:key,size:"15",color:"#ff6161",posX:300,posY:posY_missing});
            posY_missing = posY_missing+30;
          }
        });
        wordCloud(cloud_terms)
        network(d.network)
      }

      function network(dat){
        //dat = '"'+dat+'"'
        //dat = dat.replaceAll(" ","")
        //dat = new Object(dat)
        
        dat = JSON.parse(dat)
        //dat = new Object(dat)
        /*console.log(dat)
        dat = {"nodes":[{'id': 0, 'name': 'CybergyHoldingsInc_20140520'},
        {'id': 41, 'name': 'VnueInc_20150914'},
        {'id': 318, 'name': 'TRIZETTOGROUPINC_08'},
        {'id': 31, 'name': 'HerImports_20161018'},
        {'id': 247, 'name': 'TURNKEYCAPITAL,INC_07'},
        {'id': 286, 'name': 'ADAMSGOLFINC_03'}],"links":[{'source': 286, 'target': 31},
        {'source': 41, 'target': 0},
        {'source': 247, 'target': 286},
        {'source': 286, 'target': 31},
        {'source': 41, 'target': 247},
        {'source': 247, 'target': 0}]} */
        // set the dimensions and margins of the graph

        console.log(dat)
        const margin = {top: 0, right: 0, bottom: 30, left: 0},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
      
        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          //.attr("viewBox","0 0 300 300")
        .append("g")
          .attr("transform",
                `translate(${margin.left}, ${margin.top})`);
      
      
        // Initialize the links
        const link = svg
          .selectAll("line")
          .data(dat.links)
          .join("line")
            .style("stroke", "#aaa")
      
        // Initialize the nodes
        const node = svg
          .selectAll("circle")
          .data(dat.nodes)
          .join("circle")
            .attr("r", 10)
            .style("fill", "#93c9e5")
      
        // Let's list the force we wanna apply on the network
        const simulation = d3.forceSimulation(dat.nodes)                 // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink()                               // This force provides links between nodes
                  .id(function(d) { return d.id; })                     // This provide  the id of a node
                  .links(dat.links)                                    // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(120, 20))     // This force attracts nodes to the center of the svg area
            .on("end", ticked);
      
        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
      
          node
               .attr("cx", function (d) { return d.x+6; })
               .attr("cy", function(d) { return d.y-6; });
        }
      }

      network(data[0]["network"]);
    });

  });  

  self.public = {
    val :10
  }
  return self.public
}
