package com.example.showstarter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Event {
	int eventID;
	String eventName;
	String location;
	String eventType;
	String eventDate;
	String eventTime;
	int invoiceNum;
	
	
	public Event(int eventID, String eventName, String location, String eventType, String eventDate, String eventTime, int invoiceNum) {
		this.eventID = eventID;
		this.eventName = eventName;
		this.location = location;
		this.eventType = eventType;
		this.eventDate = eventDate;
		this.eventTime = eventTime;
		this.invoiceNum = invoiceNum;
	}
	
	// Pulls all events from database and creates an event based on each tuple in the events table
	public static Event[] get_all_events() {
		Event[] events = new Event[0];
		int numEvents = 0;
		
		try {
            Class.forName("org.postgresql.Driver");
        }
        catch (java.lang.ClassNotFoundException e) {
            System.out.println(e.getMessage());
        }

        String url = "jdbc:postgresql://lallah.db.elephantsql.com:5432/orunmzej";
        String username = "orunmzej";
        String password = "WkVYLIBK36XLSG5ceqh9oQuYTbEEndjH";

        try {
            Connection db = DriverManager.getConnection(url, username, password);
            Statement st = db.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM events");
            while (rs.next()) {
            	numEvents++;
            }
            events = new Event[numEvents];
            rs = st.executeQuery("SELECT * FROM events");
            int i = 0;
            while (rs.next()) {
                events[i] = new Event(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7));
                i++;
            }
            rs.close();
            st.close();
            }
        catch (java.sql.SQLException e) {
            System.out.println(e.getMessage());
        }
		
		return events;
	}
	
	
	
}
