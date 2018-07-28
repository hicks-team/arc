import React from "react";
import $ from "jquery";

export default class CommentInput extends React.Component {

    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
        this.handlePostsChange = this.handlePostsChange.bind(this);
    }

    handlePostsChange()
    {
        this.props.getPosts();
    }

    submitComment()
    {
        let self = this;

        const postId = this.props.postId;
        const parentCommentId = this.props.parentCommentId;
        const text = $('#commentTextarea' + parentCommentId).val();

        if (!text)
        {
            alert('Add comment text.');
            return;
        }

        const data = JSON.stringify({postId: postId, parentCommentId: parentCommentId, text: text});

        $.ajax({
            url: '/api/comments',
            type: 'POST',
            data: data,
            contentType:"application/json; charset=utf-8",
            success: function (data) {
                self.handlePostsChange();
                $('#commentTextarea' + parentCommentId).val("");
            }
        });

        if (this.props.toggleReplyBox) // the top level 'make a comment' input shouldn't be hidden
            this.props.toggleReplyBox();
    }

    render() {
        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                <textarea id={"commentTextarea" + this.props.parentCommentId} placeholder={'add a comment'} />
                <button onClick={this.submitComment}>Submit</button>
            </div>
        )
    }
}