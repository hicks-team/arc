package com.hicksteam.arc;

import com.hicksteam.arc.entities.Comment;
import com.hicksteam.arc.entities.CommentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentsController
{
    @Autowired
    CommentDAO commentDAO;

    @RequestMapping("/comments")
    public String index()
    {
        String stringThatWillEventuallyBecomeJSON = "";
        List<Comment> comments = commentDAO.findAll();
        for (Comment comment : comments)
            stringThatWillEventuallyBecomeJSON += " " + comment.toString();

        return stringThatWillEventuallyBecomeJSON;
    }

}
