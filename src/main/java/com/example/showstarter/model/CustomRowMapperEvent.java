package com.example.showstarter.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomRowMapperEvent implements RowMapper<Event> {

    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {

        Event event = new Event();
        event.eventID = rs.getInt("event_id");
        event.eventName = rs.getString("event_name");
        event.location = rs.getString("location");
        event.eventType = rs.getString("event_type");
        event.eventDate = rs.getDate("event_date").toString();
        event.eventTime = rs.getTime("event_time").toString();
        event.invoiceNum = rs.getInt("invoice_number");

        return event;

    }
}