package com.hicksteam.arc;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostsController
{

    @RequestMapping("/posts")
    public String index()
    {
        return "Greetings from Spring Boot!";
    }

}