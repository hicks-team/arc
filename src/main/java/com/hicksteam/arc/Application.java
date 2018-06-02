package com.hicksteam.arc;

import com.fasterxml.jackson.databind.JsonNode;
import com.hicksteam.arc.entities.Comment;
import com.hicksteam.arc.entities.Post;
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
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

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

            createTables();

            // seed post data
            Client client = JerseyClientBuilder.newClient();
            WebTarget target = client.target("https://api.reddit.com/r/programming/best");
            Invocation.Builder builder = target.request(MediaType.APPLICATION_JSON);
            JsonNode jsonNode = builder.get(JsonNode.class);

            jsonNode
                    .findValue("data")
                    .withArray("children")
                    .forEach(Post::mapJSONtoObject);

            // seed comment data
            AtomicLong previousCommentId = new AtomicLong();
            Post.getAllPosts().forEach(post -> {

                previousCommentId.set(0);
                for (int i = 0; i < 3; i++)
                {
                    Comment comment = new Comment();
                    comment.setPostId(post.getId());
                    comment.setAuthorId(new Random().nextInt(3));
                    comment.setParentCommentId(previousCommentId.get());
                    comment.setContent("blah " + i);
                    if (previousCommentId.longValue() > 0)
                        comment.setParentCommentId(previousCommentId.longValue());

                    long id = Comment.createComment(comment);
                    previousCommentId.set(id);
                }
            });

            Post post = Post.getById(1);

            Comment comment = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(new Long(2));
            comment.setContent("anotehr comment link to 2");
            long id1 = Comment.createComment(comment);

            Comment comment2 = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(id1);
            comment.setContent("anotehr comment link to " + id1);
            long id2 = Comment.createComment(comment);

            Comment comment3 = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(id1);
            comment.setContent("anotehr comment link to " + id1);
            long id3 = Comment.createComment(comment);

            Comment comment4 = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(id3);
            comment.setContent("anotehr comment link to " + id3);
            long id4 = Comment.createComment(comment);

            Comment comment5 = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(new Long(1));
            comment.setContent("anotehr comment link to 1");
            long id5 = Comment.createComment(comment);

            Comment comment6 = new Comment();
            comment.setPostId(post.getId());
            comment.setAuthorId(new Random().nextInt(3));
            comment.setParentCommentId(new Long(1));
            comment.setContent("anotehr comment link to 1");
            long id6 = Comment.createComment(comment);

        };
    }

    private void createTables()
    {
        log.info("Creating tables");

        jdbcTemplate.execute("DROP TABLE IF EXISTS posts");
        jdbcTemplate.execute("CREATE TABLE posts(id SERIAL, title VARCHAR(2000), content VARCHAR(2000), author_id bigint)");
        log.info("created table POSTS");

        jdbcTemplate.execute("DROP TABLE IF EXISTS comments");
        jdbcTemplate.execute("CREATE TABLE comments(id SERIAL, post_id bigint, parent_comment_id bigint, author_id bigint, content VARCHAR(255), CONSTRAINT pk_comment PRIMARY KEY (id))");
        log.info("created table COMMENTS");

        jdbcTemplate.execute("DROP TABLE IF EXISTS users");
        jdbcTemplate.execute("CREATE TABLE users(id SERIAL, username text, password text, email text)");
        log.info("created table USERS");
    }
}