import React from "react";
import CommentInput from "./CommentInput.jsx";
import $ from "jquery";

export default class Comments extends React.Component
{
    render()
    {
        const box = this.props.commentTree.map((comment) => {

            return (
                <Comment comment={comment} key={comment.id} getPosts={this.props.getPosts} />
            );
        });

        return (
            <div style={{padding: "2px 2px 2px 10px"}}>
                {box}
            </div>
        );
    }
}

class Comment extends React.Component{
    constructor(props)
    {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
        this.toggleReplyBox = this.toggleReplyBox.bind(this);
        this.state = {
            replyBox: false,
        }
    }

    render()
    {
        const comment = this.props.comment;

        const replyBox = this.state.replyBox ?
            <CommentInput postId={comment.postId} parentCommentId={comment.id} getPosts={this.props.getPosts} toggleReplyBox={this.toggleReplyBox} /> :
            '';

        return (
            <div className="box is-small" style={{padding: "2px 2px 2px 10px"}} key={comment.id}>
                    <span>

                        <span style={{fontSize: '11px'}}>{comment.author}</span>
                        <br />
                        <span title={'id: ' + comment.id}>
                            {comment.content}
                        </span>
                        <br/>
                    </span>
                <span style={{fontSize: '11px'}}>
                    <a onClick={() => this.toggleReplyBox()}>Reply</a>
                    &nbsp;&nbsp;
                    <a onClick={() => this.deleteComment()}>Delete</a>
                </span>

                {replyBox}

                <Comments commentTree={comment.children} getPosts={this.props.getPosts}/>
            </div>
        );
    }

    deleteComment()
    {
        let self = this;
        $.ajax({
            method: 'DELETE',
            url: '/api/comments/' + self.props.comment.id,
            async: false,
            success: function (data) {
                console.log(data);
                self.props.getPosts();
            }
        });
    }

    toggleReplyBox()
    {
        this.setState({
            replyBox: !this.state.replyBox
        })
    }
}