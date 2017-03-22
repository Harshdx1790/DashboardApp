/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.DAO;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import com.karvy.BD.services;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.util.Collections;
import java.util.Iterator;
import static javafx.scene.input.KeyCode.T;
/**
 *
 * @author harshvardhan.solanki
 */
public class servicesDAO {
  
    public String getKPIData(String filters) throws ClassNotFoundException, SQLException{
    
     List<Map<String,String>> currentdata = new ArrayList<Map<String,String>>();
     List<Map<String,String>> priordata = new ArrayList<Map<String,String>>();
     String currentQuery ="";
     String filterInnerQuery = getFilters(filters);
     currentQuery +="select ROUND(SUM(Sales),2) as Sales, ROUND(SUM(Quantity),2) as Volume ,ROUND(SUM(Discount),2) as Discount,ROUND(SUM(Profit),2) as Profit from global_super_store";
     currentQuery +=" where ship_date like '%2014%'  ";
     if(filterInnerQuery!=""){
         
     currentQuery +=" and "+filterInnerQuery;
     }
     String priorQuery = "";
     priorQuery +="select ROUND(SUM(Sales),2) as Sales, ROUND(SUM(Quantity),2) as Volume ,ROUND(SUM(Discount),2) as Discount,ROUND(SUM(Profit),2) as Profit from global_super_store";
     priorQuery +=" where ship_date like '%13%'  ";
     if(filterInnerQuery!=""){
     priorQuery +=" and "+filterInnerQuery;
     }
     
     services services = new services();
     currentdata  = services.getKPIData(currentQuery);
     Gson gson = new Gson();
         Type type = new TypeToken<List<Map<String,String>>>(){}.getType();
         String currentjson = gson.toJson(currentdata, type);
         priordata  = services.getKPIData(priorQuery);    
         String priorjson = gson.toJson(priordata, type); 
        Map<String,String> returnMap = new HashMap<>();
        returnMap.put("current", currentjson);
        returnMap.put("Prior", priorjson);
        Type maptype = new TypeToken<Map<String,String>>(){}.getType();
        String returnJson = gson.toJson(returnMap,maptype);
        return returnJson;
     
    }
    
   public String getMapData(String column,String filters,String measures) throws ClassNotFoundException, SQLException{ 
    List<Map<String,String>> data = new ArrayList<Map<String,String>>();
    Gson gson = new Gson();
    String filterInnerQuery = getFilters(filters);
    
    String query = "";
    query+="select ";
    query+=" "+column+" , ";
    query+=" ROUND(sum(   ";
    query+="  "+measures+"  ";
    query+=" ),2)   ";
    query+=" as "+measures;
    query+="  from global_super_store   ";
    if(filterInnerQuery!=""){
    query+=" where "+filterInnerQuery;
    }
    query+="group by ";
    query+=" "+column+"  ";
    query+="order by ";
    query+=" "+measures+"  ";
    
    services services = new services();
    data = services.getKPIData(query);
    
     Type type = new TypeToken<List<Map<String,String>>>(){}.getType();
    String returnData = gson.toJson(data, type); 
    return returnData;
   }
   public String getProductData(String column,String filters,String properties,String measures) throws ClassNotFoundException, SQLException{ 
    List<Map<String,String>> data = new ArrayList<Map<String,String>>();
    String filterInnerQuery = getFilters(filters);
    Map<String,String> Properties = properties(properties);
    
    String query = "";
    query+="select ";
    query+=" "+column+" , ";
    query+=" ROUND(sum(sales),2) as Sales, ROUND(sum(Quantity),2) as Volume, ROUND(sum(Discount),2) as Discount, ROUND(sum(Profit),2) as Profit from global_super_store   ";
    if(filterInnerQuery!=""){
    query+=" where "+filterInnerQuery;
    }
    query+=" group by ";
    query+=" "+column+"  ";
    query+=" order by   ";
    query+=" "+measures+"  ";
    query+=" "+Properties.get("sort")+"  ";
    query+=" LIMIT  "+Properties.get("Records")+"  ";
    services services = new services();
    data = services.getKPIData(query);
    
       System.out.println(data);
    Gson gson = new Gson();
     Type type = new TypeToken<List<Map<String,String>>>(){}.getType();
    String returnData = gson.toJson(data, type); 
    return returnData;
   }
   public String getFiltersData(String[] column) throws ClassNotFoundException, SQLException{ 
       Map<String,String>returnMap = new HashMap<String,String>();
       Gson gson = new Gson();
       for(String column1: column){
       List<Map<String,String>> data = new ArrayList<Map<String,String>>();
    String query = "";
    if(column1.equalsIgnoreCase("Ship_Date")){
    query +="select distinct EXTRACT(YEAR FROM  ";
    query +=" "+column1+" ";
    query +=" ) ";
    query +="  as  ";
    query +=" "+column1+" ";
    }else{
    query +="select distinct  ";
    query +=" "+column1+" ";
    
    query +="  as  ";
    query +=" "+column1+" ";
    }
    query +="  from global_super_store group by ";
    query +=" "+column1+" ";
    query +=" order by ";
    query +=" "+column1+" ASC ";
    
    services services = new services();
    data = services.getKPIData(query);
    
       System.out.println(data);
    
     Type type = new TypeToken<List<Map<String,String>>>(){}.getType();
    String returnData = gson.toJson(data, type); 
    returnMap.put(column1, returnData);
       }
    Type Maptype = new TypeToken<Map<String,String>>(){}.getType();
    String returnData1 = gson.toJson(returnMap, Maptype); 
    return returnData1;
   }


public String getFilters(String filters) throws ClassNotFoundException, SQLException{ 
    Gson gson = new Gson();
     Type filterType= new TypeToken<Map<String,List<String>>>(){}.getType();
    Map<String,List<String>>filterMap = gson.fromJson(filters, filterType);
    String filterInnerQuery = "";
    if(filterMap!=null){
    Iterator<Map.Entry<String, List<String>>> entries = filterMap.entrySet().iterator();
//    String filterOuterQuery = "";
    while (entries.hasNext()) { 
    Map.Entry<String, List<String>> entry = entries.next();
    if(entry.getValue().size()>0){
    filterInnerQuery +=entry.getKey();
    filterInnerQuery +=" in ( ";
    int count = 1;
    for(String value : entry.getValue()){
       if(count==entry.getValue().size()){
    filterInnerQuery +="'"+value+"'";
       }else{
    filterInnerQuery +="'"+value+"'" + ", "  ; 
    count++;
       }
    }
    if(!entries.hasNext()){
    filterInnerQuery +=" ) ";
    } else {
    filterInnerQuery +=" ) and  ";
    }
    
     System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue().size());
     System.out.println("filterInnerQuery = " +filterInnerQuery);
    }else{
    if(!entries.hasNext()){
    filterInnerQuery +=" 1=1  ";
    } else {
    filterInnerQuery +=" 1=1 and ";
    }
    }
    }
    }

return filterInnerQuery;
}



public Map<String,String> properties(String properties) throws ClassNotFoundException, SQLException{
Gson gson = new Gson();
Type propertiestype= new TypeToken<Map<String,List<String>>>(){}.getType();
Map<String,List<String>>propertiesMap = gson.fromJson(properties, propertiestype);
Map<String,String> returnMap = new HashMap<>();
if(propertiesMap!=null){
Iterator<Map.Entry<String, List<String>>> entries = propertiesMap.entrySet().iterator(); 
while (entries.hasNext()) { 
Map.Entry<String, List<String>> entry = entries.next();
if(entry.getValue().size()>0){
returnMap.put(entry.getKey(), entry.getValue().get(0));
}
}
}

return returnMap;
}

}