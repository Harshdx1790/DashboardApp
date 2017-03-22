<%-- 
    Document   : telecomOperation
    Created on : Dec 14, 2016, 2:57:39 PM
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
          <h4>  Telecommunication Operation  dashboard </h4>
        </header>
        <div class="container">
               <div class="row">
      <div class="col s12 m12">
        <div class="card-panel ">
          <div><h5> Call Center Hour per Hour </h5></div>
          <div>
              <a id="Agents" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn disabled">Agents</a>
              <a id="Calls" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">Calls</a>
              <a id="Answered" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">Answered</a>
              <a id="Abandoned" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">Abandoned</a>
<!--              <a id="ASA" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">ASA</a>
              <a id="LWC" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">LWC</a>
              <a id="GOS" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">GOS</a>-->
              <a id="AvgTalkDuration" onclick="changeDateHourMapData(this.id)" class="waves-effect waves-light btn">Avg Talk Duration</a>
          </div>
            <div id="chart1"></div>
          
        </div>
      </div>
    </div>  
<!--               <div class="row">
      <div class="col s12 m6">
        <div class="card-panel ">
          <div><h5> days </h5></div>
         <div id="chart2"></div>
          
        </div>
      </div>
      <div class="col s12 m6">
        <div class="card-panel ">
          <div><h5> days </h5></div>
         <div id="chart3"></div>
          
        </div>
      </div>
    </div>  -->
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
            var height = 570 
            var height1 = 270 
              var color = d3.scale.category20c();
              dayHourMap("chart1","Agents.json" , chart1Width, height,color)
              
          function changeDateHourMapData(id){ 
              $("#Agents").removeClass("disabled");
              $("#Calls").removeClass("disabled");
              $("#Answered").removeClass("disabled");
              $("#Abandoned").removeClass("disabled");
              $("#ASA").removeClass("disabled");
              $("#LWC").removeClass("disabled");
              $("#GOS").removeClass("disabled");
              $("#AvgTalkDuration").removeClass("disabled");
              $("#"+id).addClass("disabled");
              var json = id+".json"
             dayHourMap("chart1",json , chart1Width, height,color) 
          }
      $.getJSON("resources/data/telecomOperation/Agents.json",function(data){
      var columns = ["day"];  
      var measures = ["value"]; 
//   var data1=   $(data).filter(function(i,n){ 
//       return n.hour===1;
//      });
//      for(var k in data1){ 
//          alert(data1[k].day +"         "+data1[k].hour)
//      }
      var color = d3.scale.category11c();
      var value = 0;
      var day = 0;
      var array = [];
      for(var i in data){
      var map = {};
          if(i==0){
           day =  data[i]["day"];
           value = value + data[i]["value"]
          }
          else if(day == data[i]["day"]){
       value = value + data[i]["value"]   
          }else{
           map["day"] = day;   
           map["value"] = value; 
           day = data[i]["day"];
           array.push(map);
          }
      }
     
    buildPieChart("chart2", array, columns, measures, chart2Width, height1,color)
    })
    
    </script>
    </body>
</html>
