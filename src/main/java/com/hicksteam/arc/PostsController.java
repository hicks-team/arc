package com.hicksteam.arc;

import com.hicksteam.arc.entities.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostsController
{
    private static final Logger log = LoggerFactory.getLogger(PostsController.class);

    @RequestMapping(method = RequestMethod.GET, path = "/posts")
    public String getAllPosts()
    {
        return JSONutil.writeValueAsString(Post.getAllPosts());
    }

    @RequestMapping("/posts/{id}")
    public String deletePost(@PathVariable long id)
    {
        return JSONutil.writeValueAsString(Post.getById(id));
    }
}