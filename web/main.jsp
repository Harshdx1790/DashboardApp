<%-- 
    Document   : main
    Created on : Dec 15, 2016, 10:27:39 AM
    Author     : harshvardhan.solanki
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="resources/materialize/css/materialize.css" rel="stylesheet">
        <link href="resources/css/custom.css" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="resources/css/zcolorbrewer.css"/>
    </head>
    <body>
     <header class="" style="background-image: url('resources/images/images.jpg'); height:60px;color:#fff;margin-top:-17px">
          <h4>  Dashboards </h4>
      </header>
        <div class="container">
            <div class="row">
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Telecom Operation Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="TelecomOperation" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Telecom Market Research Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
                <a id="TelecomMarket" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Telecom Support Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="TelecomSupport" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Telecom Distribution Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="TelecomDistribution" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Retail CXO Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="RetailCXO" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Retail Operation Sales Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="RetailOperation" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">CXO Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="cxoDash" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
             <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img src="resources/images/image3.png">
              <span class="card-title">Banking Dashboard</span>
            </div>
<!--            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>-->
            <div class="card-action">
              <a id="bankingDash" onclick="opdenDash(this.id)">Click to open</a>
            </div>
          </div>
        </div>
            </div>
        </div>
        <script src="resources/JS/jquery.min.js"></script>
    <script src="resources/materialize/js/materialize.js"></script>  
    <script>
        function opdenDash(id){
        var href =     window.location.href;
        if(id=="TelecomMarket"){
        window.location.href = window.location.href+"/telecomMarketing.jsp"
        }
        else if(id=="TelecomOperation"){
        window.location.href = window.location.href+"/telecomOperation.jsp"    
        }
        else if(id=="TelecomDistribution"){
        window.location.href = window.location.href+"/telecomDistribution.jsp"    
        }
        else if(id=="RetailCXO"){
        window.location.href = window.location.href+"/retailCXO.jsp"    
        }
        else if(id=="RetailOperation"){
        window.location.href = window.location.href+"/RetailOperationSales.jsp"    
        }
        else if(id=="cxoDash"){
        window.location.href = window.location.href+"/cxoDashboard.jsp"    
        }
        else if(id=="bankingDash"){
        window.location.href = window.location.href+"/bankingDash.jsp"    
        }
        else {
        window.location.href = window.location.href+"/telecomSupport.jsp"        
        }
        }
   </script>     
    </body>
</html>
