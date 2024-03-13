package com.example.showstarter.model;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class DatabaseConfig {
    
    @Bean
    public static DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:postgresql://lallah.db.elephantsql.com:5432/orunmzej");
        dataSource.setUsername("orunmzej");
        dataSource.setPassword("WkVYLIBK36XLSG5ceqh9oQuYTbEEndjH");
        dataSource.setDriverClassName("org.postgresql.Driver");
        return dataSource;
    }

    @Bean
    public static JdbcTemplate jdbcTemplate() throws SQLException {
        final JdbcTemplate template = new JdbcTemplate();
        template.setDataSource(dataSource());
        template.afterPropertiesSet();
        return template;
    }

}
