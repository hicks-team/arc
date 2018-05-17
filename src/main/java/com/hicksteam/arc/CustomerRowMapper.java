package com.hicksteam.arc;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerRowMapper implements RowMapper<Customer>
{
    @Override
    public Customer mapRow(ResultSet row, int rowNum) throws SQLException
    {
        Customer customer = new Customer(
                row.getInt("id"),
                row.getString("first_name"),
                row.getString("last_name")
        );
        return customer;
    }
}