package com.hicksteam.arc;

import com.hicksteam.arc.entities.PostRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class Application
{
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public Application(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx)
    {
        return args -> {

            log.info("Creating tables");

            jdbcTemplate.execute("DROP TABLE IF EXISTS posts");
            jdbcTemplate.execute("CREATE TABLE posts(" +
                    "id SERIAL, title VARCHAR(255), content VARCHAR(255), author_id bigint)");
            log.info("created table POSTS");

            jdbcTemplate.execute("DROP TABLE IF EXISTS comments");
            jdbcTemplate.execute("CREATE TABLE comments(" +
                    "id SERIAL, author_id bigint, parent_comment_id bigint, post_id bigint, content VARCHAR(255))");
            log.info("created table COMMENTS");

            // Split up the array of whole names into an array of first/last names
            List<Object[]> postData = new ArrayList<>();
            postData.add(new Object[] {"title1", "MyContent", 1});
            postData.add(new Object[] {"title2", "MyContent2", 2});
            postData.add(new Object[] {"testTitle", "MyContent3", 3});

            // Use a Java 8 stream to print out each tuple of the list
            postData.forEach(data -> log.info(String.format("Inserting post record for %s %s %s", data[0], data[1], data[2])));

            // Uses JdbcTemplate's batchUpdate operation to bulk load data
            jdbcTemplate.batchUpdate("INSERT INTO posts(title, content, author_id) VALUES (?,?,?)", postData);


            List<Object[]> commentData = new ArrayList<>();
            commentData.add(new Object[] {1, 1, 0, "Comment 1 for post 1"});
            commentData.add(new Object[] {2, 1, 1, "Comment 2 for post 1, child of comment 1"});
            commentData.add(new Object[] {3, 2, 0, "Comment 1 for post 2"});
            commentData.forEach(data -> log.info(String.format("Inserting comment record for id-%s postId-%s commentParrent-%s content-%s", data[0], data[1], data[2], data[3])));
            jdbcTemplate.batchUpdate("INSERT INTO comments(id, post_id, parent_Comment_id, content) VALUES (?,?,?,?)", commentData);

            log.info("Querying for post records where title = 'testTitle':");
            String query = "SELECT id, title, content, author_id FROM posts WHERE title = ?";
            jdbcTemplate.query(query, new Object[]{"testTitle"}, new PostRowMapper())
                    .forEach(post -> log.info(post.toString()));

        };
    }
}