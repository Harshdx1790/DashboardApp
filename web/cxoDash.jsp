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
          <h4>  CXO dashboard </h4>
        </header>
        <div class="container">
            <div id="kpiRow" class="row">
          
            </div>
            <div class="row">
                <div class="col s12 m6">
                  <div class="card-panel ">
          <div><h5> State wise sales </h5></div>
         
            <div id="chart6"></div>
          
        </div>  
                </div> 
                <div class="col s12 m6">
                    <div class="row">
                      <div class="card-panel ">
          <div><h5> City wise sales </h5></div>
         
            <div id="chart7"></div>
          
        </div>   
                    </div>  
                    <div class="row">
                      <div class="card-panel ">
          <div><h5> State wise sales </h5></div>
         
            <div id="chart8"></div>
          
        </div>   
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
        var measures = ["Overall Sales","Total Quantity","Overall Discount","Total Profit"];
     getDataFun(measures,ctxPath)
     
     
      </script>  
    </body>
</html>
