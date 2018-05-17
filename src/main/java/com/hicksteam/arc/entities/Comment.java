package com.hicksteam.arc.entities;

import java.util.Objects;

public class Comment
{

    private long id;
    private long postId;
    private Long parentCommentId;
    private long authorId;
    private String content = "";

    @Override
    public String toString()
    {
        return "Comment for post: " + postId + " by: " + authorId;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comments = (Comment) o;
        return id == comments.id;
    }

    @Override
    public int hashCode()
    {

        return Objects.hash(id);
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public long getPostId()
    {
        return postId;
    }

    public void setPostId(long postId)
    {
        this.postId = postId;
    }

    public Long getParentCommentId()
    {
        return parentCommentId;
    }

    public void setParentCommentId(Long parentCommentId)
    {
        this.parentCommentId = parentCommentId;
    }

    public long getAuthorId()
    {
        return authorId;
    }

    public void setAuthorId(long authorId)
    {
        this.authorId = authorId;
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        this.content = content;
    }
}
