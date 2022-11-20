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
/*     map.call(d3.zoom().on('zoom', (event,d) => {
          mapG.attr('transform', event.transform);
        }));  */
        
    // var lines = mapG.selectAll('path').data([graticule()]);
    //     lines.enter().append('path').classed('graticule', true);
    //     lines.attr('d', pathGenerator);
    //     lines.exit().remove();

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
      mapG.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return projection([d.lng, d.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.lng, d.lat])[1];
      })
      .attr("r", function(d) {
        return 3;
      }).attr("class", "circles")
      .attr("fill",function(d){return d.isMissing==="True"? "#3c813c":"#ff6161"})
      //.style("display",function(d){return d.isMissing==="True"? "inline":"none"})
      .append('title').text(d=>d.Filename)




      // ###### Adding Missing Fields BarPlot #######
      var missingCounts = [],
          dates = [],      margin = { top: 0, right: 0, bottom: 30, left: 20 },
          height = 150 - margin.top - margin.bottom,
          width = 960 - margin.left - margin.right;

      var xScale,yScale,xAxisTicks,xAxisValues,extent,
          yAxisTicks,yAxisValues,xGuide,yGuide,tempColor,
          countsChart,tooltip;

      for (var i = 0; i<data.length; i++) {
        missingCounts.push(data[i].missingFields);
        dates.push( new Date(data[i].AgreementDate) );
      }
      dates = dates.sort((a,b)=>a.getTime()-b.getTime());
      //console.log(missingCounts)
      //console.log(dates)

      xScale = d3.scaleBand()
      .domain(missingCounts)
      .paddingInner(.1)
      .paddingOuter(.1)
      .range([0, width])

      xAxisValues = d3.scaleTime()
      .domain([dates[0],dates[(dates.length-1)]])
      .range([0, width])
  
      xAxisTicks = d3.axisBottom(xAxisValues)
      .ticks(d3.timeDay.every(100))


      yScale = d3.scaleLinear()
      .domain([0, d3.max(missingCounts.map(function(d){return parseInt(d)}))])
      .range([0,height]);

      yAxisValues = d3.scaleLinear()
      .domain([0,d3.max(missingCounts.map(function(d){return parseInt(d)}))])
      .range([height,0]);
  
      yAxisTicks = d3.axisLeft(yAxisValues)
      .ticks(10)


      countsChart = map.append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + (480-height) + ')')
      .selectAll('rect').data(missingCounts)
      .enter().append('rect')
        .attr("class","missing-counts")
        //.attr('fill', '#2D8BCF')
        .attr('width', function(d) {
          return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function(d) {
          return xScale(d);
        })
        .attr('y', height);

        
      tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 8px')
        .style('background', 'white')
        .style('opacity', 0);
      
        
      countsChart.on('mouseover', function(event,d) {
          const[x, y] = d3.pointer(event);
          tooltip.transition().duration(200)
            .style('opacity', .9)
          tooltip.html(
            '<div style="font-size: 1rem; font-weight: bold">' +
              d + '</div>'
          )
            .style('left', (x+180) + 'px')
            .style('top', (y+480) + 'px')
          tempColor = this.style.fill;
          d3.select(this)
            .style('fill', 'yellow')
        })
  
        .on('mouseout', function(d) {
          tooltip.html('')
          d3.select(this)
            .style('fill', tempColor)
        });
        //.append('title').text("d=>yScale(d)");

          /* var brush = countsChart.call(d3.brush()
                              .extent([0,0],[width,height])) */
      
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
        const x =Math.floor(((extent.selection[0]-20)*350)/960);
        const y =Math.floor(((extent.selection[1]-20)*350)/960);
        
        mapG.selectAll("circle")
              .style("display",function(d){
                var cur_date = new Date(d.AgreementDate);
                return cur_date>=dates[x] && cur_date<dates[y] ? "inline":"none"});
      }

    });

  });

  self.public = {
    val :10
  }
  return self.public
}
