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
           <link href="resources/css/fontAwesome/css/font-awesome.min.css" rel="stylesheet">
           <link href="resources/css/noUiSlider/nouislider.css" rel="stylesheet">
        <title>CXO Dashboard</title>
    </head>
    <body>
<!--        <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  CXO dashboard </h4>
        </header>-->
        <nav>
            <div class="nav-wrapper" style="background-color: #455a64">
      <a href="#" class="brand-logo">CXO Dashboard</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
<!--        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>-->
      </ul>
    </div>
  </nav>
            <div style="margin-top: 1%" class="row">
                
                <div style="" class="col s10">
                    <div style="margin-top: 1%" class="row">  
                    <div style="height:200px; " class="col s12 m6 l3 ">
                        <div class="col s12" style="height: 15%;background-color:#0288d1 ;color:#fff"  > <h6 style="cursor: pointer" onclick="changeDashboardMeasure(this.id)" id="Sales">Sales</h6> </div>
                         
                        <div class="col s12" style="height: 85%;background-color: #fff;color:#455a64; box-shadow: 10px 10px 5px #888888;" id="chart1">
                           
                        </div>
                    </div> 
                    <div style="height:200px;" class="col s12 m6 l3">
                        <div class="col s12" style="height: 15%;background-color: #00bfa5;color:#fff" ><h6 style="cursor: pointer" onclick="changeDashboardMeasure(this.id)" id="Profit">Profit</h6></div>
                        <div class="col s12" style="height: 85%;background-color: #fff;color:#455a64; box-shadow: 10px 10px 5px #888888;" id="chart2">
                            
                        </div>
                    </div> 
                    <div style="height:200px;" class="col s12 m6 l3">
                        <div class="col s12" style="height: 15%;background-color: sandybrown;color:#000" ><h6 style="cursor: pointer" onclick="changeDashboardMeasure(this.id)" id="Quantity">Volume</h6></div>
                        <div class="col s12" style="height: 85%;background-color: #fff;color:#455a64; box-shadow: 10px 10px 5px #888888;" id="chart3">
                            
                        </div>  
                    </div> 
                    <div style="height:200px;" class="col s12 m6 l3">
                        <div class="col s12" style="height: 15%;background-color: #37474f;color:#fff" > <h6 style="cursor: pointer" onclick="changeDashboardMeasure(this.id)" id="Discount">Discount</h6></div>
                        <div class="col s12" style="height: 85%;background-color: #fff;color:#455a64; box-shadow: 10px 10px 5px #888888;" id="chart4">
                            
                        </div> 
                    </div> 
                        </div>
                    <div style="margin-top: 1%" class="row">
                    <div style="height:730px;" class="col s6">
                      <div class="col s12" style="height: 5%;background-color: #37474f;color:#fff" id="indiaMapTitle" > 
                      <div class="col s8">
                          <h6 >State Wise Sales</h6>
                      </div>
                      <div class="col s4">
                      <div class="col s1" style="float:right">
                        <i class="fa fa-undo" aria-hidden="true" style="font-size:20px;margin-top:5px" onclick="reset()"></i>
                      </div>
                      </div>
                      </div>
                        <div class="col s12" style="height: 95%;background-color: #263238;color:#fff" id="chart5">
                            
                        </div>  
                    </div> 
                    
                    <div style="height:730px;" class="col s6">
                      <div style="height:50%;" class="col s12">
                        <div class="col s12" style="height: 10%;background-color: #37474f;color:#fff" > 
                            <div id="productTitle" class="col s8">
                           <h6>Top products by sales</h6>
                       </div>
                            <div style="" id="icon" class="col s4">
                               <div  class="col s1" style="float:right">
                                   <input type="text" onkeyup="bottomProductData()" id="productRowValues" style="background-color: white;color: black;width: 29px;height: 24px;margin-top: 4px;">
                            </div>
                               <div style="cursor: pointer;float:right" onclick="topProductData()"  class="col s2">
                            <i class="fa fa-sort-amount-asc" style="font-size:20px;margin-top:5px" aria-hidden="true"></i>
                            </div>
                               <div style="cursor: pointer;float:right" onclick="bottomProductData()" class="col s2" >
                           <i class="fa fa-sort-amount-desc"  style="font-size:20px;margin-top:5px" aria-hidden="true"></i>
                            </div>
                 
                           
                       </div>
                       </div>
                          
                        <div class="col s12" style="height: 80%;background-color: #263238;color:#fff" id="chart6">
                            
                        </div>   
                    </div> 
                    <div style="height:50%;" class="col s12">
                       <div class="col s12" style="height: 10%;background-color: #37474f;color:#fff" >
                           <div id="CategoryTitle" class="col s8">
                           <h6>Top Category by sales</h6>
                       </div>
                           <div style="" id="icon" class="col s4">
                               <div  class="col s1" style="float:right">
                                   <input type="text" onkeyup="bottomCategoryData()" id="categoryRowValues" style="background-color: white;color: black;width: 29px;height: 24px;margin-top: 4px;">
                            </div>
                               <div style="cursor: pointer;float:right" onclick="topCategoryData()"  class="col s2">
                            <i class="fa fa-sort-amount-asc" style="font-size:20px;margin-top:5px" aria-hidden="true"></i>
                            </div>
                               <div style="cursor: pointer;float:right" onclick="bottomCategoryData()" class="col s2" >
                           <i class="fa fa-sort-amount-desc"  style="font-size:20px;margin-top:5px" aria-hidden="true"></i>
                            </div>
                 
                           
                       </div>
                       </div>
                        <div class="col s12" style="height: 90%;background-color: #263238;color:#fff" id="chart7">
                            
                        </div>    
                    </div> 
                    </div> 
                    </div>
                </div> 
                <div style="" class="col s2">
                     <div align="center" style="height:70px;margin-top: 10%" class="col s12">
                         
                         <div id="rangeBar" style="" class="col s12">

                         </div>
                         <div class="col s6">
                             <input type="text" id="date1" style="display: none">
                         </div>
                         <div class="col s6">
                          <input type="text" id="date2" style="display: none">
                         </div>
                        
                       
<!--                     <div class="switch">
                    <label>
                    2014
                    <input type="checkbox">
                    <span class="lever"></span>
                    2013
                    </label>
                     </div>-->
                       
    

                     </div>
                   <div class="col s12" style="margin-top: 10%;height: 10%;background-color: #7e57c2;color:#fff" > <h6>Filters</h6></div>
                        <div class="col s12" style="height: 90%;background-color: #5e35b1;color:#fff" id="filtersDiv"> 
                            
                </div>
                   <div  id="colorGradient" align="center" style="height: 20px;margin-top: 10%" class="col s12">
                      
            </div>
                   <div align="center" style="margin-top: 40%" class="col s12">
                       <a class="btn-floating btn-large waves-effect waves-light red" onclick="reset()"> <i class="material-icons">settings_input_component</i></a>
            </div>
            </div>
                  <div class="tooltip  box20 " id="my_tooltip" style="display: none"></div>
        </div>
         <footer class="page-footer" style="background-color: #455a64">
<!--          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>-->
          <div class="footer-copyright" >
            <div class="container  ">
                <span class="pull-right"> Terms & Conditions . Privacy Policy . <i class="fa fa-copyright" aria-hidden="true"></i> 2016 Powered by @ Karvy Analytics .</span>
           
            </div>
          </div>
        </footer>
         <script src="resources/JS/jquery.min.js"></script>
    <script src="resources/materialize/js/materialize.js"></script>  
    <!--<script src="resources/JS/d3.v4.min.js" charset="utf-8"></script>-->
    <script src="resources/JS/d3.v3.min.js" charset="utf-8"></script>
    <script src="resources/JS/c3.min.js"></script>
    <script type="text/javascript" src="resources/JS/customtooltip.js"></script>
    <script type="text/javascript" src="resources/JS/custom.js"></script>
    <script type="text/javascript" src="resources/JS/d3.geo.min.js"></script>
    <script type="text/javascript" src="resources/JS/topojson.v1.min.js"></script>
    <script type="text/javascript" src="resources/JS/proj.geo.tile.js"></script>
    <script type="text/javascript" src="resources/JS/custom.js"></script>
    <script type="text/javascript" src="resources/JS/bullet.js"></script>
    <script type="text/javascript" src="resources/JS/noUISlider/nouislider.js"></script>
    <script type="text/javascript">
     var input1 = document.getElementById("date1");
     var input2 = document.getElementById("date2");
    var inputs = [input1,input2]
     var slider = document.getElementById('rangeBar');
  noUiSlider.create(slider, {
   start: [2014, 2015],
   connect: true,
   step: 1,
   range: {
     'min': 2013,
     'max': 2015
   },pips: {
		mode: 'values',
		values: [2013,2014,2015],
		density: 4
	}
  
  });
  slider.noUiSlider.on('update', function( values, handle ) {
	inputs[handle].value = values[handle];
        dateRange()
});
  
   
    var ctxPath = '<%=request.getContextPath()%>'
        var measures = ["Sales","Profit","Volume","Discount"];
        var propertiesTop = {}
        propertiesTop["sort"] = ["DESC"];
        propertiesTop["Records"] = ["10"];
        var propertiesBottom = {}
        propertiesBottom["sort"] = ["DESC"];
        propertiesBottom["Records"] = ["10"];
        var filtersMapArr= [];
    setControlPath(ctxPath);
    KPI(ctxPath,filtersMapArr);
    IndiaMap(ctxPath,filtersMapArr,measures);
    topProduct(ctxPath,filtersMapArr,JSON.stringify(propertiesTop),measures);
    bottomProduct(ctxPath,filtersMapArr,JSON.stringify(propertiesBottom),measures);
    filters();
    var htmlGradient="";
    var color = d3.scale.category20();
    htmlGradient +="<h6> Color Gradient </h6>"
    
   for(var i=0;i<12;i++){
       htmlGradient +="<div class='col s1' style='height:100%;background-color:"+color(i)+"'></div>";
       
   }
    $("#colorGradient").html(htmlGradient);
    
 function filters(){
     var columns = ["Ship_Date","State","Product_name"];
     
         
     $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getFiltersData",
                    data: "column=" + columns,
                    success: function (response) { 
                      var data1 =  JSON.parse(response);
                      for(var i in columns){
                        var htmlvar = ""; 
                      var data = JSON.parse(data1[columns[i]]);
                     
                      htmlvar+='<div class="input-field col s12">';
                      htmlvar+='<select id="'+columns[i]+'" multiple>';
                      if(columns[i]=="Ship_Date"){
                          htmlvar+=' <option value="" disabled selected>Order Date</option>'; 
                      }else{
                         htmlvar+=' <option value="" disabled selected>'+columns[i]+'</option>';  
                      }
//                      htmlvar+=' <option value=""  >Select All</option>'; 
                      for(var j in data){
                          
                       htmlvar+=' <option value="'+data[j][columns[i]]+'" >'+data[j][columns[i]]+'</option>';   
                      }
                       htmlvar+='</select >';
                       htmlvar+='</div >';
                       
                      $("#filtersDiv").append(htmlvar);
                       $('select').material_select();
//                      htmlvar+=' <option value="1">''</option>';
                      }
                      var htmlvar = "";
                      htmlvar+='<div align="center" style="margin-bottom:2%" class="input-field col s12">';
                      htmlvar+='<button onclick="filterData()" style="background-color:#c0ca33" class="waves-effect waves-light btn" >Done</button>';
                      htmlvar+='</div>';
                      $("#filtersDiv").append(htmlvar);
                    }
                })
                 } 
                function filterData(){
                    var filterMap = {}
                    var filterArr = [];
                    filterMap["Ship_Date"] = $("#Ship_Date").val()
                   
                    
                    filterMap["State"] = $("#State").val()
                    
                   
                    filterMap["Product_name"] = $("#Product_name").val();
                    var properties = {}
        properties["sort"] = ["DESC"];
        properties["Records"] = ["10"];
                     KPI(ctxPath,JSON.stringify(filterMap))
                     IndiaMap(ctxPath,JSON.stringify(filterMap),measures);
                      topProduct(ctxPath,JSON.stringify(filterMap),JSON.stringify(properties),measures)
                      bottomProduct(ctxPath,JSON.stringify(filterMap),JSON.stringify(properties),measures)
                    
                    
                    
                }
                
  function drillCharts(id, column){ 
       var properties = {}
        properties["sort"] = ["DESC"];
        properties["Records"] = ["10"];
 var drillArr = [];
 var drillMap = {};
  drillArr.push(id);
  drillMap[column] = drillArr;
  KPI(ctxPath,JSON.stringify(drillMap));
  topProduct(ctxPath,JSON.stringify(drillMap),JSON.stringify(properties),measures)
  bottomProduct(ctxPath,JSON.stringify(drillMap),JSON.stringify(properties),measures)
  if(column=="City"){
  buildIndiaCityMapChart(ctxPath,JSON.stringify(drillMap),measures) 
  }else{
  IndiaMap(ctxPath,JSON.stringify(drillMap),measures)    
  }
  
}
          
     function reset(){
         var properties = {}
        properties["sort"] = ["DESC"];
        properties["Records"] = ["10"];
         var id = "";
         KPI(ctxPath,id);
  topProduct(ctxPath,id,JSON.stringify(properties),measures)
  bottomProduct(ctxPath,id,JSON.stringify(properties),measures)
  IndiaMap(ctxPath,id,measures) 
     }     
          
 function topCategoryData(){
 var properties = {}
        properties["sort"] = ["ASC"];
        properties["Records"] = ["10"];
       bottomProduct(ctxPath,"",JSON.stringify(properties),measures) 
 }         
 function bottomCategoryData(){
   var properties = {}
     var rowVal = $("#categoryRowValues").val();
     var propArr = [];
     if(rowVal!=""){
       propArr.push(rowVal)
     }else{
         propArr.push("10");
     }
        properties["sort"] = ["DESC"];
         properties["Records"] = propArr; 
        bottomProduct(ctxPath,"",JSON.stringify(properties),measures)
        
 }   
 function topProductData(){
 var properties = {}
     var rowVal = $("#productRowValues").val();
     var propArr = [];
     if(rowVal!=""){
       propArr.push(rowVal)
     }else{
         propArr.push("10");
     }
        properties["sort"] = ["ASC"];
         properties["Records"] = propArr; 
        
       topProduct(ctxPath,"",JSON.stringify(properties),measures) 
 }         
 function bottomProductData(){
    var properties = {}
     var rowVal = $("#productRowValues").val();
     var propArr = [];
     if(rowVal!=""){
       propArr.push(rowVal)
     }else{
         propArr.push("10");
     }
        properties["sort"] = ["DESC"];
         properties["Records"] = propArr; 
        topProduct(ctxPath,"",JSON.stringify(properties),measures)
        
 }  
 
 function changeDashboardMeasure(id){
     $("#indiaMapTitle").html("<h6>State Wise "+id+"</h6>")
     $("#productTitle").html("<h6>Top products by "+id+"</h6>")
     $("#CategoryTitle").html("<h6>Top Category by "+id+"</h6>")
     var measureArr = [];
     
     if(id=="Quantity"){
         id == "Volume"
     measureArr.push("Volume")
     }else{
     measureArr.push(id)    
     }
        for(var i in measures){
         if(measures[i]!=id){
             measureArr.push(measures[i])
         }
     }
     var properties = {}
        properties["sort"] = ["DESC"];
        properties["Records"] = ["10"];
     var filtersMapArr = [];
    IndiaMap(ctxPath,filtersMapArr,measureArr);
    topProduct(ctxPath,filtersMapArr,JSON.stringify(properties),measureArr);
    bottomProduct(ctxPath,filtersMapArr,JSON.stringify(properties),measureArr);
 }
    
    function drillDown(id,columns){ 
    var filter = {};
    var filterArr = [];
    filterArr.push(id)
    filter[columns]=filterArr;
     var column = ["City"]
     
         $.ajax({
                    type: "POST",
                    url: ctxPath + "/AdminSubmit.do?parameter=getMapData",
                    data: "column=" + encodeURIComponent(column)+ "&filters=" +encodeURIComponent(JSON.stringify(filter))+ "&measures=" +encodeURIComponent(measures[0])  ,
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
    
     function dateRange(inputs){
        var fromdate = $("#date1").val();
        var todate =  $("#date2").val();
       
     }
    
    </script>
    </body>
</html>
