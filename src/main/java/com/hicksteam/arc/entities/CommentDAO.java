package com.hicksteam.arc.entities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class CommentDAO
{
    private final String INSERT_SQL = "INSERT INTO COMMENTS(post_id, parent_comment_id, author_id, content) values (?,?,?,?)";
    private final String FETCH_SQL = "select id, post_id, parent_comment_id, author_id, content from COMMENTS";
    private final String FETCH_SQL_BY_ID = "SELECT * from COMMENTS where id = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Comment create(final Comment comment)
    {
        KeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator()
        {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException
            {
                PreparedStatement ps = con.prepareStatement(INSERT_SQL, new String[] {"id"});
                ps.setLong(1, comment.getPostId());
                ps.setLong(2, comment.getParentCommentId() == null ? 0L : comment.getParentCommentId());
                ps.setLong(3, comment.getAuthorId());
                ps.setString(4, comment.getContent());
                return ps;
            }
        }, holder);

        long newCommentId = holder.getKey().longValue();
        comment.setId(newCommentId);
        return comment;
    }

    public List<Comment> findAll()
    {
        return jdbcTemplate.query(FETCH_SQL, new CommentRowMapper());
    }

    public Comment findById(long id)
    {
        return (Comment) jdbcTemplate.queryForObject(FETCH_SQL_BY_ID, new Object[] {id}, new CommentRowMapper());
    }

    class CommentRowMapper implements RowMapper
    {
        @Override
        public Comment mapRow(ResultSet rs, int rowNum) throws SQLException
        {
            Comment comment = new Comment(
                    rs.getLong("id"),
                    rs.getLong("post_id"),
                    rs.getLong("parent_comment_id"),
                    rs.getLong("author_id"),
                    rs.getString("content")
            );
            return comment;
        }
    }

}
