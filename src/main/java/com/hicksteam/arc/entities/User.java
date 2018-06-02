package com.hicksteam.arc.entities;

import com.hicksteam.arc.DAO;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class User
{
    private long id;
    private String username;
    private String password;
    private String email;

    public User(String username, String password, String email)
    {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User()
    {

    }

    @Override
    public String toString()
    {
        return "User: " + username +" " + email + " id: " + id;
    }

    //--------Data Access
    public static long createUser(User user)
    {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("id", user.getId());
        parameters.put("username", user.getUsername());
        parameters.put("password", user.getPassword());
        parameters.put("email", user.getEmail());
        Number number = new SimpleJdbcInsert(DAO.getJdbcTemplate()).usingGeneratedKeyColumns("id").withSchemaName("arc").withTableName("users").executeAndReturnKey(parameters);
        return number.longValue();
    }

    public static boolean userExists(String username)
    {
        return getUserByUsername(username) != null;
    }

    public static User getById(long id)
    {
        try
        {
            return DAO.getJdbcTemplate().queryForObject("select * from users where id=?",
                    new Object[]{id}, new UserRowMapper());
        }
        catch (EmptyResultDataAccessException e)
        {
            return null;
        }
    }

    public static User getUserByUsername(String username)
    {
        List<User> users = DAO.getJdbcTemplate().query("select * from Users where username=?", new Object[]{username}, new UserRowMapper());
        if (users.size() > 0)
            return users.get(0);

        return null;
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }
}
