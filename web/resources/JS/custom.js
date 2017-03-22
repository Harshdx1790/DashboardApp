/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ctxGlobalPath = "";
function setControlPath(ctxPath){
    ctxGlobalPath = ctxPath;
}
var tooltip = CustomTooltip("my_tooltip", "auto");
var isFormatedMeasure = false;
var isShadedColor = false;
var conditionalShading = false;
var centralColorMap = {};
function chart1(div,width){
    var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = width - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5); 

var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.close); });
    
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.open); });
  
var svg = d3.select("#"+div)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
$.getJSON("resources/data/chart1.json",function(data){

//d3.csv("data2a.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
        d.open = +d.open;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) {
		return Math.max(d.close); })]); 
    y1.domain([0, d3.max(data, function(d) { 
		return Math.max(d.open); })]);

    svg.append("path")        // Add the valueline path.
        .attr("d", valueline(data));

    svg.append("path")        // Add the valueline2 path.
        .style("stroke", "red")
        .attr("d", valueline2(data));


    svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);	

    svg.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width + " ,0)")	
        .style("fill", "red")		
        .call(yAxisRight);

});

}

function chart2(div){
var svg = d3.select("#"+div),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);
//var y = d3.scaleLinear()
//    .rangeRound([height, 0]);
var y0 = d3.scaleLinear()
    .rangeRound([height, 0]);
var y1 = d3.scaleLinear()
    .rangeRound([height, 0]);


var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var stack = d3.stack();

d3.csv("resources/data/data.csv", type, function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.State; }));
  y0.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  z.domain(data.columns.slice(1));

  g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.State); })
      .attr("y", function(d) { return y0(d[1]); })
      .attr("height", function(d) { return y0(d[0]) - y0(d[1]); })
      .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y0).ticks(10, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y0(y0.ticks(10).pop()))
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#000")
      .text("Population");

  var legend = g.selectAll(".legend")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d; });
});

function type(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}
}

function buildBarChart(widgetId, data, columns, measures, width, height){
$("#" + widgetId).html("");
function make_x_axis() {        
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(5)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
}
var svg = d3.select("#" + widgetId).append("svg").attr("width",width).attr("height",height),
    margin = {top: height*.055, right: width*.020, bottom: height*.085, left: width*.09},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;
    var range=0.5;
    var color = d3.scale.category20();
var x = d3.scale.ordinal().rangeRoundBands([0, width], range, range);
//var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
 var y = d3.scale.linear()
            .range([height*.9, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.tildaxis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
           .orient("left");

  x.domain(data.map(function(d) { 
      var str = "";
     if(d[columns[0]].length>3){
//      str= d[columns[0]]; 
      str= d[columns[0]].toString().substring(0,4)+".."; 
     }
//     else{
//      str= d[columns[0]]   
//     }
     return str;
  }));
  y.domain([0, d3.max(data, function(d) { 
         return d[measures[0]]; })]);
//g.append("g")         
//        .attr("class", "grid")
//        .attr("transform", "translate(0," + height*.9 + ")")
//        .call(make_x_axis()
//            .tickSize(-height*.9, 0, 0)
//            .tickFormat("")
//        )
//
//    g.append("g")         
//        .attr("class", "grid")
//        .call(make_y_axis()
//            .tickSize(-width, 0, 0)
//            .tickFormat("")
//        )
  g.append("g")
      .attr("class", "axis ")
      .attr("transform", "translate(-3," + height*.9 + ")")
      
      
     
      
      .call(xAxis);

  g.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(measures[0]);

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("index_value", function(d, i) {
                return "index-" + d[columns[0]].toString().replace(/[^a-zA-Z0-9]/g, '', 'gi');
            })
            .attr("class", function(d, i) {
                return "bars-Bubble-index-" + d[columns[0]].toString().replace(/[^a-zA-Z0-9]/g, '', 'gi')+widgetId;
            })
            .attr("id", function(d) {
                return d[columns[0]] + ":" + d[measures[0]];
            })
      .attr("x", function(d) { return x(d[columns[0]]); })
      .attr("y", function(d) { return y(d[measures[0]]); })
      .attr("fill",function(d,i){
//          alert(color(i))
        return color(i)  ;
      })
       .on("mouseover", function(d, i) {
             var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+widgetId;
                    var selectedBar = d3.selectAll(barSelector);
                    
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    var content = ""
                     content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d[columns[0]]+"</span><br>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+":"+d[measures[0]]+"%</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                   
                    return tooltip.showTooltip(content, d3.event);
          })
        .on("mouseout", function(d, i) {
            var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+widgetId;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                    return tooltip.hideTooltip();
        })  
        .transition()
			.duration(1000)
			.delay(function (d, i) {
				return i * 250;
			})
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return (height*.9) - y(d[measures[0]]); });
       
   chartLegends(widgetId,data,columns,measures,width,height)      
}

function buildPieChart(widgetId, data, columns, measures, width, height,color) {
   $("#" + widgetId).html("");
   $("#"+ widgetId).css("height",height+"px");
    var htmlvar = "";
   htmlvar+="<div class='col s12 m8' style='height:"+height+"px' id='subchartdiv'> </div>"
   htmlvar+="<div class='col s12 m4' style='height:"+height+"px' id='sublegenddiv'> </div>"
   $("#"+widgetId).html(htmlvar);
   
   width = $("#subchartdiv").width();
    var width = width,
    height = height,
    radius = Math.min(width, height) / 2 ;

//var data = d3.range(10).map(Math.random).sort(d3.descending);
//var color1 = d3.scale.category20();
//
//var color = color1;
//alert(color(0))
//var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
//alert(JSON.stringify(color[0]))
var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius*.4);   
var arcLarge =   d3.svg.arc()
    .outerRadius(radius+10)
//    .innerRadius(radius - 50);  
var toggleArc = function(p){
p.state = !p.state;
var dest = p.state ? arcLarge : arc;

  d3.select(this).select("path").transition()
      .duration(1000)
      .attr("d", dest);
};
var pie = d3.layout.pie()
        .sort(null)
    .value(function(d) { return d[measures[0]]; });
var svg = d3.select("#subchartdiv").append("svg")
    .datum(data)
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arcs = svg.selectAll("g.arc")
    .data(pie(data))
  .enter().append("g")
    .attr("class", "arc")
    .on("click",toggleArc);
arcs.append("path")
    .style("fill", function(d, i) { return color(i); })
    .attr("color_value", function(d,i) {
//        alert(color)
          return color(i)
      })
        .attr("index_value", function(d, i) { 
           
                return "index-" + d["data"][columns[0]].toString().replace(/[^a-zA-Z0-9]/g, '', 'gi');
            })
            .attr("class", function(d, i) {
                return "bars-Bubble-index-" + d["data"][columns[0]].toString().replace(/[^a-zA-Z0-9]/g, '', 'gi')+widgetId;
            })
            .attr("id", function(d) {
                return d["data"][columns[0]] ;
            })
             .on("click",function(d,i){
              
             drillCharts(this.id,columns[0])
           })
            .on("mouseover", function(d, i) {
             var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+widgetId;
                    var selectedBar = d3.selectAll(barSelector);
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    var content = ""
                    content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d["data"][columns[0]]+"</span><br>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+" : "+d["data"][measures[0]]+"</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                    return tooltip.showTooltip(content, d3.event);
          })
        .on("mouseout", function(d, i) {
            var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+widgetId;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                     return tooltip.hideTooltip();
                    
        })  
  .transition()
    .ease("bounce")
    .duration(2000)
    .attrTween("d", tweenPie)
  .transition()
    .ease("elastic")
    .delay(function(d, i) { return 2000 + i * 50; })
    .duration(750)
//    .attrTween("d", tweenDonut);
    
                

//  arcs.append("text")
//      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//      .attr("dy", ".35em")
//      .attr("fill","oldlace")
//      .text(function(d) { return d["data"][columns[0]]; });
  arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("fill","oldlace")
      .text(function(d) { return d["data"][measures[0]]+""; });

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

//function tweenDonut(b) {
//  b.innerRadius = radius * .6;
//  var i = d3.interpolate({innerRadius: 0}, b);
//  return function(t) { return arc(i(t)); };
//}
chartLegends("sublegenddiv",data,columns,measures,$("#sublegenddiv").width(),height,color)
}
function chartLegends(div,data,columns,measures,width,height,color){
    var htmlvar = "";
//   var color = d3.scale.category20();
   htmlvar +="<div class='row' style='margin-top:10px'>"
   for(var i in data){
   htmlvar +="<div class='col s12 m1' ><span class='col s12 m1' style='height:12px;background-color:"+color(i)+"'></span></div>"
   if(data[i][columns[0]].toString().length>8){
   htmlvar +="<div class='col s12 m9' style=''><h6  style='margin-left:1%;font-weight:bold'>"+data[i][columns[0]].toString().substring(0,8)+"..</h6></div>"
   }else{
   htmlvar +="<div class='col s12 m9' style=''><h6 style='margin-left:1%;font-weight:bold'>"+data[i][columns[0]]+"</h6></div>"    
   }
   }
   htmlvar +="</div>"
   $("#"+div).append(htmlvar) 
}
function legends(div,data,columns,measures,width,height){
   var htmlvar = "";
   var color = d3.scale.category20();
   for(var i in data){
   htmlvar +="<div class='row' style='margin-top:36px'>"
   htmlvar +="<div class='col s12 m3' style='width:20px;height:20px;background-color:"+color(i)+"'></div>"
   htmlvar +="<div class='col s12 m9' style=''><h6 style='font-weight:bold'>"+data[i][columns[0]]+"</h6></div>"
   htmlvar +="</div>"
   }
   $("#"+div).append(htmlvar)
}



function multistackareachart(div,data,columns,measures,width,height){
    
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

var parseDate = d3.time.format("%y-%b-%d").parse;
    //formatPercent = d3.format(".0%");

var x = d3.time.scale()
    .range([0, width]);


var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    //.tickFormat(formatPercent);

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var svg = d3.select("#"+div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("data.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
  data.forEach(function(d) {
  	d.date = parseDate(d.date);
  });

  var browsers = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, y: d[name] * 1};
      })
    };
  }));

  // Find the value of the day with highest total value
  var maxDateVal = d3.max(data, function(d){
    var vals = d3.keys(d).map(function(key){ return key !== "date" ? d[key] : 0 });
    return d3.sum(vals);
  });

  // Set domains for axes
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, maxDateVal])

  var browser = svg.selectAll(".browser")
      .data(browsers)
    .enter().append("g")
      .attr("class", "browser");

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) { return color(d.name); });

  browser.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + (width- margin.left - margin.right) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
      .attr("x", -6)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
//});

}


function indiaMap(div,data){
     var w = 600;
    var h = 600;
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
    var t = proj.translate(); // the projection's default translation
    var s = proj.scale() // the projection's default scale

    var map = d3.select("#"+div).append("svg:svg")
        .attr("width", w)
        .attr("height", h)
//        .call(d3.behavior.zoom().on("zoom", redraw))
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india");

    d3.json("resources/JSON/states-tel.json", function (json) {
      india.selectAll("path")
          .data(json.features)
        .enter().append("path")
          .attr("d", path)
          .attr("fill",function(d,i){
          var keys = Object.keys(data);
         for(var i in keys){
      if(d.id.toString().toUpperCase()==keys[i].toString().toUpperCase()){
         
          if(data[keys[i]]>100000){
              return "#1f77b4";
          }
        else  if(data[keys[i]]<100000 && data[keys[i]]>50000){
              return "#3584bb";
          }
        else  if(data[keys[i]]<50000 && data[keys[i]]>30000){ 
              return "#a5c8e1";
          }
        else { 
              return "#e8f1f7";
          }
      }
             
         }
   
      return "#fff"
          }) ;
    });

    function initialize() {
      proj.scale(6300);
      proj.translate([-1140, 720]);
    }

}
function indiaMapColored(div,data,columns,measures,chart4Width,height){ 
    $("#"+div).html("");
     var w = chart4Width;
    var h = height*.9;
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
    var t = proj.translate(); // the projection's default translation
    var s = proj.scale() // the projection's default scale
     var color = d3.scale.category20();
var measureArr =[];
for(var q in data){
    measureArr.push(data[q][measures[0]]);
}
      color = d3.scale.linear()
             .domain([0,Math.max.apply(Math,measureArr)])
             .range(["#b2ebf2","#0097a7"]);
    var map = d3.select("#"+div).append("svg:svg")
        .attr("width", w)
        .attr("height", h)
//        .call(d3.behavior.zoom().on("zoom", redraw))
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india");

    d3.json("resources/JSON/states-tel.json", function (json) {
      india.selectAll("path")
          .data(json.features)
        .enter().append("path")
          .attr("d", path)
          	.attr("id", function(d, i) {
                    var currName = (d.id);
                    for (var l = 0; l < data.length; l++) {
                        if (currName.toLowerCase() == data[l][columns[0]].toLowerCase() || (currName.toLowerCase() == "chatisgarh" && data[l][columns[0]].toLowerCase() == "chhattisgarh")) {
                            return data[l][columns[0]];
                        }
                    }
                    return d.id;
                })
          .attr("stroke", "#000") 
          .style("cursor", "pointer") 
           .on("click",function(d,i){
               
             drillCharts(this.id,columns[0])
           })
                  .on("dblclick", function(d, i) {
                 drillDown(this.id,columns[0])     
                  })
           .on("mouseover", function(d, i) {
             var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    
                    var content = ""
                    content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d.id+"</span><br>";
                    for(var q in data ){
                        if(d.id.toString().toUpperCase()==data[q][columns[0]].toString().toUpperCase()){
                      content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+" : "+data[q][measures[0]]+"</span>";      
                        }
                    }
//                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+" : "+d[measures[0]]+"</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                    return tooltip.showTooltip(content, d3.event);
          })
        .on("mouseout", function(d, i) {
            var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                     return tooltip.hideTooltip();
                    
        }) 
          .attr("fill",function(d,i){
              var shadingMeasure = "";
            var conditionalMeasure = "";
            var conditionalMap = {};
            var isShadedColor = false;
            var conditionalShading = false;
            
              for(var i in data){
              if(d.id.toString().toUpperCase()==data[i][columns[0]].toString().toUpperCase() && parseInt(data[i][measures[0]])>0)  {
                  return color(data[i][measures[0]])
//                 return color(i) 
//                 getConditionalColorIndia(color(), measures[0]);
              }  
              }
          
//         for(var i in keys){
//      if(d.id.toString().toUpperCase()==keys[i].toString().toUpperCase()){
//         
//         return color(i)
//      }
//             
//         }
   
      return "#fff"
          }) ;
    });

    function initialize() {
      proj.scale(4800);
      proj.translate([-900, 660]);
    }
 
    
$("#"+div).append("<h6 style='font-size: inherit;font-style: italic;color:#fff'>*single click for drill across and double click for drill down</h6>")
}

function cchart(div){
    var chart = c3.generate({
    bindto: '#chart7',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ],
      axes: {
        data2: 'y2' // ADD
      }
    },
    axis: {
      y2: {
        show: true // ADD
      }
    }
});
}

function groupedChart(div,data,columns,measures,width,height,color){
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#"+div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("data.csv", function(error, data) {
//  if (error) throw error;

  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d[columns[0]]; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sat Index");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d[columns[0]]) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

//});
}

function horizontalStackedBar(div,dataset,columns,measures,width,height,colours,legendsData){
    var margins = {
    top: 12,
    left: 48,
    right: 24,
    bottom: 24
},
legendPanel = {
    width: 0
},
width = width - margins.left - margins.right - legendPanel.width,
    height = height - margins.top - margins.bottom,
    
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.count,
                x: o.month
            };
        });
    }),
    stack = d3.layout.stack();

stack(dataset);

var dataset = dataset.map(function (group) {
    return group.map(function (d) {
        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0
        };
    });
}),
    svg = d3.select('#'+div)
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),
    xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([0, width]),
        
    months = dataset[0].map(function (d) {
        return d.y;
    }),
    _ = console.log(months),
    yScale = d3.scale.ordinal()
        .domain(months)
        .rangeRoundBands([0, height], .1),
    xAxis = d3.svg.tildaxis()
        .scale(xScale)
        .orient('bottom')
        .ticks(4),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left'),
//    colours = d3.scale.category10(),
    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
        return colours(i);
    }),
    rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        .attr('x', function (d) {
        return xScale(d.x0);
    })
        .attr('y', function (d, i) {
        return yScale(d.y);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('width', function (d) {
        return xScale(d.x);
    })
     .attr("index_value", function(d, i) { 
                return "index-" + d["x"];
            })
            .attr("class", function(d, i) {
                return "bars-Bubble-index-" + d["x"]+div;
            })
            .attr("id", function(d) { 
                return d["x"] + ":" + d["y"];
            })
            .on("mouseover", function(d, i) {
             var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    var content = ""
                    content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d["x"]+"</span><br>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+" : "+d["y"]+"</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                    return tooltip.showTooltip(content, d3.event);
          })
        .on("mouseout", function(d, i) {
            var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                     return tooltip.hideTooltip();
                    
        })  

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

svg.append('rect')
    .attr('fill', 'yellow')
    .attr('width', 160)
    .attr('height', 30 * dataset.length)
    .attr('x', width + margins.left)
    .attr('y', 0);

series.forEach(function (s, i) {
    svg.append('text')
        .attr('fill', 'black')
        .attr('x', width + margins.left + 8)
        .attr('y', i * 24 + 24)
        .text(s);
    svg.append('rect')
        .attr('fill', colours(i))
        .attr('width', 60)
        .attr('height', 20)
        .attr('x', width + margins.left + 90)
        .attr('y', i * 24 + 6);
});
 var htmlvar = "";
   var color = d3.scale.category20();
   htmlvar +="<div class='row' style='text-align:center;margin-top:10px'>"
   for(var i in legendsData){
   htmlvar +="<div class='col s12 m1' style='width:20px;height:20px;background-color:"+color(i)+"'></div>"
   if(legendsData[i]["legends"].toString().length>10){
   htmlvar +="<div class='col s12 m5' style=''><h6 style='font-weight:bold'>"+legendsData[i]["legends"].toString().substring(0,10)+"..</h6></div>"
   }else{
   htmlvar +="<div class='col s12 m5' style=''><h6 style='font-weight:bold'>"+legendsData[i]["legends"]+"</h6></div>"    
   }
   }
   htmlvar +="</div>"
   $("#"+div).append(htmlvar) 
}

function buildCustomChart(div,dataset,columns,measures,width,height,color){
    var htmlvar = "";
//    var color = d3.scale.category20c();
//    alert(JSON.stringify(dataset[0]["percentage"][0]["percent"]))
var data = dataset[0]["data"]

   htmlvar +="<div class='row'>"; 
   htmlvar +="<div style='border-right: 1px solid grey;' class='col s12 m7'>"; 
   htmlvar +="<h1>"+dataset[0]["percentage"][0]["percent"]+"</h1>"; 
   htmlvar +="<p style='color:grey'>"+dataset[0]["percentage"][0]["header"]+"</p>"; 
   htmlvar +="</div>"; 
   htmlvar +="<div style='text-align:center' class='col s12 m5'>"; 
   htmlvar +="<h6 style='color:grey' >Goal</h6>"; 
   htmlvar +="<h3>"+dataset[0]["Goal"][0]["Goal"]+"</h3>"; 
   htmlvar +="</div>"; 
   htmlvar +="</div>"; 
   for(var i in data){
   htmlvar +="<div class='row'>"; 
   htmlvar +="<div  class='col s12 m2'>";   
    htmlvar +="</div>"; 
   htmlvar +="<div style='height:20px;background-color:"+color(i)+"' class='col s12 m1'>";   
    htmlvar +="</div>"; 
    htmlvar +="<div style='text-align:center' class='col s12 m9'>";  
    htmlvar +="<h6 style='color:grey' >"+data[i][columns[0]]+" "+data[i][measures[0]]+"</h6>";
    htmlvar +="</div>"; 
   htmlvar +="</div>"; 
   }
   $("#"+div).html(htmlvar)
}


function dayHourMap(div,json,width,height,color){
        $("#"+div).html("");
      var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = width - margin.left - margin.right,
          height = height - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
          datasets = [json];

      var svg = d3.select("#"+div).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

      var heatmapChart = function(tsvFile) {
        $.getJSON("resources/data/telecomOperation/"+tsvFile,function(data) { 
          
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.hour - 1) * gridSize; })
              .attr("y", function(d) { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });  
      };

      heatmapChart(datasets[0]);
      
      var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
        .data(datasets);

      datasetpicker.enter()
        .append("input")
        .attr("value", function(d){ return "Dataset " + d })
        .attr("type", "button")
        .attr("class", "dataset-button")
        .on("click", function(d) {
          heatmapChart(d);
        });
}

function customChart2(div,data,column,measures,width,height,color){
    var htmlvar = "";
    
    htmlvar +="<div style='height:"+height+"px' class=''> ";
    htmlvar +="<div class='row'> ";
    htmlvar +="<div style='color:#ff5050;text-align:center' class='col s12 m10'><h1>"+data[0]["information"][0][column[0]]+"</h1></div> ";
    htmlvar +="<div style='background-color:#ff5050;color:white' class='col s12 m2'><p>"+measures[1]+"</p><h6>"+data[0][measures[1]][0][measures[1]]+"</h6></div> ";
    htmlvar +="</div> ";
    htmlvar +="<div style='border-top:1px solid #e7e7e7;text-align:center' class='row'></div> ";
    htmlvar +="<div style='' class='row'></div> ";
    htmlvar +="<div style='text-align:center' class='row'> ";
    htmlvar +="<h6>"+data[0]["information"][0][measures[0]].toString().toUpperCase()+"</h6> ";
    htmlvar +="</div> ";
    htmlvar +="</div> ";
    $("#"+div).html(htmlvar)
}
function customChart3(div,data,column,measures,width,height,color){
   var htmlvar = "";
    htmlvar +="<div class='row'> ";
   for(var i in data){
   htmlvar +="<div style='border-right: 1px solid #eee;text-align:center' class='col s12 m6' > ";
   htmlvar +="<h3>"+data[i][measures[0]]+"</h3>";
   htmlvar +="<p>"+data[i][column[0]]+"</p>";
   htmlvar +="<div style='border-top:1px solid #eee' class='row'> </div>";
   htmlvar +="</div> ";
   }
   htmlvar +="</div> ";
   
   $("#"+div).append(htmlvar)
}

function buildMultiMeasureLine(div,data, columns, measureArray, divWid, divHgt) {
$("#"+div).html("");
    
     var color = d3.scale.category10();
//     divWid=parseInt($(window).width())*(.35);
    var measure1 = measureArray[0];
    var autoRounding1;
    var measArr = [];
//    if (columnMap[measure1] !== undefined && columnMap[measure1] !== "undefined" && columnMap[measure1]["rounding"] !== "undefined") {
//        autoRounding1 = columnMap[measure1]["rounding"];
//    }else {
        autoRounding1 = "1d";
//    }
   //    var chartData = JSON.parse($("#chartData").val());
//       var colIds = chartData[div]["viewIds"];
     var chartData ;
      var colIds;
       var prop = graphProp1(div);

    var isDashboard = parent.$("#isDashboard").val();
    var fun = "drillWithinchart(this.id,\""+div+"\",\""+columns+"\")";
    var botom = 70;
    var j = 0;
    if (typeof isDashboard !== 'undefined' && (isDashboard === true || isDashboard === "true")) {
        fun = "drillChartInDashBoard(this.id,'" + div + "')";
        botom = 70;
    }
   var margin = {
        top: 20,
        right: 10,
        bottom: botom,
        left: 35
    },
//    width = parseInt(divWid)-94, //- margin.left - margin.right
//    height = parseInt(divHgt)* .55;
 width = divWid- margin.left - margin.right,
  divheight = divHgt,
            height = parseInt(divHgt)* .65;
    var x = d3.scale.ordinal().rangePoints([0, width], .2);
    var max = maximumValue(data, measure1);
    var minVal = minimumValue(data, measure1);
 
    var y = d3.scale.linear().domain([minVal, max]).range([height, 0]);
    // Axis setting
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    if (isFormatedMeasure) {
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(function(d) {
//                    return numberFormat(d, round, precition);
                        return addCommas(d);
                }).ticks(3)
                ;

    }
    else {
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("left").ticks(6)
                .tickFormat(function(d, i) {
                     if(yAxisFormat==""){
//                        return addCommas(numberFormat(d,yAxisFormat,yAxisRounding));
              //          return numberFormat(d,yAxisFormat,yAxisRounding);
               return addCommas(d);
            
                    }
            else{
                    return numberFormat(d,yAxisFormat,yAxisRounding);
                }
//                    return d;
//                    return autoFormating(d, autoRounding1);
                });
    }
 var yAxis1 = d3.svg.axis()
            .scale(y)
            .tickFormat(function(d, i) {
                measArr.push(d);
                return "";
            });
    var valueline = d3.svg.area().interpolate("monotone")
    var valueline = d3.svg.area()
            .x(function(d) {
                return x(d[columns[0]]);
            })
            .y(function(d) {
                return y(d[measureArray[j]]);
            });
           
    var svg = d3.select("#" + div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", divheight )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//    svg.append("svg:rect")
//            .attr("width", width)
//            .attr("height", height)
//            .attr("onclick", "reset()")
//            .attr("class", "background");

//svg.append("g")
//    .append("svg:svg")
////    .style("margin-left", "3em")
//    .attr("width", width-margin.left-margin.right)
//    .attr("height", height-margin.left-margin.right+17.5);

for (var j=0; j <= height; j=j+50) {
    svg.append("svg:line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", width)
        .attr("y2", j)
        .style("stroke", "#A69D9D")
        .style("stroke-width", .5)
        .style("z-index", "9999");
};

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

var len = 0;
var yvalue = -75;
var dyvalue = ".41em";
var count = 0;
var transform = "";
 for(var i in  measureArray){
//     alert(measureArray[i])
    if(count % 2==0){
        if(len==0){
            len=100;
            yvalue=500;
        dyvalue = -150;
        }else{
        len += 100;
        yvalue=500;
        dyvalue = -150;
     }
    }else {
        len +=100;
        yvalue=518;
         dyvalue = -150;
     }
   svg.append("g")
            .attr("class", "y axis")
            .append("text")
        //    .attr("transform", transform)
            .attr("x",len)
            .attr("y",yvalue)
            .attr("fill", color(i))
//            .style("stroke", color(i))
            .attr("dy",dyvalue )
            .style("text-anchor", "end")
            .attr("class", "a")
//            .text("" + measureArray[i] + "");
            .text(function(d){
                if(measureArray[i].length>25){
                    return measureArray[i].substring(0, 25);
                }else {
                    return measureArray[i];
          }
           })
              count++


   }
    var min1 = [];
    var flag = "";
    for (var key in data) {
        for (var meas in measureArray) {
            min1.push(data[key][measureArray[meas]]);
        }
    }
    x.domain(data.map(function(d) {
        return d[columns[0]];
    }));
    
    y.domain([Math.min.apply(Math, min1), Math.max.apply(Math, min1)]);
     svg.call(yAxis1);
    var diffFactor = parseInt(measArr[0] - parseInt(measArr[1]));
     if(measArr[0]<0){
    minVal = measArr[0] + diffFactor;
    }
    else{
       minVal = measArr[0] + diffFactor;
       if(measArr[0]>=0 && minVal<0){
           minVal=0;
       }
    }

//    y.domain([minVal, max]);


    svg = d3.select("#" + div).select("g");
    d3.transition(svg).select('.y.axis')
            .call(yAxis)
            .selectAll('text')
             .text(function(d) {
             if(typeof d != "undefined" ){
              if(yAxisFormat==""){
                        flag = addCommas(d);
//                        flag = addCommas(numberFormat(d,yAxisFormat,yAxisRounding));
              }
           else{
                    flag = numberFormat(d,yAxisFormat,yAxisRounding);
                }
              }
           else{
           flag =  measure1;
           }
          return flag
             });

    d3.transition(svg).select('.x.axis')
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .text(function(d) {
                if(typeof d!="undefined"){
                if (d.length < 13)
                    return d;
                else
                    return d.substring(0, 10) + "..";
            }
            return "";
            })
            .attr('transform', 'rotate(-45)')
            .append("svg:title").text(function(d) {
        return d;
    });

    // Title of the graph
    //	svg.append("text")
    //		.attr("x", (width / 2))
    //		.attr("y", 0 - (margin.top / 2))
    //		.attr("text-anchor", "middle")
    //		.style("font-size", "16px")
    //		.text("Value vs Date Graph");

    var colorArr = [];
    colorMap = {};
    var chartMap = {};
    // Add the line 1
    for (var i = 0; i < measureArray.length; i++) {
        j = i;
        svg.append("path").attr("class","lineChart")
                .data(data)
                .attr("d", valueline(data))
                .attr("fill", color(i))
                .style("stroke-width", "1px")
                .style("stroke", color(i));
        colorArr.push(color(i));
        if (typeof chartMap[measureArray[i]] === "undefined") {
            chartMap[measureArray[i]] = color(i);
            colorMap[i] = measureArray[i] + "__" + color(i);
        }
        parent.$("#colorMap").val(JSON.stringify(colorMap));
        var blueCircles = svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 3)
                .attr("cx", function(d) {
                    return x(d[columns[0]]);
                })
                .attr("cy", function(d) {
                    return y(d[measureArray[i]]);
                })
                .style("fill", color(i))
                .style("stroke", color(i))
                .style("stroke-width", "2px")
                .attr("id", function(d) {
                    return d[columns[0]] + ":" + d[measureArray[i]];
                })
             .attr("onclick", fun)
                .on("mouseover", function(d, i) {
                                   var content= "";
    content += "<span class=\"value\"> " + columns[0] + "</span><span class=\"value\"> " + d[columns[0]] + "</span><br/>";
    for (var no = 0; no < measureArray.length; no++) {
    if (isFormatedMeasure) {
    msrData = numberFormat(d["value" + no], round, precition);
    }
    else {
    msrData = addCommas(d["value" + no]);
    }
    content += "<span class=\"value\">"+measureArray[no]+"</span><span class=\"name\"> " + d[measureArray[no]] + "</span><br/>";
    }
    return tooltip.showTooltip(content, d3.event);
    
                })
                .on("mouseout", function(d, i) {
                    hide_details(d, i, this);
                });
    }
//    if (typeof isDashboard !== 'undefined' && (isDashboard === true || isDashboard === "true")) {
//    }
//    else {
//        buildCircledrill(height);
//    }
//    var ageNames1 = [];
//    showLegends2(measureArray, colorArr, width, svg);
  
$(".domain").css("fill","none")
$(".domain").css("stroke-width","0")
}

function graphProp1(div){
  //  var chartData = JSON.parse($("#chartData").val());
   var chartData  ;

//    var dataDisplay,displayType,yAxisRounding,yAxisFormat;
    if(chartData!=="undefined"){
        dataDisplay=chartData;
    }else{
       dataDisplay="Yes";
    }
    if(typeof chartData!=="undefined"){
        displayType=chartData;
    }else{
       displayType="Absolute";
    }
    if(typeof chartData!=="undefined"){
        yAxisRounding=chartData;
    }else{
       yAxisRounding=0;
    }
    if(typeof chartData!=="undefined"){
        yAxisFormat=chartData;
    }else{
       yAxisFormat="";
    }
    if(typeof chartData!=="undefined"){
        displayX=chartData;
    }else{
       displayX="Yes";
    }
    if(typeof chartData!=="undefined"){
        displayY=chartData;
    }else{
       displayY="Yes";
    }
    if(typeof chartData!=="undefined"){
        displayLegend=chartData;
    }else{
       displayLegend="Yes";
    }
    if(typeof chartData!=="undefined"){
        colorLegend=chartData;
    }else{
       colorLegend="Default";
    }
}
function maximumValue(data, measure) {
    var max;
    for (var j = 0; j < data.length; j++) {
    if (j === 0) {
    max = data[j][measure];
    } else {
    if (max < parseInt(data[j][measure])) {
    max = data[j][measure];
    }
    }
    }
    return max;
    }
    function minimumValue(data, measure) {
    var min;
    try {
    for (var k = 0; k < data.length; k++) {
    if (k === 0) {
    min = data[k][measure];
    } else {
    if (min > parseInt(data[k][measure])) {
    min = data[k][measure];
    }
    }
    }
    } catch (e) {
    }
    return min;
    }
    
    function addCommas(nStr){
    var decimalPlace = 2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    x2 = x2.substring(0, decimalPlace + 1);
    if (x2 === ".00") {
        x2 = "";
    }
    return x1 + x2;
}

function horizontalBar(div,data, columns, measureArray, divWid, divHgt){ 
$("#"+div).html("");
   var colorMap = {};
//   alert(columns)
     var color = d3.scale.category20();
    var chartMap = {};
//var chartData = JSON.parse(parent.$("#chartData").val());
    var isDashboard = parent.$("#isDashboard").val();
    var fun = "drillWithinchart(this.id,\""+div+"\",\""+columns+"\")";

    if (typeof isDashboard !== 'undefined' && (isDashboard === true || isDashboard === "true")) {
        fun = "drillChartInDashBoard(this.id,'" + div + "')";
    }
//     divWid=parseInt($(window).width())*(.35);
    var wid = divWid;
    var hgt = divHgt;
    var w = wid - 200;
    var h = hgt-30 ;
     var prop = graphProp1(div);
    //    var color = d3.scale.linear()
    //    .domain([d3.min(data, function(d) {
    //        return d[measureArray[0]];
    //    }), d3.max(data, function(d) {
    //        return d[measureArray[0]];
    //    })])
    //    .range(["red", "green"])
    //    .interpolate(d3.interpolateHsl);
    var max = maximumValue(data, measureArray[0]),
            num_ticks = 1,
            left_margin = 100,
            right_margin = 100,
            top_margin = 70,
            bottom_margin = 0;
    //    color1 = function(id) {
    //        return 'steelblue'
    //    };


//var colIds = chartData[div]["viewIds"];
    var measArr = [];
//    xAxis = d3.svg.trendaxis()
//            .scale(x)
//            .orient("bottom");
    var x = d3.scale.linear()
            .domain([0, max])
//            .range([0, w - (left_margin + right_margin)]),
            .range([0, divWid*.88 ]),
      y = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([bottom_margin, h - top_margin], .5);
  var xAxis = d3.svg.trendaxis()
            .scale(x)
            .orient("bottom");

//    yAxis = d3.svg.trendaxis()
//                .scale(y)
//                .orient("left")
//                .tickFormat(function(d, i) {
//                    return addCommas(d);
//                });
    var chart_top = h - y.rangeBand() / 2 - top_margin;
    var chart_bottom = bottom_margin + y.rangeBand() / 2;
    var chart_left = left_margin;
    var vis = d3.select("#"+div).append("svg:svg")
            .attr("width", divWid)
            .attr("height", divHgt)
            .append("svg:g")
            .attr("id", "barchart")
            .attr("class", "barchart");




    var gradient = vis.append("svg:defs").selectAll("linearGradient").data(data).enter()
            .append("svg:linearGradient")
            .attr("id", function(d) {
                return "gradientHbar_" + (d[columns[0]]).replace(/[^a-zA-Z0-9]/g, '', 'gi');
            })
            .attr("x1", "0%")
            .attr("y1", "30%")
            .attr("x2", "50%")
            .attr("y2", "30%")
            .attr("spreadMethod", "pad")
            .attr("gradientTransform", "rotate(90)");

    gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", function(d, i) {
                var colorShad;
                var colorMap = {};
                if (isShadedColor) {
                    colorShad = color(d[shadingMeasure]);
                } else if (conditionalShading) {
                    colorShad = getConditionalColor("steelblue", d[conditionalMeasure]);
                } else {
                    var drilledvalue = parent.$("#drilledValue").val();
                    if (typeof drilledvalue !== 'undefined' && drilledvalue.trim().length > 0 && drilledvalue.indexOf(d[columns[0]]) !== -1) {
                        colorShad = drillShade;
                    } else {
                        if (typeof centralColorMap[d[columns[0]].toString().toLowerCase()] !== "undefined") {
                            colorShad = centralColorMap[d[columns[0]].toString().toLowerCase()];
                        }else {
                            colorShad = "steelblue";
                        }
//                return "steelblue";
                    }
                }
                chartMap[d[columns[0]]] = colorShad;
                
                colorMap[i] = d[columns[0]] + "__" + colorShad;
                return colorShad;
            })
            .attr("stop-opacity", 1);



    parent.$("#colorMap").val(JSON.stringify(colorMap));
    gradient.append("svg:stop")
            .attr("offset", "9%")
            .attr("stop-color", "rgb(240,240,240)")
            .attr("stop-opacity", 1);
    gradient.append("svg:stop")
            .attr("offset", "80%")
            .attr("stop-color", function(d, i) {
                var colorShad;
                if (isShadedColor) {
                    colorShad = color(d[shadingMeasure]);
                } else if (conditionalShading) {
                    colorShad = getConditionalColor("steelblue", d[conditionalMeasure]);
                } else {
                    var drilledvalue = parent.$("#drilledValue").val();
                    if (typeof drilledvalue !== 'undefined' && drilledvalue.trim().length > 0 && drilledvalue.indexOf(d[columns[0]].trim()) !== -1) {
                        colorShad = drillShade;
                    } else {
                        if (typeof centralColorMap[d[columns[0]].toString().toLowerCase()] !== "undefined") {
                            colorShad = centralColorMap[d[columns[0]].toString().toLowerCase()];
                        } else {
                            colorShad = color(i);
                        }
                    }
                }
                if (typeof chartMap[d[columns[0]]] === "undefined") {
                    chartMap[d[columns[0]]] = colorShad;
                    colorMap[i] = d[columns[0]] + "__" + colorShad;
                }

                return colorShad;
            })
            .attr("stop-opacity", 1);
    parent.$("#colorMap").val(JSON.stringify(colorMap));
//    vis.append("svg:rect")
//            .attr("width", divWid)
//            .attr("height", h+50)
//            .attr("style", "margin-top:30px;")
//            .attr("onclick", "reset()")
//            .attr("class", "background");
    var rules = vis.selectAll("g.rule")
            .data(x.ticks(num_ticks))
            .enter()
            .append("svg:g")
            .attr("transform", function(d)
            {
                return "translate(" + (chart_left + x(d)) + ")";
            });


     for (var j=150; j < divWid; j=j+50) {
        vis.append("svg:line")
//    .attr("transform", "translate(0," + w + ",0)")
        .attr("x1", j)
        .attr("y1", bottom_margin)
        .attr("x2", j)
        .attr("y2", chart_top)
        .style("stroke", "#A69D9D")
        .style("stroke-width", 1)

//        .style("z-index", "9999");
};


    rules.append("svg:line")
            .attr("class", "tick")
            .attr("y1", chart_top)
            .attr("y2", chart_top + 4)
            .attr("stroke", "black");


    rules.append("svg:text")
            .attr("class", "tick_label")
            .attr("text-anchor", "middle")
            .attr("y", chart_top)
            .text(function(d)
            {

                return d[measureArray[0]];
            });
    var bbox = vis.selectAll(".tick_label").node().getBBox();
    vis.selectAll(".tick_label")
            .attr("transform", function(d)
            {
                return "translate(0," + (bbox.height) + ")";
            });

    var bars = vis.selectAll("g.bar")
            .data(data)
            .enter()
            .append("svg:g")
            .attr("class", "bar")
            .attr("transform", function(d, i) {
                return "translate(0, " + y(i) + ")";
            });

   vis.append("g")
            .attr("class", ".x axis")
//            .attr("transform", "translate(100," +w+ ")")
            .attr("transform", "translate("+top_margin+"," +(h- top_margin)+ ")")
            .attr("x", 0)
           .call(xAxis)

            .selectAll('text')
            .style('text-anchor', 'end')
            .text(function(d,i) {
//            if(typeof displayX !=="undefined" && displayX=="Yes"){
//             if(yAxisFormat==""){
//                        return addCommas(numberFormat(d,yAxisFormat,yAxisRounding));
//                    }
//            else{
                    return addCommas(d)
//                    ,yAxisFormat,yAxisRounding);
//                }
//            }else{
//                return "";
//            }
            })
            .attr('transform', 'rotate(-45)')

            .append("svg:title").text(function(d) {
        return d;
    });

//    svg.append("g")
//            .attr("class", "y axis")
//            .call(yAxis)
//            .append("text")
//            .attr("transform", "rotate(-90)")
//            .attr("y", 6)
//            .attr("dy", ".71em")
//            .style("text-anchor", "end");


    bars.append("svg:rect")
            .attr("x", top_margin)
//            .attr("width",0)
//            .transition()
//            .duration(2000)//1 second
            .attr("width", function(d) {
                return (x(d[measureArray[0]]))

            })


            .attr("height", y.rangeBand()+7)
            .attr("fill", function(d,i) {
               var drilledvalue;
                    try {
//                        drilledvalue = JSON.parse(parent.$("#drills").val())[colIds[0]];
                    }catch (e) {
                    }
                    if (typeof drilledvalue !== 'undefined' && drilledvalue.length > 0 && drilledvalue.indexOf(d[columns[0]]) !== -1) {
                        return drillShade;
                    }

//                return color(i);
               return "url(#gradientHbar_" + (d[columns[0]]).replace(/[^a-zA-Z0-9]/g, '', 'gi') + ")";
            })
            .attr("stroke", function(d) {
                return "url(#gradientHbar_" + (d[columns[0]]).replace(/[^a-zA-Z0-9]/g, '', 'gi') + ")";
            })
             .attr("index_value", function(d, i) {
                return "index-" + d[columns[0]].replace(/[^a-zA-Z0-9]/g, '', 'gi');
            })
            .attr("id", function(d) {
               
                return d[columns[0]] ;
            })
             .on("click",function(d,i){
              
             drillCharts(this.id,columns[0])
           })
                   .style("cursor","pointer")
            .attr("class", function(d, i) {
                return "bars-Bubble-index-" + (d[columns[0]]).replace(/[^a-zA-Z0-9]/g, '', 'gi').replace(/[^\w\s]/gi, '');
            })

           
            .on("mouseover", function(d, i) {
                    var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    var content = ""
                    content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d[columns[0]]+"</span><br>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measureArray[0]+" : "+d[measureArray[0]]+"</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                    return tooltip.showTooltip(content, d3.event);
    })
      
            .on("mouseout", function(d, i) {
                  var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                     return tooltip.hideTooltip();

            })

    var labels = vis.selectAll("g.bar")
            .append("svg:text")
            .attr("class", "x.axis")
            .attr("x", 5)
            .attr("y", 30)
            .text(function(d, i) {
//                if(typeof displayY !=="undefined" && displayY =="Yes"){
                if (data[i][columns[0]].length < 12)
                    return data[i][columns[0]];
                else
                    return  data[i][columns[0]].substring(0, 12) + "..";
//                }else {
//                    return "";
//                }
            })
            .attr("style", "font-family: lucida grande")
            .attr("style", "font-size: 11px")
            .attr('transform', 'rotate(-20)')
            .style("stroke", "grey");

//    var labels1 = vis.selectAll("g.bar")
//            .append("svg:text")
//            .attr("class", ".x.axis")
//
//            .text(function(d, i) {
//                if (data[i][measureArray[0]].length < 12)
//                    return data[i][measureArray[0]];
//                else
//                    return  data[i][measureArray[0]].substring(0, 12) + "..";
//            })
//            .attr("style", "font-family: lucida grande")
//            .attr("style", "font-size: 11px");
//            .attr('transform', 'rotate(-20)');

    var bbox = labels.node().getBBox();
    vis.selectAll(".label")
            .attr("transform", function(d) {
                return "translate(0, " + (y.rangeBand() / 2 + bbox.height / 4) + ")";
            });
    var sum = d3.sum(data, function(d) {
        return d[measureArray[0]];
    });
    labelColor = "grey";

    var rightOffset = wid + 160;
    labels = vis.selectAll("g.bar")
            .append("svg:text")
            .attr("transform", function(d) {
                var xvalue = (x(d[measureArray[0]]) - 80) < 20 ? x(d[measureArray[0]]) + 119 : x(d[measureArray[0]]) + 119;
                return "translate(" + xvalue + ", " + (y.rangeBand() / 2) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("class", "valueLabel")
            .attr("fill", labelColor)
            .text(function(d)
            {
               if(typeof dataDisplay!=="undefined" && dataDisplay==="Yes"){

                    if(typeof displayType=="undefined" || displayType==="Absolute"){

                       return numberFormat(d[measureArray[0]],yAxisFormat,yAxisRounding);
                    }else{
                    var percentage = (d[measureArray[0]] / parseInt(sum)) * 100;
                    return percentage.toFixed(1) + "%";
                }
            }else {return "";}
            });


    bbox = labels.node().getBBox();
    vis.selectAll(".NetMarginAmt")
            .attr("transform", function(d)
            {
                return "translate(0, " + (y.rangeBand() / 2 + bbox.height / 2) + ")";
            });
//    vis.append("svg:line")
//            .attr("class", "axes")
//            .attr("x1", chart_left)
//            .attr("x2", chart_left)
//            .attr("y1", chart_bottom)
//            .attr("y2", chart_top)
//            .attr("stroke", "black");

           vis.append("svg:g")
            .attr("class", "x axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -75)
            .attr("fill","steelblue")
            .attr("dx", ".71em")
            .style("text-anchor", "end")
            .text("" + measureArray[0] + "");


}

function bulletChart(div,data, columns, measureArray, divWid, divHgt){
    var margin = {top: 5, right: 40, bottom: 20, left: 120},
    width = divWid - margin.left - margin.right,
    height = 65 - margin.top - margin.bottom;

var chart = d3.bullet()
    .width(divWid*.8)
    .height(height);



  var svg = d3.select("#"+div).selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.right + "," + margin.top + ")")
      .call(chart);

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { 
          if(d.title.toString().length>3){
                  return d.title.toString().substring(0,2)+".."; 
              
          }else{
           return d.title.toString();    
          }
          });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  d3.selectAll("button").on("click", function() {
    svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
  });


function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}

}
function bulletChartVertical(div,data, columns, measureArray, divWid, divHgt){
  var margin = {top: 5, right: 40, bottom: 50, left: 120},
    width = 192 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var chart = d3.bullet1()
    .orient("bottom")
    .width(width)
    .height(height);


  var svg = d3.select("#"+div).selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(" + width + "," + (height + 20) + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  d3.selectAll("button").on("click", function() {
    svg.datum(randomize).transition().duration(1000).call(chart);
  });


function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}


}

function buildTable(div,data, columns, measureArray, divWid, divHgt){
    $("#"+div).html("");
    var htmlvar = "";
    var keyset = Object.keys(data[0]);
    
    htmlvar +="<table class='highlight' style='height:"+divHgt+"px' >"
    htmlvar +="<thead>"
    htmlvar +="<tr>"
    for(var i in keyset ){
    htmlvar +="<th>"+keyset[i]+"</th>"
    }
    htmlvar +="</tr>"
    htmlvar +="</thead>"
    htmlvar +="<tbody>"
    for(var j in data){
    htmlvar +="<tr>"
    for(var c in columns){
//        alert(JSON.stringify())
    htmlvar +="<td>"+data[j][columns[c]]+"</td>"   
    }
    for(var k in measureArray){ 
    htmlvar +="<td>"+data[j][measureArray[k]]+"</td>"    
    }
    htmlvar +="</tr>"
    }
    htmlvar +="</tbody>"
    htmlvar +="</table>"
    $("#"+div).append(htmlvar)
}

function KPIChart(div,data, columns, measureArray, divWid, divHgt){
    var htmlvar = "";
//    alert(JSON.stringify(data))
var count = data[0][columns[0]].length;
$("#"+div).html("");
for(var j=0;j<count;j++){
htmlvar +=' <div class="col s12 m3">';
htmlvar +='  <div class="card blue-grey darken-1">';
htmlvar +='   <div class="card-content white-text">';
        for(var i in data){
        if(i==0){
         htmlvar +='   <span class="card-title"> '+addCommas(data[i][columns[i]][j][measureArray[j]])+' | '+columns[i]+'</span>  '; 
        } else { 
            if(data[i-1][columns[i-1]][j][measureArray[j]]>data[i][columns[i]][j][measureArray[j]]){
         htmlvar +='   <p >'+addCommas(data[i][columns[i]][j][measureArray[j]])+' | '+columns[i]+' | <i class=" material-icons">trending_up</i></p> ';     
              
            }else{
               htmlvar +='   <p >'+addCommas(data[i][columns[i]][j][measureArray[j]])+' | '+columns[i]+' | <i class=" material-icons">trending_down</i></p> ';     
            }
        }
       
    }
    htmlvar +="</div>"
    htmlvar +='<div class="card-action">'
    htmlvar +='<a id="'+measureArray[j]+'" onclick="filterMeasure(this.id)">'+measureArray[j]+' (YOY)</a>'
   htmlvar +="</div>" 
   htmlvar +="</div>" 
   htmlvar +="</div>" 
}
$("#"+div).html(htmlvar)
}

function getDataFun(measures,ctxPath){
    
    var chart1Width = $("#chart1").width();
     var chart2Width = $("#chart7").width();
     var chart3Width = $("#chart8").width();
     var height = 300 
     var color = d3.scale.category20b();
     var query = "select * from global_data_table";
     
    
        $.ajax({
                type: "POST",
                url: ctxPath + "/AdminSubmit.do",
                data: "query=" +query ,
                success: function (response) {
//                    alert(response)
//                    userListHtml(response)
                },
                error: function (e) {
//                    alert('Error: ' + JSON.stringify(e));
                }
            });
       $.getJSON("resources/data/cxoDash/KPI.json",function(data){                                                                                                    
          var columns = ["2014","2013"];      
      
    var measureArr = ["Overall Sales","Total Quantity","Overall Discount","Total Profit"]
       KPIChart("kpiRow", data, columns, measureArr, chart1Width, height)
      
  });
       $.getJSON("resources/data/cxoDash/state.json",function(data){
          var columns = ["State"];  
    
        
       indiaMapColored("chart6", data, columns, measures, chart3Width, height)
    
  });   
       $.getJSON("resources/data/cxoDash/city.json",function(data){
          var columns = ["City"];  
        
                                     
       buildPieChart("chart7", data, columns, measures, chart2Width, height,color)

  });          
       $.getJSON("resources/data/cxoDash/category.json",function(data){
          var columns = ["category"];  
              

       buildMultiMeasureLine("chart8", data, columns, measures, chart3Width, height,color)

  });   
}
 

function filterMeasure(id){
 var measuresArr = ["Overall Sales","Total Quantity","Overall Discount","Total Profit"];
 var returnArr= [];
 returnArr.push(id)
 for(var i in measuresArr){
     if(measuresArr[i]!=id){
         returnArr.push(measuresArr[i]);
     }
 }
 getDataFun(returnArr)
}

function scatterplot(div,data,columns,measures,width,height){
    $("#"+div).html("");
//    alert(JSON.stringify(data))
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = width - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d[measures[0]];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.tildaxis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d["Credit Limit"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.State;},
    color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg = d3.select("#"+div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
//d3.json("resources/data/credit_card/credit_card.json", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d[measures[0]] = +d[measures[0]];
    d["Credit Limit"] = +d["Credit Limit"];
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
//      .text(measures[0]);

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
//      .text("Credit Limit");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["State"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
//  var legend = svg.selectAll(".legend")
//      .data(color.domain())
//    .enter().append("g")
//      .attr("class", "legend")
//      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//  // draw legend colored rectangles
//  legend.append("rect")
//      .attr("x", width - 18)
//      .attr("width", 18)
//      .attr("height", 18)
//      .style("fill", color);
//
//  // draw legend text
//  legend.append("text")
//      .attr("x", width - 24)
//      .attr("y", 9)
//      .attr("dy", ".35em")
//      .style("text-anchor", "end")
//      .text(function(d) { return d;})
//});
}




 function KPI(ctxPath,filtersMapArr){
                var KPI = ["current","Prior"];
                var Measures = ["Sales","Profit","Volume","Discount"];
                var chart = ["chart1","chart2","chart3","chart4"];
                for(var q in chart){
                 $("#"+chart[q]).html("");   
                }
            $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getKPIData",
                    data: "filters=" + encodeURIComponent(filtersMapArr),
                    success: function (response) {
                           var json = JSON.parse(response);
                         
                           var priorArr = [];
                           for(var i in KPI){
                           var dataarr = JSON.parse(json[KPI[i]]);
                           for(var j in Measures){
                           var htmlvar = "";
                           if(i==0){
                           priorArr.push(parseFloat(dataarr[0][Measures[j]]));  
                           if(typeof dataarr[0][Measures[j]]!="undefined"){
                           htmlvar += "<h4>"+numberFormat(dataarr[0][Measures[j]],chart[j])+"   </h4> ";
                           }else{
                           htmlvar += "<h4>0   </h4> " ;   
                           }
                           }
                           else{
                               if(Measures[j]!="Discount"){
                             if(priorArr[j]>parseFloat(dataarr[0][Measures[j]])){
                                var difference = (parseFloat(priorArr[j]) - parseFloat(dataarr[0][Measures[j]]))
                                var percent = (difference/parseFloat(priorArr[j]))*100;
                                
                               if(typeof dataarr[0][Measures[j]]!="undefined" && !isNaN(percent) ){
                            htmlvar += "<h6 style='font-size:large'>"+numberFormat(dataarr[0][Measures[j]],chart[j])+" | (prior)  </h6>"; 
                            htmlvar += "<h6 style='font-size:large'>"+percent.toFixed(1)+"% <i style='color:#009900' class='fa fa-arrow-up' aria-hidden='true'></i>  from last year  </h6>"; 
                               }else{
                             htmlvar += "<h6 style='font-size:large'>0 | (prior)  </h6>"; 
                            htmlvar += "<h6 style='font-size:large'>0% <i style='color:#009900' class='fa fa-arrow-up' aria-hidden='true'></i>  from last year  </h6>";        
                               }
                            }else{
                                 var difference = (parseFloat(dataarr[0][Measures[j]]) - parseFloat(priorArr[j]))
                                var percent = (difference/parseFloat(priorArr[j]))*100;
                                 
                                if(typeof dataarr[0][Measures[j]]!="undefined" && !isNaN(percent)  ){ 
                                htmlvar += "<h6 style='font-size:large'>"+numberFormat(dataarr[0][Measures[j]],chart[j])+" | (prior) </h6>";
                            htmlvar += "<h6 style='font-size:large'>"+percent.toFixed(1)+"% <i style='color:red' class='fa fa-arrow-down' aria-hidden='true'></i>  from last year  </h6>";     
                                }else{ 
                                htmlvar += "<h6 style='font-size:large'>0 | (prior) </h6>";
                            htmlvar += "<h6 style='font-size:large'>0% <i style='color:red' class='fa fa-arrow-down' aria-hidden='true'></i>  from last year  </h6>";     
                                }
                            
                            }       
                                }else{
                             if(priorArr[j]>parseFloat(dataarr[0][Measures[j]])){
                                var difference = (parseFloat(priorArr[j]) - parseFloat(dataarr[0][Measures[j]]))
                                var percent = (difference/parseFloat(priorArr[j]))*100;
                                 if(typeof dataarr[0][Measures[j]]!="undefined" && !isNaN(percent)  ){ 
                            htmlvar += "<h6 style='font-size:large'>"+numberFormat(dataarr[0][Measures[j]],chart[j])+" | (prior)  </h6>"; 
                             htmlvar += "<h6 style='font-size:large'>"+percent.toFixed(1)+"% <i style='color:red' class='fa fa-arrow-up' aria-hidden='true'></i>  from last year  </h6>"; 
                                 }else{
                                 htmlvar += "<h6 style='font-size:large'>0 | (prior)  </h6>"; 
                             htmlvar += "<h6 style='font-size:large'>0% <i style='color:red' class='fa fa-arrow-up' aria-hidden='true'></i>  from last year  </h6>";      
                                 }
                            }else{
                                 var difference = (parseFloat(dataarr[0][Measures[j]]) - parseFloat(priorArr[j]))
                                var percent = (difference/parseFloat(priorArr[j]))*100;
                                if(typeof dataarr[0][Measures[j]]!="undefined" && !isNaN(percent)  ){ 
                            htmlvar += "<h6 style='font-size:large'>"+numberFormat(dataarr[0][Measures[j]],chart[j])+" | (prior) </h6>";     
                            htmlvar += "<h6 style='font-size:large'>"+percent.toFixed(1)+"% <i style='color:#009900' class='fa fa-arrow-down' aria-hidden='true'></i>  from last year  </h6>"; 
                                }else{
                            htmlvar += "<h6 style='font-size:large'>0 | (prior) </h6>";     
                            htmlvar += "<h6 style='font-size:large'>0% <i style='color:#009900' class='fa fa-arrow-down' aria-hidden='true'></i>  from last year  </h6>";         
                                }
                            }           
                                }
                            
                              
                           }
                           $("#"+chart[j]).append(htmlvar);
                           }
//                         alert(JSON.stringify(dataarr[0][]));
            
                       }    

                    },
                    error: function (e) {
                        console.log('Error: ' + JSON.stringify(e));
                    }
                });
                
          }
    
    function IndiaMap(ctxPath,filtersMapArr,measures){
     
        var column = ["State"]
         $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getMapData",
                    data: "column=" + encodeURIComponent(column)+ "&filters=" +encodeURIComponent(filtersMapArr)+ "&measures=" +encodeURIComponent(measures[0])  ,
                    success: function (response) {
                        var data = JSON.parse(response);
                        var columns=["State"]
//                        var measures = ["Sales","Profit","Volume","Discount"];
                        var chart5Width = $("#chart5").width();
                        var chart5Height = $("#chart5").height();
                       indiaMapColored("chart5", data, columns, measures, chart5Width, chart5Height) 
//                       buildWorldCityMap("chart5", data, columns, measures, chart5Width, chart5Height) 
                        
                    }
                })
    }
    
    function topProduct(ctxPath,filtersMapArr,properties,measures){
        var color = d3.scale.category20b();
        var column = ["Product_Name"];
        
        
          $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getProductData",
                    data: "column=" + encodeURIComponent(column)+ "&filters=" +encodeURIComponent(filtersMapArr)+"&properties="+encodeURIComponent(properties)+"&measures="+encodeURIComponent(measures[0])  ,
                    success: function (response) {
                        var data = JSON.parse(response);
                        var columns=["Product_Name"]
//                        var measures = ["Sales","Profit","Volume","Discount"];
                        var chart6Width = $("#chart6").width();
                        var chart6Height = $("#chart6").height();
                      
//                       indiaMapColored("chart6", data, columns, measures, chart5Width, chart5Height) 
                        horizontalBar("chart6", data, columns, measures, chart6Width, chart6Height,color)
                    }
                })
    }
    function bottomProduct(ctxPath,filtersMapArr,properties,measures){
        var color = d3.scale.category20b();
        var column = ["Category"];
          $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getProductData",
                    data: "column=" + encodeURIComponent(column)+ "&filters=" +encodeURIComponent(filtersMapArr)+"&properties="+encodeURIComponent(properties)+"&measures="+encodeURIComponent(measures[0])  ,
                    success: function (response) {
                        var data = JSON.parse(response);
                        var columns=["Category"]
//                        var measures = ["Sales","Profit","Volume","Discount"];
                        var chart7Width = $("#chart7").width();
                        var chart7Height = $("#chart7").height();
                        
//                       indiaMapColored("chart6", data, columns, measures, chart5Width, chart5Height) 
                      horizontalBar("chart7", data, columns, measures, chart7Width, chart7Height)
                    }
                })
    }
    
   function numberFormat(value,div){
       var num = parseFloat(value);
       var doubleVal = parseFloat(value);
       var precision = 2;
       var check = "0.";
       for(var i=0;i<precision;i++){
        check += "0";
    }
    
    var temp = "";
     if(setFormat(doubleVal,precision) ==check){
            temp=value;
        }else{
            temp = setFormat(doubleVal,precision);
        } 
        
       if(parseFloat(temp)>=10000000000){
           doubleVal = (num / getPowerOfTen(9));
           if(setFormat(doubleVal,precision) ==check){
            temp=addCommas(value)+ " B";    
           }
           else{
                    temp = addCommas(setFormat(doubleVal,precision))+ " B";
                }
       }
       else if(parseFloat(temp)>=100000000){
            doubleVal = (num / getPowerOfTen(7));
             if(setFormat(doubleVal,precision) ==check){
                temp=addCommas(value)+ " Crs";
            }else{
                    temp = addCommas(setFormat(doubleVal,precision))+ " Crs";
                }
       }
       else if(parseFloat(temp)>=1000000){
            doubleVal = (num / getPowerOfTen(6));
             if(setFormat(doubleVal,precision) ==check){
                temp=addCommas(value)+ " M";
            }else{
                    temp = addCommas(setFormat(doubleVal,precision))+ " M";
                }
       }
       else if(parseFloat(temp)>=1000000){
            doubleVal = (num / getPowerOfTen(5));
             if(setFormat(doubleVal,precision) ==check){
                temp=addCommas(value)+ " Lakhs";
            }else{
                    temp = addCommas(setFormat(doubleVal,precision))+ " Lakhs";
                }
       }
       else if(parseFloat(temp)>=10000){
            doubleVal = (num / getPowerOfTen(3));
             if(setFormat(doubleVal,precision) ==check){
                temp=addCommas(value)+ " K";
            }else{
                    temp = addCommas(setFormat(doubleVal,precision))+ " K";
                }
       }
       
       return temp;
   }
function getPowerOfTen(num){
    var bd = 1;
    for (var i = 0; i <
        parseFloat(num); i++) {
        bd = bd * 10;
    }
    return bd;
}
function setFormat(value,prcesion){
    var precison = parseFloat(prcesion);
    var number = parseFloat(value);
    var finalValue = ""
    if(precison==0){
        finalValue =  Math.round(number);
    }else if(precison==1){
        finalValue = (Math.round(number*10))/10;
    }else if(precison==2){
        finalValue = (Math.round(number*100))/100;
    }else if(precison==3){
        finalValue = (Math.round(number*1000))/1000;
    }else if(precison==4){
        finalValue = (Math.round(number*10000))/10000;
    }
    
    if(precison==1){
        if(typeof finalValue.toString().split(".")[1]==='undefined'){
            finalValue+='.0';
        }  
        }
    else if(precison==2){
        try{
            if(finalValue.toString().split(".")[1].length<2){
                finalValue+='0';
    }
        }
        catch(e){
            finalValue+='.00';
        }
    }
    
    return finalValue;
}


//function buildWorldCityMap(divID, data, columns, measureArray){
//    $("#viewMeasureBlock").css({'display':'none'});
//
//        var chartMapData = data;
////    var color = d3.scale.category12();
//   // add gradient
//    var color;
//   var measure= measureArray[0];
////        var isShadedColor=true;
//        //    $("#gradShade").val(color);
//        //    shadingType="gradient";
//        //    $("#shadeType").val(shadingType);
////        $("#isShaded").val("true");
////        $("#shadeType").val("gradient");
////      
//        var colorMap={};
////        colorMap[measure]=color;
////        colorMap["measure"]=measure;
////        parent.$("#measureColor").val(JSON.stringify(colorMap));
//
// var isShaded = parent.$("#isShaded").val();
//       var shadeType =  parent.$("#shadeType").val();
//      
//       if(typeof shadeType =="undefined" || shadeType == "" ){
//            color="#188adb";
//        $("#isShaded").val("true");
//        $("#shadeType").val("gradient");
//        colorMap[measure]=color;
//        colorMap["measure"]=measure;
//        parent.$("#measureColor").val(JSON.stringify(colorMap));    
//       
//       }else {
//            color = d3.scale.category12();
//       }
//var shadingMeasure = "";
//            var conditionalMeasure = "";
//            var conditionalMap = {};
////            var isShadedColor = false;
//            var conditionalShading = false;
//             if (parent.$("#isShaded").val() == "true" ) {
//                    if (parent.$("#shadeType").val() == "conditional") {
//                        conditionalShading = true;
//                        conditionalMap = JSON.parse(parent.$("#conditionalMap").val());
////                        conditionalMeasure = conditionalMap["measure"];
//                        conditionalMeasure = $("#conditionalMeasure").val();
//                    } else if (parent.$("#shadeType").val() == "standard") {
//
//                    } else {
//                        var map = JSON.parse(parent.$("#measureColor").val());
//                        shadingMeasure = map["measure"];
//                       
//                        isShadedColor = true;
//                        var measureData = [];
//                        for (var i = 0; i < chartMapData.length; i++) {
//                            measureData.push(chartMapData[i][shadingMeasure]);
//                        }
//                        color = d3.scale.linear()
//                                .domain([0, Math.max.apply(Math, measureData)])
//                                .range(["rgb(221,221,221)", map[map["measure"]]]);
//                    }
//                } else {
//                    if (parent.isCustomColors) {
//                        color = d3.scale.ordinal().range(parent.customColorList);
//                    }
//                }
//    var maxMap = {};
//    var minMap = {};
//    for (var num = 0; num < measureArray.length; num++) {
//        var measureData = [];
//        for (var key in chartMapData) {
//            measureData.push(chartMapData[key][measureArray[num]]);
//        }
//        maxMap[measureArray[num]] = Math.max.apply(Math, measureData);
//        minMap[measureArray[num]] = Math.min.apply(Math, measureData);
//    }
//    parent.$("#maxMap").val(JSON.stringify(maxMap));
//    parent.$("#minMap").val(JSON.stringify(minMap));
//    
//    function show_details(d) {
//        var content;
//        var count = 0;
//        for (var j = 0; j < chartMapData.length; j++) {
//            content = "<span class=\"name\">" + columns[0] + ": </span><span class=\"value\"> " + d.properties.name + "</span><br/>";
//            if (chartMapData[j][columns[0]].toLowerCase() === (d.properties.name).toLowerCase()) {
//                content += "<span class=\"name\">" + measureArray[0] + ": </span><span class=\"value\"> " + addCommas(numberFormat(chartMapData[j][measureArray[0]],yAxisFormat,yAxisRounding,"chart1")) + "</span><br/>";
//                count++;
//                return tooltip.showTooltip(content, d3.event);
//            }
//            else if (isShortForm(d, chartMapData[j][columns[0]])) {
//                content += "<span class=\"name\">" + measureArray[0] + ": </span><span class=\"value\"> " + addCommas(numberFormat(chartMapData[j][measureArray[0]],yAxisFormat,yAxisRounding,"chart1")) + "</span><br/>";
//                count++;
//                return tooltip.showTooltip(content, d3.event);
//            }
//        }
//        if (count === 0) {
//            content = "<span class=\"name\">" + columns[0] + ": </span><span class=\"value\"> " + d.properties.name + "</span><br/>";
//            content += "<span class=\"name\">" + measureArray[0] + ": </span><span class=\"value\">  --</span><br/>";
//            return tooltip.showTooltip(content, d3.event);
//        }
//
//    }
//    function hide_details() {
//        return tooltip.hideTooltip();
//    }
//    
//    var width = $(window).width()-170;
//    var height = $(window).height();
//    var projection = d3.geo.mercator()
//    //            .center([-20, 60])
//     .scale(750).translate([width/2.5, height/1.8]);
//    var path = d3.geo.path()
//    .projection(projection);
//
//    var svg = d3.select("#"+divID)
//    .append("svg")
//    .attr("width", width)
//    .attr("height", height);
//    
//    var g = svg.append("g");
//    
//    var colorMap = {};
//    var ctxPath=$("#ctxpath").val();
//    
//   d3.json("resources/JS/us-States.json", function(error, us) {
//        g.selectAll("path")
//        .data(us.features)
//        .enter().append("path")
//        .attr("d", path)
//        .attr("fill", function(d, i) {
//            var colorShad = "#f2f2f2";
//            return colorShad;
//        })
//        .attr("stroke", "#000")
//        .on("mouseover", function(d, i) {  
//            for (var k = 0; k < data.length; k++) {
//                show_detailsUS(d);
//            }
//        })
//        .on("mouseout", function(d, i) {
//            hide_details(d, i, this);
//        });
//    });
//        
//    setTimeout(function(){
//        d3.json("resources/JS/WorldCities.json", function(error, world) {
//        g.selectAll("circle")
//        .data(world)
//        .enter()
////        .append("a")
////        .attr("xlink:href", function(d) {
////            return "https://www.google.com/search?q="+data[columns[0]];
////        }
////        )
//        .append("circle")
//        .attr("cx", function(d) {
////            alert(JSON.stringify(d))
//            return projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])[0];
//    })
//        .attr("cy", function(d) {
//            return projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])[1];
//        })
//        .attr("r", function(d,i){
//            for (var l2 = 0; l2 < chartMapData.length; l2++) {
////                alert(JSON.stringify(chartMapData))
//                       if (typeof (d.properties.name) != "undefined" && chartMapData[l2][columns[0]].toLowerCase() == d.properties.name.toLowerCase()) {
//                     return 6;
//                        }
//                    }
//                    return 0;
//        })
//        .style("fill", function(d,i){
//             for (var j = 0; j < chartMapData.length; j++) {
//                            var colorShad;
//                            if (chartMapData[j][columns[0]].toLowerCase() === (d.properties.name).toLowerCase()) {
//                                if (isShadedColor) {
//                                    var map = JSON.parse(parent.$("#measureColor").val());
//                                            shadingMeasure = map["measure"];
//                                    colorShad = color(chartMapData[j][shadingMeasure]);
//                                    return colorShad;
//                                } else if (conditionalShading) {
//                                    return getConditionalColor(color(j), chartMapData[j][conditionalMeasure]);
//                                } else {
//                                    colorShad = color(j);
//                                    colorMap[j] = chartMapData[j][columns[0]] + "__" + colorShad;
//                                    return colorShad;
//                                }
//                            }
//                            else if (isShortForm(d, chartMapData[j][columns[0]])) {
//                                if (isShadedColor) {
//                                    colorShad = color(chartMapData[j][shadingMeasure]);
//                                    return colorShad;
//                                } else if (conditionalShading) {
//                                    return getConditionalColor(color(j), chartMapData[j][conditionalMeasure]);
//                                } else {
//                                    colorShad = color(j);
//                                    colorMap[j] = chartMapData[j][columns[0]] + "__" + colorShad;
//                                    return colorShad;
//                                }
//                            }
//                        }
//                        return "white";
//        }).on("mouseover", function(d, i) {
//                show_details(d);
//            })
//                    .on("mouseout", function(d, i) {
//                        hide_details(d, i, this);
//                    });
//        
//         
//           var html = "<div id='legendsScale' class='legend2' style='float:left;align:rigth;overflow: visible;margin-top:-41%;margin-left:87%;'></div>";
//                    $('#'+divID).append(html);
//                    
////                    html += "<div id='legends' class='legend1' style='float:left;align:rigth;overflow: visible;margin-top:30%;margin-left:-50%;'></div>";
////                    $('body').append(html);
//                    var svg1 = d3.select("#legendsScale").append("svg")
//                            .attr("width", "100%")
//                            .attr("height", "100%");
//                            
//                    if (parent.$("#shadeType").val() == "conditional") {
//                        conditionalMap = JSON.parse(parent.$("#conditionalMap").val());
////                        var selectedMeasure = conditionalMap["measure"];
//                        var selectedMeasure = $("#conditionalMeasure").val();
//                        var keys = Object.keys(conditionalMap);
//                        svg1.append("g").append("text").attr("x", 0)
//                                .attr("y", 9)
//                                .attr("dy", ".35em").text(selectedMeasure);
////                        for (var no = 0; no < (keys.length - 1); no++) {
//                        for (var no = 0; no < (keys.length ); no++) {
//                            var legend = svg1.append("g")
//                                    .attr("transform", function() {
//                                        return "translate(10," + ((no * 20) + 20) + ")";
//                                    });
//                            legend.append("rect")
//                                    .attr("width", 24)
//                                    .attr("height", 14)
//                                    .attr("cy", 9)
//                                    .attr("stroke", "black")
//                                    .attr("stroke-width", ".5")
//                                    .style("fill", conditionalMap[no]["color"]);
////                                        .attr("r", 5);
//                            legend.append("text")
//                                    .attr("x", 28)
//                                    .attr("y", 9)
//                                    .attr("dy", ".35em")
//                                    .text(function() {
//                                        if (conditionalMap[no]["operator"] === "<>") {
//                                            return conditionalMap[no]["limit1"] + conditionalMap[no]["operator"] + conditionalMap[no]["limit2"];
//                                        } else {
//                                            return conditionalMap[no]["operator"] + conditionalMap[no]["limit1"];
//                                        }
//                                    });
////                                        .attr("fill", conditionalMap[no]["color"]);
//                        }
//                        $("#legendsScale").css("width", 500 * .15);
////                            $("#legends").css("margin", "3% 84% auto");
//                    } else  {
//                        var colorMap = JSON.parse(parent.$("#measureColor").val());
//                        var height = $("#legendsScale").height() - 10;
//                        var shadingMeasure = colorMap["measure"];
//                     
//                        var max = maximumValue(chartMapData, shadingMeasure);
//                        var min = minimumValue(chartMapData, shadingMeasure);
//                       
//                        var gradient = svg1.append("svg:defs")
//                                .append("svg:linearGradient")
//                                .attr("id", "gradientWrdMapLegend1")
//                                .attr("x1", "0%")
//                                .attr("y1", "30%")
//                                .attr("x2", "50%")
//                                .attr("y2", "30%")
//                                .attr("spreadMethod", "pad")
//                                .attr("gradientTransform", "rotate(90)");
//
//                        gradient.append("svg:stop")
//                                .attr("offset", "0%")
//                                .attr("stop-color", colorMap[shadingMeasure])
//                                .attr("stop-opacity", 1);
//                        gradient.append("svg:stop")
//                                .attr("offset", "100%")
//                                .attr("stop-color", "rgb(230,230,230)")
//                                .attr("stop-opacity", 1);
//
//                        svg1.append("g").append("text").attr("x", 0)
//                                .attr("y", 9)
//                                .attr("dy", ".35em").text(shadingMeasure);
//                        svg1.append("g").append("rect")
//                                .attr("width", 10)
//                                .attr("height", "90%")
//                                .attr("fill", "url(#gradientWrdMapLegend1)")
//                                .attr("x", 0)
//                                .attr("y", 15);
//                        svg1.append("g").append("text").attr("x", 10)
//                                .attr("y", height)
//                                .attr("dy", ".35em").text(addCommas(min));
//                        svg1.append("g").append("text").attr("x", 10)
//                                .attr("y", 25)
//                                .attr("dy", ".35em").text(addCommas(max));
//
//
//                        $("#legendsScale").css("width", "14%");
//                    } 
//        
//       });
//    },2000);
//         
//
//    var zoom = d3.behavior.zoom()
//    .on("zoom", function() {
//        g.attr("transform", "translate(" +
//            d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
//        g.selectAll("path")
//        .attr("d", path.projection(projection));
//    });
//    svg.call(zoom);
//    d3.select(self.frameElement).style("height", height + "px");
//}



function buildWorldCityMap(div,data1,columns,measureArray,divWid,divHgt){
$("#"+div).html("");
      //      added by shivam
            d3.selection.prototype.dblTap = function(callback) {
      var last = 0;
      return this.each(function() {
        d3.select(this).on("touchstart", function(e) {
            if ((d3.event.timeStamp - last) < 500) {
//                alert("touchstart id: "+this.id)
              return callback(e,this.id);
            }
//            alert("touchstart1111 id: "+this.id)
            last = d3.event.timeStamp;
        });
      });
    }

// var fun = "drillWithinchart(this.id,\"chart1\")";
  //Added by shivam
	var fun="";
	hasTouch = /android|iphone|ipad/i.test(navigator.userAgent.toLowerCase());
	if(hasTouch){
		fun="";
        }
	else{
            fun = "drillWithinchart(this.id,\"chart1\")";
	}
        function drillFunct(id1){
//            alert("hello");
            drillWithinchart(id1,chart1);
	}

//  var data1 = [];
//  data1 = data["chart1"];
     var color = d3.scale.category12();
var chart12 = data1;
var chartMapData = data1;
//var chartData = JSON.parse(parent.$("#chartData").val());
//columns = chartData["chart1"]["viewBys"];
mapColumns = columns;
measureArray = measureArray;
//var colIds = chartData["chart1"]["viewIds"];
if(screen.width<1000){
var w = divWid*2;}
else{
   w = divWid;
}
var h = 550;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale


var map = d3.select("#"+div).append("svg:svg")
.attr("width", w)
.attr("height", h)
.style("margin-top","15px")
// .call(d3.behavior.zoom().on("zoom", redraw))
.call(initialize);
var indiaPlaces = map.append("svg:svg")
    .attr("id", "indiap");
var india = map.append("svg:g")
.attr("id", "india");
d3.json("resources/JS/coordinate.json", function(error, data) {

 try{
   drawStates1()
 }
  catch(e){}


 drawIndiaPlaces1(data);

  });

function initialize() {
    if(screen.width<1000)
    {
        proj.scale(3500);
proj.translate([-680, 400]);
    }
    else{
proj.scale(5000);
proj.translate([-900, 580]);
}

}

function drawStates1() {
        var str="features";
        d3.json("resources/JSON/states-tel.json", function (json) {
        indiaPlaces.selectAll("path")
       
.data(json.features)
.enter()
.append("path")
.attr("d", path)

.attr("fill", function(d,i){

return "white";
})
.attr("id",function(d,i){
        var currName = (d.id).toUpperCase();
for (var l = 0; l < chartMapData.length; l++) {
if (currName.toLowerCase() == chartMapData[l][mapColumns[0]].toLowerCase()) {
    return chartMapData[l][mapColumns[0]]+":"+chartMapData[l][mapColumns[0]];
}
}
return "";
})

//Added by shivam
	.dblTap(function(e,id) {
		drillFunct(id);
 });

 });

 }

function donothing(){}

function drawIndiaPlaces1(data) {
      subData=data;
        var min1=[];
//alert(donothing())
        for(var key in data1) {

            min1.push(data1[key][measureArray[0]]);
        }

        var minRange=1;
        if(data1.length==1){
            minRange=12;
        }
        var pointsize = d3.scale.linear()
        .domain([Math.min.apply(Math, min1),Math.max.apply(Math, min1)])
        .range([minRange,10]);
//        var fun = "drillWithinchart(this.id,\"chart1\")";

    //Added by shivam
	var fun="";
	hasTouch = /android|iphone|ipad/i.test(navigator.userAgent.toLowerCase());
	if(hasTouch){
		fun="";
        }
	else{
            fun = "drillWithinchart(this.id,\"chart1\")";
	}
	function drillFunct(id1){
//            alert("hi")
            drillWithinchart(id1,chart1);
	}


        var str="features";
        india.selectAll("path.place")
        .data(data)
        .enter().append("path")
        .attr("d", path.pointRadius(function(d,i) {
            var c1=(d.properties.name);

            for(var l=0;l<data1.length;l++){

                if(typeof c1!="undefined" && data1[l][mapColumns[0]].toLowerCase()==c1.toLowerCase()){

                    return (pointsize(data1[l][measureArray[0]]));
                }
            }
            return 0;
        }))


//                if(typeof c1!="undefined" &&  data1[l][mapColumns[0]].toLowerCase()==c1.toLowerCase()){
//
//                    return "place";
//                }
//            }
//            return "place1";
//        })
        .attr("id", function(d,j) {
            var c1=(d.properties.name);
            for(var l=0;l<data1.length;l++){
                if(typeof c1!="undefined" &&  data1[l][mapColumns[0]].toLowerCase()==c1.toLowerCase()){
                    return data1[l][mapColumns[0]];
                }
            }
            return c1;
        })
        .on("click",function(d,i){
              
             drillCharts(this.id,columns[0])
           })
        .attr("fill", function(d,i){


var currName = (d["properties"]["name"]);


var colorShad;
var drilledvalue;

                try {
                    drilledvalue = JSON.parse(parent.$("#drills").val())[colIds[0]];
                } catch (e) {
                }

 if (typeof drilledvalue !== 'undefined' && drilledvalue.length > 0 && currName ==drilledvalue) {
                    colorShad = drillShade;
                } else {
                  for (var l = 0; l < data1.length; l++) {

           //     alert(""+data1[l][mapColumns[0]])
if (currName.toLowerCase() == data1[l][mapColumns[0]].toLowerCase()) {
//     colorShad = color(i);

     return color(i);
}else{
    colorShad = "white";
}
}
   }


return colorShad;
})
       
//Added by shivam
//	.dblTap(function(e,id) {
//		drillFunct(id);
//	})
//        .attr("fill",function(d){
//            return "lightgrey";
//        })sss
//        .style("opacity",".7")
      .on("mouseover", function(d, i) {
             var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    selectedBar.style("fill", function(){
                        if(typeof highlightColor!="undefined"){
                          return highlightColor;
                        }else{
                         return "#ccff00";  
                        }
                    }); 
                    
                    var content = ""
                    content +="<div style='width:100%;height:90%'>";
                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+columns[0]+":"+d.properties.name+"</span><br>";
                    for(var q in data1 ){
                        if(d.properties.name.toString().toUpperCase()==data1[q][columns[0]].toString().toUpperCase()){
                      content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measureArray[0]+" : "+data1[q][measureArray[0]]+"</span>";      
                        }
                    }
//                    content +="<span style=\"color:whitesmoke;font-family:helvetica;\" class=\"name\"> "+measures[0]+" : "+d[measures[0]]+"</span>";
                    content +="</div>";
                    content +="<div style='width:100%;height:10%'>"
//                    content +="<img style='float:right;width:30%;height:10%' src='diwali/diya1.gif'>";
                    content +="</div>";
                    return tooltip.showTooltip(content, d3.event);
          })
        .on("mouseout", function(d, i) {
            var bar = d3.select(this);
                    var indexValue = bar.attr("index_value");
                    var barSelector = "." + "bars-Bubble-" + indexValue+div;
                    var selectedBar = d3.selectAll(barSelector);
                    var colorValue = selectedBar.attr("color_value");
                    selectedBar.style("fill", colorValue);
                     return tooltip.hideTooltip();
                    
        }) 
       
//Added by shivam
	

}
}

function buildIndiaCityMapChart(ctxPath,drill,measures){
    var column = ["City"]
         $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getMapData",
                    data: "column=" + encodeURIComponent(column)+ "&filters=" +encodeURIComponent(drill)  ,
                    success: function (response) {
                        var data = JSON.parse(response);
//                        alert(JSON.stringify(data))
                        var columns=["City"]
//                        var measures = ["Sales","Profit","Volume","Discount"];
                        var chart5Width = $("#chart5").width();
                        var chart5Height = $("#chart5").height();
//                       indiaMapColored("chart5", data, columns, measures, chart5Width, chart5Height) 
                       buildWorldCityMap("chart5", data, columns, measures, chart5Width, chart5Height) 
                        
                    }
                })
}