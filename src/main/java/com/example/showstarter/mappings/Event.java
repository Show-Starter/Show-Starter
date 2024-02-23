package com.example.showstarter.mappings;

import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
// import java.sql.ResultSet;
// import java.sql.SQLException;
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

}
