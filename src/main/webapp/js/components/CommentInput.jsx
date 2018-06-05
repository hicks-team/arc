import React from "react";
import $ from "jquery";

export default class AddRootComment extends React.Component {

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
        const parentCommentId = 0;
        const text = $('#commentTextarea').val();

        if (!text)
            alert('Add comment text.');

        const data = JSON.stringify({postId: postId, parentCommentId: parentCommentId, text: text});

        $.ajax({
            url: '/api/comments',
            type: 'POST',
            data: data,
            contentType:"application/json; charset=utf-8",
            success: function (data) {
                self.handlePostsChange();
                $('#commentTextarea').val("");
            }
        });
    }

    render() {
        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                <textarea id="commentTextarea">
                    add a comment
                </textarea>
                <button onClick={this.submitComment}>Submit</button>
            </div>
        )
    }
}