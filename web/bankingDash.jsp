<%-- 
    Document   : cxoDash
    Created on : Jan 5, 2017, 10:27:56 AM
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
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <title>JSP Page</title>
    </head>
    <body>
         <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  Banking dashboard </h4>
        </header>
        <div class="container">
            <div id="kpiRow" class="row">
            
            </div>
            <div id="filters" class="row">
                    
            </div>    
            <div class="row">
                <div id="" align="center" class="row">
                    <h5>Average credit limit by State </h5>
            </div>
                <div class="col s12 m6">
                  <div class="card-panel ">
          <div><h6> Balance </h6></div>
         
            <div id="chart1"></div>
          
        </div>  
                </div> 
                <div class="col s12 m6">
                  <div class="card-panel ">
          <div><h6> Credit Limit </h6></div>
         
            <div id="chart2"></div>
          
        </div>  
                </div> 
                <div class="col s12 m6">
                  <div class="card-panel ">
          <div><h6> # of cards  </h6></div>
         
            <div id="chart3"></div>
          
        </div>  
                </div> 
                <div class="col s12 m6">
                  <div class="card-panel ">
          <div><h6> Utilization </h6></div>
         
            <div id="chart4"></div>
          
        </div>  
                </div> 
                 <div id="" align="center" class="row">
                    <h5>Average for State </h5>
            </div>
                <div class="col s12 m12">
                  <div class="card-panel ">
          
         
            <div style='overflow: auto;height:400px' id="chart5"></div>
          
        </div>  
                </div> 
              
            </div>
            
        </div>
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
        
        var ctxPath = '<%=request.getContextPath()%>'
        
        
        
     $.getJSON("resources/data/credit_card/credit_card.json",function(data){
//        var filteredData = data.filter(function(d,n){
//            return n.State
//        })
var htmlvar ="";
htmlvar +=' <div class="col s12 m3">'
htmlvar +='  <div class="input-field col s12">'
var columns = ["State"];
htmlvar +='   <select id="selectState" >'
 htmlvar +='  <option value="" disabled selected>select '+columns[0]+'</option>'
var filters = [];
for(var i in data){ 
    htmlvar +=' <option value="'+data[i][columns[0]]+'">'+data[i][columns[0]]+'</option>'
  filters.push(data[i][columns[0]])  
}
htmlvar +='   </select>'
htmlvar +='   </div>'
htmlvar +='   </div>'
htmlvar +='   <div style="margin-top:2%" class="col s12 m3">'
htmlvar +='   <button onclick="filterData()" >Done </button>'
htmlvar +='   </div>'

$("#filters").html(htmlvar)
$('select').material_select();
    }) 
    
        
//         <div class="col s12 m3">
//               <div class="input-field col s12">
//    <select multiple>
//      <option value="" disabled selected>Choose your option</option>
//      <option value="1">Option 1</option>
//      <option value="2">Option 2</option>
//      <option value="3">Option 3</option>
//    </select>
//    <label>Materialize Multiple Select</label>
//  </div> 
//            </div>
        
        
        
//         $.ajax({
//                type: "POST",
//                url: ctxPath + "/AdminSubmit.do",
//                data: "query=" +query ,
//                success: function (response) {
//                    alert(response)
////                    userListHtml(response)
//                },
//                error: function (e) {
//                    alert('Error: ' + JSON.stringify(e));
//                }
//            });
        
//        var measures = ["Overall Sales","Total Quantity","Overall Discount","Total Profit"];
//     getDataFun(measures,ctxPath)

$.getJSON("resources/data/credit_card/credit_card.json",function(data){
    var width = $("#chart1").width();
        var height = $("#chart1").height();
    var column = ["State"]
    var measures = ["Balance"]
    scatterplot("chart1",data,column,measures,width,height)
    var column = ["State"]
    var measures = ["Credit Limit"]
    scatterplot("chart2",data,column,measures,width,height)
    var column = ["State"]
    var measures = ["Number of Cards"]
    scatterplot("chart3",data,column,measures,width,height)
    var column = ["State"]
    var measures = ["Utilization"]
    scatterplot("chart4",data,column,measures,width,height)
})

$.getJSON("resources/data/credit_card/credit_card_table.json",function(data){
    var columns = ["State","Year"];
    var measures = ["Balance","Credit Limit","Number of Cards","Utilization","Rating"];
    var width1 = $("#chart5").width();
   var  height1 = $("#chart5").height();
    buildTable("chart5",data,columns,measures,width1,height1)
})
    
    
    function filterData(){
        var filter = $("#selectState").val();
        $.getJSON("resources/data/credit_card/credit_card.json",function(data){
       var filteredData =    data.filter(function(d,n){
          return d.State ===filter; 
        })  
        var column = ["State"]
    var measures = ["Balance"]
   var width = $("#chart1").width();
        var height = $("#chart1").height();
    scatterplot("chart1",filteredData,column,measures,width,height)
    var column = ["State"]
    var measures = ["Credit Limit"]
    scatterplot("chart2",filteredData,column,measures,width,height)
    var column = ["State"]
    var measures = ["Number of Cards"]
    scatterplot("chart3",filteredData,column,measures,width,height)
    var column = ["State"]
    var measures = ["Utilization"]
    scatterplot("chart4",filteredData,column,measures,width,height)
        });
  $.getJSON("resources/data/credit_card/credit_card_table.json",function(data){
    var filteredData =    data.filter(function(d,n){
          return d.State ===filter; 
        })
        var columns = ["State","Year"];
    var measures = ["Balance","Credit Limit","Number of Cards","Utilization","Rating"];
   var width1 = $("#chart5").width();
   var  height1 = $("#chart5").height();
   
    buildTable("chart5",filteredData,columns,measures,width1,height1)
  })      
        
    }
     
      </script>  
    </body>
</html>
