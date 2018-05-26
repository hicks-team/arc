package com.hicksteam.arc.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.hicksteam.arc.DAO;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Post
{
    private long id;
    private String title;
    private String content;
    private long authorId;

    public Post(long id, String title, String content, long authorId)
    {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }

    public Post()
    {
    }

    public String toString()
    {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", authorId=" + authorId +
                '}';
    }

    //----------DATA ACCESS
    public static long createPost(Post post)
    {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", post.getTitle());
        parameters.put("content", post.getContent());
        parameters.put("author_id", post.getAuthorId());
        Number number = new SimpleJdbcInsert(DAO.getJdbcTemplate()).usingGeneratedKeyColumns("id").withSchemaName("arc").withTableName("posts").executeAndReturnKey(parameters);
        return number.longValue();

//        DAO.getJdbcTemplate().update("insert into posts (title, content, author_id) values (?, ?, ?)", post.getTitle(), post.getContent(), post.getAuthorId());
    }

    public static List<Post> getAllPosts()
    {
        String query = "select * from posts";
        List<Post> posts = DAO.getJdbcTemplate()
                .query(query, new Object[]{}, new PostRowMapper());

        return posts;
    }

    public static Post mapJSONtoObject(JsonNode json)
    {
        JsonNode postData = json.findValue("data");
        JsonNode title = postData.findValue("title");
        JsonNode selfText = postData.findValue("selftext");

        //popular demo users from the reddit posts
        JsonNode authorName = postData.findValue("author");
        String userName = authorName.textValue();
        boolean userExists = User.userExists(userName);
        if (!userExists)
            User.createUser(new User(userName, "1234", userName+"@yahoo.com"));

        Post post = new Post();
        post.setTitle(title.asText());
        post.setContent(selfText.textValue());

        return post;
    }

    public String getAuthor()
    {
        User user = User.getById(this.authorId);
        return user != null ? user.getUsername() : "";
    }

    public List<Comment> getComments()
    {
        return Comment.getByPostId(this.id);
    }

    //

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

    public long getAuthorId()
    {
        return authorId;
    }

    public void setAuthorId(long authorId)
    {
        this.authorId = authorId;
    }
}
