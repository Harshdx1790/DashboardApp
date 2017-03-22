<%-- 
    Document   : retailCXO
    Created on : Dec 28, 2016, 10:10:36 AM
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
          <h4>  Retail CXO dashboard </h4>
        </header>
        <div class="container">
            <div class="row">
             <div class="col s12 m7">
        <div class="card-panel ">
          <div><h5> Revenue vs Sales </h5></div>
         
            <div id="chart1"></div>
          
        </div>
      </div>   
             <div class="col s12 m5">
        <div class="card-panel ">
          <div><h5> Overview (Last 30 days) </h5></div>
         
            <div id="chart2"></div>
          
        </div>
      </div>   
             <div class="col s12 m6">
        <div class="card-panel ">
          <div><h5> Lead by lead source </h5></div>
         
            <div id="chart3"></div>
          
        </div>
      </div>   
             <div class="col s12 m6">
        <div class="card-panel ">
          <div><h5> Revenue generated by country </h5></div>
         
            <div id="chart4"></div>
          
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
     var chart4Width = $("#chart4").width(); 
     
     var height = 270 
     var height1 = 200 
     var height2 = 600 
     var color = d3.scale.category20c();
     
      $.getJSON("resources/data/retailCXO/revenuevssales.json",function(data){
      var columns = ["Time"];  
      var measures = ["Revenue","Sales"];  
    groupedChart("chart1", data, columns, measures, chart1Width, height1,color)
    })
    
    $.getJSON("resources/data/retailCXO/overview.json",function(data){
      var columns = ["Time"];  
      var measures = ["Postpaid","Prepaid"];
      bulletChart("chart2",data,columns,measures,chart2Width,height1,color);
  });
    $.getJSON("resources/data/retailCXO/LeadbyLeadSource.json",function(data){
    var columns = ["Time"];  
      var measures = ["Web","Radio","Print","Unknown"]; 
     
      buildMultiMeasureLine("chart3",data,columns,measures,chart3Width,height2,color);
  });
    $.getJSON("resources/data/retailCXO/RevenueByCountry.json",function(data){
    var columns = ["State"];  
      var measures = ["Web","Radio","Print","Unknown"]; 
     
       indiaMapColored("chart4", data, columns, measures, chart4Width, height)
  });
 
        
    </script>
    </body>
</html>
