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
    /*map.call(d3.zoom().on('zoom', (event,d) => {
          mapG.attr('transform', event.transform);
        }));  */

    // Drawing the countries on globe
    mapG.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class','country')
        .attr('d',d=>pathGenerator(d))
        .append('title').text(d => countryName[d.id])


    // Loading the contracts on the world map as circles
    d3.csv(contractsByCountryCsv).then ((data) =>{
      //console.log(data)
      function contractCircles(data){
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
        //.style("display",function(d){return d.isMissing==="True"? "inline":"none"})
        .append('title').text(d=>d.Filename)
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


      countsChart = map.append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + (480-height) + ')')
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

        

      yGuide = map.append('g')
        .attr('transform', 'translate(20,'+(height+240)+')')
        .call(yAxisTicks)

      xGuide = map.append('g')
        .attr('transform', 'translate(20,'+ (height+360) + ')')
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

      map.call(d3.brushX()
                  .extent([ [20,480-height], [960,480] ])
                  .on("start end", updateMap))
      
      function updateMap(extent){
        const x =Math.floor(((extent.selection[0]-20)*allYears.length)/960);
        const y =Math.floor(((extent.selection[1]-1)*allYears.length)/960);
        /*mapG.selectAll("circle").on('click',d=>console.log(d))
              .style("display",function(d){
                var cur_year = (new Date(d.AgreementDate)).getFullYear();
                return cur_year>=allYears[x] && cur_year<allYears[y]? "inline":"none"}); */
        mapG.selectAll("circle").remove();
        var filteredData = data.filter(function(d){
          var cur_year = (new Date(d.AgreementDate)).getFullYear();
          return  cur_year>=allYears[x] && cur_year<allYears[y]
        });
        contractCircles(filteredData)
      }


      function wordCloud(terms,static_terms){

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 500 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz").append("svg").attr("id","wordcloud")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        var layout = d3.layout.cloud()
          .size([width, height])
          .words(terms.map(function(d) { return {text: d.word, size:d.size,color: d.color}; }))
          .padding(5)        //space between words
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .fontSize(function(d) { return d.size; })      // font size of words
          .on("end", draw);
        layout.start();

        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
          svg.append("g").selectAll("text")
          .data(static_terms)
          .enter().append("text")
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .style("fill", function(d) { return d.color; })
          .attr("transform", function(d) {
            return "translate(" + [d.posX, d.posY] + ")";
          })
          .text(function(d) { return d.text; });
          svg
            .append("g")
              .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .style("fill", function(d) { return d.color; })
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
        return svg;
      }
      let terms = [{word: "ExpirationDate", size: "15",color:"#3c813c"}, 
                  {word: "RenewalTerm", size: "15",color:"#3c813c"}, 
                  {word: "NoticePeriod", size: "15",color:"#3c813c"}, 
                  {word: "TOC", size: "15",color:"#3c813c"}]

      let static_terms = [{text:"FileName",posX:"250",posY:"20",color:"rgb(0 111 247)"},
                          {text:"DocumentName",posX:"250",posY:"40",color:"#7288a3"},
                          {text:"Party1",posX:"250",posY:"60",color:"rgb(165 151 73 / 66%)"},
                           {text:"Party2",posX:"250",posY:"80",color:"rgb(165 151 73 / 66%)"},
                           ]

      wordCloud(terms,static_terms)

      function updateWordcloud(Filename){
        console.log(Filename)
        let contractData = data.filter(function(d){
          return d.Filename == Filename;
        })
        console.log(contractData)
        let d = contractData[0];
        d3.select("#wordcloud").remove(); 
        terms = [{word: "ExpirationDate", size: "15",color: d.isExpDateMissing==="False"? "#3c813c":"#ff6161"}, 
                  {word: "RenewalTerm", size: "15",color: d.isRenewalTermMissing==="False"? "#3c813c":"#ff6161"}, 
                  {word: "NoticePeriod", size: "15",color: d.isNoticePeriodMissing==="False"? "#3c813c":"#ff6161"}, 
                  {word: "TOC", size: "15",color: d.isTOC==="False"? "#3c813c":"#ff6161"} ]
        static_terms = [{text:d.Filename,posX:"250",posY:"20",color:"rgb(0 111 247)"},
                        {text:d.documentName,posX:"250",posY:"40",color:"#7288a3"},
                        {text:d.party1,posX:"250",posY:"60",color:"rgb(165 151 73 / 66%)"},
                         {text:d.party2,posX:"250",posY:"80",color:"rgb(165 151 73 / 66%)"},]
        wordCloud(terms,static_terms)
      }

    });

  });

  self.public = {
    val :10
  }
  return self.public
}
