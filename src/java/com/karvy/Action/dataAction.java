/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.Action;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import javax.servlet.http.HttpSession;
import org.apache.struts.actions.DispatchAction;
import com.karvy.BD.services;
import com.karvy.DAO.servicesDAO;
import java.util.List;
import java.util.Map;
/**
 *
 * @author harshvardhan.solanki
 */
public class dataAction extends DispatchAction {
 
     public ActionForward getKPIData(ActionMapping mapping, ActionForm form,HttpServletRequest request,HttpServletResponse response) throws Exception{
     dataForm form1 = (dataForm)form;
     response.setContentType("text/text;charset=utf-8");
        response.setHeader("cache-control", "no-cache");
        HttpSession httpSession = request.getSession();
        String query = form1.getQuery();
        String filters = "";
        if(request.getParameter("filters")!=null){
        filters = request.getParameter("filters");
       }
        servicesDAO dAO  = new servicesDAO();
       String data =  dAO.getKPIData(filters);
        PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
     return null;
     }
     
   public ActionForward getMapData(ActionMapping mapping, ActionForm form,HttpServletRequest request,HttpServletResponse response) throws Exception{
   response.setContentType("text/text;charset=utf-8");
        response.setHeader("cache-control", "no-cache");
        HttpSession httpSession = request.getSession();
       String column = request.getParameter("column");
       String measures = "";
       if(request.getParameter("measures")!=null){
        measures = request.getParameter("measures");
       }
       String filters = "";
       if(request.getParameter("filters")!=null){
        filters = request.getParameter("filters");
       }
       
       servicesDAO dAO  = new servicesDAO();
       String data = dAO.getMapData(column,filters,measures);
       PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
   return null;    
   }  
   public ActionForward getProductData(ActionMapping mapping, ActionForm form,HttpServletRequest request,HttpServletResponse response) throws Exception{
   response.setContentType("text/text;charset=utf-8");
        response.setHeader("cache-control", "no-cache");
        HttpSession httpSession = request.getSession();
       String column = request.getParameter("column");
       String filters = "";
       if(request.getParameter("filters")!=null){
        filters = request.getParameter("filters");
       }
       String measures = "";
       if(request.getParameter("measures")!=null){
        measures = request.getParameter("measures");
       }
       String properties = "";
       if(request.getParameter("properties")!=null){
        properties = request.getParameter("properties");
       }
       servicesDAO dAO  = new servicesDAO();
       String data = dAO.getProductData(column,filters,properties,measures);
       PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
   return null;    
   }  
   public ActionForward getFiltersData(ActionMapping mapping, ActionForm form,HttpServletRequest request,HttpServletResponse response) throws Exception{
   response.setContentType("text/text;charset=utf-8");
        response.setHeader("cache-control", "no-cache");
        HttpSession httpSession = request.getSession();
       String[] column = request.getParameter("column").split(",");
       servicesDAO dAO  = new servicesDAO();
       String data = dAO.getFiltersData(column);
       PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
   return null;    
   }  
     
}
