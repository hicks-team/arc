package com.hicksteam.arc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hicksteam.arc.entities.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import java.util.List;

@RestController
public class CommentsController
{
    private static final Logger log = LoggerFactory.getLogger(CommentsController.class);

    @GET
    @RequestMapping("/api/comments")
    public String getAllComments()
    {
        String results = "";
        List<Comment> comments = Comment.getAllComments();
        ObjectMapper objectMapper = JSONutil.objectMapper;
        try
        {
            results = objectMapper.writeValueAsString(comments);
        }
        catch (Exception e)
        {
            log.error(e.getMessage(), e);
        }

        return results;
    }

    @DELETE
    @RequestMapping("/api/comments/{id}")
    public String deleteComment()
    {
        StringBuilder results = new StringBuilder();

        String query = "select";

        return "";
    }


    @POST
    @RequestMapping("api/comments/post/{id}")
    public void createComment()
    {

    }
}
