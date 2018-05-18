package com.hicksteam.arc;

import com.hicksteam.arc.entities.PostRowMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;

@RestController
public class PostsController
{
    @RequestMapping("/posts")
    public String getAllPosts()
    {
        StringBuilder results = new StringBuilder();

        String query = "select * from posts";
        DAO.getJdbcTemplate()
                .query(query, new Object[]{}, new PostRowMapper())
                .forEach(results::append);

        return results.toString();
    }

    @DELETE
    @RequestMapping("/posts/{id}")
    public String deletePost()
    {
        StringBuilder results = new StringBuilder();

        String query = "select * from posts";
        DAO.getJdbcTemplate()
                .query(query, new Object[]{}, new PostRowMapper())
                .forEach(results::append);

        return results.toString();
    }
}