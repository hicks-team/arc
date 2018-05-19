package com.hicksteam.arc;

import com.hicksteam.arc.entities.CommentRowMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;

@RestController
public class CommentsController
{
    @GET
    @RequestMapping("/comments")
    public String getAllComments()
    {
        StringBuilder results = new StringBuilder();

        String query = "select * from comments";
        DAO.getJdbcTemplate()
                .query(query, new Object[]{}, new CommentRowMapper())
                .forEach(results::append);

        return results.toString();
    }

    @DELETE
    @RequestMapping("/comments/{id}")
    public String deleteComment()
    {
        StringBuilder results = new StringBuilder();

        String query = "select";

        return "";
    }
}
