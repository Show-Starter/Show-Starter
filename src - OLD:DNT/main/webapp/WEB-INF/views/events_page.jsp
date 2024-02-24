<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.example.showstarter.mappings.Event" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
        }
        header {
            background-color: #800000;
            color: #fff;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        h1 {
            font-size: 20px;
            margin: 0;
        }
        p {
            font-size: 18px;
            margin: 0;
        }
        #event-details {
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            margin: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .event-box {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            text-align: left;
        }
        #search-bar {
            margin-top: 20px;
        }
    </style>
</head>
<body>
	
	<% Event[] events = Event.get_all_events(); %>
	
    <header>
        <div>
            <h1>Your Events</h1>
        </div>
    </header>
    <div id="search-bar">
        <label for="search">Search Event:</label>
        <input type="text" id="search" oninput="searchEvents()">
    </div>
    <div id="event-details">
        <!-- Java code will populate this section -->
    </div>

    <script>
        var events = [
        	<% for (Event event : events) { %>
            { name: <%="\"" + Event.getEventName(event) + "\""%>, location: <%="\"" + Event.getLocation(event) + "\""%>, type: <%="\"" + Event.getEventType(event) + "\""%> },
            <% } %>
        ];

        // JavaScript for searching events
        function searchEvents() {
            var searchTerm = document.getElementById("search").value.toLowerCase();
            var filteredEvents = events.filter(function(event) {
                return event.name.toLowerCase().includes(searchTerm);
            });
            displayEvents(filteredEvents);
        }

        // JavaScript for displaying events
        function displayEvents(eventsArray) {
            var eventDetailsDiv = document.getElementById("event-details");
            eventDetailsDiv.innerHTML = "";

            eventsArray.forEach(function(event) {
                var eventBox = document.createElement("div");
                eventBox.classList.add("event-box");
                eventBox.innerHTML = "<h2>" + event.name + "</h2>" +
                                     "<p>Location: " + event.location + "</p>" +
                                     "<p>Event Type: " + event.type + "</p>";

                eventDetailsDiv.appendChild(eventBox);
            });
        }

        // Initial display of events
        displayEvents(events);
    </script>
</body>
</html>
