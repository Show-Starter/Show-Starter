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
        //TODO Auto-generated constructor stub
    }

    @Autowired
    public Event(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;
	
	// Pulls all events from database and creates an event based on each tuple in the events table
	public static Event[] get_all_events() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        try {
            jdbcTemplate = DatabaseConfig.jdbcTemplate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
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

    public static void main(String[] args) {
        // Create an instance of Event to access non-static methods
        // JdbcTemplate jdbcTemplate = new JdbcTemplate(); // You may need to create this instance
        Event[] events = get_all_events();

        System.out.println(events.length);
    }

}
