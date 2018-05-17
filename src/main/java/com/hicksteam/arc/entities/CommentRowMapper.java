package com.hicksteam.arc.entities;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentRowMapper implements RowMapper<Comment>
{
    @Override
    public Comment mapRow(ResultSet row, int rowNum) throws SQLException
    {
        Comment comment = new Comment(
                row.getLong("id"),
                row.getLong("postId"),
                row.getLong("parentCommentId"),
                row.getLong("author_id"),
                row.getString("content")
        );

        return comment;
    }


}
