<%-- 
    Document   : telecomDistribution
    Created on : Dec 15, 2016, 2:53:58 PM
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
          <h4>  Telecommunication Distribution dashboard </h4>
        </header>
        <div class="container">
            <div class="row"><h5>Goal 1: Reduce Subscriber Acquisition Cost</h5></div>
               <div class="row">
      <div class="col s12 m3">
        <div class="card-panel ">
          <div><h5> SAC </h5></div>
         
            <div id="chart1"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
            <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> SAC by contract term <br> Monthly average </h6></div>
         
            <div id="chart2"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> Devices Sources  from <br> ODMs </h6></div>
         
            <div id="chart3"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> Service calls<br> During first three months </h6></div>
         
            <div id="chart4"></div>
          
        </div>
      </div>
    </div> 
             <div class="row"><h5>Goal 2:Increase Average Revenue per User</h5></div>
                 <div class="row">
      <div class="col s12 m3">
        <div class="card-panel ">
          <div><h5> ARPU </h5></div>
         
            <div id="chart5"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
           <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> ARPU <br> by Plan Type </h6></div>
         
            <div id="chart6"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
            <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> <span style="color:#eee">Voice,</span><span style='color:#ddd'> Data </span><span style='color:lightsteelblue'> and  Addons </span> <br> Total Subscribers (x1000's) </h6></div>
         
            <div id="chart7"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
            <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> <span style='color:#ddd'>Offers </span>  <span style='color:#000'>Accepts</span> <br> Smart connect plan upgrades(K) </h6></div>
         
            <div id="chart8"></div>
          
        </div>
      </div>
    </div> 
        <div class="row"><h5>Goal 3: Reduce Churn</h5></div>   
                       <div class="row">
      <div class="col s12 m3">
        <div class="card-panel ">
          <div><h5> CHURN </h5></div>
         
            <div id="chart9"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> Churn rate vs Competition <br> Monthly Average </h6></div>
         
            <div id="chart10"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">  Customer Support</h6></div>
         
            <div id="chart11"></div>
          
        </div>
      </div>
      <div class="col s12 m3">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;"> <span style='color:#ddd'>FY-2011 </span>  <span style='color:#000'>FY-2012</span> <br> Customer Satisfaction (% wise) </h6></div>
         
            <div id="chart12"></div>
          
        </div>
      </div>
    </div> 
        <div class='row' style='border-top:1px solid #eee'></div>
        <div class='row' style=''><h5>Executive Summary</h5></div>
        <div class='row' style=''>
           <div class="col s12 m4">
        <div class="card-panel ">
            <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Financial Summary </h6></div>
         <div id="chart13"></div>
          
        </div>
      </div> 
           <div class="col s12 m4">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Financial Summary </h6></div>
         
            <div id="chart14"></div>
          
        </div>
      </div> 
           <div class="col s12 m4">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Total Postpaid Subscribers </h6></div>
         
            <div id="chart15"></div>
          
        </div>
      </div> 
        </div>
        <div class='row' style=''>
           <div class="col s12 m4">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Net new Postpaid Subscribers </h6></div>
         
            <div id="chart16"></div>
          
        </div>
      </div> 
           <div class="col s12 m4">
        <div class="card-panel ">
          <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Total Prepaid Subscribers </h6></div>
         
            <div id="chart17"></div>
          
        </div>
      </div> 
           <div class="col s12 m4">
        <div class="card-panel ">
         <div style="text-align: right;color:#ff5050"><h6 style="font-weight: bold;">   Net new Prepaid Subscribers </h6></div>
         
            <div id="chart18"></div>
          
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
     var chart5Width = $("#chart5").width();
     var chart6Width = $("#chart6").width();
     var chart7Width = $("#chart7").width();
     var chart8Width = $("#chart8").width();
     var chart9Width = $("#chart9").width();
     var chart10Width = $("#chart10").width();
     var chart11Width = $("#chart11").width();
     var chart12Width = $("#chart12").width();
     var chart13Width = $("#chart13").width();
     var chart14Width = $("#chart14").width();
     var chart15Width = $("#chart15").width();
     var chart16Width = $("#chart16").width();
     var chart17Width = $("#chart17").width();
     var chart18Width = $("#chart18").width();
//     var height = 570 
     var height = 270 
     var color = d3.scale.category20c();
     
      $.getJSON("resources/data/telecomDistribution/SAC.json",function(data){
      var columns = ["Rupees"];  
      var measures = ["header","YTD"];
      customChart2("chart1",data,columns,measures,chart1Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/SACMonthlyAverage.json",function(data){
      var columns = ["Time"];  
      var measures = ["1Year","2Year","3Year"];
      buildMultiMeasureLine("chart2",data,columns,measures,chart2Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/ODM.json",function(data){
      var columns = ["Time"];  
      var measures = ["Value","Unit"];
      horizontalBar("chart3",data,columns,measures,chart3Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/serviceCalls.json",function(data){
      var columns = ["month"];  
      var measures = ["count"];
      
      horizontalStackedBar("chart4",data,columns,measures,chart4Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/ARPU.json",function(data){
      var columns = ["Rupees"];  
      var measures = ["header","YTD"];
      customChart2("chart5",data,columns,measures,chart5Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/ARFPUPlantype.json",function(data){
      var columns = ["Time"];  
      var measures = ["Postpaid","Prepaid"];
      buildMultiMeasureLine("chart6",data,columns,measures,chart6Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/subscribers.json",function(data){
      var columns = ["Time"];  
      var measures = ["Postpaid","Prepaid"];
      bulletChart("chart7",data,columns,measures,chart7Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/SmartPlan.json",function(data){
      var columns = ["Time"];  
      var measures = ["Postpaid","Prepaid"];
      bulletChart("chart8",data,columns,measures,chart7Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/Churn.json",function(data){
      var columns = ["Rupees"];  
      var measures = ["header","YTD"];
      customChart2("chart9",data,columns,measures,chart9Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/ChurnMonthlyAverage.json",function(data){
      var columns = ["Time"];  
      var measures = ["BTel","Roberts","Targus","CTT"];
      buildMultiMeasureLine("chart10",data,columns,measures,chart10Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/customerSupport.json",function(data){
      var columns = ["support"];  
      var measures = ["value"];
      customChart3("chart11",data,columns,measures,chart11Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/customersatisfaction.json",function(data){
      var columns = ["Time"];  
      var measures = ["value"];
      bulletChart("chart12",data,columns,measures,chart12Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/Excutivesummary.json",function(data){
      var columns = ["Summary"];  
      var measures = ["FY 2011","FY 2012"];
      buildTable("chart13",data,columns,measures,chart13Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/FinancialSummary.json",function(data){
      var columns = ["Time"];  
      var measures = ["Revenue","OPEX","EBIDTA"];
      buildMultiMeasureLine("chart14",data,columns,measures,chart14Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/TotalPostpaidSubscriber.json",function(data){
      var columns = ["Time"];  
      var measures = ["Sales"];
      buildMultiMeasureLine("chart15",data,columns,measures,chart15Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/NetNewPostpaidSubscriber.json",function(data){
      var columns = ["Time"];  
      var measures = ["Sales"];
      buildMultiMeasureLine("chart16",data,columns,measures,chart16Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/TotalPrepaidSubscriber.json",function(data){
      var columns = ["Time"];  
      var measures = ["Sales"];
      buildMultiMeasureLine("chart17",data,columns,measures,chart17Width,height,color);
  });
      $.getJSON("resources/data/telecomDistribution/NetNewPrepaidSubscriber.json",function(data){
      var columns = ["Time"];  
      var measures = ["Sales"];
      buildMultiMeasureLine("chart18",data,columns,measures,chart18Width,height,color);
  });
    </script>    
    </body>
</html>
