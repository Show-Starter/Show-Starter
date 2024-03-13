package com.example.showstarter.model;

import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
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

    public Event() {

    }

    @Autowired
    public Event(JdbcTemplate jdbcTemplate) {
    }

    // Pulls all events from database and creates an event based on each tuple in the events table
	public static Event[] get_all_events() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        try {
            jdbcTemplate = DatabaseConfig.jdbcTemplate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String sql = "SELECT * FROM events";
        List<Event> events = jdbcTemplate.query(sql, new CustomRowMapperEvent());

        Event[] eventsArr = new Event[events.size()];

        for (int i = 0; i < events.size(); i++) {
            eventsArr[i] = events.get(i);
        }

        return eventsArr;
    }

    public static void add_event(String eventName, String location, String eventType, String eventDate, String eventTime, int invoiceNum) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        try{
            jdbcTemplate = DatabaseConfig.jdbcTemplate();
        } catch (Exception e) {
            e.printStackTrace();
        }

        String sql = "INSERT INTO events (event_name, location, event_type, event_date, event_time, invoice_number) VALUES " +
            "(\'" + eventName + "\', \'" + location + "\', \'" + eventType + "\', \'" + eventDate + "\', \'" + eventTime + "\', \'" + invoiceNum + "\')";

        jdbcTemplate.execute(sql);
    }

    public static Event get_event_from_id(int eventID) {
        Event event;

        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        try{
            jdbcTemplate = DatabaseConfig.jdbcTemplate();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (eventID > 0) {
            String sql = "SELECT * FROM events WHERE event_id = " + "eventID";

            jdbcTemplate.execute(sql);
            List<Event> events = jdbcTemplate.query(sql, new CustomRowMapperEvent());

            if (events.size() != 1) {
                return null;
            } else {
                event = events.get(0);
            }

            return event;
        } else {
            return null;
        }

        
    }

    public static int getEventID(Event event) {
        return event.eventID;
    }

    public static String getEventName(Event event) {
        if (event == null) {
            return null;
        } else {
        return event.eventName;
        }
    }

    public static String getLocation(Event event) {
        return event.location;
    }

    public static String getEventType(Event event) {
        return event.eventType;
    }

    public static String getEventDate(Event event) {
        return event.eventDate;
    }

    public static String getEventTime(Event event) {
        return event.eventTime;
    }

    public static int getInvoiceNum(Event event) {
        return event.invoiceNum;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }

    public void setInvoiceNum(int invoiceNum) {
        this.invoiceNum = invoiceNum;
    }

    

}
