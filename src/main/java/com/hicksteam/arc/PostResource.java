package com.hicksteam.arc;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("posts")
public class PostResource
{
    @GET
    public String getGreeting()
    {
        return "Hello world.";
    }
}
