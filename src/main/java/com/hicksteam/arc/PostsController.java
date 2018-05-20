package com.hicksteam.arc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hicksteam.arc.entities.Post;
import com.hicksteam.arc.entities.PostRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import java.util.List;

@RestController
public class PostsController
{
    private static final Logger log = LoggerFactory.getLogger(PostsController.class);

    @GET
    @RequestMapping("/posts")
    public String getAllPosts()
    {
        String results = "";

        List<Post> posts = Post.getAllPosts();
        ObjectMapper objectMapper = JSONutil.objectMapper;
        try
        {
            results = objectMapper.writeValueAsString(posts);
        }
        catch (Exception e)
        {
            log.error(e.getMessage(), e);
        }

        return results;
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