<%-- 
    Document   : telecomMarketing
    Created on : Dec 14, 2016, 10:26:59 AM
    Author     : harshvardhan.solanki
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Market Research</title>
         <link href="resources/materialize/css/materialize.css" rel="stylesheet">
         <link href="resources/css/c3.css" rel="stylesheet" type="text/css">
         <link href="resources/css/tooltip.css" rel="stylesheet">
         <link href="resources/css/custom.css" rel="stylesheet">
         <link type="text/css" rel="stylesheet" href="resources/css/zcolorbrewer.css"/>
    </head>
    <body>
        <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  Telecommunication Market Research dashboard </h4>
        </header>
        <div class="container">
             <div class="row">
      <div class="col s12 m12">
        <div class="card-panel ">
          <div><h5> SAT index by city </h5></div>
            <div id="chart1"></div>
          
        </div>
      </div>
    </div>   
             <div class="row">
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> Customer Duration </h5></div>
            <div id="chart2"></div>
          
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> Rewards Member </h5></div>
            <div id="chart3"></div>
          
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> Satisfaction index </h5></div>
            <div id="chart4"></div>
          
        </div>
      </div>
    </div>   
             <div class="row">
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> OSAT: Top 3 Box  </h5></div>
            <div id="chart5"></div>
          
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> OSAT: Top 2 Box </h5></div>
            <div id="chart6"></div>
          
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card-panel ">
          <div><h5> OSAT: Top Box </h5></div>
            <div id="chart7"></div>
          
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
    var chart7Width = $("#chart7").width();
    var height = 270 
    var height1 = 600 
    var color = d3.scale.category20c();
    $.getJSON("resources/data/telecomMarketResearch/SATIndexByCity.json",function(data){
      var columns = ["State"];  
      var measures = ["Overall Customer Satisfaction","At General Industry","General Industry Employee"];  
    groupedChart("chart1", data, columns, measures, chart1Width, height,color)
    })
     $.getJSON("resources/data/telecomMarketResearch/customerDuration.json",function(data){
      var columns = ["Customer Duration"];  
      var measures = ["Respondents"];  
    buildPieChart("chart2", data, columns, measures, chart2Width, height,color)
    })
     $.getJSON("resources/data/telecomMarketResearch/rewardMember.json",function(data){
      var columns = ["month"];  
      var measures = ["count"];  
      var legends = [{"legends":"promoter"},{"legends":"Passive"},{"legends":"Detractor"}]
    horizontalStackedBar("chart3", data, columns, measures, chart3Width, height,color,legends)
    })
     $.getJSON("resources/data/telecomMarketResearch/satisfactionIndex.json",function(data){
      var columns = ["Satisfaction"];  
      var measures = ["Index"];  
    buildBarChart("chart4", data, columns, measures, chart4Width, height)
    })
     $.getJSON("resources/data/telecomMarketResearch/topThreeBox.json",function(data){
       var columns = ["Satisfaction"];  
      var measures = ["Percent"];
    buildCustomChart("chart5", data,columns,measures,  chart5Width, height,color)
    })
     $.getJSON("resources/data/telecomMarketResearch/topTwoBox.json",function(data){
       var columns = ["Satisfaction"];  
      var measures = ["Percent"];
    buildCustomChart("chart6", data,columns,measures,  chart6Width, height,color)
    })
     $.getJSON("resources/data/telecomMarketResearch/TopBox.json",function(data){
       var columns = ["Satisfaction"];  
      var measures = ["Percent"];
    buildCustomChart("chart7", data,columns,measures,  chart7Width, height,color)
    })
        
       </script> 
    </body>
</html>
