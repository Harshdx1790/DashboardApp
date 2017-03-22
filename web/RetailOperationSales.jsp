<%-- 
    Document   : RetailOperationSales
    Created on : Dec 28, 2016, 12:20:45 PM
    Author     : harshvardhan.solanki
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="resources/materialize/css/materialize.css" rel="stylesheet">
         <link href="resources/css/c3.css" rel="stylesheet" type="text/css">
         <link href="resources/css/tooltip.css" rel="stylesheet">
         <link href="resources/css/custom.css" rel="stylesheet">
         <link type="text/css" rel="stylesheet" href="resources/css/zcolorbrewer.css"/>
    </head>
    <body>  
       <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  Retail Operational Dashboards </h4>
      </header>
        <div class="container">
            <div class="row">
             <div class="col s12 m12">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Retail Score Card </h6></div>
         
            <div style="height:335px;overflow:auto" id="chart1"></div>
          
        </div>
      </div> 
             <div class="col s12 m7">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Financial Summary </h6></div>
         
            <div id="chart2"></div>
          
        </div>
      </div> 
             <div class="col s12 m5">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Retail Score Card </h6></div>
         
            <div id="chart3"></div>
          
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
    <script type="text/javascript" src="resources/JS/custom.js"></script>
    <script type="text/javascript" src="resources/JS/bullet.js"></script>
    <script type="text/javascript">
     var chart1Width = $("#chart1").width();
     var chart2Width = $("#chart2").width();
     var chart3Width = $("#chart3").width(); 
     var height = 270 
     var color = d3.scale.category20c();
     
    $.getJSON("resources/data/retailOperation/retailScorecard.json",function(data){
      var columns = ["Region","State",];  
      var measures = ["Gross Sales","COGS","Gross Margin Amount","Net Sales"];
      
     buildTable("chart1",data,columns,measures,chart1Width,height,color);
  });
    $.getJSON("resources/data/retailOperation/FinancialSummary.json",function(data){
      var columns = ["Time"];  
      var measures = ["COGS 2014","COGS 2015"];
      buildMultiMeasureLine("chart2",data,columns,measures,chart2Width,height,color);
  });
    $.getJSON("resources/data/telecomDistribution/SAC.json",function(data){
      var columns = ["Rupees"];  
      var measures = ["header","YTD"];
      customChart2("chart3",data,columns,measures,chart3Width,height,color);
  });
    </script>
    </body>
</html>
