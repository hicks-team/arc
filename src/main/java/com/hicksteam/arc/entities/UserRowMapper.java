package com.hicksteam.arc.entities;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User>
{
    @Override
    public User mapRow(ResultSet row, int rowNumb) throws SQLException
    {
        User user = new User();
        user.setId(row.getLong("id"));
        user.setUsername(row.getString("username"));
        user.setPassword(row.getString("password"));
        user.setEmail(row.getString("email"));

        return user;
    }
}
