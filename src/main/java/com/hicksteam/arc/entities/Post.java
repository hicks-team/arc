package com.hicksteam.arc.entities;

import com.hicksteam.arc.DAO;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
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
