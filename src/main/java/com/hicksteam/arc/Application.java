package com.hicksteam.arc;

import com.fasterxml.jackson.databind.JsonNode;
import com.hicksteam.arc.entities.Comment;
import com.hicksteam.arc.entities.CommentRowMapper;
import com.hicksteam.arc.entities.Post;
import com.hicksteam.arc.entities.PostRowMapper;
import org.glassfish.jersey.client.JerseyClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Application
{
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public Application(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
        DAO.setJdbcTemplate(jdbcTemplate);
    }

    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx)
    {
        return args -> {

            testDB();

            Client client = JerseyClientBuilder.newClient();
            WebTarget target = client.target("https://api.reddit.com/r/programming/best");
            Invocation.Builder builder = target.request(MediaType.APPLICATION_JSON);
            JsonNode jsonNode = builder.get(JsonNode.class);

            jsonNode
                    .findValue("data")
                    .withArray("children")
                    .forEach(child -> {
                        Post post = Post.mapJSONtoObject(child);
                        Post.createPost(post);
                    });
        };
    }

    private void testDB()
    {
        log.info("Creating tables");

        jdbcTemplate.execute("DROP TABLE IF EXISTS posts");
        jdbcTemplate.execute("CREATE TABLE posts(id SERIAL, title VARCHAR(2000), content VARCHAR(2000), author_id bigint)");
        log.info("created table POSTS");

        jdbcTemplate.execute("DROP TABLE IF EXISTS comments");
        jdbcTemplate.execute("CREATE TABLE comments(id SERIAL, post_id bigint, parent_comment_id bigint, author_id bigint, content VARCHAR(255), CONSTRAINT pk_comment PRIMARY KEY (id))");
        log.info("created table COMMENTS");
    }
}