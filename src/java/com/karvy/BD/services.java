/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.BD;

/**
 *
 * @author harshvardhan.solanki
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static javafx.scene.input.KeyCode.T;
public class services {
  
  public List getKPIData(String currentQuery) throws ClassNotFoundException, SQLException{
  Class.forName("com.mysql.jdbc.Driver");
  Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/globalData","root","root");
  List<Map<String,String>> data = new ArrayList<Map<String,String>>();
  PreparedStatement ps = con.prepareStatement(currentQuery);
  ResultSet rs = ps.executeQuery();
  ResultSetMetaData rsmd = rs.getMetaData();
        List<String> columns = new ArrayList<String>(rsmd.getColumnCount());
        for(int i = 1; i <= rsmd.getColumnCount(); i++){
        columns.add(rsmd.getColumnName(i));
        }
  while(rs.next()){
  Map<String,String> row = new HashMap<String, String>(columns.size());
  for(String col : columns) {
            row.put(col, rs.getString(col));
          
        }
  
  data.add(row);
  }
        
  
        rs.close();
        ps.close();
        con.close();
        return data;
  }  
    
}
