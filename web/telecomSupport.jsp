<%-- 
    Document   : main
    Created on : Dec 9, 2016, 10:19:00 AM
    Author     : harshvardhan.solanki
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <link href="resources/materialize/css/materialize.css" rel="stylesheet">
         <link href="resources/css/c3.css" rel="stylesheet" type="text/css">
         <link href="resources/css/tooltip.css" rel="stylesheet">
         <link href="resources/css/custom.css" rel="stylesheet">
         <link type="text/css" rel="stylesheet" href="resources/css/zcolorbrewer.css"/>
        <title>Dashboards</title>
    </head>
    <body>  
        <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  Telecommunication support dashboard </h4>
        </header>
        <div class="container">
          <div class="row">
      <div class="col s12 m12">
        <div class="card-panel ">
          <div><h5> Month wise sales </h5></div>
            <div id="chart1"></div>
          
        </div>
      </div>
    </div>   
          <div class="row">
      <div class="col s12 m3">
        <div class="card-panel ">
        <div style="margin-top: 21%;margin-bottom:40% "><h5> plans </h5></div>     
         <div id="chart2"></div> 
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
             <div style="margin-bottom:20% "><h5> Percentage of plans </h5></div>
            <div id="chart3"></div>
          
        </div>
      </div>
      <div class="col s12 m6">
        <div class="card-panel ">
            <div><h5> ARPU by Plan </h5></div>
            <div id="chart4"></div>
          
        </div>
      </div>
    </div>   
          <div class="row">
      <div class="col s12 m6">
        <div class="card-panel ">
        <div><h5> Network Utilization </h5></div>     
         <div id="chart5"></div> 
          
        </div>
      </div>
      <div class="col s12 m6">
        <div class="card-panel ">
             <div><h5>Call Quality (Scale of 1-10)   </h5></div>
            <div id="chart6"></div>
          
        </div>
      </div>
     
    </div>   
        </div>
        <div class="tooltip  box20 " id="my_tooltip" style="display: none"></div>
    <script src="resources/JS/jquery.min.js"></script>
    <script src="resources/materialize/js/materialize.js"></script>  
    <!--<script src="resources/JS/d3.v4.min.js" charset="utf-8"></script>-->
    <script src="resources/JS/d3.v3.min.js" charset="utf-8"></script>
    <script src="resources/JS/c3.min.js"></script>
    <script type="text/javascript" src="resources/JS/customtooltip.js"></script>
    <script type="text/javascript" src="resources/JS/custom.js"></script>
    <script type="text/javascript" src="resources/JS/d3.geo.min.js"></script>
    <script type="text/javascript">
   
    var chart1Width = $("#chart1").width();
    var chart2Width = $("#chart2").width();
    var chart3Width = $("#chart3").width();
    var chart4Width = $("#chart4").width();
    var chart5Width = $("#chart5").width();
    var chart6Width = $("#chart6").width();
    var height = 270 
    var height1 = 600 
    $.getJSON("resources/data/telecomSupport/monthwisesales.json",function(data){
      var columns = ["Month"];  
      var measures = ["Sales"];  
    buildBarChart("chart1", data, columns, measures, chart1Width, height)
    })
    $.getJSON("resources/data/telecomSupport/percentageofplans.json",function(data){
      var columns = ["Plan"];  
      var measures = ["Usage"];  
    legends("chart2", data, columns, measures, chart2Width, height)
    })
    $.getJSON("resources/data/telecomSupport/percentageofplans.json",function(data){
      var columns = ["Plan"];  
      var measures = ["Usage"];  
    buildPieChart("chart3", data, columns, measures, chart3Width, height)
    })
    $.getJSON("resources/data/telecomSupport/ARPU.json",function(data){
      var columns = ["Plan"];  
      var measures = ["ARPU"];  
    buildBarChart("chart4", data, columns, measures, chart4Width, height)
    })
    $.getJSON("resources/data/telecomSupport/wealth.json",function(data){
      var columns = ["month"];  
      var measures = ["Utiization",];  
    indiaMap("chart5", data, columns, measures, chart5Width, height)
    })
    $.getJSON("resources/data/telecomSupport/networkUtilization.json",function(data){
      var columns = ["month"];  
      var measures = ["Utiization",];  
    multistackareachart("chart6", data, columns, measures, chart6Width, height1)
    })
    </script>
    </body>
</html>
